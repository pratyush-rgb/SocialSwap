import { Inngest } from "inngest";
import { User, Listing, Chat, Transaction } from "../models/index.js";

export const inngest = new Inngest({ id: "profile-marketplace" });

//function to save the userdata to our database
const syncUserCreation = inngest.createFunction(
  { id: "sync-user-from-clerk", triggers: [{ event: "clerk/user.created" }] },
  async ({ event }) => {
    const { data } = event;

    await User.findByIdAndUpdate(
      data.id,
      {
        _id: data.id,
        email: data?.email_addresses[0]?.email_address,
        name: `${data?.first_name || ""} ${data?.last_name || ""}`.trim(),
        image: data?.image_url,
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
  },
);

//function to delete user from database.
const syncUserDeletion = inngest.createFunction(
  { id: "delete-user-from-clerk", triggers: [{ event: "clerk/user.deleted" }] },
  async ({ event }) => {
    const { data } = event;
    const [listings, chats, transactions] = await Promise.all([
      Listing.find({ ownerId: data.id }),
      Chat.find({
        $or: [{ ownerUserId: data.id }, { chatUserId: data.id }],
      }),
      Transaction.find({ userId: data.id }),
    ]);

    if (
      listings.length === 0 &&
      chats.length === 0 &&
      transactions.length === 0
    ) {
      await User.deleteOne({ _id: data.id });
    } else {
      await Listing.updateMany(
        { ownerId: data.id },
        { status: "inactive" }
      );
    }
  },
);

//function to update user data in database.
const syncUserUpdation = inngest.createFunction(
  { id: "update-user-from-clerk", triggers: [{ event: "clerk/user.updated" }] },
  async ({ event }) => {
    const { data } = event;

    await User.findByIdAndUpdate(
      data.id,
      {
        _id: data.id,
        email: data?.email_addresses[0]?.email_address,
        name: `${data?.first_name || ""} ${data?.last_name || ""}`.trim(),
        image: data?.image_url,
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
  },
);

export const functions = [syncUserCreation, syncUserDeletion, syncUserUpdation];
