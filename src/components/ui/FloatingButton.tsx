import { Link } from "react-router-dom";
import PlusIcon from "./icons/PlusIcon";

export default function FloatingButton() {
  return (
    <Link
      to="/event/add "
      className="absolute bottom-6 right-5 bg-white p-1 text-[40px] rounded-full shadow-lg"
    >
      <PlusIcon />
    </Link>
  );
}
