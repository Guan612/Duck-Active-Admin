import useActive from "../../hooks/active/useActive";
import ActiveCard from "./components/activecard";
import { ActiveDto } from "../../dto/activeDto";

export default function Active() {
  const {
    activeTypeHandleChange,
    cardItems,
    activityTypeOption,
    activeTimeHandleChange,
  } = useActive();
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-6xl">
        <h1 className="text-3xl font-bold text-center mb-8">活动选择</h1>
        
        <div className="flex flex-col gap-4 mb-8 md:flex-row md:justify-center">
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">选择类型</span>
            </label>
            <select 
              className="select select-bordered select-multiple"
              multiple
              onChange={activeTypeHandleChange}
            >
              {activitieTypeOption.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">选择时间范围</span>
            </label>
            <div className="flex gap-2">
              <input 
                type="date" 
                className="input input-bordered w-full"
                onChange={(e) => activeTimeHandleChange([e.target.value, null])}
              />
              <input
                type="date"
                className="input input-bordered w-full"
                onChange={(e) => activeTimeHandleChange([null, e.target.value])}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {cardItems?.map((cardItem: ActiveDto) => (
            <div 
              className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300"
              key={cardItem.id}
            >
              <ActiveCard cardInfo={cardItem} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
