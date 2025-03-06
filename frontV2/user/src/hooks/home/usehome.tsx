import { useEffect, useState } from "react";
import { getNewActiveAPI } from "../../api/active";

export default function useHome() {
    const [hotactivities, setHotActivities] = useState([]);
    const [newactivities, setNewActivities] = useState([]);

    const getNewActivities = async () => {
        const res = await getNewActiveAPI()
        setNewActivities(res)
    }

    useEffect(() => {
        getNewActivities()
    },[])

    return{
        newactivities,
    }
}