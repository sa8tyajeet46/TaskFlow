import fetcher from "@/lib/fetcher";
import useSWR from "swr";

const useTaskList = (id:string) => {
  const { data, isLoading, error ,mutate} = useSWR(`/api/getTaskList/${id}`, fetcher, 
    {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  }
);
  return { data, isLoading, error, mutate };
};

export default useTaskList;
