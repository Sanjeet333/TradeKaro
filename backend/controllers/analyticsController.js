import mongoose from 'mongoose';
import Order from '../model/OrdersModel.js';

export const getSummary = async (req, res) => {
  try {
    const userObjectId = new mongoose.Types.ObjectId(req.userID);

    const modeBreakdown = await Order.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: '$mode', count: { $sum: 1 } } },
    ]);

    const buyCount = modeBreakdown.find((m) => m._id === 'BUY')?.count || 0;
    const sellCount = modeBreakdown.find((m) => m._id === 'SELL')?.count || 0;

    const totalTrades = await Order.countDocuments({ userId: req.userID });

    const mostTraded = await Order.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: '$name', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 1 },
    ]);

    res.json({
      totalTrades,
      mostTradedStock: mostTraded[0]?._id || 'N/A',
      mostTradedCount: mostTraded[0]?.count || 0,
      buyCount,
      sellCount,
    });
  } catch (err) {
    console.error('Analytics error:', err);
    res.status(500).json({ error: 'Failed to fetch analytics' });
  }
};

export const getMonthlyTrend = async (req, res) => {
  try {
    const userObjectId = new mongoose.Types.ObjectId(req.userID);

    const monthlyData = await Order.aggregate([
      { $match: { userId: userObjectId } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m', date: '$createdAt' } },
          totalOrders: { $sum: 1 },
          totalValue: { $sum: { $multiply: ['$qty', '$price'] } },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.json(monthlyData);
  } catch (err) {
    console.error('Monthly analytics error:', err);
    res.status(500).json({ error: 'Failed to fetch monthly analytics' });
  }
};
