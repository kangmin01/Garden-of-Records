import SearchBar from "../components/SearchBar";
import BackButton from "../components/ui/BackButton";

export default function Search() {
  return (
    <section className="max-w-[360px] mx-auto h-dvh relative">
      <nav className="max-w-[360px] mx-auto h-[56px] flex p-4 items-center text-h1 border-solid border-b-[1px] border-gray0">
        <BackButton />
        <h2 className="text-[18px] font-semibold mx-auto">검색</h2>
      </nav>
      <SearchBar />
    </section>
  );
}
