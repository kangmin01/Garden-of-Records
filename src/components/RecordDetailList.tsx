import { recordInfoType } from "../types/record";
import {
  formatNumber,
  formatToKoreanDate,
  formatToKoreanTime,
} from "../util/formatNumber";

type Props = {
  record: recordInfoType;
};

export default function RecordDetailList({ record }: Props) {
  const { is_attended, amount, relation, event_date, memo } = record;

  return (
    <>
      <div className="px-[20px] my-[24px]">
        {relation && relation.trim() !== "" && (
          <div className="border-solid border-b-[1px] border-gray0 flex items-center px-[16px] justify-between w-[320px] h-[50px] font-medium text-[14px]">
            <span className="text-gray2">관계</span>
            <span className="text-gray4">{relation}</span>
          </div>
        )}
        <div className="border-solid border-b-[1px] border-gray0 flex items-center px-[16px] justify-between w-[320px] h-[50px] font-medium text-[14px]">
          <span className="text-gray2">날짜</span>
          <span className="text-gray4">{formatToKoreanDate(event_date)}</span>
        </div>
        {formatToKoreanTime(event_date) !== "00:00" && (
          <div className="border-solid border-b-[1px] border-gray0 flex items-center px-[16px] justify-between w-[320px] h-[50px] font-medium text-[14px]">
            <span className="text-gray2">시간</span>
            <span className="text-gray4">{formatToKoreanTime(event_date)}</span>
          </div>
        )}
        <div className="border-solid border-b-[1px] border-gray0 flex items-center px-[16px] justify-between w-[320px] h-[50px] font-medium text-[14px]">
          <span className="text-gray2">참석여부</span>
          <span className="text-gray4">
            {is_attended === 1 ? "불참" : "참석"}
          </span>
        </div>
        <div className="border-solid border-b-[1px] border-gray0 flex items-center px-[16px] justify-between w-[320px] h-[50px] font-medium text-[14px]">
          <span className="text-gray2">축의금</span>
          <span className="text-gray4">{formatNumber(amount)}</span>
        </div>
        {memo && memo.trim() !== "" && (
          <div className="border-solid border-b-[1px] border-gray0 flex items-center px-[16px] justify-between w-[320px] h-[50px] font-medium text-[14px]">
            <span className="text-gray2">메모</span>
            <div className="w-[185px] text-gray4 text-right">{memo}</div>
          </div>
        )}
      </div>
    </>
  );
}
