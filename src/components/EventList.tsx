import EventListCard from "./EventListCard";

export default function EventList() {
  return (
    <div className="w-full px-5">
      <div className="divide-y-[1px]">
        {/* <div className="divide-y-[1px] h-[280px] overflow-y-auto"> */}
        <EventListCard />
        <EventListCard />
        <EventListCard />
        <EventListCard />
        <EventListCard />
        <EventListCard />
        <EventListCard />
      </div>
    </div>
  );
}
