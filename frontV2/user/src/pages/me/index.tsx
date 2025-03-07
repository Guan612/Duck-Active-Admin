export default function Me() {
  return (
    <div className="flex flex-col">
      <h1 className="text-4xl font-bold text-center m-3">个人中心</h1>
      <div className="flex flex-col md:flex-row m-2 justify-around items-center">
        <div className="flex flex-col">
          <div className="card bg-base-100 shadow-md hover:shadow-2xl">
            <div className="card-body">
              <div className="flex flex-row justify-between">
                <h2 className="card-title">个人信息</h2>
                <div className="avatar">
                  <div className="w-16 rounded-full">
                    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                  </div>
                </div>
              </div>
              <p>姓名: 张三</p>
              <p>邮箱: zhangsan@example.com</p>
              <p>电话: 1234567890</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">编辑</button>
              </div>
            </div>
          </div>
          <div className="card bg-base-100 shadow-md hover:shadow-2xl">
            <div className="card-body">
              <h2 className="card-title">我的活动</h2>
              <p>活动1: 杜比全景声试听</p>
              <p>活动2: 产品发布会</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">查看所有活动</button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="card bg-base-100 shadow-md hover:shadow-2xl">
            <div className="card-body">
              <h2 className="card-title">我的收藏</h2>
              <p>收藏1: 杜比全景声试听</p>
              <p>收藏2: 产品发布会</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
