import { Button, Form, Input, Modal, Select } from "antd";
import useUserInfo from "../../../hooks/me/useuserinfo";
import AddActiveCard from "./addactivecard";
import useAddActiveCard from "../../../hooks/me/useaddactivecard";
import { ActiveDto } from "../../../dto/activeDto";
export default function UserInfo() {
  const {
    userInfo,
    myActive,
    activeStatusOptions,
    changeUserInfoflag,
    handleActiveChange,
    openChangeUserInfo,
    isChangeUserInfoOk,
    handleChangeUserInfCancel,
  } = useUserInfo();
  const { cardItems } = useAddActiveCard();
  return (
    <div className="flex flex-col">
      <div className="flex flex-col items-center mt-2">
        <img
          src={
            userInfo?.headerimg ||
            "https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png"
          }
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
        <Button onClick={openChangeUserInfo}>修改信息</Button>
        <Modal
          title="修改用户信息"
          open={changeUserInfoflag}
          onCancel={handleChangeUserInfCancel}
        >
          <Form 
            className="" 
            layout="vertical"
            onFinish={(values) => {
              isChangeUserInfoOk(values);
              handleChangeUserInfCancel();
            }}
          >
            <Form.Item label="修改昵称" name="nickname" className="m-2">
              <Input placeholder="请输入新昵称" />
            </Form.Item>

            <Form.Item label="修改邮箱" name="email" className="m-2">
              <Input placeholder="邮箱" />
            </Form.Item>

            <Form.Item 
              label="旧密码" 
              name="oldPassword"
              dependencies={['newPassword']}
              rules={[
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (getFieldValue('newPassword') && !value) {
                      return Promise.reject(new Error('修改密码需要输入旧密码'));
                    }
                    return Promise.resolve();
                  },
                }),
              ]}
              className="m-2"
            >
              <Input.Password placeholder="输入旧密码（修改密码时必填）" />
            </Form.Item>

            <Form.Item
              label="新密码"
              name="newPassword"
              dependencies={['oldPassword']}
              rules={[
                { min: 6, message: '密码至少6位' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (getFieldValue('oldPassword') && !value) {
                      return Promise.reject(new Error('修改密码需要输入新密码'));
                    }
                    return Promise.resolve();
                  },
                }),
              ]}
              className="m-2"
            >
              <Input.Password placeholder="请输入新密码（修改密码时必填）" />
            </Form.Item>

            <Form.Item
              label="确认新密码"
              name="confirmPassword"
              dependencies={['newPassword']}
              rules={[
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (getFieldValue('newPassword') && !value) {
                      return Promise.reject(new Error('请确认新密码'));
                    }
                    if (value && getFieldValue('newPassword') !== value) {
                      return Promise.reject(new Error('两次输入的密码不一致'));
                    }
                    return Promise.resolve();
                  },
                }),
              ]}
              className="m-2"
            >
              <Input.Password placeholder="请确认新密码（修改密码时必填）" />
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit" type="primary">确定更改</Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>

      <div className="flex flex-col ">
        <div className="text-xl font-bold text-center">我的活动信息</div>
        <Select
          className="w-1/2 mx-auto m-2"
          mode="multiple"
          allowClear
          placeholder="筛选活动状态"
          onChange={handleActiveChange}
          options={activeStatusOptions}
        />

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 max-w-7xl mx-auto m-2">
          {myActive?.map((cardInfo) => (
            <div
              className="rounded-xl m-1 bg-transblue hover:shadow-xl hover:scale-105"
              key={cardInfo.id}
            >
              <AddActiveCard myActive={cardInfo} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
