'use strict';

/*
 * Controller handling listing functionality that doesn't require authentication
 */

const listingModel = require("../models/listingModel");
const {httpError} = require("../utils/errors");

// GET - Get a specific listing
const getListing = async (req, res, next) => {
  const listing = await listingModel.getListing(req.params.id, next);
  if (listing) {
    res.json(listing);
    return;
  }
  const err = httpError("listing not found", 404);
  next(err);
}

// GET - Get listings for a specific user
const getUserListing = async (req, res, next) => {
  const listing = await listingModel.getUserListing(req.params.id, next);
  if (listing.length > 0) {
    res.json(listing);
    return;
  }
  const err = httpError("listings not found", 404);
  next(err)
}

// GET - Get all the listings
const getAllListings = async (req, res, next) => {
  const listings = await listingModel.getAllListings();
  if (listings.length > 0) {
    res.json(listings);
    return;
  }
  const err = httpError("Listings not found", 404);
  next(err);
}

// GET - Get listings based on search parameter
const searchListing = async (req, res, next) => {
  const listings = await listingModel.searchListing(req.params.searchParam, next);
  if (listings.length > 0) {
    res.json(listings);
    return;
  }
  const err = httpError("No listings found, alter your search query!", 404);
  next(err);
}

module.exports = {
  getListing,
  getAllListings,
  searchListing,
  getUserListing,
}