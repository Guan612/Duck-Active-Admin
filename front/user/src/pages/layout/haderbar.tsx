import { Avatar, Button, Popover, Dropdown } from "antd";
import useHeaderBar from "../../hooks/layout/usehaderbar";
import { UnorderedListOutlined } from "@ant-design/icons";

export default function HeaderBar() {
	const { Search, onSearch, userInfo, logOut, goLogin } = useHeaderBar();
	const myPop = (
		<div className="flex flex-col justify-center items-center">
			<Button className="m-2">个人中心</Button>
			<Button onClick={logOut}>退出登录</Button>
		</div>
	);

	const flexMenu = [
		{
			key: "1",
			label: (
				<a
					rel="noopener noreferrer"
					href="/"
				>
					首页
				</a>
			),
		},
		{
			key: "2",
			label: (
				<a
					rel="noopener noreferrer"
					href="/active"
				>
					活动
				</a>
			),
		},
		{
			key: "3",
			label: (
				<a
					rel="noopener noreferrer"
					href="/me"
				>
					我的
				</a>
			),
		},
	];
	return (
		<div>
			<div className="flex flex-row bg-gradient-to-r from-transblue via-white to-transpink items-center">
				<div className="m-3 flex flex-row items-center w-full justify-between">
					<div className="flex items-center">
						<div className="md:hidden flex flex-row">
							<Dropdown menu={{ items: flexMenu }}>
								<Button
									type="dashed"
									icon={<UnorderedListOutlined />}
								></Button>
							</Dropdown>
						</div>
						<div className="font-bold text-2xl p-2">鸭鸭活动</div>
						<div className="hidden md:flex flex-row ">
							<div className="mx-2 font-bold hover:scale-110">
								首页
							</div>
							<div className="mx-2 font-bold hover:scale-110">
								活动
							</div>
							<div className="mx-2 font-bold hover:scale-110">
								我的
							</div>
						</div>
					</div>

					<div className="flex justify-center items-center">
						<div className="hidden md:flex mx-2">
							<Search
								placeholder="输入以搜索"
								enterButton
								onSearch={onSearch}
								size="large"
							/>
						</div>
						{userInfo ? (
							<Popover content={myPop}>
								<div className="flex justify-center items-center">
									<div className="mx-1 font-bold text-white">
										{userInfo.nickname || userInfo.loginId}
									</div>
									<Avatar
										src="https://api.qicaiyun.top/sjtx/api.php?lx=c3"
										size={"large"}
									/>
								</div>
							</Popover>
						) : (
							<div className="mx-1">
								<Button onClick={goLogin}>去登录</Button>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
