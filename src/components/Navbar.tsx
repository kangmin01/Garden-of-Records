import { Link } from "react-router-dom";
import HamburgerIcon from "./ui/icons/HamburgerIcon";

type Props = {
  title: string;
  icon: string;
};

export default function Navbar({ title, icon }: Props) {
  return (
    <nav className="bg-blue-300 max-w-[360px] mx-auto">
      <span>{title}</span>
      {/* react-burger-menu */}
      {icon}
    </nav>
  );
}
