import { useNavigate } from "react-router";
import useLogin from "../../hooks/login/uselogin";

export default function Login() {
	const navigate = useNavigate();
	const { register, handleSubmit, errors, isSubmitting, onSubmit } =
		useLogin();

	return (
		<div className="flex justify-center items-center h-screen">
			<div className="p-8 rounded-lg shadow-md">
				<form onSubmit={handleSubmit(onSubmit)}>
					<fieldset className="fieldset w-xs bg-base-200 border border-base-300 p-4 rounded-box">
						<legend className="fieldset-legend text-2xl font-bold">
							活动管理登录
						</legend>

						<label className="fieldset-label">登录账号</label>
						<input
							{...register("loginId")}
							type="text"
							className={`input ${
								errors.loginId ? "input-error" : ""
							}`}
							placeholder="请输入登录账号"
						/>
						{errors.loginId && (
							<div className="text-error text-sm mt-1">
								{errors.loginId.message}
							</div>
						)}

						<label className="fieldset-label mt-4">密码</label>
						<input
							{...register("password")}
							type="password"
							className={`input ${
								errors.password ? "input-error" : ""
							}`}
							placeholder="请输入登录密码"
						/>
						{errors.password && (
							<div className="text-error text-sm mt-1">
								{errors.password.message}
							</div>
						)}

						<button
							type="submit"
							className="btn btn-primary mt-6 w-full"
							disabled={isSubmitting}
						>
							{isSubmitting ? "登录中..." : "登录"}
						</button>

						<div className="mt-4 text-center text-gray-500 text-sm">
							还没有账号?
						</div>
						<button
							type="button"
							className="btn btn-accent mt-2 w-full"
							onClick={() => navigate("/register")}
						>
							立即注册
						</button>
					</fieldset>
				</form>
			</div>
		</div>
	);
}
