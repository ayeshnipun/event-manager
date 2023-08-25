import React from "react";
import { useRouter } from "next/router";

const BackButton = () => {
  const router = useRouter();

  return (
    <div className="flex mx-auto max-w-7xl items-center pt-4 justify-between">
      <button
        className="text-gray-800 hover:text-gray-600 font-bold py-2 px-4 sm:px-6 rounded flex items-center"
        onClick={() => {
          router.back();
        }}
      >
        <svg viewBox="0 0 24 24" height={22} className="fill-current mr-1">
          <path d="M19 11H7.83l4.88-4.88c.39-.39.39-1.03 0-1.42-.39-.39-1.03-.39-1.42 0l-6.59 6.59c-.39.39-.39 1.03 0 1.42l6.59 6.59c.39.39 1.03.39 1.42 0 .39-.39.39-1.03 0-1.42L7.83 13H19c.55 0 1-.45 1-1s-.45-1-1-1z"></path>
        </svg>
        Back
      </button>
    </div>
  );
};
export default BackButton;
