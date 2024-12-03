import { Button } from "antd";
import useUserInfo from "../../../hooks/me/useuserinfo";
export default function UserInfo() {
	const { userInfo } = useUserInfo();
	return (
		<div className="flex flex-col">
			<div className="flex flex-col items-center mt-2">
				<img
					src={userInfo?.headerimg || "https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png"}
					alt="user"
					className="w-20 rounded-2xl"
				/>
				<h1 className="text-2xl font-bold mt-4">
					{userInfo?.nickname || userInfo?.loginId}
				</h1>
			</div>

			<div className="flex m-2 justify-around items-center">
				<div className="flex flex-col font-bold text-md">
					<div>登录id：{userInfo?.loginId}</div>
					<div>昵称：{userInfo?.nickname || "还没有昵称哦"}</div>
					<div>邮箱：{userInfo?.email || "还没有邮箱哦"}</div>
				</div>
				<Button>修改信息</Button>
			</div>

			<div className="flex">
                <div>参加的活动</div>
            </div>
		</div>
	);
}
