import { useMessage } from "../context/MessageContext";
import useDeviceSize from "../hooks/useDeviceSize";

type Props = {
  position?: string;
};

export const Snackbar = ({ position }: Props) => {
  const { state } = useMessage();
  const { isDesktop } = useDeviceSize();

  if (!state.message) {
    return null;
  }

  return (
    <>
      <div className="w-full max-w-[360px] min-w-80 mx-auto flex justify-center">
        <div
          className={`${position === "top" ? (isDesktop ? "top-[734px]" : "top-[600px]") : isDesktop ? "top-[806px]" : "bottom-[80px]"} gap-2 fixed w-[320px] h-[48px] flex justify-center items-center bg-gray0 font-medium text-[14px] text-gray3 rounded-xl fadeInOut`}
        >
          {state.icon}
          {state.message}
        </div>
      </div>
    </>
  );
};
