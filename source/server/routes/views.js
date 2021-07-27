const express = require("express");
const router = express.Router();
const AppConfig = require("../util/AppConfig");
const Parser = require("../util/Parser");
const Vehicle = require("../model/Vehicle");

router.get("/", function(req, res, next) {
  res.render("index", { title: AppConfig.TITLE });
});

module.exports = router;
