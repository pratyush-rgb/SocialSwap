//controller for adding listing to the database

import { getImageKitClient } from "../Configs/imagekit.js";
import {
  Credential,
  Listing,
  Transaction,
  User,
  Withdrawal,
} from "../models/index.js";
import fs from "fs";

export const addListing = async (req, res) => {
  try {
    const imageKit = getImageKitClient();
    const { userId } = await req.auth();
    if (req.plan !== "premium") {
      const listingCount = await Listing.countDocuments({ ownerId: userId });
      if (listingCount >= 3) {
        return res
          .status(400)
          .json({ message: "You have reached the free listing limit" });
      }
    }
    const accountDetails = JSON.parse(req.body.accountDetails);

    accountDetails.followers_count = parseFloat(accountDetails.followers_count);
    accountDetails.engagement_rate = parseFloat(accountDetails.engagement_rate);
    accountDetails.monthly_views = parseFloat(accountDetails.monthly_views);
    accountDetails.price = parseFloat(accountDetails.price);
    accountDetails.platform = accountDetails.platform.toLowerCase();
    accountDetails.niche = accountDetails.niche.toLowerCase();
    if (accountDetails.username?.startsWith("@")) {
      accountDetails.username = accountDetails.username.slice(1);
    }

    const uploadImages = (req.files || []).map(async (file) => {
      const response = await imageKit.files.upload({
        file: fs.createReadStream(file.path),
        fileName: `${Date.now()}.png`,
        folder: "Social-Swap",
        transformation: { pre: "w-1280,h-auto" },
      });
      return response.url;
    });

    //wait for all uploads to complete.

    const images = await Promise.all(uploadImages);

    const listing = await Listing.create({
      ownerId: userId,
      images,
      ...accountDetails,
    });

    return res
      .status(201)
      .json({ message: "Account Listed Successfully", listing });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.code || error.message });
  }
};

//controller for getting all public listings

export const getAllPublicListings = async (req, res) => {
  try {
    const listings = await Listing.find({ status: "active" })
      .populate("owner")
      .sort({ createdAt: -1 });
    if (!listings || listings.length === 0) {
      return res.json({ listings: [] });
    }
    return res.json({ listings });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.code || error.message });
  }
};

//controller for getting all user listings

export const getAlluserListing = async (req, res) => {
  try {
    const { userId } = await req.auth();
    //get all listings except deleted.

    const listings = await Listing.find({
      ownerId: userId,
      status: { $ne: "deleted" },
    }).sort({ createdAt: -1 });
    const user = await User.findById(userId);
    const balance = {
      earned: user?.earned || 0,
      withdrawn: user?.withdrawn || 0,
      available: (user?.earned || 0) - (user?.withdrawn || 0),
    };

    if (!listings || listings.length === 0) {
      return res.json({ listings: [], balance });
    }
    return res.json({ listings, balance });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.code || error.message });
  }
};

//controllerfor updating listing details.

export const updateListing = async (req, res) => {
  try {
    const imageKit = getImageKitClient();
    const { userId } = await req.auth();
    const accountDetails = JSON.parse(req.body.accountDetails);
    const existingImages = Array.isArray(accountDetails.images)
      ? accountDetails.images
      : [];
    const files = req.files || [];

    if (files.length + existingImages.length > 5) {
      return res
        .status(400)
        .json({ message: "You can upload maximum 5 images" });
    }
    accountDetails.followers_count = parseFloat(accountDetails.followers_count);
    accountDetails.engagement_rate = parseFloat(accountDetails.engagement_rate);
    accountDetails.monthly_views = parseFloat(accountDetails.monthly_views);
    accountDetails.price = parseFloat(accountDetails.price);
    accountDetails.platform = accountDetails.platform.toLowerCase();
    accountDetails.niche = accountDetails.niche.toLowerCase();
    if (accountDetails.username?.startsWith("@")) {
      accountDetails.username = accountDetails.username.slice(1);
    }

    const existingListing = await Listing.findOne({
      _id: accountDetails.id,
      ownerId: userId,
    });

    if (!existingListing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    if (existingListing.status === "sold") {
      return res
        .status(400)
        .json({ message: "You cannot update a sold listing" });
    }

    if (files.length > 0) {
      const uploadImages = files.map(async (file) => {
        const response = await imageKit.files.upload({
          file: fs.createReadStream(file.path),
          fileName: `${Date.now()}.png`,
          folder: "Social-Swap",
          transformation: { pre: "w-1280,h-auto" },
        });
        return response.url;
      });
      const images = await Promise.all(uploadImages);

      const listing = await Listing.findOneAndUpdate(
        { _id: accountDetails.id, ownerId: userId },
        {
          ownerId: userId,
          ...accountDetails,
          images: [...existingImages, ...images],
        },
        { new: true }
      );
      return res.json({ message: "Listing Updated Successfully", listing });
    }

    const listing = await Listing.findOneAndUpdate(
      { _id: accountDetails.id, ownerId: userId },
      {
        ownerId: userId,
        ...accountDetails,
      },
      { new: true }
    );

    return res.json({ message: "Listing Updated Successfully", listing });
  } catch (error) {
    console.log(error);
    if (error.code === "IMAGEKIT_CONFIG_MISSING") {
      return res.status(500).json({ message: error.message });
    }
    res.status(500).json({ message: error.code || error.message });
  }
};

export const toggleStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = await req.auth();

    const listing = await Listing.findOne({ _id: id, ownerId: userId });

    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    if (listing.status === "sold") {
      return res
        .status(400)
        .json({ message: "You cannot change status of a sold listing" });
    }

    let updatedListing = listing;

    if (listing.status === "active" || listing.status === "inactive") {
      updatedListing = await Listing.findOneAndUpdate(
        { _id: id, ownerId: userId },
        { status: listing.status === "active" ? "inactive" : "active" },
        { new: true }
      );
    } else if (listing.status === "ban") {
      return res
        .status(400)
        .json({ message: "You cannot change status of a banned listing" });
    }

    return res.json({
      message: "Listing status updated successfully",
      listing: updatedListing,
    });
  } catch (error) {
    console.log(error);
    if (error.code === "IMAGEKIT_CONFIG_MISSING") {
      return res.status(500).json({ message: error.message });
    }
    res.status(500).json({ message: error.code || error.message });
  }
};

