import React from "react";

const Toast: React.FC<{
  type: "success" | "error";
  message: string;
}> = ({ type, message }) => {
  return (
    <div className="fixed bottom-0 right-0 z-50">
      <div className="max-w-xl mx-auto">
        <div
          className={`
          p-4
          rounded-lg
          shadow-lg
          ${type === "success" ? "bg-green-600" : "bg-red-600"}
          text-white
          flex
          justify-between
          items-center
          transition
          transform
          duration-500
          ease-out
          pointer-events-none
          origin-bottom-right
            `}
        >
          {message}
        </div>
      </div>
    </div>
  );
};

export default Toast;
