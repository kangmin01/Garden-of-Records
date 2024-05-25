// import { BsChevronRight } from "react-icons/bs";
import { FaChevronRight } from "react-icons/fa6";

type Props = {
  color?: string;
  size?: number;
};

export default function RightChevron({ color, size }: Props) {
  // return <BsChevronRight color={color} size={size} />;
  return <FaChevronRight color={color} size={size} />;
}
