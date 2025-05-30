import { Carousel } from "antd";
import useHome from "../../hooks/home/usehome";
import { ActiveDto } from "../../dto/activeDto";
import { RocketOutlined, NotificationOutlined } from "@ant-design/icons";

const ActivityCard = ({ item }: { item: ActiveDto }) => (
  <div className="h-48 bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1.5 m-2">
    <div className="h-32 relative">
      <img
        src={item.activitieImgUrl}
        alt={item.title}
        className="w-full h-full object-cover"
      />
      <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/80 p-3">
        <h3 className="text-white font-bold text-lg truncate">{item.title}</h3>
      </div>
    </div>
    <div className="p-3 flex items-center text-gray-600">
      <RocketOutlined className="mr-2" />
      <span className="text-sm">立即参与</span>
    </div>
  </div>
);

const NewsCard = () => (
  <div className="h-48 bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1.5 m-2">
    <div className="h-32 bg-linear-to-r from-blue-100 to-purple-100 flex items-center justify-center">
      <NotificationOutlined className="text-4xl text-blue-500" />
    </div>
    <div className="p-3">
      <h3 className="font-semibold text-gray-800 truncate">最新行业资讯</h3>
      <p className="text-sm text-gray-500 mt-1 line-clamp-2">
        这里有最新的行业动态和技术分享，及时了解前沿信息...
      </p>
    </div>
  </div>
);

export default function Home() {
  const { newactivities } = useHome();

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <section className="mb-12">
        <Carousel
          autoplay
          effect="fade"
          className="rounded-2xl overflow-hidden shadow-xl"
        >
          {newactivities.map((item: ActiveDto) => (
            <div key={item.id} className="h-96">
              <div className="relative h-full">
                <img
                  src={item.activitieImgUrl}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/80 p-8">
                  <h2 className="text-3xl font-bold text-white mb-4">
                    {item.title}
                  </h2>
                  <button className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-colors">
                    查看详情
                  </button>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <RocketOutlined className="mr-2" />
          <a className="text-blue-500">热门活动</a>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newactivities.length > 0 ? (
            newactivities.map((item: ActiveDto) => (
              <ActivityCard key={item.id} item={item} />
            ))
          ) : (
            <div className="col-span-3 text-center py-12 text-gray-400">
              暂无可参与活动
            </div>
          )}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <NotificationOutlined className="mr-2 " />
          <a className="text-purple-500">最新行业资讯</a>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((item) => (
            <NewsCard key={item} />
          ))}
        </div>
      </section>
    </div>
  );
}
