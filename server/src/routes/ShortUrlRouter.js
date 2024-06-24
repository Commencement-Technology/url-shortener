const express = require("express");
const router = express.Router();
const verifyAuth = require("../middleware/verifyAuth.js");
const optionalAuth = require("../middleware/optionalAuth.js");
const {
  redirectShortUrl,
  createShortUrl,
  getAllShortUrls,
} = require("../controllers/urlController.js");

router.post("/shortUrls", optionalAuth, createShortUrl);

router.get("/shortUrls", verifyAuth, getAllShortUrls);

router.get("/:shortUrl", redirectShortUrl);

module.exports = router;
