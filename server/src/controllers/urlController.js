const ShortUrl = require("../models/shortUrl.js");
const shortId = require("shortid");

async function redirectShortUrl(req, res) {
  try {
    const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl });
    if (shortUrl == null) {
      return res.sendStatus(404);
    }

    shortUrl.clicks++;
    await shortUrl.save();

    res.json({ fullUrl: shortUrl.full });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to redirect short URL" });
  }
}

async function createShortUrl(req, res) {
  try {
    const { user, body } = req;
    const { fullUrl } = body;

    if (user) {
      const shortUrl = await ShortUrl.create({
        userId: user.id,
        full: fullUrl,
        short: shortId.generate(),
      });
      res.status(201).json(shortUrl);
    } else {
      const shortUrl = {
        full: fullUrl,
        short: shortId.generate(),
      };
      res.status(201).json(shortUrl);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create short URL" });
  }
}

async function getAllShortUrls(req, res) {
  try {
    if (!req.user) {
      return res
        .status(401)
        .json({ error: "Access denied. No token provided." });
    }

    const shortUrls = await ShortUrl.find({ userId: req.user.id });
    res.status(200).json(shortUrls);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve short URLs" });
  }
}

module.exports = {
  redirectShortUrl,
  createShortUrl,
  getAllShortUrls,
};
