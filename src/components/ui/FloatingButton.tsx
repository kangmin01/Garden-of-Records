import { Link } from "react-router-dom";
import PlusIcon from "./icons/PlusIcon";

export default function FloatingButton() {
  return (
    <div className="max-w-[320px] mx-auto relative">
      <div className="fixed bottom-0 w-[320px] h-20">
        <Link
          to="/record/add"
          className="absolute w-[52px] h-[52px] flex justify-center items-center bg-main text-white bottom-8 right-5 rounded-full shadow-shadowFloatingButton"
        >
          <PlusIcon />
        </Link>
      </div>
    </div>
  );
}
