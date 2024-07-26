import { Link } from "react-router-dom";
import errorCharacter from "../assets/image/error_character.png";

export default function NotFound() {
  return (
    <div className="bg-white max-w-[360px] mx-auto mt-[120px]">
      <div className="flex justify-center mb-[40px]">
        <img
          src={errorCharacter}
          alt="error img"
          className="w-[166px] h-[166px]"
        />
      </div>
      <div className="flex flex-col items-center mb-[40px]">
        <span className="text-[18px] text-main font-medium">죄송합니다😢</span>
        <span className="text-[14px] text-gray2 font-medium mb-[30px]">
          놀라지마세요! 404에러일 뿐이에요!
        </span>
        <span className="text-[14px] text-gray2">
          페이지를 다시 기록하고 있어요!
        </span>
        <span className="text-[14px] text-gray2">
          다시 한번 시도해 보시겠어요?
        </span>
      </div>
      <Link
        to="/"
        className="w-full font-semibold text-[16px] min-w-70 h-[48px] flex items-center justify-center bg-main text-white rounded-xl mb-[24px]"
      >
        메인으로 가기
      </Link>
    </div>
  );
}
