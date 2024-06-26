import { useRef, useState } from "react";
import Header from "../components/Header";
import DownloadIcon from "../components/ui/icons/DownloadIcon";
import axiosInstance from "../api/axiosInstance";

export default function UploadExcel() {
  const [fileName, setFileName] = useState("");

  const inputValue = useRef<HTMLInputElement | null>(null);

  const downloadForm = async () => {
    // const response = await axiosInstance.get(`/downloadForm`, {
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });
    // if (response.ok) {
    //   const blob = await response.blob();
    //   const url = window.URL.createObjectURL(blob);
    //   const a = document.createElement("a");
    //   a.href = url;
    //   a.download = "example.xlsx";
    //   document.body.appendChild(a);
    //   a.click();
    //   a.remove();
    // } else {
    //   console.error("File download failed");
    // }
  };

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
    <section className="bg-white max-w-[360px] mx-auto h-dvh relative">
      <Header title="엑셀 업로드" />
      <div className="mx-[20px] mt-[24px] pb-[38px] mb-[38px] border-b-[1px] border-solid border-gray0">
        <div className="flex flex-col">
          <span className="font-semibold text-[16px] text-gray4 leading-[20px] mb-[4px]">
            양식 다운로드
          </span>
          <span className="font-normal text-[14px] text-gray2 leading-[20px]">
            가지고 계신 축의금 엑셀파일을 양식에 맞춰 등록해주세요.
          </span>
        </div>
        <ol className="my-[20px] rounded-[12px] border-solid border-[1px] border-gray0 p-[12px] font-normal text-[14px] text-gray3">
          <li>1. 양식 다운로드하기</li>
          <li>2. 양식에 맞춰 정보 수정하기</li>
          <li>3. 엑셀 파일 업로드</li>
        </ol>
        <div className="flex justify-center">
          <div className="w-[102px] flex items-center border-b-[1px] border-solid border-main">
            <DownloadIcon />
            <button
              onClick={downloadForm}
              className="font-semibold text-[14px] text-main ml-[8px]"
            >
              양식 다운로드
            </button>
          </div>
        </div>
      </div>
      <div className="px-[20px]">
        <div className="flex justify-between items-center mb-[24px]">
          <h3 className="font-semibold text-[16px] text-gray4 leading-[20px]">
            엑셀 파일 업로드
          </h3>
          <span className="font-normal text-[14px] text-darkRed leading-[20px]">{`.csv 파일만 가능`}</span>
        </div>
        <form>
          <label htmlFor="file">
            <div className="bg-red-100 w-[320px] h-[48px] rounded-[12px] flex overflow-hidden mb-[24px]">
              <span className="basis-7/12 font-normal text-[14px] text-gray2 flex justify-center items-center bg-gray0">
                {fileName.length > 0 ? fileName : "파일을 업로드해주세요."}
              </span>
              <button
                onClick={handleClick}
                className={`basis-5/12 ${fileName ? "bg-gray2" : "bg-main"} text-white font-semibold text-[16px] flex justify-center items-center`}
              >
                업로드
              </button>
            </div>
          </label>
          <input
            type="file"
            accept=".csv"
            id="file"
            className="hidden"
            ref={inputValue}
            onChange={handleChange}
          />
          <button
            className={`w-full min-w-80 py-[14px] rounded-xl text-[16px] font-semibold  ${fileName ? "bg-main text-white" : "bg-gray0 text-gray1"}`}
          >
            기록
          </button>
        </form>
      </div>
    </section>
  );
}
