import Funds from '../model/FundsModel.js';

export const getFunds = async (req, res) => {
  try {
    let funds = await Funds.findOne({ userId: req.userID });
    if (!funds) {
      funds = await Funds.create({ userId: req.userID });
    }
    res.json(funds);
  } catch (err) {
    console.error('Funds fetch error:', err);
    res.status(500).json({ error: 'Failed to fetch funds' });
  }
};
