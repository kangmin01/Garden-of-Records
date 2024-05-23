type Props = {
  top?: string;
  left?: string;
};

export default function RequiredFieldMark({ top = "20", left = "27" }: Props) {
  return (
    <span
      style={{ top: `${top}px`, left: `${left}px` }}
      className="text-darkRed text-[12px] font-normal absolute z-40"
    >
      *
    </span>
  );
}
