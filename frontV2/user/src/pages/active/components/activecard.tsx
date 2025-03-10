import dayjs from "dayjs";
import { ActiveDto } from "../../../dto/activeDto";
import useActiveCard from "../../../hooks/active/useactivecard";

export default function ActiveCard({cardItem}: {cardItem: ActiveDto}) {
  const {goActiveDetail} = useActiveCard();

  return (
    <div className="card bg-base-100 flex flex-col m-2 shadow-sm hover:shadow-2xl">
      <figure>
        <img
          src={cardItem.activitieImgUrl}
          alt="Shoes"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{cardItem.title}</h2>
        <p>
          {cardItem.content}
        </p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">快速报名</button>
          <button className="btn btn-info" onClick={() => goActiveDetail(cardItem.id)}>详情</button>
        </div>
      </div>
    </div>
  );
}
