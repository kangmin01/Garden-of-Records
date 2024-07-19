import useDeviceSize from "../hooks/useDeviceSize";
import { recordInfoType } from "../types/record";
import EventListCard from "./EventListCard";

type Props = {
  records: recordInfoType[];
};

export default function EventList({ records }: Props) {
  if (!Array.isArray(records)) {
    records = [];
  }

  const { isDesktop } = useDeviceSize();

  return (
    <div
      className={`w-full px-5 overflow-y-auto ${isDesktop ? "h-[460px]" : ""}`}
    >
      <div className="divide-y-[1px]">
        {records.map((record, index) => (
          <>
            <EventListCard record={record} key={index} />
            <EventListCard record={record} key={index} />
            <EventListCard record={record} key={index} />
            <EventListCard record={record} key={index} />
            <EventListCard record={record} key={index} />
            <EventListCard record={record} key={index} />
          </>
        ))}
      </div>
    </div>
  );
}
