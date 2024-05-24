import { recordInfoType } from "../types/record";
import EventListCard from "./EventListCard";

type Props = {
  records: recordInfoType[];
};

export default function EventList({ records }: Props) {
  return (
    <div className="w-full px-5">
      <div className="divide-y-[1px]">
        {records.map((record) => (
          <EventListCard record={record} key={record.event_id} />
        ))}
      </div>
    </div>
  );
}
