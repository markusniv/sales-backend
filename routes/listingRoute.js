'use strict';

const express = require('express');
const router = express.Router();
const listingController = require('../controllers/listingController');
const {validateSearchQuery} = require("../validators/listingSearchValidator");

router.route("/")
  .get(listingController.getAllListings);

router.route('/:id')
  .get(listingController.getListing);

router.route('/user/:id')
  .get(listingController.getUserListing);

router.route('/search/:searchParam')
  .get(validateSearchQuery, listingController.searchListing);

module.exports = router;

