import { useMutation } from "@tanstack/react-query";
import axios from "axios";
export const useSubscribe = () => {
    return useMutation({
      mutationFn: async(email) => {
        console.log(email)
        let res = await axios.post('/api/home/subscribe',email).then((res) => res.data)
        console.log(res.subscribe)
        return res
      },
    });
  };