export const deleteUserListing = async (req, res) => {
  try {
    const { userId } = await req.auth();
    const { listingId } = req.params;

    const listing = await Listing.findOne({ _id: listingId, ownerId: userId }).populate(
      "owner"
    );

    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    if (listing.status === "sold") {
      return res
        .status(400)
        .json({ message: "You cannot delete a sold listing" });
    }

    //if password has been changed , send the new password to the owner.
    if (listing.isCredentialChanged) {
      //send email to the owner with the new password.
    }

    await Listing.updateOne({ _id: listingId }, { status: "deleted" });

    return res.json({ message: "Listing deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.code || error.message });
  }
};

export const addCredentials = async (req, res) => {
  try {
    const { userId } = await req.auth();
    const { listingId, credentials } = req.body;

    if (!credentials || credentials.length === 0 || !listingId) {
      return res
        .status(400)
        .json({ message: "Listing ID and credentials are required" });
    }

    const listing = await Listing.findOne({ _id: listingId, ownerId: userId });

    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    await Credential.create({
      listingId,
      originalCredential: credentials,
    });

    await Listing.updateOne({ _id: listingId }, { isCredentialSubmitted: true });

    return res.json({ message: "Credential added successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.code || error.message });
  }
};

export const markFeatured = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = await req.auth();

    if (req.plan !== "premium") {
      return res.status(400).json({ message: "Premium plan required" });
    }

    // Unset all other featured listings
    await Listing.updateMany({ ownerId: userId }, { featured: false });

    // Mark the listing as featured
    await Listing.updateOne({ _id: id, ownerId: userId }, { featured: true });
    return res.json({ message: "Listing marked as featured successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.code || error.message });
  }
};

export const getAllUserOrders = async (req, res) => {
  try {
    const { userId } = await req.auth();

    let orders = await Transaction.find({ userId, isPaid: true }).populate(
      "listing"
    );

    if (!orders || orders.length === 0) {
      return res.json({ orders: [] });
    }

    // Attach the credential to each order

    const credentials = await Credential.find({
      listingId: { $in: orders.map((order) => order.listingId) },
    });

    const ordersWithCredentials = orders.map((order) => {
      const credential = credentials.find(
        (cred) => cred.listingId === order.listingId,
      );

      return { ...order.toObject(), credential };
    });

    return res.json({ orders: ordersWithCredentials });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.code || error.message });
  }
};

export const withdrawAmount = async (req, res) => {
  try {
    const { userId } = await req.auth();
    const { amount, account } = req.body;

    const parsedAmount = parseFloat(amount);
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const balance = user.earned - user.withdrawn;

    if (parsedAmount > balance) {
      return res.status(400).json({ message: "Insufficient balance" });
    }

    const withdrawal = await Withdrawal.create({
      userId,
      amount: parsedAmount,
      account: account || [],
    });

    await User.updateOne({ _id: userId }, { $inc: { withdrawn: parsedAmount } });

    return res.json({
      message: "Withdrawal request submitted successfully",
      withdrawal,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.code || error.message });
  }
};

export const purchaseAccount = async (req, res) => {};
