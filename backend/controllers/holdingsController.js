import Holding from '../model/HoldingsModel.js';

export const getAllHoldings = async (req, res) => {
  try {
    const allHoldings = await Holding.find({ userId: req.userID });
    res.json(allHoldings);
  } catch (err) {
    console.error('Holdings fetch error:', err);
    res.status(500).json({ error: 'Failed to fetch holdings' });
  }
};
