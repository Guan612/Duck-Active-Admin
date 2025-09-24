import { message, theme, Upload } from "antd";
import { useEffect, useRef, useState } from "react";
import useScoket from "../../api/socket";
import userStore from "../../stores/userstore";
export default function useLiveChat() {
  const { userInfo } = userStore();
  const { token } = theme.useToken();
  const socket = useScoket("chat");

  const myAvatarUrl = userInfo.headerimg;

  const [messages, setMessages] = useState([
    {
      id: crypto.randomUUID(),
      text: "嗨！这里是一个用 TailwindCSS 和 Ant Design 打造的聊天框示例 👋",
      time: new Date().toLocaleTimeString(),
      self: false,
    },
    {
      id: crypto.randomUUID(),
      text: "看起来不错。我们也可以发图片、表情，回车发送。",
      time: new Date().toLocaleTimeString(),
      self: true,
    },
  ]);

  const [value, setValue] = useState("");
  const [sending, setSending] = useState(false);
  const [emojiOpen, setEmojiOpen] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    requestAnimationFrame(() => {
      listRef.current?.scrollTo({
        top: listRef.current.scrollHeight,
        behavior: "smooth",
      });
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages.length]);

  const onSend = async () => {
    const text = value.trim();
    if (!text) return;
    setSending(true);
    const myMsg = {
      id: crypto.randomUUID(),
      text,
      time: new Date().toLocaleTimeString(),
      self: true,
    };
    setMessages((prev) => [...prev, myMsg]);
    setValue("");
    // simulate reply
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          text: "已收到～这是自动回复 🤖",
          time: new Date().toLocaleTimeString(),
          self: false,
        },
      ]);
      setSending(false);
    }, 600);
  };

  const onPressEnter: React.KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    if (!e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  const emojiPanel = (
    <div className="grid grid-cols-8 gap-2 p-1 max-w-64">
      {"😀😁😂🤣😅😊😍🤩😘😎🤔🙄😴🥱🤯😇👍👎🙏🔥🎉✨💡"
        .split("")
        .filter(Boolean)
        .map((ch, i) => (
          <button
            key={i}
            onClick={() => {
              setValue((v) => v + ch);
              setEmojiOpen(false);
            }}
            className="rounded-lg hover:bg-gray-100 p-1 text-lg"
          >
            {ch}
          </button>
        ))}
    </div>
  );

  const beforeUpload = async (file: File) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error("只能上传图片文件");
      return Upload.LIST_IGNORE;
    }
    const url = URL.createObjectURL(file);
    setMessages((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        time: new Date().toLocaleTimeString(),
        self: true,
        imageUrl: url,
      },
    ]);
    return false; // don't actually upload
  };
  return {
    value,
    messages,
    sending,
    emojiPanel,
    emojiOpen,
    listRef,
    myAvatarUrl,
    setValue,
    onPressEnter,
    onSend,
    setEmojiOpen,
    beforeUpload,
  };
}
