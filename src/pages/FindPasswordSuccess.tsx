import SubmitButton from "../components/ui/SubmitButton";

export default function FindPasswordSuccess() {
  return (
    <>
      <div className="mt-[162px] mb-[124px] flex flex-col justify-center items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          fill="none"
        >
          <rect width="48" height="48" fill="#37A041" rx="24" />
          <path
            stroke="#fff"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M14 25.333 20.154 32 34 17"
          />
        </svg>
        <span className="mt-[40px] mb-[16px] font-normal text-[16px] text-center">
          김기록님의 임시 비밀번호를 알려드려요
        </span>
        <span className="font-normal text-[12px] text-gray2 text-center">
          로그인 후 비밀번호를 변경해주세요.
        </span>
        <div className="w-[270px] h-[44px] mt-[24px] flex justify-center items-center bg-[#F4F4F4] font-medium text-[16px] text-main rounded-[12px]">
          SD8FKKLD3
        </div>
      </div>
      <div className="flex flex-col justify-center items-center gap-[12px]">
        <SubmitButton title="로그인" navigate={false} />
      </div>
    </>
  );
}
