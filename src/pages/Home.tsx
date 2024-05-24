import HamburgerIcon from "../components/ui/icons/HamburgerIcon";
import FloatingButton from "../components/ui/FloatingButton";
import RecordCard from "../components/RecordCard";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import CloseIcon from "../components/ui/icons/CloseIcon";
import RightChevron from "../components/ui/icons/RightChevron";
import profile from "../assets/image/profile.png";
import PlusCircleIcon from "../components/ui/icons/PlusCircleIcon";
import MinusCircleIcon from "../components/ui/icons/MinusCircleIcon";
import PencilIcon from "../components/ui/icons/PencilIcon";
import header_title from "../assets/image/header_title.png";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import home_character from "../assets/image/home_character.png";
import axios from "axios";
import EventList from "../components/EventList";
import { recordInfoType, totalAmountType } from "../types/record";
import { formatDate, todayFormat } from "../util/formatNumber";
import { User } from "../types/user";
import SearchIcon from "../components/ui/icons/SearchIcon";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [upcomingEvents, setUpcomingEvents] = useState<recordInfoType[]>([]);
  const [totalSendAmounts, setTotalSendAmounts] =
    useState<totalAmountType | null>(null);
  const [totalReceiveAmounts, setTotalReceiveAmounts] =
    useState<totalAmountType | null>(null);
  const [info, setInfo] = useState<User | null>(null);
  const [score, setScore] = useState(0);
  const [keyword, setKeyword] = useState("");
  const token = localStorage.getItem("access_token");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [res1, res2, res3, res4, res5] = await Promise.all([
          axios.get(`/invitation/expenses`, {
            params: {
              is_invited: "all",
              offset: formatDate(todayFormat()) + "0000",
            },
            headers: {
              "access-token": token,
              "Content-Type": "application/json",
            },
          }),
          axios.get(`/invitation/expense/total`, {
            params: {
              is_invited: "invited",
            },
            headers: {
              "access-token": token,
              "Content-Type": "application/json",
            },
          }),
          axios.get(`/invitation/expense/total`, {
            params: {
              is_invited: "inviting",
            },
            headers: {
              "access-token": token,
              "Content-Type": "application/json",
            },
          }),
          axios.get(`/user/profile`, {
            headers: {
              "access-token": token,
              "Content-Type": "application/json",
            },
          }),
          axios.get(`/user/score`, {
            headers: {
              "access-token": token,
              "Content-Type": "application/json",
            },
          }),
        ]);

        if (res1.data) {
          setUpcomingEvents(res1.data);
        } else {
          setUpcomingEvents([]);
        }

        if (res2.data) {
          setTotalSendAmounts(res2.data);
        } else {
          setTotalSendAmounts(null);
        }

        if (res3.data) {
          setTotalReceiveAmounts(res3.data);
        } else {
          setTotalReceiveAmounts(null);
        }

        if (res4.data) {
          setInfo(res4.data);
        } else {
          setInfo(null);
        }

        if (res5.data) {
          setScore(res5.data);
        } else {
          setScore(0);
        }
      } catch (error) {
        console.error("검색 실패", error);
        setUpcomingEvents([]);
        setTotalReceiveAmounts(null);
        setTotalSendAmounts(null);
        setScore(0);
      }
    };

    fetchData();
  }, [token]);

  const handleSearch = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate("/search", {
      state: { keyword: keyword },
    });
  };

  return (
    <>
      <div className="bg-white max-w-[360px] min-w-[360px] mx-auto h-dvh relative">
        <nav className="bg-green0 max-w-[360px] min-w-[360px] mx-auto flex justify-between px-[16px] py-3 items-center text-h1">
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
            className={`absolute top-0 left-16 h-dvh w-[304px] bg-white flex flex-col transition-transform transform ${isMenuOpen ? "translate-x-0" : "translate-x-full"} z-20`}
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
                      {info?.user_name}
                    </span>
                    <span className="text-[14px] font-normal">님</span>
                  </div>
                  <span className="text-gray1 text-[12px] font-normal">
                    {info?.email}
                  </span>
                </div>
                <div>
                  <RightChevron />
                </div>
              </Link>

              {/* Search Bar */}
              <div className="w-full mt-6 mb-5 text-[14px] font-normal flex justify-center relative">
                <input
                  type="text"
                  placeholder="이름을 검색해주세요."
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  className="bg-gray6 w-[320px] h-[48px] border border-gray0 outline-none rounded-md p-2 text-[14px] font-normal placeholder-gray5"
                />
                <button
                  className="absolute top-[12px] right-[16px] text-h1 text-gray5"
                  onClick={handleSearch}
                >
                  <SearchIcon />
                </button>
              </div>

              {/* navigate */}
              <div className="text-[14px] font-normal">
                <Link
                  to="/list/send"
                  className="flex items-center justify-between w-full h-[48px] border-solid border-b-[1px] border-gray0"
                >
                  <div className="flex items-center">
                    <MinusCircleIcon />
                    <span className="pl-[8px]">보낸 기록</span>
                  </div>
                  <RightChevron />
                </Link>
                <Link
                  to="/list/receive"
                  className="flex items-center justify-between w-full h-[48px] border-solid border-b-[1px] border-gray0"
                >
                  <div className="flex items-center">
                    <PlusCircleIcon />
                    <span className="pl-[8px]">보낸 기록</span>
                  </div>
                  <RightChevron />
                </Link>
                <Link
                  to="/record/add"
                  className="flex items-center justify-between w-full h-[48px] border-solid border-b-[1px] border-gray0"
                >
                  <div className="flex items-center">
                    <PencilIcon />
                    <span className="pl-[8px]">기록</span>
                  </div>
                  <RightChevron />
                </Link>
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
            <span className="text-h1 mt-[22px]">{info?.user_name}</span>
          </div>
          <div className="w-[320px] h-[120px] flex justify-between">
            <RecordCard
              type="send"
              totalCount={totalSendAmounts?.expense_count || 0}
              totalAmount={totalSendAmounts?.total_expense || 0}
            />
            <RecordCard
              type="receive"
              totalCount={totalReceiveAmounts?.expense_count || 0}
              totalAmount={totalReceiveAmounts?.total_expense || 0}
            />
          </div>
        </div>
        <div className="pt-[486px] px-[16px]">
          {upcomingEvents.length !== 0 ? (
            <div className="h-[172px] overflow-y-auto">
              <EventList records={upcomingEvents} />
            </div>
          ) : (
            <div className="pt-[44px] flex flex-col items-center justify-center text-[14px] font-normal text-gray2">
              <span>소중한 분과 주고 받은 마음을 기록해주세요.</span>
              <span>다가오는 결혼식 일정을 알려드릴게요.</span>
            </div>
          )}
        </div>
      </div>
      <FloatingButton />
    </>
  );
}
