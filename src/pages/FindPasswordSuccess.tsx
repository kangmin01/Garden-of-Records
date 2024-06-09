import SubmitButton from "../components/ui/SubmitButton";

export default function FindPasswordSuccess() {
  return (
    <>
      <div className="mt-[162px] mb-[133px] flex flex-col justify-center items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          fill="none"
        >
          <circle cx="24" cy="24" r="24" fill="#37A041" />
          <path
            stroke="#fff"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 15h24v17a1 1 0 0 1-1 1H13a1 1 0 0 1-1-1V15Z"
          />
          <path
            stroke="#fff"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M36 15 24 26 12 15"
          />
        </svg>
        <span className="mt-[40px] mb-[16px] font-normal text-[16px] text-center">
          <span className="text-main">garden@naver.com</span>
          으로<br></br> 비밀번호 재설정 메일 발송되었어요.
        </span>
        <span className="font-normal text-[12px] text-gray2 text-center">
          5분 후에도 메일이 오지 않는다면<br></br> 스팸함을 확인해 주세요.
        </span>
      </div>
      <div className="flex flex-col justify-center items-center gap-[12px]">
        <SubmitButton title="아이디 찾기" navigate={true} link="/find-email" />
        <SubmitButton title="로그인" navigate={false} />
      </div>
    </>
  );
}
