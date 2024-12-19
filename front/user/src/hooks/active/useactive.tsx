import { useEffect, useState } from "react";
import { getActiveListAPI } from "../../api/active";

export default function useActive() {
	const [cardItems, setCardItems] = useState([]);

	const options = []; //选项
	for (let i = 10; i < 36; i++) {
		options.push({
			label: i.toString(36) + i,
			value: i.toString(36) + i,
		});
	}

	const handleChange = (value:string[]) => {
		console.log(`selected ${value}`);
	};

	const getActiveList = async () => {
		const res = await getActiveListAPI();
		setCardItems(res);
	};

	const activitieTypeOption = [
		{
			label: "通用",
			value: 0,
		},
		{
			label: "博学",
			value: 1,
		},
		{
			label: "笃行",
			value: 2,
		},
		{
			label: "尽美",
			value: 3,
		},
		{
			label: "明德",
			value: 4,
		}
	]

	useEffect(() => {
		getActiveList();
	}, []);

	return { activitieTypeOption,options, handleChange, cardItems };
}
