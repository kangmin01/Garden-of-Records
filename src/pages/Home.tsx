import HamburgerIcon from "../components/ui/icons/HamburgerIcon";
import EventListCard from "../components/EventListCard";
import FloatingButton from "../components/ui/FloatingButton";
import RecordCard from "../components/RecordCard";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import CloseIcon from "../components/ui/icons/CloseIcon";
import SearchBar from "../components/SearchBar";
import RightChevron from "../components/ui/icons/RightChevron";
import profile from "../assets/image/profile.png";
import PlusCircleIcon from "../components/ui/icons/PlusCircleIcon";
import MinusCircleIcon from "../components/ui/icons/MinusCircleIcon";
import PencilIcon from "../components/ui/icons/PencilIcon";
import header_title from "../assets/image/header_title.png";
import CalenderIcon from "../components/ui/icons/CalenderIcon";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import home_character from "../assets/image/home_character.png";
import axios from "axios";
import { useAuthContext } from "../context/AuthContext";
import EventList from "../components/EventList";
import { recordInfoType } from "../types/record";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [upcomingEvents, setUpcomingEvents] = useState<recordInfoType[]>([]);
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/invitation/expenses`, {
          params: {
            is_invited: "all",
            offset: 202405250000,
          },
          headers: {
            "access-token": token,
            "Content-Type": "application/json",
          },
        });
        // const response2 = await axios.get(`/user/scroe`, {
        //   headers: {
        //     "access-token": token,
        //     "Content-Type": "application/json",
        //   },
        // });
        // console.log(response2);

        // console.log("검색 결과", response.data);
        if (response.data) {
          // const futureEvents = response.data.filter(
          //   (event: recordInfoType) => new Date(event.event_date) > new Date()
          // );
          setUpcomingEvents(response.data);
        } else {
          setUpcomingEvents([]);
        }
      } catch (error) {
        console.error("검색 실패", error);
        setUpcomingEvents([]);
      }
    };

    fetchData();
  }, [token]);
  // console.log(upcomingEvents);

  return (
    <>
      <div className="bg-white border-x-[1px] border-solid border-gray0 max-w-[360px] mx-auto h-dvh relative">
        <nav className="bg-green0 max-w-[360px] mx-auto flex justify-between px-[16px] py-3 items-center text-h1">
          <div className="w-[86px] h-[19px]">
            <img src={header_title} alt="헤더 제목" />
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
                to="/profile"
                className="flex items-center py-[16px] pl-[20px] w-[264px] h-[80px] rounded-2xl border-solid border-[1px] border-main"
              >
                <div className="flex justify-center items-center w-[48px] h-[48px] bg-yellow rounded-full border border-solid border-gray0 mr-[16px]">
                  <img
                    src={profile}
                    alt="캐릭터 이미지"
                    className="w-[29px] h-[33px] object-contain rounded-full"
                  />
                </div>
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
              {/* <SearchBar /> */}

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
                    <Link to="/record/add" className="pl-[8px]">
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
        <div className="bg-green0 absolute h-[388px] w-[360px] rounded-b-[20px]"></div>
        <div className="w-[360px] absolute flex flex-col items-center">
          <div className="flex flex-col items-center mt-3 mb-6">
            <CircularProgressbar
              value={35}
              background={true}
              strokeWidth={2.5}
              styles={buildStyles({
                pathColor: "#37A041",
                trailColor: "#B2D0AB",
                backgroundColor: "#DFE7DD",
              })}
              className="absolute w-[245px] h-[245px]"
            />
            <div className="w-[245px] h-[245px] flex justify-center items-center rounded-full relative">
              <img
                src={home_character}
                alt="캐릭터 이미지"
                className="w-[118px] h-[160px] absolute"
              />
            </div>
            <span className="text-h1 mt-[22px]">최진영</span>
          </div>
          <div className="w-[320px] h-[120px] flex justify-between">
            <RecordCard type="send" totalCount={10} totalAmount={100000000} />
            <RecordCard
              type="receive"
              totalCount={10}
              totalAmount={100000000}
            />
          </div>
        </div>
        <div className="pt-[486px] w-full px-5">
          <section className="divide-y-[1px] px-[16px]">
            {upcomingEvents.length !== 0 ? (
              <EventList records={upcomingEvents} />
            ) : (
              <div className="flex flex-col items-center justify-center">
                <span>소중한 분과 주고 받은 마음을 기록해주세요.</span>
                <span>다가오는 결혼식 일정을 알려드릴게요.</span>
              </div>
            )}
          </section>
        </div>
      </div>
      <FloatingButton />
    </>
  );
}
