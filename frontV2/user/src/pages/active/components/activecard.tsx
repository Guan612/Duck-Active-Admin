//import dayjs from "dayjs";
//import { ActiveDto } from "../../dto/activeDto";
//import useActiveCard from "../../hooks/active/useActiveCard";

export default function ActiveCard() {
  return (
    <div className="card bg-base-100 flex flex-col m-2 shadow-sm hover:shadow-2xl">
      <figure>
        <img
          src="https://onsitego.com/blog/wp-content/uploads/2021/07/Apple-Music-Dolby-Atmos.jpg"
          alt="Shoes"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">杜比全景声试听</h2>
        <p>
          Apple Music X Dolby Atoms和苹果音乐一起在杜比全景声
        </p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">快速报名</button>
          <button className="btn btn-info">详情</button>
        </div>
      </div>
    </div>
  );
}
