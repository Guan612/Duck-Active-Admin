export default function Register() {
	return (
		<div className="flex justify-center items-center h-screen">
			<div className="p-8 rounded-lg shadow-md">
				<fieldset className="fieldset w-xs bg-base-200 border border-base-300 p-4 rounded-box">
					<legend className="fieldset-legend text-2xl font-bold">
						活动管理注册
					</legend>
					<label className="fieldset-label">LoginId</label>
					<input
						type="email"
						className="input"
						placeholder="登录id"
					/>
					<label className="fieldset-label">昵称</label>
					<input type="text" className="input" placeholder="用户名" />
					<label className="fieldset-label">密码</label>
					<input
						type="password"
						className="input"
						placeholder="密码"
					/>
					<label className="fieldset-label">确认密码</label>
					<input
						type="password"
						className="input"
						placeholder="确认密码"
					/>
					<label className="fieldset-label">邮箱</label>
					<input type="email" className="input" placeholder="邮箱" />
                    <button type="submit" className="btn btn-primary">
						注册
					</button>
                    <div className="text-center text-md">已经有账号了？<a href="/login" className="text-accent">去登录</a></div>
				</fieldset>
			</div>
		</div>
	);
}
