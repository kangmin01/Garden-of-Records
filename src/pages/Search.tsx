import { useLocation } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import BackButton from "../components/ui/BackButton";
import FloatingButton from "../components/ui/FloatingButton";

export default function Search() {
  const location = useLocation();
  const keyword = location.state?.keyword;

  return (
    <section className="bg-white max-w-[360px] mx-auto h-dvh relative">
      <nav className="max-w-[360px] mx-auto h-[56px] flex p-4 items-center text-h1 border-solid border-b-[1px] border-gray0">
        <BackButton />
        <h2 className="text-[18px] font-semibold mx-auto">검색</h2>
      </nav>
      <SearchBar word={keyword} />
      <FloatingButton />
    </section>
  );
}
