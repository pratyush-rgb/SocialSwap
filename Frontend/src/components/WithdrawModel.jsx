import { useAuth } from "@clerk/react";
import { X } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { getAllUserListing } from "../app/features/lisitingSlice";

const WithdrawModel = ({ onclose }) => {
  const { getToken } = useAuth();
  const dispatch = useDispatch();
  const [amount, setAmount] = useState();
  const [account, setAccount] = useState([
    { type: "text", name: "Account Holder Name:", value: "" },
    { type: "text", name: "Bank Name:", value: "" },
    { type: "number", name: "Account number:", value: "" },
    { type: "text", name: "Account type:", value: "" },
    { type: "text", name: "SWIFT:", value: "" },
    { type: "text", name: "Branch:", value: "" },
  ]);

  const handelSubmition = async (e) => {
    e.preventDefault();
    try {
      if (account.length === 0) {
        return toast.error("Add atleat one field");
      }
      for (const field of account) {
        if (!field.value) {
          return toast.error(`please fill in the ${field.name} field`);
        }
      }
      const confirm = window.confirm("Are you sure you want to submit?");
      if (!confirm) return;
      const token = await getToken();

      const { data } = await api.post(
        "/api/listing/withdraw",
        { account, amount: parseInt(amount) },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      toast.success(data.message);
      dispatch(getAllUserListing({ getToken }));
      onclose();
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message);
      console.log(error);
    }
  };
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center sm:p-6">
      <div className="bg-linear-to-br from-[#1a0b2e] via-[#2a0f4a] to-[#3b0a5a] text-white sm:rounded-2xl shadow-2xl border border-white/10  w-full max-w-lg h-screen sm:h-auto flex flex-col">
        {/* Header */}
        <div className="bg-linear-to-r from-[#2a0f4a] via-[#3b0a5a] to-[#4c1d95]  text-white p-4 sm:rounded-t-2xl flex items-center justify-between border-b border-white/10">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg truncate">Withdraw Funds</h3>
          </div>
          <button
            onClick={onclose}
            className="ml-4 p-2 rounded-xl  hover:bg-white/10 active:bg-white/20 transition-all duration-200 border border-transparent hover:border-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div>
          <form
            onSubmit={handelSubmition}
            className="flex flex-col items-start gap-4 p-4 overflow-y-scroll"
          >
            <div className="grid grid-cols-[2fr_3fr_1fr] items-center gap-2 ">
              Amount{" "}
              <input
                onChange={(e) => setAmount(e.target.value)}
                value={amount}
                type="number"
                className="w-full px-3 py-2 text-sm text-white bg-white/5 backdrop-blur-md border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/40 placeholder:text-gray-400"
              />
            </div>
            {account.map((field, index) => (
              <div
                key={index}
                className="grid grid-cols-[2fr_3fr_1fr] items-center gap-2 "
              >
                <label className="text-sm font-medium text-gray-500">
                  {field.name}
                </label>
                <input
                  className="w-full px-3 py-2 text-sm text-white bg-white/5 backdrop-blur-md border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500/30 transition-all duration-200 placeholder:text-gray-400"
                  type={field.type}
                  value={field.value}
                  onChange={(e) =>
                    setAccount((prev) =>
                      prev.map((c, i) =>
                        i === index ? { ...c, value: e.target.value } : c,
                      ),
                    )
                  }
                />
              </div>
            ))}

            <button
              type="submit"
              className="mt-4 px-6 py-2 rounded-xl text-white font-medium bg-linear-to-r from-purple-600 to-indigo-500 hover:from-purple-500 hover:to-indigo-400 transition-all duration-200 shadow-lg shadow-purple-900/30"
            >
              Apply for withdrawal
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default WithdrawModel;
