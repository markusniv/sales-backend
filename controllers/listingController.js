'use strict';

const listingModel = require("../models/listingModel");
const {httpError, controllerError} = require("../utils/errors");
const {makeThumbnail} = require("../utils/thumbnail");


const getListing = async (req, res, next) => {
  const listing = await listingModel.getListing(req.params.id, next);
  if (listing) {
    res.json(listing);
    return;
  }
  const err = httpError("listing not found", 404);
  next(err);
}

const getUserListing = async (req, res, next) => {
  const listing = await listingModel.getUserListing(req.params.id, next);
  if (listing.length > 0) {
    res.json(listing);
    return;
  }
  const err = httpError("listings not found", 404);
  next(err)
}

const getAllListings = async (req, res, next) => {
  const listings = await listingModel.getAllListings();
  if (listings.length > 0) {
    res.json(listings);
    return;
  }
  const err = httpError("Listings not found", 404);
  next(err);
}

const insertListing = async (req, res, next) => {
  if (controllerError('listing_post validation', req, next)) return;
  try {
    const filename = req.file.filename;
    const thumb = await makeThumbnail(req.file.path, filename);
    const listing = {
      user_id: req.body.user_id,
      title: req.body.title,
      filename: req.file.filename,
      description: req.body.description,
      price: req.body.price,
      listing_date: req.body.listing_date
    };
    console.log(listing);
    const result = await (listingModel.insertListing(listing, next));
    if (thumb) {
      res.json({message: 'listing added', id: result.insertId});
    }
  } catch (e) {
    const err = httpError('failed to add listing', 400);
    next(err);
  }
}

const modifyListing = async (req, res, next) => {
  if (controllerError('listing_put validation', req, next)) return;
  try {
    const response = await listingModel.modifyListing(req.params.id, req.body, next);
    if (response.affectedRows !== 0) {
      res.json({message: "listing modified"});
      return;
    }
  } catch (e) {
    const err = httpError("Failed to modify listing", 400);
    next(err);
  }
}

const deleteListing = async (req, res, next) => {
  try {
    const response = await listingModel.deleteListing(req.params.id, req.body, next);
    if (response.affectedRows !== 0) {
      res.json({message: "Listing deleted"});
      return;
    }
  } catch (e) {
    const err = httpError("Failed to delete listing", 400);
    next(err);
  }
}

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
  modifyListing,
  deleteListing,
  insertListing,
  searchListing,
  getUserListing,
}