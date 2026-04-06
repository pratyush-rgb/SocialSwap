import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "@clerk/react";
import StatCards from "../components/StatCards";
import {
  getAllPublicListing,
  getAllUserListing,
} from "../app/features/lisitingSlice";
import {
  ArrowDownCircleIcon,
  BanIcon,
  CheckCircle,
  Clock,
  CoinsIcon,
  Copyright,
  DollarSign,
  Edit,
  Eye,
  EyeOffIcon,
  LockIcon,
  Plus,
  StarIcon,
  TrashIcon,
  TrendingUp,
  Users,
  WalletIcon,
  XCircle,
} from "lucide-react";
import { platformIcons } from "../assets/assets";
import CredentialSubmittion from "../components/CredentialSubmittion";
import WithdrawModel from "../components/WithdrawModel";
import toast from "react-hot-toast";
import api from "../configs/axios";

const Mylisting = () => {
  const { getToken } = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUserListing({ getToken }));
  }, []);
  const userListings =
    useSelector((state) => state.listings.userListings) || [];
  const balance = useSelector((state) => state.listings.balance);
  const currency = import.meta.env.VITE_CURRENCY || "$";
  const navigate = useNavigate();

  const [showCredentialSubmittion, setshowCredentialSubmittion] =
    useState(null);
  const [showWithdrawl, setshowWithdrawl] = useState(null);

  const totalValue = userListings.reduce(
    (sum, listing) => sum + (listing.price || 0),
    0,
  );

  const activeListings = userListings.filter(
    (listing) => listing.status === "active",
  ).length;

  const soldListings = userListings.filter(
    (listing) => listing.status === "sold",
  ).length;

  const numberFormat = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return num?.toString() || "0";
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "active":
        return <CheckCircle className="size-3.5 " />;
      case "ban":
        return <BanIcon className="size-3.5 " />;
      case "sold":
        return <DollarSign className="size-3.5 " />;
      case "inactive":
        return <XCircle className="size-3.5 " />;

      default:
        return <Clock className="size-3.5 " />;
    }
  };
  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "text-green-400";
      case "ban":
        return "text-red-400";
      case "sold":
        return "text-indigo-400";
      case "inactive":
        return "text-grey-400";
      default:
        return "text-grey-400";
    }
  };

  const toggleStatus = async (listingID) => {
    try {
      toast.loading("Updating listing status...");
      const token = await getToken();
      const { data } = await api.put(
        `/api/listing/${listingID}/status`,
        {},
        { headers: { Authorization: `Bearer ${token}` } },
      );
      dispatch(getAllUserListing({ getToken }));
      dispatch(getAllPublicListing({ getToken }));
      toast.dismissAll();
      toast.success(data.message);
    } catch (error) {
      toast.dismissAll();
      toast.error(error?.response?.data?.message || error.message);
    }
  };
  const deleteListing = async (listingID) => {
    try {
      const confirm = window.confirm("Are you sure to  delete the listing?");
      if (!confirm) return;

      toast.loading("Deleting Listing..");
      const token = await getToken();
      const { data } = await api.delete(
        `/api/listing/${listingID}`,

        { headers: { Authorization: `Bearer ${token}` } },
      );
      dispatch(getAllUserListing({ getToken }));
      dispatch(getAllPublicListing({ getToken }));
      toast.dismissAll();
      toast.success(data.message);
    } catch (error) {
      toast.dismissAll();
      toast.error(error?.response?.data?.message || error.message);
    }
  };
  const markAsFeatured = async (listingID) => {
    try {
      toast.loading("Featuring Listings....");
      const token = await getToken();
      const { data } = await api.put(
        `/api/listing/featured/${listingID}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } },
      );
      dispatch(getAllUserListing({ getToken }));
      dispatch(getAllPublicListing({ getToken }));
      toast.dismissAll();
      toast.success(data.message);
    } catch (error) {
      toast.dismissAll();
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 pt-8 mt-17 text-white">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold bg-linear-to-r from-white to-purple-400 bg-clip-text text-transparent mb-1">
            My Listings
          </h1>
          <p className="text-gray-400 text-sm">
            Manage your social media account listings
          </p>
        </div>
        <button
          onClick={() => navigate("/create-listing")}
          className="mt-4 md:mt-0 bg-purple-600/80 hover:bg-purple-500 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-purple-500/25"
        >
          + New Listing
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCards
          title="Total Listings"
          value={userListings.length}
          icon={<Eye className="size-5" />}
          color="purple"
        />
        <StatCards
          title="Active Listings"
          value={activeListings}
          icon={<CheckCircle className="size-5" />}
          color="green"
        />
        <StatCards
          title="Sold"
          value={soldListings}
          icon={<TrendingUp className="size-5" />}
          color="amber"
        />
        <StatCards
          title="Total Value"
          value={`${currency}${totalValue.toLocaleString()}`}
          icon={<DollarSign className="size-5" />}
          color="blue"
        />
      </div>

      {/* Balance */}
      <div className="flex flex-col sm:flex-row gap-4 p-6 mb-8 bg-white/5 border border-white/10 rounded-2xl">
        {[
          {
            label: "Earned",
            value: balance?.earned ?? 0,
            icon: WalletIcon,
            color: "text-purple-400",
          },
          {
            label: "Withdrawn",
            value: balance?.withdrawn ?? 0,
            icon: ArrowDownCircleIcon,
            color: "text-pink-400",
          },
          {
            label: "Available",
            value: balance?.available ?? 0,
            icon: CoinsIcon,
            color: "text-green-400",
          },
        ].map((item, index) => (
          <div
            onClick={() => item.label === "Available" && setshowWithdrawl(true)}
            key={index}
            className="flex flex-1 items-center justify-between p-4 rounded-xl border border-white/10 bg-white/5"
          >
            <div className="flex items-center gap-3">
              <item.icon className={`w-5 h-5 ${item.color}`} />
              <span className="text-gray-400 text-sm">{item.label}</span>
            </div>
            <span className="text-lg font-semibold text-white">
              {currency}
              {item.value.toFixed(2)}
            </span>
          </div>
        ))}
      </div>

      {/* Listings Grid */}
      {userListings.length === 0 ? (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-16 text-center">
          <div className="w-16 h-16 bg-purple-500/10 border border-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Plus className="w-8 h-8 text-purple-400" />
          </div>
          <h3 className="text-white font-semibold text-lg mb-1">
            No listings yet
          </h3>
          <p className="text-gray-400 text-sm mb-6">
            Create your first listing to get started
          </p>
          <button
            onClick={() => navigate("/create-listing")}
            className="bg-purple-600/80 hover:bg-purple-500 text-white text-sm font-medium px-6 py-2.5 rounded-xl transition-all duration-200"
          >
            + New Listing
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-10">
          {userListings.map((listing) => (
            <div
              key={listing.id}
              className="relative group bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-purple-500/40 hover:bg-white/[0.07] hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300"
            >
              <div className="flex items-start gap-3 mb-4">
                {platformIcons[listing.platform]}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <h3 className="text-white font-semibold text-sm md:text-base leading-snug group-hover:text-purple-300 transition-colors ">
                      {listing.title}
                    </h3>
                    <div className="flex items-center gap-2">
                      <div className="relative group">
                        <LockIcon size={14} />
                        <div className="invisible group-hover:visible absolute right-0 top-0 pt-4.5 z-10">
                          <div className=" text-gray-400 text-xs rounded bg-white/5 border border-white/10 p-2 px-3  ">
                            {!listing.isCredentialSubmitted && (
                              <>
                                <button
                                  onClick={() =>
                                    setshowCredentialSubmittion(listing)
                                  }
                                  className="flex items-center gap-2 text-nowrap"
                                >
                                  Add credentials
                                </button>
                                <hr className="border-white/10 my-2" />
                              </>
                            )}
                            <button className="text-nowrap">
                              Status: {""}
                              <span
                                className={
                                  listing.isCredentialSubmitted
                                    ? listing.isCredentialVerified
                                      ? listing.isCredentialChanged
                                        ? "text-green-600"
                                        : "text-indigo-600"
                                      : "text-slate-600"
                                    : "text-red-600"
                                }
                              >
                                {listing.isCredentialSubmitted
                                  ? listing.isCredentialVerified
                                    ? listing.isCredentialChanged
                                      ? "Changed"
                                      : "Verified"
                                    : "submitted"
                                  : "Not submitted"}
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                      {listing.status === "active" && (
                        <StarIcon
                          onClick={() => markAsFeatured(listing.id)}
                          size={18}
                          className={`text-yellow-400 cursor-pointer ${listing.featured && "fill-yellow-400"}`}
                        />
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">
                    <span>@{listing.username}</span>
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <Users className="size-4 text-gray-400" />
                    <span>
                      {numberFormat(listing.followers_count)} followers
                    </span>
                  </div>
                  <span
                    className={`flex items-center justify-end gap-1 ${getStatusColor(listing.status)}`}
                  >
                    {getStatusIcon(listing.status)}{" "}
                    <span>{listing.status}</span>
                  </span>
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="size-4 text-green-600" />
                    <span>{listing.engagement_rate}% engagement</span>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-white/10">
                  <span className="text-2xl font-semibold text-gray-200">
                    {currency} {listing.price.toLocaleString()}
                  </span>
                  <div className="flex items-center space-x-2">
                    {listing.status !== "sold" && (
                      <button
                        onClick={() => deleteListing(listing.id)}
                        className="p-2 border border-white/10 rounded-lg hover:bg-gray-500 hover:text-red-500"
                      >
                        <TrashIcon className="size-4" />
                      </button>
                    )}

                    <button
                      onClick={() => navigate(`/edit-listing/${listing.id}`)}
                      className="p-2 border border-white/10 rounded-lg hover:bg-gray-500 hover:text-yellow-500"
                    >
                      <Edit className="size-4" />
                    </button>
                    <button
                      onClick={() => toggleStatus(listing.id)}
                      className="p-2 border border-white/10 rounded-lg hover:bg-gray-500 hover:text-green-500"
                    >
                      {listing.status === "active" && (
                        <EyeOffIcon className="size-4" />
                      )}
                      {listing.status !== "active" && (
                        <Eye className="size-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {showCredentialSubmittion && (
        <CredentialSubmittion
          listing={showCredentialSubmittion}
          onclose={() => setshowCredentialSubmittion(null)}
        />
      )}
      {showWithdrawl && (
        <WithdrawModel onclose={() => setshowWithdrawl(null)} />
      )}
      <div className="bg-transparent border-t border-white/10 mt-28 py-5 w-full">
        <p className="text-sm text-gray-400 text-center flex items-center justify-center gap-1">
          <Copyright className="w-3.5 h-3.5" />
          2026 <span className="text-white font-medium">Social Swap</span>. All
          rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Mylisting;
