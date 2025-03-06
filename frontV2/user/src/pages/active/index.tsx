import "cally";
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
