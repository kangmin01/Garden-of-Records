import { Link } from "react-router-dom";
import HamburgerIcon from "./ui/icons/HamburgerIcon";

export default function Navbar() {
  return (
    <nav className="bg-blue-300 max-w-[360px] mx-auto">
      <Link to="/">기록의 정원</Link>
      <Link to="/signin">로그인</Link>
      {/* react-burger-menu */}
      {/* <HamburgerIcon /> */}
    </nav>
  );
}
