import {
  PaperClipOutlined,
  SendOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Card, Input, Popover, Upload } from "antd";
import useLiveChat from "../../../hooks/active/uselivechat";

export default function LiveChat() {
  const {
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
  } = useLiveChat();
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
            {m.self && <Avatar size={32} className="ml-2" src={myAvatarUrl} />}
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
