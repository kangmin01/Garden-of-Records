import { PiTrash } from "react-icons/pi";

type Props = {
  color?: string;
  size?: number;
};

export default function TrashIcon({ color, size }: Props) {
  return <PiTrash color={color} size={size} />;
}
