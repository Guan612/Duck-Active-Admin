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

	useEffect(() => {
		getActiveList();
	}, []);

	return { options, handleChange, cardItems };
}
