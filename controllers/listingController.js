'use strict';

const listingModel = require("../models/listingModel");
const {httpError, controllerError} = require("../utils/errors");


const getListing = async (req, res, next) =>  {
  const listing = await listingModel.getListing(req.params.id, next);
  if (listing) {
    res.json(listing);
    return;
  }
  const err = httpError("listing not found", 404);
  next(err);
}

const getAllListings = async (req, res, next) => {
  const listings = await listingModel.getAllListings();
  if (listings.length > 0){
    res.json(listings);
    return;
  }
  const err = httpError("Listings not found", 404);
  next(err);
}

module.exports = {
  getListing,
  getAllListings,
}