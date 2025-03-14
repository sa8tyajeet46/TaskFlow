import fetcher from "@/lib/fetcher";
import useSWR from "swr";

const useProjectMembers = (id:string) => {
  const { data, isLoading, error ,mutate} = useSWR(`/api/getProjectMembers/${id}`, fetcher, 
    {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  }
);
  return { data, isLoading, error, mutate };
};

export default useProjectMembers;
