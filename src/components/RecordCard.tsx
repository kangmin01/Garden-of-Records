import { Link } from "react-router-dom";
import { formatNumber } from "../util/formatNumber";
import RightChevron from "./ui/icons/RightChevron";

type Props = {
  type: "send" | "receive";
  totalCount: number;
  totalAmount: number;
};

export default function RecordCard({ type, totalCount, totalAmount }: Props) {
  const title = { send: "보낸 기록", receive: "받은 기록" };

  return (
    <Link
      to={`/list/${type}`}
      className="flex flex-col w-[158px] h-[120px] p-3.5 text-gray2 bg-gray0 rounded-2xl"
    >
      <div className="flex items-center justify-between mb-[23px]">
        <span className="text-h2">{title[type]}</span>
        <RightChevron />
      </div>
      <span className="text-right text-p">{totalCount} 명</span>
      <span className="text-right text-p">{formatNumber(totalAmount)} 원</span>
    </Link>
  );
}
