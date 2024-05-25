import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import tutorial0 from "../assets/image/tutorial0.png";
import tutorial1 from "../assets/image/tutorial1.png";
import tutorial2 from "../assets/image/tutorial2.png";
import tutorial3 from "../assets/image/tutorial3.png";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import SplashScreen from "../components/SplashScreen";

const imgs = [tutorial0, tutorial1, tutorial2, tutorial3];

export default function Tutorial() {
  const navigate = useNavigate();
  const [isSplashVisible, setIsSplashVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSplashVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    navigate("/signup");
  };
  return (
    <>
      {isSplashVisible && <SplashScreen />}
      {!isSplashVisible && (
        <div className="max-w-[360px] mx-auto h-dvh relative">
          <Swiper
            pagination={true}
            modules={[Pagination]}
            loop={true}
            className="mySwiper"
          >
            {imgs.map((img, index) => (
              <SwiperSlide key={index}>
                <img
                  src={img}
                  alt="튜토리얼 이미지"
                  className="w-full h-[476px] max-h-[476px] mb-[38px]"
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="mt-[38px] flex flex-col items-center px-[20px]">
            <button
              onClick={handleClick}
              className="w-full font-semibold text-[16px] min-w-70 h-[48px] flex items-center justify-center bg-main text-white rounded-xl mb-[24px]"
            >
              시작하기
            </button>
            <Link
              to="/signin"
              className="text-[14px] font-normal text-gray2 underline underline-offset-1"
            >
              로그인
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
