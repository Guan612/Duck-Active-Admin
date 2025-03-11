import { DayPicker } from "react-day-picker";
import { zhCN } from "react-day-picker/locale";
import ActiveCard from "./components/activecard";
import { useState } from "react";
import useActive from "../../hooks/active/useActive";

export default function Active() {
	const today = new Date();
	const [date, setDate] = useState();
	const { cardItems } = useActive();

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
					popoverTarget="rdp-popover"
					className="input input-border"
					style={{ anchorName: "--rdp" } as React.CSSProperties}
				>
					{date ? date.toLocaleDateString() : "选择开始日期"}
				</button>
				<div
					popover="auto"
					id="rdp-popover"
					className="dropdown"
					style={{ positionAnchor: "--rdp" } as React.CSSProperties}
				>
					<DayPicker
						className="react-day-picker"
						mode="single"
						selected={date}
						onSelect={setDate}
						locale={zhCN}
						captionLayout="dropdown"
					/>
				</div>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-2 max-w-7xl mx-auto m-2">
				{cardItems.map((cardItem) => {
					return <ActiveCard key={cardItem.id} cardItem={cardItem} />;
				})}
			</div>
		</div>
	);
}
