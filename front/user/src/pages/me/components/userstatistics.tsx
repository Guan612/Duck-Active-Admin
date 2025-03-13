import ReactECharts from "echarts-for-react";
import useUserStatistics from "../../../hooks/me/useuserstatistics";
import { Card, Row, Col, Typography } from "antd";
import { TeamOutlined, RiseOutlined } from "@ant-design/icons";

const { Title } = Typography;

export default function UserStatistics() {
  const { options, options2 } = useUserStatistics();
  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <Title level={3} className="text-center mb-6">
        <TeamOutlined className="mr-2 text-blue-500" />
        用户行为分析
      </Title>

      <Row gutter={[24, 24]} justify="center">
        <Col xs={24} md={12} xl={10}>
          <Card
            title={
              <div className="flex items-center">
                <RiseOutlined className="text-green-500 mr-2" />
                <span>活动参与趋势</span>
              </div>
            }
            bordered={false}
            className="rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
          >
            <div className="h-96">
              <ReactECharts
                option={options}
                style={{ height: "100%", width: "100%" }}
                opts={{ renderer: 'svg' }}
              />
            </div>
            <div className="mt-4 text-gray-500 text-sm">
              近30天活动参与情况统计
            </div>
          </Card>
        </Col>

        <Col xs={24} md={12} xl={10}>
          <Card
            title={
              <div className="flex items-center">
                <RiseOutlined className="text-purple-500 mr-2" />
                <span>完成度分布</span>
              </div>
            }
            bordered={false}
            className="rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
          >
            <div className="h-96">
              <ReactECharts
                option={options2}
                style={{ height: "100%", width: "100%" }}
                opts={{ renderer: 'svg' }}
              />
            </div>
            <div className="mt-4 text-gray-500 text-sm">
              各项活动完成比例分布
            </div>
          </Card>
        </Col>
      </Row>

      <div className="mt-6 text-center text-gray-400 text-sm">
        数据更新于 {new Date().toLocaleDateString()}
      </div>
    </div>
  );
}
