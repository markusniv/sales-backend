'use strict';

const express = require('express');
const router = express.Router();
const multer = require('multer');
const listingController = require('../controllers/listingController');
const {validateSearchQuery} = require("../validators/listingSearchValidator");

const fileFilter = (req, file, cb) => {
  if (file.mimetype.includes("image")) {
    cb(null, true);
  } else {
    cb(null, false);
  }
}

const upload = multer( { dest: './uploads/', fileFilter});


router.route("/")
  .get(listingController.getAllListings)
  .post(upload.single('filename'), listingController.insertListing);

router.route('/:id')
  .get(listingController.getListing)
  .put(listingController.modifyListing)
  .delete(listingController.deleteListing);

router.route('/user/:id')
  .get(listingController.getUserListing);

router.route('/search/:searchParam')
  .get(validateSearchQuery, listingController.searchListing);


module.exports = router;

