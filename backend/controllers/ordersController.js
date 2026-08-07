import Order from '../model/OrdersModel.js';
import Holding from '../model/HoldingsModel.js';
import Position from '../model/PositionsModel.js';
import Funds from '../model/FundsModel.js';
import Notification from '../model/NotificationModel.js';

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.userID }).sort({
      createdAt: -1,
    });
    res.json(orders);
  } catch (err) {
    console.error('orders fetch error', err);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};

export const placeNewOrder = async (req, res) => {
  res.set('Cache-Control', 'no-store');
  try {
    const { name, qty, price, mode, productType } = req.body;

    if (!name || !qty || !price || !mode) {
      return res.status(400).json({ error: 'Missing require fields' });
    }

    const orderQty = Number(qty);
    const orderPrice = Number(price);
    const orderValue = orderQty * orderPrice;
    const finalProductType = productType || 'CNC';

    let funds = await Funds.findOne({ userId: req.userID });
    if (!funds) {
      funds = await Funds.create({ userId: req.userID });
    }

    const existingHolding = await Holding.findOne({ userId: req.userID, name });
    const existingPosition = await Position.findOne({
      userId: req.userID,
      name,
    });

    if (mode === 'BUY') {
      if (funds.availableBalance < orderValue) {
        return res.status(400).json({ error: 'Insufficient funds' });
      }
    } else if (mode === 'SELL') {
      if (finalProductType === 'MIS') {
        if (!existingPosition) {
          return res
            .status(400)
            .json({ error: 'No intraday position to sell' });
        }
        if (existingPosition.qty < orderQty) {
          return res.status(400).json({ error: 'Not enough quantity to sell' });
        }
      } else {
        if (!existingHolding) {
          return res
            .status(400)
            .json({ error: "Cannot sell a stock you don't hold" });
        }
        if (existingHolding.qty < orderQty) {
          return res.status(400).json({ error: 'Not enough quantity to sell' });
        }
      }
    } else {
      return res.status(400).json({ error: 'Invalid order mode' });
    }

    await Notification.create({
      userId: req.userID,
      message: `${mode} order executed: ${orderQty} ${name} @ ₹${orderPrice}`,
    });

    const newOrder = new Order({
      userId: req.userID,
      name,
      qty: orderQty,
      price: orderPrice,
      mode,
      productType: finalProductType,
    });
    await newOrder.save();

    if (mode === 'BUY') {
      funds.availableBalance -= orderValue;
    } else if (mode === 'SELL') {
      funds.availableBalance += orderValue;
    }
    await funds.save();

    if (finalProductType === 'MIS') {
      if (mode === 'BUY') {
        if (existingPosition) {
          const totalOldValue = existingPosition.avg * existingPosition.qty;
          const totalNewValue = orderPrice * orderQty;
          const newQty = existingPosition.qty + orderQty;

          existingPosition.qty = newQty;
          existingPosition.avg = (totalNewValue + totalOldValue) / newQty;
          existingPosition.price = orderPrice;
          await existingPosition.save();
        } else {
          await Position.create({
            userId: req.userID,
            product: 'MIS',
            name,
            qty: orderQty,
            avg: orderPrice,
            price: orderPrice,
          });
        }
      } else if (mode === 'SELL') {
        const remainingQty = existingPosition.qty - orderQty;
        if (remainingQty === 0) {
          await Position.deleteOne({ userId: req.userID, name });
        } else {
          existingPosition.qty = remainingQty;
          existingPosition.price = orderPrice;
          await existingPosition.save();
        }
      }
    } else {
      if (mode === 'BUY') {
        if (existingHolding) {
          const totalOldValue = existingHolding.avg * existingHolding.qty;
          const totalNewValue = orderPrice * orderQty;
          const newQty = existingHolding.qty + orderQty;
          const newAvg = (totalNewValue + totalOldValue) / newQty;

          existingHolding.qty = newQty;
          existingHolding.avg = newAvg;
          existingHolding.price = orderPrice;
          await existingHolding.save();
        } else {
          await Holding.create({
            userId: req.userID,
            name,
            qty: orderQty,
            avg: orderPrice,
            price: orderPrice,
            net: '0.00%',
            day: '0.00%',
          });
        }
      } else if (mode === 'SELL') {
        const remainingQty = existingHolding.qty - orderQty;
        if (remainingQty === 0) {
          await Holding.deleteOne({ userId: req.userID, name });
        } else {
          existingHolding.qty = remainingQty;
          existingHolding.price = orderPrice;
          await existingHolding.save();
        }
      }
    }

    res
      .status(201)
      .json({ message: 'Order placed successfully', order: newOrder });
  } catch (err) {
    console.error('Error placing order:', err);
    res.status(500).json({ error: 'Failed to place order' });
  }
};
