import { Button } from "antd";

export default function ActiveDetail() {
    return(
        <div className="flex flex-col">
            <div className="flex items-center">
                <Button>返回</Button>
                <h1 className="text-3xl font-bold m-4">活动详情</h1>
            </div>
            
            <div className="flex flex-col md:flex-row ">
                <div className="md:w-1/2 md:m-2">
                    <img src="https://img.yanlutong.com/uploadimg/image/20230214/20230214152352_89729.jpg"></img>
                </div>
                <div className="m-4">
                    <div className="font-bold text-xl">校园原神活动展览</div>
                    <div className="text-gray-500">活动时间：2023年2月14日</div>
                    <div className="text-gray-500">活动地点：校园展览馆</div>
                    <div className="text-gray-500">活动内容：展示原神相关展品，包括角色模型、周边商品等。</div>
                    <div className="text-gray-500">活动对象：全校师生</div>
                    <Button>报名该活动</Button>
                </div>
            </div>
        </div>
    )
}