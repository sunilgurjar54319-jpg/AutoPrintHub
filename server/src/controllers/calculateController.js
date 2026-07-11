exports.calculatePrice = async (req, res) => {
  try {
    const {
      bwPages,
      colorPages,
      copies,
      bwRate,
      colorRate
    } = req.body;

    const total =
      (bwPages * bwRate + colorPages * colorRate) * copies;

    res.json({
      success: true,
      totalAmount: total
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};
