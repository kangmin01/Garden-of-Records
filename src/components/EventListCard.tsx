import { Link } from "react-router-dom";

export default function EventListCard() {
  return (
    <Link
      to={`/list/type/id`}
      className="h-[66px] flex flex-col justify-center bg-purple-50 border-solid border-y-[1px] border-gray2 first:border-y-0"
    >
      <div className="w-full flex justify-between items-center mb-2">
        <span className="text-sm text-gray1">2024.05.14 (토) 14:00</span>
        <span className="text-p">결혼식 축의금</span>
      </div>
      <div className="w-full flex justify-between items-center">
        <span className="text-p">허세민</span>
        <span className="text-h2">100,000원</span>
      </div>
    </Link>
  );
}
