import React, { useEffect, useState } from "react";
import { platformIcons } from "../assets/assets";
import toast from "react-hot-toast";
import {
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Copy,
  DollarSign,
  Loader2Icon,
} from "lucide-react";
import { useAuth, useUser } from "@clerk/react";
import api from "../configs/axios";

const MyOrders = () => {
  const { user, isLoaded } = useUser();
  const { getToken } = useAuth();
  const currency = import.meta.env.VITE_CURRENCY || "$";
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const token = await getToken();
      const { data } = await api.get("/api/listing/users-orders", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(data.orders);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user && isLoaded) fetchOrders();
  }, [isLoaded, user]);

  const mask = (val, type) => {
    if (!val && val !== 0) return "-";
    return type.toLowerCase() === "password" ? "•".repeat(8) : String(val);
  };

  const copy = async (txt) => {
    try {
      await navigator.clipboard.writeText(txt);
      toast.success("Copied To clipboard");
    } catch (error) {
      toast.error("Copy failed!");
    }
  };

  if (loading) {
    return (
      <div className="h-[80vh] flex items-center justify-center">
        <Loader2Icon className="size-7 animate-spin text-white" />
      </div>
    );
  }

  if (!orders.length) {
    return (
      <div className="px-4 md:px-16 lg:px-24 xl:px-32">
        <div className="max-w-2xl mx-auto mt-14 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8 text-center text-white">
          <h3 className="text-lg font-semibold">No Orders Yet</h3>
          <p className="text-sm text-gray-500 mt-2">Nothing Purchased yet..</p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 md:px-16 lg:px-24 xl:px-32 py-6 text-white mt-17">
      <h2 className="text-2xl font-semibold mb-6">My Orders</h2>
      <div className="space-y-4">
        {orders.map((order) => {
          const id = order.id;
          const listing = order.listing;
          const credential = order.credential;
          const isExpanded = expandedId === id;

          return (
            <div
              key={id}
              className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-5 flex flex-col max-w-4xl text-white"
            >
              <div className="flex items-start gap-4 flex-1">
                <div className="p-2 rounded-lg bg-white/5 max-sm:hidden">
                  {platformIcons[listing.platform]}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold">{listing.title}</h3>
                      <p className="text-sm text-gray-500 mt-1">
                        @{listing.username} •{" "}
                        <span className="capitalize">{listing.platform}</span>
                      </p>
                      <div className="flex gap-2 mt-2">
                        {listing.verified && (
                          <span className="flex items-center text-xs bg-green-500/10 text-green-300 px-2 py-1 rounded-md border border-purple-500/20">
                            <CheckCircle2 className="w-3 h-3 mr-1" /> Verified
                          </span>
                        )}
                        {listing.monetized && (
                          <span className="flex items-center text-xs bg-yellow-500/10 text-yellow-300 px-2 py-1 rounded-md border border-purple-500/20">
                            <DollarSign className="w-3 h-3 mr-1" /> Monetized
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold">
                        {currency}
                        {Number(order.amount).toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-300">USD</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2 items-end">
                <button
                  onClick={() => setExpandedId((p) => (p === id ? null : id))}
                  aria-expanded={isExpanded}
                  className="flex items-center gap-2 text-sm text-white bg-white/5 backdrop-blur-md border border-white/10 px-3 py-2 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all duration-200"
                >
                  {isExpanded ? (
                    <>
                      <ChevronUp className="size-4" /> Hide Credentials
                    </>
                  ) : (
                    <>
                      <ChevronDown className="size-4" /> View Credentials
                    </>
                  )}
                </button>
                <div className="text-xs text-gray-400 mt-2 text-right">
                  <div>
                    Purchased on:{" "}
                    {new Date(listing.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
              {isExpanded && (
                <div className="mt-4 pt-4">
                  <div className="space-y-2">
                    {credential?.updatedCredential?.map((cred) => (
                      <div
                        key={cred.name}
                        className="flex items-center justify-between gap-3 bg-white/5 rounded-md p-2"
                      >
                        <div>
                          <p className="text-sm font-medium text-gray-200">
                            {cred.name}
                          </p>
                          <p className="text-xs text-gray-200">{cred.type}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <code className="text-sm font-mono">
                            {mask(cred.value, cred.type)}
                          </code>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              copy(cred.value);
                            }}
                            title="Copy Credentials"
                            className="px-2 py-1 text-xs text-white bg-white/5 backdrop-blur-md border border-white/10 rounded-lg hover:bg-white/10 hover:border-white/20 transition-all duration-200"
                          >
                            <Copy className="size-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyOrders;
