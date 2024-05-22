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
      className="flex flex-col w-[152px] h-[120px] px-[16px] py-[18px] bg-white rounded-2xl shadow-shadowRecordCard"
    >
      <div className="flex items-center justify-between mb-[16px] text-[14px] font-medium text-gray2">
        <span>{title[type]}</span>
        <RightChevron />
      </div>
      <div className="flex justify-end items-center">
        <span className="text-[16px] font-medium mr-[6px]">{totalCount}</span>
        <span className="text-[14px] font-normal text-gray2">명</span>
      </div>
      <div className="flex justify-end items-center">
        <span className="text-[16px] font-medium mr-[6px]">
          {formatNumber(totalAmount)}
        </span>
        <span className="text-[14px] font-normal text-gray2">원</span>
      </div>
    </Link>
  );
}
