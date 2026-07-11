const fs = require("fs");
const pdf = require("pdf-parse");

exports.getPdfInfo = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No PDF uploaded"
      });
    }

    const buffer = fs.readFileSync(req.file.path);
    const data = await pdf(buffer);

    res.json({
      success: true,
      pages: data.numpages,
      textLength: data.text.length
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};
