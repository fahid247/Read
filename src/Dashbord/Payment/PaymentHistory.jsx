import { useQuery } from "@tanstack/react-query";
import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import useAxiosSecure from "../../Hooks/UseAxiosSecure";
import useAuth from "../../Hooks/UseAuth";

const PaymentHistory = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const {
    data: payments = [],
    isLoading,
  } = useQuery({
    queryKey: ["my-payments", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/payments?customerEmail=${user.email}`
      );
      return res.data;
    },
  });

  // Loading Skeleton
  if (isLoading) {
    return (
      <div className="p-4">
        <Skeleton height={40} count={4} />
      </div>
    );
  }

  // Empty State
  if (!payments.length) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">No payment history found.</p>
      </div>
    );
  }

  return (
    <div className="p-4 inter">
      <h2 className="text-4xl my-8 font-bold text-center playfair">
        <span className="text-base-content">Payment</span>{" "}
        <span className="text-primary">History</span>
      </h2>

      {/* ================= Mobile View (Cards) ================= */}
      <div className="grid gap-4 md:hidden">
        {payments.map((payment) => (
          <div
            key={payment._id}
            className="card bg-base-100 shadow-md border hover:shadow-lg hover:-translate-y-1 transition-all duration-200 cursor-pointer"
          >
            <div className="card-body p-4 text-sm space-y-1">
              <p>
                <span className="font-semibold">Order Name:</span>{" "}
                {payment.orderName}
              </p>
              <p>
                <span className="font-semibold">Amount:</span> ৳
                {payment.amount}
              </p>
              <p>
                <span className="font-semibold">Transaction ID:</span>{" "}
                {payment.transactionId}
              </p>
              <p>
                <span className="font-semibold">Status:</span>{" "}
                <span className="badge badge-success badge-sm">
                  {payment.paymentStatus}
                </span>
              </p>
              <p>
                <span className="font-semibold">Date:</span>{" "}
                {new Date(payment.paidAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* ================= Desktop View (Table) ================= */}
      <div className="hidden md:block overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Order Name</th>
              <th>Amount</th>
              <th>Transaction ID</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {payments.map((payment, index) => (
              <tr
                key={payment._id}
                className="hover:bg-primary/10 transition-colors duration-200 cursor-pointer"
              >
                <td>{index + 1}</td>
                <td className="font-mono text-xs">
                  {payment.orderName}
                </td>
                <td>৳{payment.amount}</td>
                <td className="text-xs">
                  {payment.transactionId}
                </td>
                <td>
                  <span className="badge badge-success badge-sm">
                    {payment.paymentStatus}
                  </span>
                </td>
                <td>
                  {new Date(payment.paidAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
