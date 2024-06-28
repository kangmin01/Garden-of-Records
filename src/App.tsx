import "./App.css";
import { Outlet, useNavigate } from "react-router-dom";
import background_text1 from "./assets/image/background_text1.png";
import background_text2 from "./assets/image/background_text2.png";
import volumeBtn from "./assets/image/volume_btn.png";
import statusBar from "./assets/image/status_bar.png";
import { useRef, useState } from "react";
import DownloadIcon from "./components/ui/icons/DownloadIcon";
import useDeviceSize from "./hooks/useDeviceSize";

const App: React.FC = () => {
  const [keyword, setKeyword] = useState("");

  const navigate = useNavigate();

  const { isDesktop } = useDeviceSize();

  const handleSearch = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate("/search", {
      state: { keyword: keyword },
    });
  };

  const [fileName, setFileName] = useState("");

  const inputValue = useRef<HTMLInputElement | null>(null);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    inputValue.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setFileName(files[0].name);
    }
  };

  return (
    <>
      {isDesktop ? (
        <div className="App bg-backgroundColor w-full h-screen flex justify-center bg-background bg-contain bg-no-repeat bg-bottom">
          <div className="flex gap-[140px] mt-[60px] w-[1082px] h-[862px]">
            <div className="w-[524px] h-[798px] min-w-[524px] min-h-[798px] pt-[64px] flex flex-col">
              <div className="mb-[80px] flex flex-col items-center">
                <img
                  src={background_text1}
                  alt="축의금 검색"
                  className="w-[446px] h-[52px] mb-[34px]"
                />
                <div className="relative">
                  <input
                    type="text"
                    placeholder="이름을 검색해주세요."
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    className="bg-white pl-[25.3px] w-[524px] min-w-[524px] h-[76px] border-[1.58px] border-gray0 outline-none rounded-[12px] p-2 text-[22.14px] placeholder:text-[22.14px] font-normal placeholder:font-normal placeholder-gray5 shadow-shadowSearchBar"
                  />
                  <button
                    className="absolute top-[12px] right-[16px] text-h1 text-gray5"
                    onClick={handleSearch}
                  >
                    <svg
                      className="absolute right-[6px] top-[7px]"
                      width="39"
                      height="39"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g
                        clipPath="url(#a)"
                        stroke="#A6A6A6"
                        strokeWidth="2.372"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M17.349 28.857c6.55 0 11.86-5.31 11.86-11.86 0-6.551-5.31-11.861-11.86-11.861s-11.86 5.31-11.86 11.86 5.31 11.86 11.86 11.86ZM25.735 25.384l8.218 8.218" />
                      </g>
                      <defs>
                        <clipPath id="a">
                          <path
                            fill="#fff"
                            transform="translate(.744 .392)"
                            d="M0 0h37.954v37.954H0z"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  </button>
                </div>
              </div>

              <div className="flex flex-col items-center">
                <img
                  src={background_text2}
                  alt="엑셀 업로드"
                  className="w-[489px] h-[52px] mb-[35px]"
                />
                <div className="bg-white shadow-shadowExcelBox p-[60px] w-full min-w-full h-[377px] rounded-[24px] border-[1px] border-solid border-gray0">
                  <ol className="flex flex-col justify-center rounded-[12px] border-solid border-[1px] border-gray0 p-[12px] font-normal text-[16px] text-gray3 mb-[24px]">
                    <li>1. 양식 다운로드하기</li>
                    <li>2. 양식에 맞춰 정보 수정하기</li>
                    <li>3. 엑셀 파일 업로드</li>
                  </ol>
                  <div className="">
                    <div className="flex justify-between">
                      <div className="w-[102px] min-w-[102px] h-[28px] mt-[8px] flex items-center border-b-[1px] border-solid border-main">
                        <DownloadIcon />
                        <span className="font-semibold text-[14px] text-main ml-[8px] cursor-pointer">
                          양식 다운로드
                        </span>
                      </div>
                      <form>
                        <label htmlFor="file" className="relative">
                          <div className="w-[270px] h-[48px] rounded-[12px] flex overflow-hidden mb-[24px]">
                            <span className="w-[172px] font-normal text-[14px] text-gray2 flex justify-center items-center bg-gray0">
                              {fileName.length > 0
                                ? fileName
                                : "파일을 업로드해주세요."}
                            </span>
                            <button
                              onClick={handleClick}
                              className={`w-[98px] ${fileName ? "bg-gray2" : "bg-main"} text-white font-semibold text-[16px] flex justify-center items-center`}
                            >
                              업로드
                            </button>
                          </div>
                          <span className="absolute top-[56px] right-0 font-normal text-[14px] text-darkRed leading-[20px]">{`.csv 파일만 가능`}</span>
                        </label>
                        <input
                          type="file"
                          accept=".csv"
                          id="file"
                          className="hidden"
                          ref={inputValue}
                          onChange={handleChange}
                        />
                      </form>
                    </div>
                    <button
                      className={`mt-[28px] w-[405px] h-[48px] font-semibold text-[16px] rounded-[12px]  ${fileName ? "bg-main text-white" : "bg-gray0 text-gray1"}`}
                    >
                      기록
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex mt-[62px] self-end items-center">
                <a
                  href="https://pf.kakao.com/_ZHaLG"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-[18px] text-gray2 underline underline-offset-2"
                >
                  제휴 문의
                </a>
                <span className=""></span>

                <svg
                  width="24"
                  height="24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="m9 6 6 6-6 6"
                    stroke="gray"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

            <div className="flex relative justify-center items-center bg-phone shadow-shadowPhone rounded-[52px] w-[412px] min-w-[412px] h-[863px] min-h-[863px] bg-cover bg-no-repeat">
              <img
                src={volumeBtn}
                alt="volume button"
                className="absolute w-[7px] h-[193px] top-[148px] left-[410.98px]"
              />
              <div className="w-[360px] h-[800px] min-w-[360px] min-h-[800px] rounded-[30px] overflow-hidden relative">
                <img
                  src={statusBar}
                  alt="상태바"
                  className="absolute z-50 w-[360px] h-[44px] min-w-[360px] min-h-[44px]"
                />
                <div className="pt-[44px] w-[360px] min-w-[360px] h-[800px] min-h-[800px]">
                  <Outlet />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default App;
