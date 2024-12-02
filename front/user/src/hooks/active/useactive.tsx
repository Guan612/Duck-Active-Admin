export default function useActive() {
	const options = [];
	for (let i = 10; i < 36; i++) {
		options.push({
			label: i.toString(36) + i,
			value: i.toString(36) + i,
		});
	}
	const handleChange = (value) => {
		console.log(`selected ${value}`);
	};

	return { options, handleChange };
}
