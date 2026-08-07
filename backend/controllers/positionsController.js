import Position from '../model/PositionsModel.js';

export const getAllPositions = async (req, res) => {
  try {
    const allPositions = await Position.find({ userId: req.userID });
    res.json(allPositions);
  } catch (err) {
    console.error('Positions fetch error:', err);
    res.status(500).json({ error: 'Failed to fetch positions' });
  }
};
