import { useEffect, useState } from "react";
import { getActiveListAPI, getActiveStatusAPI } from "../../api/active";

export default function useActive() {
	const [cardItems, setCardItems] = useState([]);

	const options = []; //选项

	const activeTypeHandleChange = async (value:number[]) => {
		if (value.length === 0) {
			getActiveList();
		} else {
		    const res = await getActiveStatusAPI(value);
			setCardItems(res);
		}
	};

	const activeTimeHandleChange = async (value: Date[]) => {
	    console.log(value);
	}

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

	return { activitieTypeOption,
		activeTypeHandleChange,
		activeTimeHandleChange, 
		cardItems 
	};
}
