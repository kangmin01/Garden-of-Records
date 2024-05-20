import EventList from "../components/EventList";
import EventListCard from "../components/EventListCard";
import SearchBar from "../components/SearchBar";
import BackButton from "../components/ui/BackButton";

export default function Search() {
  return (
    <section className="bg-pink-50 max-w-[360px] mx-auto h-dvh relative">
      <nav className="bg-pink-100 max-w-[360px] mx-auto flex p-4 items-center text-h1 border-solid border-[1px] border-gray0">
        <BackButton />
        <h2 className="text-h1 mx-auto">검색</h2>
      </nav>
      <SearchBar />
      <EventList />
    </section>
  );
}
