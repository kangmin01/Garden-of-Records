import { Link } from "react-router-dom";
import PlusIcon from "./icons/PlusIcon";
import { useEffect, useState } from "react";

export default function FloatingButton() {
  const displayHeight = window.innerHeight;
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (displayHeight > 0) {
      setReady(true);
    }
  }, [displayHeight]);

  return (
    <>
      {ready && (
        <div
          className={`w-full fixed h-10`}
          style={{ top: `${displayHeight - 1}px` }}
        >
          <div className="w-[360px] mx-auto relative">
            <Link
              to="/record/add"
              className="absolute w-[52px] h-[52px] bottom-[34px] right-[30px] flex justify-center items-center bg-main text-white rounded-full shadow-shadowFloatingButton"
            >
              <PlusIcon />
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
