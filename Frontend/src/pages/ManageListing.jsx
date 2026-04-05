import { Loader, Upload } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const ManageListing = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const userListings = useSelector((state) => state.listings.userListings);
  const [loadingListing, setLoadingListing] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    platform: "",
    username: "",
    followers_count: "",
    engagement_rate: "",
    monthly_views: "",
    niche: "",
    price: "",
    description: "",
    verified: false,
    monetized: false,
    country: "",
    age_range: "",
    images: [],
  });

  const platforms = [
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
  ];

  const niches = [
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
  ];

  const ageRanges = [
    "13-17 years",
    "18-24 years",
    "25-34 years",
    "35-44 years",
    "45-54 years",
    "55+ years",
    "Mixed ages",
  ];

  const handelInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = async (event) => {
    const files = Array.from(event.target.files);
    if (!files.length) return;
    if (files.length + formData.images.length > 5)
      return toast.error("You can add upto 5 images");

    setFormData((prev) => ({ ...prev, images: [...prev.images, ...files] }));
  };

  const removerImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => (i !== i) !== index),
    }));
  };

  useEffect(() => {
    if (!id) return;
    setIsEditing(true);
    setLoadingListing(true);
    const listingToEdit = userListings.find((listing) => listing.id === id);
    if (listingToEdit) {
      setFormData(listingToEdit);
      setLoadingListing(false);
    } else {
      toast.error("Listing not found");
      navigate("/my-listings");
    }
  }, [id]);

  const handelSubmit = async (e) => {
    e.preventDefault();
  };

  if (loadingListing)
    return (
      <div className="h-screen flex ">
        <Loader className="size-7 animate-spin text-indigo-600" />
      </div>
    );

  return (
    <div className="min-h-screen py-8 mt-17 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            {isEditing ? "Edit Listings" : "List Your Account"}
          </h1>
          <p className="mt-2">
            {isEditing
              ? "Update your Existing Account"
              : "Create a mock listing to display your account info"}
          </p>
        </div>

        <form onSubmit={handelSubmit} className="space-y-8">
          {/* basic info */}
          <Sections title="Basic Information">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Inputfield
                label="Listing Title*"
                value={formData.title}
                placeholder="eg.. influential accounts.."
                onChange={(v) => handelInputChange("title", v)}
                required={true}
              />
              <SelectField
                label="Platform*"
                options={platforms}
                value={formData.platform}
                onChange={(v) => handelInputChange("platform", v)}
                required={true}
              />
              <Inputfield
                label="Username/Handle*"
                value={formData.username}
                placeholder="@Username"
                onChange={(v) => handelInputChange("username", v)}
                required={true}
              />
              <SelectField
                label="Category*"
                options={niches}
                value={formData.niche}
                onChange={(v) => handelInputChange("niche", v)}
                required={true}
              />
            </div>
          </Sections>
          {/* Numbers */}
          <Sections title="Account Metrices">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <Inputfield
                label="Followers Count*"
                type="number"
                min={0}
                value={formData.followers_count}
                placeholder="10000"
                onChange={(v) => handelInputChange("followers_count", v)}
                required={true}
              />
              <Inputfield
                label="Engagement rate(%)"
                type="number"
                min={0}
                max={100}
                value={formData.engagement_rate}
                placeholder="4"
                onChange={(v) => handelInputChange("engagement_rate", v)}
              />
              <Inputfield
                label="Montly Views / Impressions"
                type="number"
                min={0}
                value={formData.monthly_views}
                placeholder="120000"
                onChange={(v) => handelInputChange("monthly_views", v)}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <Inputfield
                label="Primary Audience Country"
                value={formData.country}
                placeholder="India"
                onChange={(v) => handelInputChange("country", v)}
              />
              <SelectField
                label="Primary Audience Age Range"
                options={ageRanges}
                value={formData.age_range}
                onChange={(v) => handelInputChange("age_range", v)}
              />
            </div>
            <div className="space-y-3">
              <CheckBoxfield
                label="Account is verified"
                checked={formData.verified}
                onChange={(v) => handelInputChange("verified", v)}
              />
              <CheckBoxfield
                label="Account is monetized"
                checked={formData.monetized}
                onChange={(v) => handelInputChange("monetized", v)}
              />
            </div>
          </Sections>

          {/* Pricing */}
          <Sections title="Pricing & Descriptions">
            <Inputfield
              label="Asking Price*"
              type="number"
              min={0}
              value={formData.price}
              placeholder="100"
              onChange={(v) => handelInputChange("price", v)}
              required={true}
            />
            <TextAreaField label="Description*" value={formData.description} />
          </Sections>

          {/* Images */}

          <Sections title="Screenshots & Proofs">
            <div className="border-2 border-dashed border-white/20 bg-white/5 backdrop-blur-md rounded-2xl p-6 text-center text-gray-300 transition-all duration-200">
              <input
                type="file"
                id="images"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <Upload className="w-12 h-12 mx-auto mb-4" />
              <label
                htmlFor="images"
                className="px-4 py-2 rounded-xl text-white cursor-pointer bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 hover:border-white/2 transition-all duration-200 hover:shadow-md hover:shadow-purple-500/20 active:scale-[0.98]"
              >Choose files</label>
              <p></p>
            </div>
          </Sections>
        </form>
      </div>
    </div>
  );
};

const Sections = ({ title, children }) => (
  <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 space-y-6 text-white">
    <h2 className="text-lg font-semibold  ">{title}</h2>
    {children}
  </div>
);

const Inputfield = ({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
  min = null,
  max = null,
}) => (
  <div>
    <label className="block text-sm font-medium text-white mb-2">{label}</label>
    <input
      type={type}
      min={min}
      max={max}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required={required}
      className="w-full px-3 py-2 text-sm text-white bg-white/5 backdrop-blur-md border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500/30 transition-all duration-200 placeholder:text-gray-400"
    />
  </div>
);

const SelectField = ({ label, options, value, onChange, required = false }) => (
  <div>
    <label className="block text-sm font-medium text-white mb-2">{label}</label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-3 py-2 text-sm text-white bg-white/5 backdrop-blur-md border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500/30 transition-all duration-200 hover:border-white/20 placeholder:text-gray-400"
      required={required}
    >
      <option value="">Select...</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);

const CheckBoxfield = ({ label, checked, onChange, required = false }) => (
  <label className="flex items-center space-x-2 cursor-pointer">
    <input
      type="checkbox"
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
      className="size-4"
      required={required}
    />
    <span className="text-sm">{label}</span>
  </label>
);

const TextAreaField = ({ label, value, onChange, required = false }) => (
  <div>
    <label className="block text-sm font-medium mb-2 text-white">{label}</label>
    <textarea
      className="w-full px-3 py-2 text-sm text-white bg-white/5 backdrop-blur-md border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500/30 transition-all duration-200 hover:border-white/20 placeholder:text-gray-400"
      rows={5}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

export default ManageListing;
