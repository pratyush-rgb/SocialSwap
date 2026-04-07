import ImageKit from "@imagekit/nodejs";

let imagekitClient = null;

const requiredImageKitEnvVars = [
  "IMAGEKIT_PUBLIC_KEY",
  "IMAGEKIT_PRIVATE_KEY",
  "IMAGEKIT_URL_ENDPOINT",
];

const getMissingImageKitVars = () =>
  requiredImageKitEnvVars.filter((key) => !process.env[key]);

export const isImageKitConfigured = () => getMissingImageKitVars().length === 0;

export const getImageKitClient = () => {
  if (imagekitClient) return imagekitClient;

  const missingVars = getMissingImageKitVars();

  if (missingVars.length > 0) {
    const error = new Error(
      `Missing ImageKit configuration: ${missingVars.join(", ")}. Add these variables to your Backend .env file.`
    );
    error.code = "IMAGEKIT_CONFIG_MISSING";
    throw error;
  }

  imagekitClient = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
  });

  return imagekitClient;
};

export default getImageKitClient;
