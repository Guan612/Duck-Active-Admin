import useAddActiveCard from "../../../hooks/me/useaddactivecard";
import { ActiveDto, ActivitieStatus } from "../../../dto/activeDto";
import { Tag, Button } from "antd";
import {
	CheckCircleOutlined,
  EnvironmentOutlined,
  CalendarOutlined
} from "@ant-design/icons";

const statusColorMap = {
	4: "orange", // 停止报名
	5: "purple", // 活动结束
	6: "gray", // 活动取消
	2: "green",
	3: "red",
	1: "blue",
};

export default function AddActiveCard({ myActive }) {

  //const { signInActive } = useAddActiveCard();

  

  const borderColor = `border-l-${statusColorMap[myActive.activitie.activitStatus] || 'blue'}-200`;

	return (
    <div className={`m-2 group ${borderColor} border-l-4 bg-white p-4 rounded-xl shadow-sm hover:shadow-lg transition-all cursor-pointer hover:-translate-y-1`}>
			<div className="flex justify-between items-start">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2 flex-1">
					{myActive.activitie.title}
				</h3>
				<Tag
          color={statusColorMap[myActive.activitie.activitStatus] || "blue"}
          className="rounded-full px-3 flex items-center ml-2"
				>
          {ActivitieStatus[myActive.activitie.activitStatus] || "未知状态"}
				</Tag>
			</div>

      <div className="flex flex-col md:flex-row justify-between gap-3 mt-3">
        <div className="flex-1 space-y-2">
          <div className="flex items-center text-sm text-gray-500">
            <CalendarOutlined className="mr-2 text-blue-400" />
            <span>
              {new Date(myActive.createdAt).toLocaleDateString('zh-CN', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
              })}
            </span>
					</div>
          <div className="flex items-center text-sm text-gray-500">
            <EnvironmentOutlined className="mr-2 text-green-400" />
            <span className="truncate">
              {myActive.activitie?.activeAddress || "未指定地点"}
            </span>
				</div>
				</div>

        {myActive.activitie.activitStatus == 4 && myActive.status == 0 && (
          <div className="flex items-center justify-end md:justify-start">
            <Button
              type="primary"
              size="small"
              icon={<CheckCircleOutlined />}
              className="flex items-center"
              onClick={() => signInActive(myActive.id)}
            >
              立即参与
            </Button>
			</div>
        )}
		</div>
    </div>
	);
}
