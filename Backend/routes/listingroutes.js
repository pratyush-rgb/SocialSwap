import express from "express";
import {
  addCredentials,
  addListing,
  deleteUserListing,
  getAllPublicListings,
  getAlluserListing,
  getAllUserOrders,
  markFeatured,
  purchaseAccount,
  toggleStatus,
  updateListing,
  withdrawAmount,
} from "../controller/lisitngcontroller.js";
import { protect } from "../middlewires/authmiddlewire.js";
import upload from "../Configs/multer.js";

const listingRouter = express.Router();

listingRouter.post("/", upload.array("images", 5), protect, addListing);
listingRouter.put("/", upload.array("images", 5), protect, updateListing);
listingRouter.get("/public", getAllPublicListings);
listingRouter.get("/user", protect, getAlluserListing);
listingRouter.put("/:id/status", protect, toggleStatus);
listingRouter.delete("/:listingId", protect, deleteUserListing);
listingRouter.post("/add-credential", protect, addCredentials);
listingRouter.put("/featured/:id", protect, markFeatured);
listingRouter.get("/users-orders", protect, getAllUserOrders);
listingRouter.post("/withdraw", protect, withdrawAmount);
listingRouter.post("/purchase-account/:listingId", protect, purchaseAccount);

export default listingRouter;
