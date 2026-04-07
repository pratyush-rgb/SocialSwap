import { User } from "../models/index.js";

export const syncLoggedInUser = async (req, res) => {
  try {
    const { userId } = await req.auth();

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { email, name, image } = req.body || {};

    if (!email || !name) {
      return res
        .status(400)
        .json({ message: "email and name are required to sync user" });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      {
        _id: userId,
        email,
        name,
        image: image || "",
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    return res.json({ message: "User synced", user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.code || error.message });
  }
};
