import splash from "../assets/image/splash.png";
import useDeviceSize from "../hooks/useDeviceSize";

export default function SplashScreen() {
  const { isDesktop } = useDeviceSize();

  return (
    <div
      className={`bg-yellow max-w-[360px] mx-auto flex justify-center items-center ${isDesktop ? "h-full min-h-full" : "h-dvh"}`}
    >
      <img
        id="splashImage"
        src={splash}
        alt="로고"
        className="w-[212px] h-[144px] animate-fadeOut"
      />
    </div>
  );
}
