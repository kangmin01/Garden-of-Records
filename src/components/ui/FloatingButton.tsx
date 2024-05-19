import { Link } from "react-router-dom";
import PlusIcon from "./icons/PlusIcon";

export default function FloatingButton() {
  return (
    <div className="fixed bottom-0 w-[360px] h-20">
      <Link
        to="/event/add "
        className="absolute bottom-8 right-5 bg-white p-1 text-[40px] rounded-full shadow-lg"
      >
        <PlusIcon />
      </Link>
    </div>
  );
}
