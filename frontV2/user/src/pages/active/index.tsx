import ActiveCard from "./components/activecard";

export default function Active() {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col md:flex-row m-2 justify-around items-center">
        <select className="select select-info">
          <option disabled selected>
            活动选择
          </option>
          <option>Crimson</option>
          <option>Amber</option>
          <option>Velvet</option>
        </select>
        <button
          popoverTarget="cally-popover1"
          className="input input-border"
          id="cally1"
          style="anchorName:--cally1"
        >
          Pick a date
        </button>
        <div
          popover
          id="cally-popover1"
          className="dropdown bg-base-100 rounded-box shadow-lg"
          style="positionAnchor:--cally1"
        >
          <calendar-date
            class="cally"
          >
            <svg
              aria-label="Previous"
              className="fill-current size-4"
              slot="previous"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M15.75 19.5 8.25 12l7.5-7.5"></path>
            </svg>
            <svg
              aria-label="Next"
              className="fill-current size-4"
              slot="next"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="m8.25 4.5 7.5 7.5-7.5 7.5"></path>
            </svg>
            <calendar-month></calendar-month>
          </calendar-date>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4  max-w-7xl mx-auto m-2">
        <ActiveCard />
        <ActiveCard />
        <ActiveCard />
        <ActiveCard />
        <ActiveCard />
        <ActiveCard />
        <ActiveCard />
        <ActiveCard />
      </div>
    </div>
  );
}
