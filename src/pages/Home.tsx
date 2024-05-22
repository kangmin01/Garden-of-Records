import HamburgerIcon from "../components/ui/icons/HamburgerIcon";
import EventListCard from "../components/EventListCard";
import FloatingButton from "../components/ui/FloatingButton";
import RecordCard from "../components/RecordCard";
import { Link } from "react-router-dom";
import { useState } from "react";
import CloseIcon from "../components/ui/icons/CloseIcon";
import SearchBar from "../components/SearchBar";
import RightChevron from "../components/ui/icons/RightChevron";
import profile from "../assets/image/profile.jpg";
import PlusCircleIcon from "../components/ui/icons/PlusCircleIcon";
import MinusCircleIcon from "../components/ui/icons/MinusCircleIcon";
import PencilIcon from "../components/ui/icons/PencilIcon";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="bg-pink-50 max-w-[360px] mx-auto h-dvh relative">
      <nav className="bg-pink-100 max-w-[360px] mx-auto flex justify-between px-5 py-3 items-center text-h1">
        <div>
          <Link to="/signin">기록의 정원</Link>
        </div>

        {/* 뒷배경 */}
        <div
          className={`absolute top-0 left-0 w-[320px] mx-auto h-dvh bg-black bg-opacity-70 z-10 ${isMenuOpen ? "block" : "hidden"}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        ></div>

        {/* 아이콘 */}
        <div
          className="cursor-pointer z-30"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <CloseIcon /> : <HamburgerIcon />}
        </div>

        {/* 메뉴바 */}
        <div
          className={`absolute top-0 right-0 h-full w-[304px] bg-white flex flex-col transition-transform transform ${isMenuOpen ? "translate-x-0" : "translate-x-full"} z-20`}
        >
          {/* 헤더 */}
          <div className="flex items-center pl-[20px] w-[304px] h-[52px] border-solid border-b-[1px] border-gray0">
            <h2 className="text-gray4 text-[18px] font-medium">메뉴</h2>
          </div>

          <div className="px-[20px] pt-[20px]">
            {/* profile */}
            <Link
              to="/user/profile"
              className="flex items-center py-[16px] pl-[20px] w-[264px] h-[80px] rounded-2xl border-solid border-[1px] border-main"
            >
              <img
                src={profile}
                alt="캐릭터 이미지"
                className="w-[48px] h-[48px] object-cover rounded-full mr-[16px]"
              />
              <div className="flex flex-col justify-center h-[38px] max-h-[38px] mr-[33px]">
                <div className="flex items-center">
                  <span className="text-gray4 text-[16px] font-medium">
                    최진영
                  </span>
                  <span className="text-[14px] font-normal">님</span>
                </div>
                <span className="text-gray1 text-[12px] font-normal">
                  minida@gmail.com
                </span>
              </div>

              <div>
                <RightChevron />
              </div>
            </Link>

            {/* Search Bar */}
            <SearchBar />

            {/* navigate */}
            <div className="text-[14px] font-normal">
              <div className="flex items-center justify-between w-full h-[48px] border-solid border-b-[1px] border-gray0">
                <div className="flex items-center">
                  <MinusCircleIcon />
                  <Link to="/list/record" className="pl-[8px]">
                    보낸 기록
                  </Link>
                </div>
                <RightChevron />
              </div>
              <div className="flex items-center justify-between w-full h-[48px] border-solid border-b-[1px] border-gray0">
                <div className="flex items-center">
                  <PlusCircleIcon />
                  <Link to="/list/receive" className="pl-[8px]">
                    받은 기록
                  </Link>
                </div>
                <RightChevron />
              </div>
              <div className="flex items-center justify-between w-full h-[48px] border-solid border-b-[1px] border-gray0">
                <div className="flex items-center">
                  <PencilIcon />
                  <Link to="/event/add" className="pl-[8px]">
                    기록
                  </Link>
                </div>
                <RightChevron />
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex w-[264px] justify-between items-center absolute bottom-5 left-5 font-normal text-gray2 text-[14px]">
            <div className="flex items-center space-x-2">고객센터</div>
            <div className="">© T기타카</div>
          </div>
        </div>
      </nav>
      <div className="bg-green-100 absolute h-[329px] w-[360px] rounded-b-[20px]"></div>
      <div className="w-[360px] absolute">
        <div className="bg-yellow-100 flex flex-col items-center mt-3 mb-6">
          <div className="w-[196px] h-[196px] bg-blue-200 rounded-full"></div>
          <span className="text-h1 mt-[22px]">최진영님</span>
        </div>
        <div className="flex justify-between px-4">
          <RecordCard type="send" totalCount={10} totalAmount={1000000000} />
          <RecordCard type="receive" totalCount={10} totalAmount={1000000000} />
        </div>
      </div>
      <div className="pt-[429px] w-full px-5">
        <div className="mb-2.5">
          <span>📆</span>
          <span className="text-h1"> 다가오는 일정</span>
        </div>
        <section className="divide-y-[1px]">
          {/* <section className="divide-y-[1px] h-[280px] overflow-y-auto"> */}
          <EventListCard />
          <EventListCard />
          <EventListCard />
          <EventListCard />
          <EventListCard />
          <EventListCard />
          <EventListCard />
        </section>
      </div>
      <FloatingButton />
    </div>
  );
}
