import { Link } from "react-router-dom";
import MinusCircleIcon from "./ui/icons/MinusCircleIcon";

export default function EventListCard() {
  return (
    <Link
      to={`/list/type/id`}
      className="h-[76px] flex flex-col border-solid border-y-[1px] border-gray0 first:border-y-0"
    >
      <div className="w-full flex justify-between items-center mt-[12px] mb-[8px] text-[14px] font-normal text-gray2">
        <span>2024.05.14 (토) 14:00</span>
        <span>축의금</span>
      </div>
      <div className="w-full flex justify-between items-center">
        <div className="flex items-center">
          <MinusCircleIcon color="orange" />
          <span className="text-p ml-[8px]">허세민</span>
        </div>
        <span className="text-[18px] font-semibold text-gray4">
          - 100,000원
        </span>
      </div>
    </Link>
  );
}
