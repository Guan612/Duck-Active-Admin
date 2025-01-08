import { useEffect, useState } from "react";
import { getMyActiveAPI } from "../../api/registration";

export default function useUserStatistics() {
  const [userData, setUserData] = useState([]);
  const combinedStats = {}; //参加月份数据
  const getUserData = async () => {
    const res = await getMyActiveAPI();
    setUserData(res);
  };

  const options = {
    title: {
      text: "得分统计",
    },
    tooltip: {},
    xAxis: {
      data: ["明德", "笃行", "尽美", "博学"],
    },
    yAxis: {},
    series: [
      {
        name: "分数",
        type: "bar",
        data: [5, 10, 5, 10],
      },
    ],
  };

  const options2 = {
    title: {
      text: "参加次数统计",
    },
    tooltip: {},
    xAxis: {
      data: ["九月", "十月", "十一月", "十二月"],
    },
    yAxis: {},
    series: [
      {
        name: "参加次数",
        type: "bar",
        data: [1, 3, 2, 4],
      },
    ],
  };

  useEffect(() => {
    getMyActiveAPI();
  }, []);

  return { options, options2 };
}
