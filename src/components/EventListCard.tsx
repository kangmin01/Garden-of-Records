import { Link } from "react-router-dom";
import MinusCircleIcon from "./ui/icons/MinusCircleIcon";
import PlusCircleIcon from "./ui/icons/PlusCircleIcon";
import { recordInfoType } from "../types/record";
import { formatNumber, formatToKoreanDateTime } from "../util/formatNumber";

type Props = {
  record: recordInfoType;
};

export default function EventListCard({ record }: Props) {
  const { amount, event_date, name, is_invited, event_id, memo } = record;

  return (
    <Link
      to={`/record/${event_id}`}
      className="h-[76px] flex flex-col border-solid border-y-[1px] border-gray0 first:border-y-0"
    >
      <div className="w-full flex justify-between items-center mt-[12px] mb-[8px] text-[14px] font-normal text-gray2">
        <span>{formatToKoreanDateTime(event_date)}</span>
        <span>축의금</span>
      </div>
      <div className="w-full flex justify-between items-center">
        <div className="flex items-center">
          {is_invited === 1 ? (
            <MinusCircleIcon color="#EF9509" />
          ) : (
            <PlusCircleIcon color="#37A041" />
          )}
          <span className="text-p ml-[8px]">{name}</span>
        </div>
        <span className="text-[18px] font-semibold text-gray4">
          {is_invited === 1 ? "-" : "+"} {formatNumber(amount)}원
        </span>
      </div>
    </Link>
  );
}
