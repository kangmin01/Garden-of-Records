import HamburgerIcon from "../components/ui/icons/HamburgerIcon";
import FloatingButton from "../components/ui/FloatingButton";
import RecordCard from "../components/RecordCard";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
import EventList from "../components/EventList";
import SearchIcon from "../components/ui/icons/SearchIcon";
import HeadsetIcon from "../components/ui/icons/HeadsetIcon";
import logo_ham from "../assets/image/logo_ham.png";
import {
  fetchUpcomingEvents,
  fetchTotalSendAmounts,
  fetchTotalReceiveAmounts,
  fetchUserInfo,
  fetchUserScore,
} from "../api";
import { useQueries } from "react-query";
import { Oval } from "react-loader-spinner";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [keyword, setKeyword] = useState("");

  const navigate = useNavigate();

  const location = useLocation();

  const message = location.state?.message;

  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (message) {
      setShowMessage(true);
      const timer = setTimeout(() => {
        setShowMessage(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const token = localStorage.getItem("access_token") as string;

  useEffect(() => {
    if (!token) {
      navigate("/tutorial");
    }
  }, []);

  const results = useQueries([
    {
      queryKey: ["upcomingEvents", token],
      queryFn: () => fetchUpcomingEvents(token),
      enabled: !!token,
    },
    {
      queryKey: ["totalSendAmounts", token],
      queryFn: () => fetchTotalSendAmounts(token),
      enabled: !!token,
    },
    {
      queryKey: ["totalReceiveAmounts", token],
      queryFn: () => fetchTotalReceiveAmounts(token),
      enabled: !!token,
    },
    {
      queryKey: ["userInfo", token],
      queryFn: () => fetchUserInfo(token),
      enabled: !!token,
    },
    {
      queryKey: ["userScore", token],
      queryFn: () => fetchUserScore(token),
      enabled: !!token,
    },
  ]);

  const [
    upcomingEventsResult,
    totalSendAmountsResult,
    totalReceiveAmountsResult,
    userInfoResult,
    userScoreResult,
  ] = results;

  const isLoading = results.some((result) => result.isLoading);
  const isError = results.some((result) => result.isError);

  if (isLoading) {
    return (
      <div className="flex w-full justify-center mt-[250px]">
        <Oval
          visible={true}
          height="40"
          width="40"
          strokeWidth="5"
          color="#37A041"
          ariaLabel="oval-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    );
  }

  if (isError) {
    return <div>Error occurred while fetching data.</div>;
  }

  const upcomingEvents = upcomingEventsResult?.data;
  const totalSendAmounts = totalSendAmountsResult?.data;
  const totalReceiveAmounts = totalReceiveAmountsResult?.data;
  const userInfo = userInfoResult?.data;
  const userScore = userScoreResult?.data;
  const handleSearch = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate("/search", {
      state: { keyword: keyword },
    });
  };

  return (
    <>
      {token && (
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
                className="cursor-pointer z-30 relative"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <div className="relative top-[52px] right-[0px]">
                    <CloseIcon />
                  </div>
                ) : (
                  <HamburgerIcon />
                )}
              </div>
              {/* 메뉴바 */}
              <div
                className={`absolute top-0 left-16 h-dvh w-[304px] bg-white flex flex-col transition-transform transform ${isMenuOpen ? "translate-x-0" : "translate-x-full"} z-20`}
              >
                {/* 로고 */}
                <div>
                  <img
                    src={logo_ham}
                    alt="로고"
                    className="w-[91px] h-[32px] ml-[20px] mt-[16px]"
                  />
                </div>
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
                    <div className="flex flex-col justify-center h-[38px] max-h-[38px] mr-[39px]">
                      <div className="flex items-center">
                        <span className="text-gray4 text-[16px] font-medium mr-[4px]">
                          {userInfo.user_name}
                        </span>
                        <span className="text-[14px] font-normal pt-[1px]">
                          님
                        </span>
                      </div>
                      <span className="text-gray1 text-[12px] font-normal">
                        {userInfo.email}
                      </span>
                    </div>
                    <div className="text-gray3">
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
                  <div className="flex items-center justify-center space-x-2">
                    <HeadsetIcon />
                    <span>고객센터</span>
                  </div>
                  <div className="">© T키타카</div>
                </div>
              </div>
              <div
                className={`absolute top-0 right-[-310px] h-dvh w-[304px] bg-white flex flex-col z-50`}
              ></div>
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
                <span className="text-h1 mt-[22px]">{userInfo.user_name}</span>
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
              {upcomingEvents && upcomingEvents.length !== 0 ? (
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
      )}
      {showMessage && (
        <div className="w-full max-w-[360px] min-w-80 mx-auto flex justify-center">
          <div
            className={`fixed bottom-[36px] w-[320px] h-[48px] flex justify-center items-center bg-gray0 font-medium text-[14px] text-gray3 rounded-xl toast`}
          >
            {message}
          </div>
        </div>
      )}
    </>
  );
}
