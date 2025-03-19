import { useEffect, useState } from "react";
import useSocket from "../../api/socket";
import { message } from "antd";

export default function useLayout() {
	const socket = useSocket("active");
	const [activeMessage, setActiveMessage] = useState("");

	//语音播报功能
	const speak = (text: string) => {
		const utterance = new SpeechSynthesisUtterance(text);
		window.speechSynthesis.speak(utterance);
	};

	// 系统通知功能
	const showNotification = (title: string, message: string) => {
		// 检查浏览器是否支持通知
		if ("Notification" in window) {
			// 请求通知权限
			if (Notification.permission === "granted") {
				// 显示通知
				new Notification(title, { body: message });
			} else if (Notification.permission !== "denied") {
				// 请求权限
				Notification.requestPermission().then((permission) => {
					if (permission === "granted") {
						new Notification(title, { body: message });
					}
				});
			}
		}
	};

	useEffect(() => {
		const hadleActive = (data) => {
			if (data) {
				speak(data.message);
				showNotification("活动开始通知", data.message + "开始");
				message.info(data.message + "开始");
			}
		};

		socket.on("startActivity", hadleActive);

		return () => {
			socket.off("startActivity", hadleActive);
		};
	}, [socket]);
}
