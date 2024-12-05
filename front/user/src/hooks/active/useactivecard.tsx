import { useNavigate } from "react-router-dom";
export default function useActiveCard() {
	const navigate = useNavigate();
	
	const cardItems = Array(20).fill(null);

	const goActiveDetail = (id: string) => {
		console.log(id)
	    navigate(`/activedetail/${id}`)
	}

	return {
		cardItems,
		goActiveDetail,
	};
}
