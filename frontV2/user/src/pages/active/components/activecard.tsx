import dayjs from "dayjs";
import { ActiveDto } from "../../dto/activeDto";
import useActiveCard from "../../hooks/active/useActiveCard";

interface CardProps {
  cardInfo: ActiveDto;
}

export default function ActiveCard({ cardInfo }: CardProps) {
  const { goActiveDetail } = useActiveCard();
  
  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="text-xl font-bold text-center p-4 border-b">
        {cardInfo.title}
      </div>
      <figure className="px-4 pt-4">
        <img
          src={cardInfo.cover}
          alt={cardInfo.title}
          className="rounded-xl w-full h-48 object-cover"
        />
      </figure>
      <div className="card-body p-4">
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <div className="badge badge-outline">
              {cardInfo.type}
            </div>
            <p className="text-sm">
              <span className="font-semibold">地点：</span>
              {cardInfo.activeAddress}
            </p>
            <p className="text-sm">
              <span className="font-semibold">时间：</span>
              {dayjs(cardInfo.startTime).format("YYYY-MM-DD")}
            </p>
          </div>
          <button 
            className="btn btn-primary btn-sm"
            onClick={() => goActiveDetail(cardInfo.id)}
          >
            详情
          </button>
        </div>
      </div>
    </div>
  );
}
