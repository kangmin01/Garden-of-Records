import splash from "../assets/image/splash.png";

export default function SplashScreen() {
  return (
    <div className="bg-yellow max-w-[360px] mx-auto h-dvh flex justify-center items-center">
      <img
        id="splashImage"
        src={splash}
        alt="로고"
        className="w-[212px] h-[144px] animate-fadeOut"
      />
    </div>
  );
}
