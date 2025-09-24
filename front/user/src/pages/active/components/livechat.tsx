import {
  PaperClipOutlined,
  SendOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Card,
  Input,
  message,
  Popover,
  theme,
  Upload,
} from "antd";
import { useEffect, useRef, useState } from "react";

export default function LiveChat() {
  const { token } = theme.useToken();

  type Msg = {
    id: string;
    text?: string;
    time: string;
    self?: boolean;
    avatar?: string;
    imageUrl?: string;
  };

  const [messages, setMessages] = useState<Msg[]>([
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
    const myMsg: Msg = {
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

  return (
    <Card title="活动直播">
      {/* Message list */}
      <div ref={listRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex items-end ${
              m.self ? "justify-end" : "justify-start"
            }`}
          >
            {!m.self && (
              <Avatar size={32} className="mr-2">
                U
              </Avatar>
            )}
            <div
              className={`max-w-[78%] rounded-2xl px-3 py-2 shadow-sm ${
                m.self
                  ? "bg-blue-600 text-white rounded-br-sm"
                  : "bg-white text-gray-900 border border-gray-100 rounded-bl-sm"
              }`}
            >
              {m.imageUrl ? (
                <img
                  src={m.imageUrl}
                  alt="upload"
                  className="rounded-xl max-w-full"
                />
              ) : (
                <p className="whitespace-pre-wrap break-words">{m.text}</p>
              )}
              <div
                className={`mt-1 text-[10px] ${
                  m.self ? "text-blue-100" : "text-gray-400"
                }`}
              >
                {m.time}
              </div>
            </div>
            {m.self && (
              <Avatar size={32} className="ml-2 bg-blue-50 text-blue-600">
                我
              </Avatar>
            )}
          </div>
        ))}
      </div>

      {/* Composer */}
      <div className="border-t p-3 bg-white">
        <div className="flex items-end gap-2">
          <Popover
            open={emojiOpen}
            onOpenChange={setEmojiOpen}
            content={emojiPanel}
            trigger="click"
            placement="topLeft"
          >
            <Button type="text" icon={<SmileOutlined />} />
          </Popover>

          <Upload
            showUploadList={false}
            beforeUpload={beforeUpload}
            accept="image/*"
          >
            <Button type="text" icon={<PaperClipOutlined />} />
          </Upload>

          <div className="flex-1">
            <Input.TextArea
              value={value}
              onChange={(e) => setValue(e.target.value)}
              autoSize={{ minRows: 1, maxRows: 6 }}
              onPressEnter={onPressEnter}
              placeholder="输入消息，Enter 发送，Shift+Enter 换行"
              className="!rounded-2xl !border-zinc-200 !px-3 !py-2"
            />
          </div>

          <Button
            type="primary"
            icon={<SendOutlined />}
            loading={sending}
            onClick={onSend}
            className="!rounded-2xl"
            disabled={!value.trim()}
          >
            发送
          </Button>
        </div>
      </div>
    </Card>
  );
}
