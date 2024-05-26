import React, { useEffect } from "react";
import { useMessage } from "../context/MessageContext";

type Props = {
  position?: string;
};

export const Snackbar = ({ position }: Props) => {
  const { state, clearMessage } = useMessage();
  console.log(state);

  useEffect(() => {
    if (state.message) {
      const timer = setTimeout(() => {
        clearMessage();
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [state, clearMessage]);

  if (!state.message) {
    return null;
  }

  return (
    <>
      <div className="w-full max-w-[360px] min-w-80 mx-auto flex justify-center">
        <div
          className={`${position === "top" ? "top-[600px]" : "bottom-[80px]"} gap-2 fixed w-[320px] h-[48px] flex justify-center items-center bg-gray0 font-medium text-[14px] text-gray3 rounded-xl fadeInOut`}
        >
          {state.icon}
          {state.message}
        </div>
      </div>
    </>
  );
};
