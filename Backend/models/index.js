import mongoose from "mongoose";
import { randomUUID } from "crypto";

const { Schema } = mongoose;

const jsonTransform = (_doc, ret) => {
  ret.id = ret._id?.toString?.() ?? ret._id;
  delete ret._id;
  delete ret.__v;
  return ret;
};

const schemaOptions = {
  versionKey: false,
  timestamps: true,
  toJSON: { virtuals: true, transform: jsonTransform },
  toObject: { virtuals: true, transform: jsonTransform },
};

const userSchema = new Schema(
  {
    _id: { type: String, required: true },
    email: { type: String, required: true },
    name: { type: String, required: true },
    image: { type: String, required: true },
    earned: { type: Number, default: 0 },
    withdrawn: { type: Number, default: 0 },
  },
  schemaOptions
);

const listingSchema = new Schema(
  {
    _id: { type: String, default: () => randomUUID() },
    ownerId: { type: String, ref: "User", required: true },
    title: { type: String, required: true },
    platform: {
      type: String,
      required: true,
      enum: [
        "youtube",
        "instagram",
        "tiktok",
        "facebook",
        "twitter",
        "linkedin",
        "pinterest",
        "snapchat",
        "twitch",
        "discord",
      ],
    },
    username: { type: String },
    followers_count: { type: Number, required: true },
    engagement_rate: { type: Number },
    monthly_views: { type: Number },
    niche: {
      type: String,
      required: true,
      enum: [
        "lifestyle",
        "fitness",
        "food",
        "travel",
        "tech",
        "gaming",
        "fashion",
        "beauty",
        "business",
        "education",
        "entertainment",
        "music",
        "art",
        "sports",
        "health",
        "finance",
        "other",
      ],
    },
    price: { type: Number, required: true },
    description: { type: String },
    verified: { type: Boolean, default: false },
    monetized: { type: Boolean, default: false },
    country: { type: String },
    age_range: { type: String, required: true },
    status: {
      type: String,
      enum: ["active", "ban", "sold", "deleted", "inactive"],
      default: "active",
    },
    featured: { type: Boolean, default: false },
    images: { type: [String], default: [] },
    platformAssured: { type: Boolean, default: false },
    isCredentialSubmitted: { type: Boolean, default: false },
    isCredentialVerified: { type: Boolean, default: false },
    isCredentialChanged: { type: Boolean, default: false },
  },
  schemaOptions
);

listingSchema.virtual("owner", {
  ref: "User",
  localField: "ownerId",
  foreignField: "_id",
  justOne: true,
});

const messageSchema = new Schema(
  {
    _id: { type: String, default: () => randomUUID() },
    chatId: { type: String, ref: "Chat", required: true },
    message: { type: String, required: true },
    sender_id: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { versionKey: false, toJSON: { virtuals: true, transform: jsonTransform }, toObject: { virtuals: true, transform: jsonTransform } }
);

const platformMessageSchema = new Schema(
  {
    _id: { type: String, default: () => randomUUID() },
    chatId: { type: String, ref: "Chat", required: true },
    message: { type: String, required: true },
    sender_id: { type: String, default: "platform" },
    createdAt: { type: Date, default: Date.now },
  },
  { versionKey: false, toJSON: { virtuals: true, transform: jsonTransform }, toObject: { virtuals: true, transform: jsonTransform } }
);

const chatSchema = new Schema(
  {
    _id: { type: String, default: () => randomUUID() },
    chatUserId: { type: String, ref: "User", required: true },
    ownerUserId: { type: String, ref: "User", required: true },
    listingId: { type: String, ref: "Listing", required: true },
    active: { type: Boolean, default: true },
    lastMessage: { type: String, default: "" },
    isLastMessageRead: { type: Boolean, default: true },
    lastMessageSenderId: { type: String, default: "" },
    isTokenAmountPaid: { type: Boolean, default: false },
  },
  schemaOptions
);

chatSchema.virtual("ownerUser", {
  ref: "User",
  localField: "ownerUserId",
  foreignField: "_id",
  justOne: true,
});

chatSchema.virtual("chatUser", {
  ref: "User",
  localField: "chatUserId",
  foreignField: "_id",
  justOne: true,
});

chatSchema.virtual("listing", {
  ref: "Listing",
  localField: "listingId",
  foreignField: "_id",
  justOne: true,
});

chatSchema.virtual("messages", {
  ref: "Message",
  localField: "_id",
  foreignField: "chatId",
});

chatSchema.virtual("platformMessages", {
  ref: "PlatformMessage",
  localField: "_id",
  foreignField: "chatId",
});

const credentialSchema = new Schema(
  {
    _id: { type: String, default: () => randomUUID() },
    listingId: { type: String, ref: "Listing", required: true },
    originalCredential: { type: [Schema.Types.Mixed], default: [] },
    updatedCredential: { type: [Schema.Types.Mixed], default: [] },
  },
  schemaOptions
);

const transactionSchema = new Schema(
  {
    _id: { type: String, default: () => randomUUID() },
    listingId: { type: String, ref: "Listing", required: true },
    ownerId: { type: String, ref: "User", required: true },
    userId: { type: String, ref: "User", required: true },
    amount: { type: Number, required: true },
    isPaid: { type: Boolean, default: false },
  },
  schemaOptions
);

transactionSchema.virtual("listing", {
  ref: "Listing",
  localField: "listingId",
  foreignField: "_id",
  justOne: true,
});

const withdrawalSchema = new Schema(
  {
    _id: { type: String, default: () => randomUUID() },
    userId: { type: String, ref: "User", required: true },
    amount: { type: Number, required: true },
    account: { type: [Schema.Types.Mixed], default: [] },
    isWithdrawn: { type: Boolean, default: false },
  },
  schemaOptions
);

withdrawalSchema.virtual("user", {
  ref: "User",
  localField: "userId",
  foreignField: "_id",
  justOne: true,
});

export const User = mongoose.models.User || mongoose.model("User", userSchema);
export const Listing =
  mongoose.models.Listing || mongoose.model("Listing", listingSchema);
export const Chat = mongoose.models.Chat || mongoose.model("Chat", chatSchema);
export const Message =
  mongoose.models.Message || mongoose.model("Message", messageSchema);
export const PlatformMessage =
  mongoose.models.PlatformMessage ||
  mongoose.model("PlatformMessage", platformMessageSchema);
export const Credential =
  mongoose.models.Credential || mongoose.model("Credential", credentialSchema);
export const Transaction =
  mongoose.models.Transaction || mongoose.model("Transaction", transactionSchema);
export const Withdrawal =
  mongoose.models.Withdrawal || mongoose.model("Withdrawal", withdrawalSchema);
