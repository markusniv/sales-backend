'use strict';

const express = require('express');
const router = express.Router();
const listingController = require('../controllers/listingController');



router.route("/")
  .get(listingController.getAllListings);



router.route('/:id')
  .get(listingController.getListing)
  .put(listingController.modifyListing)
  .delete(listingController.deleteListing);


module.exports = router;

