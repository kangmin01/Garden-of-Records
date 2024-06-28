import { Link } from "react-router-dom";
import PlusIcon from "./icons/PlusIcon";
import { useEffect, useState } from "react";
import useDeviceSize from "../../hooks/useDeviceSize";

export default function FloatingButton() {
  const [displayHeight, setDisplayHeight] = useState(window.innerHeight);
  const [ready, setReady] = useState(false);
  // console.log(displayHeight);

  const { isDesktop } = useDeviceSize();

  useEffect(() => {
    const handleResize = () => {
      setDisplayHeight(window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    if (displayHeight > 0) {
      setReady(true);
    }
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [displayHeight]);

  return (
    <>
      {ready && (
        <div
          className={`w-[360px] fixed ${isDesktop ? "h-[800px] top-[90px]" : "h-10 bottom-0"}`}
          // style={{ top: `${displayHeight - 1}px` }}
        >
          {/* <div className="w-[360px] mx-auto relative h-10"> */}
          <Link
            to="/record/add"
            className="absolute w-[52px] h-[52px] bottom-[34px] right-[30px] flex justify-center items-center bg-main text-white rounded-full shadow-shadowFloatingButton"
          >
            <PlusIcon />
          </Link>
          {/* </div> */}
        </div>
      )}
    </>
  );
}
