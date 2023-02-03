/* eslint-disable no-unused-vars */
const express = require('express');
const router = express.Router();
const pool = require('../config/db.js');
const controller = require("../controllers/auth_controller");


router.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

//get sign in
//it is / because the app in server.js adds the "/journals" already
router.route("/")
    .post(controller.signin);

//exports our routes
module.exports = router;