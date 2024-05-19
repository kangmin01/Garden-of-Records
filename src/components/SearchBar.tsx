import SearchIcon from "./ui/icons/SearchIcon";

export default function SearchBar() {
  const handleClick = () => {};

  return (
    <div className="w-full px-5 mt-6 mb-5">
      <div className="flex items-center w-full border-solid border-[1px] border-gray0 rounded-lg bg-gray-50">
        <input
          type="text"
          placeholder="이름을 검색해주세요."
          className="border-none outline-none p-2 text-lg bg-transparent text-gray-700 placeholder-gray-400"
        />
        <button
          className="absolute right-8 text-h1 text-gray2"
          onClick={handleClick}
        >
          <SearchIcon />
        </button>
      </div>
    </div>
  );
}
