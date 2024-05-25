import { BsChevronRight } from "react-icons/bs";

type Props = {
  color?: string;
  size?: number;
};

export default function RightChevronThin({ color, size }: Props) {
  return <BsChevronRight color={color} size={size} />;
}
