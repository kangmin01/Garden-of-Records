import { Link } from "react-router-dom";
import PlusIcon from "../components/ui/icons/PlusIcon";

export default function Home() {
  return (
    <div className="bg-pink-50 max-w-[360px] mx-auto h-screen relative">
      <h1>Home Page😄</h1>
      <Link
        to="/event/add "
        className="absolute bottom-10 right-10 bg-white p-1 text-[40px] rounded-full shadow-lg"
      >
        <PlusIcon />
      </Link>
    </div>
  );
}
