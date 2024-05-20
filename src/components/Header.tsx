import BackButton from "./ui/BackButton";

type Props = {
  title: string;
};

export default function Header({ title }: Props) {
  return (
    <nav className="bg-pink-100 max-w-[360px] mx-auto flex p-4 items-center text-h1 border-solid border-[1px] border-gray0">
      <BackButton />
      <h2 className="text-h1 mx-auto">{title}</h2>
    </nav>
  );
}
