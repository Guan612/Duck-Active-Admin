export default function ActiveDetail() {
  return (
    <div className="flex flex-col">
      <button className="btn btn-primary w-1/12">返回</button>
      <h1>活动详情</h1>
      <img
        className="w-1/2 mx-auto my-4"
        src="https://onsitego.com/blog/wp-content/uploads/2021/07/Apple-Music-Dolby-Atmos.jpg"
        alt="Shoes"
      />
      <p>标题</p>
      <p>描述</p>
      <p>时间</p>
      <p>地点</p>
    </div>
  );
}
