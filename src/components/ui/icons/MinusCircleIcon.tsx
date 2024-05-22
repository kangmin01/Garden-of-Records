import { SlMinus } from "react-icons/sl";

type Props = {
  color?: string;
};

export default function MinusCircleIcon({ color }: Props) {
  return <SlMinus color={color} size={18} />;
}
