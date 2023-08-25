import React from "react";
import type { Client } from "../interfaces";
import Link from "next/link";

const SmallCustomerCard = ({ customer }: { customer: Client }) => {
  return (
    <Link
      href={`/customers/${customer.id}`}
      className="flex items-center space-x-4 p-4 rounded-lg mb-2 hover:bg-gray-100 hover:cursor-pointer"
    >
      <div className="flex-shrink-0">
        <svg
          className="w-6 h-6 text-gray-700"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M5 5a5 5 0 0 1 10 0v2A5 5 0 0 1 5 7V5zM0 16.68A19.9 19.9 0 0 1 10 14c3.64 0 7.06.97 10 2.68V20H0v-3.32z" />
        </svg>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate">
          {customer.firstName} {customer.lastName} {customer.secondLastName}
        </p>
        <div className="flex items-center space-x-4">
          <p className="text-sm text-gray-500 truncate">
            {customer.mobileNumber}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default SmallCustomerCard;
