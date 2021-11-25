'use strict';

const listingModel = require("../models/listingModel");
const {httpError} = require("../utils/errors");


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

const modifyListing = async (req, res, next) => {
  const response = await listingModel.modifyListing(req.params.id, req.body, next);
  if(response.affectedRows !== 0){
    res.json({ message: "listing modified" });
    return;
  }
  const err = httpError("Failed to modify listing", 400);
  next(err);
}

module.exports = {
  getListing,
  getAllListings,
  modifyListing,
}