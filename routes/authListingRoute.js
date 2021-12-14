const express = require('express');
const router = express.Router();
const multer = require('multer');
const listingController = require('../controllers/authListingController');
const {validateListing} = require("../validators/listingValidator");

const fileFilter = (req, file, cb) => {
  if (file.mimetype.includes("image")) {
    cb(null, true);
  } else {
    cb(null, false);
  }
}

const upload = multer({dest: './uploads/', fileFilter});

router.route("/")
  .post(upload.single('filename'), validateListing, listingController.insertListing);

router.route('/:id')
  .put(upload.single('filename'), validateListing, listingController.modifyListing)
  .delete(listingController.deleteListing);

module.exports = router;