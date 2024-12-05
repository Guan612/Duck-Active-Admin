import { useNavigate } from "react-router-dom";
export default function useActiveDetail() {
   const navigate = useNavigate();

   const backActive = () => {
      navigate("/active");
   }

   return {
      backActive
   }
}