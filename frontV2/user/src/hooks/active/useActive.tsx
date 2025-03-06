import { useEffect, useState } from "react";
import { getActiveByTimeAPI, getActiveListAPI, getActiveByTypeAPI, getActiveStatusAPI,getShowActiveListAPI } from "../../api/active";

export default function useActive() {
	const [cardItems, setCardItems] = useState([]);

	const options = []; //选项

	const [selectedTypes, setSelectedTypes] = useState<number[]>([]);
	const [selectedDates, setSelectedDates] = useState<Date[] | null>(null);

	const activeTypeHandleChange = async (types: number[]) => {
		setSelectedTypes(types);
		applyFilters(types, selectedDates);
	};

	const activeTimeHandleChange = async (dates: Date[] | null) => {
		setSelectedDates(dates);
		applyFilters(selectedTypes, dates);
	}

	const applyFilters = async (types: number[], dates: Date[] | null) => {
		let filteredItems = await getShowActiveListAPI();
		
		// Apply type filter
		if (types.length > 0) {
			const typeFiltered = await getActiveByTypeAPI(types);
			filteredItems = filteredItems.filter(item => 
				typeFiltered.some(filtered => filtered.id === item.id)
			);
		}

		// Apply date filter
		if (dates && dates.length > 0) {
			const dateFiltered = await getActiveByTimeAPI(dates);
			filteredItems = filteredItems.filter(item =>
				dateFiltered.some(filtered => filtered.id === item.id)
			);
		}

		setCardItems(filteredItems);
	}

	const getActiveList = async () => {
		const res = await getShowActiveListAPI();
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

	return { 
		activitieTypeOption,
		activeTypeHandleChange,
		activeTimeHandleChange, 
		cardItems 
	};
}
