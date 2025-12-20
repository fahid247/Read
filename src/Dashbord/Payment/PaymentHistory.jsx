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
      const res = await axiosSecure.get(`/payments?customerEmail=${user.email}`);
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="p-4">
        <Skeleton height={40} count={4} />
      </div>
    );
  }

  if (!payments.length) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">No payment history found.</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Payment History</h2>

      {/* ================= Mobile View (Cards) ================= */}
      <div className="grid gap-4 md:hidden">
        {payments.map((payment) => (
          <div
            key={payment._id}
            className="card bg-base-100 shadow-md border"
          >
            <div className="card-body p-4 text-sm">
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
              <tr key={payment._id}>
                <td>{index + 1}</td>
                <td className="font-mono text-xs">
                  {payment.orderName}
                </td>
                <td>৳{payment.amount}</td>
                <td className="capitalize">
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
