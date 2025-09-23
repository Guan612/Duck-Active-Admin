import dayjs from "dayjs";
import {
  LeftOutlined,
  CheckCircleOutlined,
  EnvironmentOutlined,
  CalendarOutlined,
  TagOutlined,
} from "@ant-design/icons";
import { Button, Card, Tag, Typography, Grid, Image, Space } from "antd";
import useActiveDetail from "../../../hooks/active/useactivedetail";
import { ActivitieStatus, ActivitieType } from "../../../dto/activeDto";
import LiveChat from "./livechat";

const { Title, Text } = Typography;
const { useBreakpoint } = Grid;

export default function ActiveDetail() {
  const { backActive, activeDetail, joinActive, joinStatus } =
    useActiveDetail();
  const screens = useBreakpoint();

  const statusColorMap = {
    4: "orange", // 停止报名
    5: "purple", // 活动结束
    6: "gray", // 活动取消
    2: "green",
    3: "red",
    1: "blue",
  };
  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <Card className="rounded-2xl shadow-xs mb-6">
        <Button
          icon={<LeftOutlined />}
          onClick={backActive}
          className="mb-4 flex items-center"
          type="text"
        >
          返回活动列表
        </Button>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/2">
            <Image
              src={activeDetail.activitieImgUrl}
              className="rounded-xl object-cover"
              height={screens.md ? 400 : 240}
              preview={false}
            />
          </div>
          <div className="flex-1">
            <Space className="mb-4" align="start">
              <Tag
                color={statusColorMap[activeDetail.activitStatus] || "blue"}
                className="text-sm px-3 py-1 rounded-full"
              >
                {ActivitieStatus[activeDetail.activitStatus] || "未知状态"}
              </Tag>
              <Title level={3} className="m-0">
                {activeDetail.title}
              </Title>
            </Space>

            <div className="grid gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center">
                  <TagOutlined className="text-lg mr-2 text-purple-500" />
                  <Text strong>类型：</Text>
                  <Tag color="geekblue" className="ml-2">
                    {ActivitieType[activeDetail.activitieType] || "未知类型"}
                  </Tag>
                </div>

                <div className="flex items-center">
                  <CalendarOutlined className="text-lg mr-2 text-orange-500" />
                  <Text strong>时间：</Text>
                  <Text className="ml-2">
                    {dayjs(activeDetail.startDate).format("YYYY/MM/DD HH:mm")} -
                    {dayjs(activeDetail.endDate).format("YYYY/MM/DD HH:mm")}
                  </Text>
                </div>

                <div className="flex items-center">
                  <EnvironmentOutlined className="text-lg mr-2 text-red-500" />
                  <Text strong>地点：</Text>
                  <Text className="ml-2" ellipsis>
                    {activeDetail.activeAddress}
                  </Text>
                </div>

                <div className="flex items-center">
                  <CheckCircleOutlined className="text-lg mr-2 text-green-500" />
                  <Text strong>人数：</Text>
                  <Text className="ml-2">
                    <span className="text-blue-600">
                      {activeDetail.remainingNum}
                    </span>
                    <span className="mx-1">/</span>
                    <span>{activeDetail.activitiePeopleNum}</span>
                  </Text>
                </div>
              </div>

              <Card
                title="活动详情"
                bordered={false}
                className="rounded-xl bg-gray-50"
              >
                <Text className="text-gray-700 whitespace-pre-wrap">
                  {activeDetail.content}
                </Text>
              </Card>

              <div className="flex justify-end mt-6">
                <Button
                  type="primary"
                  size="large"
                  icon={joinStatus ? <CheckCircleOutlined /> : null}
                  disabled={activeDetail.activitStatus != 2 || joinStatus}
                  onClick={() => joinActive(activeDetail.id)}
                  className="min-w-[120px] h-12 text-lg rounded-full"
                >
                  {joinStatus ? "已报名" : "立即参加"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
      <div className="mt-2">
        {activeDetail.activitStatus == 4 ? (
          <LiveChat />
        ) : (
          <div className="text-center mt-1 font-bold">
            活动中可以在这里看同学们的实时聊天哦
          </div>
        )}
      </div>
    </div>
  );
}