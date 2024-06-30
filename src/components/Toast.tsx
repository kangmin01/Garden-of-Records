import { useSelector } from "react-redux";
import useDeviceSize from "../hooks/useDeviceSize";
import { RootState } from "../store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearToast } from "../reducer/toast";

type Props = {
  position?: string;
};

export const Toast = ({ position }: Props) => {
  const dispatch = useDispatch();
  const { message, icon } = useSelector((state: RootState) => state.toast);
  const { isDesktop } = useDeviceSize();

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        dispatch(clearToast());
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [message, dispatch]);

  return (
    <>
      <div className="w-full max-w-[360px] min-w-80 mx-auto flex justify-center">
        <div
          className={`${position === "top" ? (isDesktop ? "top-[734px]" : "top-[600px]") : isDesktop ? "top-[806px]" : "bottom-[80px]"} gap-2 fixed w-[320px] h-[48px] flex justify-center items-center bg-gray0 font-medium text-[14px] text-gray3 rounded-xl fadeInOut`}
        >
          {icon}
          {message}
        </div>
      </div>
    </>
  );
};
