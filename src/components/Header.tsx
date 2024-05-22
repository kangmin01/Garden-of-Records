import BackButton from "./ui/BackButton";

type Props = {
  title: string;
};

export default function Header({ title }: Props) {
  return (
    <nav className="bg-white w-full max-w-[360px] mx-auto min-w-80 h-[56px] flex p-4 items-center text-[18px] font-bold border-solid border-b-[1px] border-gray0">
      <BackButton />
      <h2 className="text-h1 mx-auto">{title}</h2>
    </nav>
  );
}
