import { Link } from "react-router-dom";
import Header from "../components/Header";
import RightChevron from "../components/ui/icons/RightChevron";
import RecordDetailList from "../components/RecordDetailList";
import TrashIcon from "../components/ui/icons/TrashIcon";

const handleDelete = () => {
  console.log("삭제");
};

export default function RecordDetail() {
  return (
    <section className="bg-white max-w-[360px] mx-auto h-dvh relative">
      <Header title="기록" />
      <div className="px-5">
        <div
          className={`border-solid border-main border flex flex-col h-[150px] rounded-lg mt-[24px]`}
        >
          <div className="h-[82px] flex flex-col items-center border-solid border-b-[1px] border-gray0 mt-[16px]">
            <div className="flex items-center justify-between w-[286px] h-[22px] mb-[20px]">
              <span className="text-gray4 text-[18px] font-semibold">
                최진영
              </span>
              <span className="text-gray2 text-[14px] font-400">축의금</span>
            </div>
            <div className="text-gray4 h-[24px] flex items-center justify-center">
              <span className="font-bold text-[24px] mr-[12px]">100,000</span>
              <span className="font-semibold text-[18px]">원</span>
            </div>
          </div>
          <div className="flex justify-center items-center h-[24px] mt-[16px]">
            <span className="cursor-pointer text-main text-[14px] font-medium mr-[8px] cursor-pointer">
              모바일 청첩장 확인
            </span>
            <RightChevron color="#37A041" size={13} />
          </div>
        </div>
      </div>
      <RecordDetailList />
      <div className="w-[320px] mt-[190px] mx-auto h-[48px] flex justify-between">
        <div
          onClick={handleDelete}
          className="w-[48px] h-full bg-gray1 rounded-lg flex justify-center items-center cursor-pointer"
        >
          <TrashIcon color="white" size={24} />
        </div>
        <div className="w-[256px] h-[48px] bg-main rounded-xl cursor-pointer flex justify-center items-center font-semibold text-[16px]">
          <Link to="/event/:id/edit" className="text-white">
            수정
          </Link>
        </div>
      </div>
    </section>
  );
}
