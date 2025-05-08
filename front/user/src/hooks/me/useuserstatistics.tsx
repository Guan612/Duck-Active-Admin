import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { getMyActiveAPI } from "../../api/registration";
import { getUserIntegralAPI } from "../../api/integral";

export default function useUserStatistics() {
  const [userData, setUserData] = useState([]);
  const [userintegral, setUserintegral] = useState([]); 

  const getUserIntegral = async () => {
    const res = await getUserIntegralAPI();
    setUserintegral(res);
  };


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
        data: [
          userintegral?.moralPoints || 0,    // 明德 (对应 moralPoints)
          userintegral?.actionPoints || 0,   // 笃行 (对应 actionPoints)
          userintegral?.beautyPoints || 0,   // 尽美 (对应 beautyPoints)
          userintegral?.learnedPoints || 0  
        ],
      },
    ],
  };

  // 解析每条活动的时间戳并统计参加的次数
  const getMonthlyData = (activities) => {
    return activities.reduce((monthlyCounts, activity) => {
      const monthName = dayjs(activity.createdAt).format("MMMM"); // 提取月份
      monthlyCounts[monthName] = (monthlyCounts[monthName] || 0) + 1;
      return monthlyCounts;
    }, {});
  };

  // 将每月活动统计转换成 ECharts 配置
  const monthlyData = getMonthlyData(userData);
  const months = Object.keys(monthlyData);
  const counts = Object.values(monthlyData);

  const options2 = {
    title: {
      text: "参加次数统计",
    },
    tooltip: {},
    xAxis: {
      data: months,
    },
    yAxis: {},
    series: [
      {
        name: "参加次数",
        type: "bar",
        data: counts,
      },
    ],
  };

  useEffect(() => {
    getUserData();
    getUserIntegral();
  }, []);

  return { options, options2 };
}
