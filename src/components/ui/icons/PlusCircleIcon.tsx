import { SlPlus } from "react-icons/sl";

type Props = {
  color?: string;
};

export default function PlusCircleIcon({ color }: Props) {
  return <SlPlus color={color} size={18} />;
}
