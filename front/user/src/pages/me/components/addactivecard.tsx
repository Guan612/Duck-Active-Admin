import { RegistrationStatus } from "../../../dto/registrationDto"
import { ActiveDto } from "../../../dto/activeDto"
export default function AddActiveCard({myActive}) {
  return(
    <div>
        <div className="flex flex-col p-1" onClick={() => console.log(myActive)}>
            <div className="font-bold text-xl">{myActive.activitie.title}</div>
            <div className="font-bold">
							{RegistrationStatus[myActive.status] ||
								"未知状态"}
						</div>
        </div>
    </div>
  )
}