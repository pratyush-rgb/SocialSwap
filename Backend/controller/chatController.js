//getting the chat

import { Chat, Listing, Message } from "../models/index.js";

const chatPopulateOptions = [
  { path: "listing" },
  { path: "ownerUser" },
  { path: "chatUser" },
  { path: "messages", options: { sort: { createdAt: 1 } } },
];

export const getChat = async (req, res) => {
  try {
    const { userId } = await req.auth();
    const { listingId, chatId } = req.body;

    const listing = await Listing.findById(listingId);

    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    let existingChat = null;

    if (chatId) {
      existingChat = await Chat.findOne({
        _id: chatId,
        $or: [{ chatUserId: userId }, { ownerUserId: userId }],
      }).populate(chatPopulateOptions);
    } else {
      existingChat = await Chat.findOne({
        listingId,
        chatUserId: userId,
        ownerUserId: listing.ownerId,
      }).populate(chatPopulateOptions);
    }

    if (existingChat) {
      res.json({ chat: existingChat });

      if (existingChat.isLastMessageRead === false) {
        const lastMessage = existingChat.messages?.at(-1);
        const isLastMessageSendByMe = lastMessage?.sender_id === userId;

        if (lastMessage && !isLastMessageSendByMe) {
          await Chat.updateOne(
            { _id: existingChat.id },
            { isLastMessageRead: true }
          );
        }
      }
      return null;
    }

    const newChat = await Chat.create({
      listingId,
      chatUserId: userId,
      ownerUserId: listing.ownerId,
    });

    const chatWithData = await Chat.findById(newChat.id).populate(
      chatPopulateOptions
    );

    return res.json({ chat: chatWithData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.code || error.message });
  }
};

// Controller for getting all chats for user
export const getAllUserChats = async (req, res) => {
  try {
    const { userId } = await req.auth();

    const chats = await Chat.find({
      $or: [{ chatUserId: userId }, { ownerUserId: userId }],
    })
      .populate([
        { path: "listing" },
        { path: "ownerUser" },
        { path: "chatUser" },
      ])
      .sort({ updatedAt: -1 });

    if (!chats || chats.length === 0) {
      return res.json({ chats: [] });
    }

    return res.json({ chats });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.code || error.message });
  }
};

// Controller for adding message to chat
export const sendChatMessage = async (req, res) => {
  try {
    const { userId } = await req.auth();
    const { chatId, message } = req.body;

    const chat = await Chat.findOne({
      _id: chatId,
      $or: [{ chatUserId: userId }, { ownerUserId: userId }],
    }).populate([
      { path: "listing" },
      { path: "ownerUser" },
      { path: "chatUser" },
    ]);

    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    } else if (chat.listing.status !== "active") {
      return res.status(400).json({
        message: `Listing is ${chat.listing.status}`,
      });
    }

    const newMessage = await Message.create({
      message,
      sender_id: userId,
      chatId,
      createdAt: new Date(),
    });

    await Chat.updateOne(
      { _id: chatId },
      {
        lastMessage: newMessage.message,
        isLastMessageRead: false,
        lastMessageSenderId: userId,
      }
    );

    res.json({
      message: "Message Sent",
      newMessage,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.code || error.message });
  }
};
