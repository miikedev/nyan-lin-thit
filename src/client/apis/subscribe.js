import { useMutation } from "@tanstack/react-query";

import { instance } from "./apiService";

export const useSubscribe = () => {
    return useMutation({
      mutationFn: async(email) => {
        console.log(email)
        let res = await instance.post('/home/subscribe',email).then((res) => res.data)
        console.log(res.subscribe)
        return res
      },
    });
  };