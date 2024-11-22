import { Input } from "antd";
export default function useHeaderBar() {
    const { Search } = Input;
    const onSearch = (value:string) => {
        console.log(value);
    }

    return { Search, onSearch }
}