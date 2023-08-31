import React from "react";
import { Toaster } from "react-hot-toast";

const ToastProviders: React.FC<{ children: any }> = ({ children }) => {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      {children}
    </>
  );
};

export default ToastProviders;
