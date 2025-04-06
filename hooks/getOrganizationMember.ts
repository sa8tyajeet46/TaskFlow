import fetcher from "@/lib/fetcher";
import useSWR from "swr";

const useOrganizationMembers = (id:string) => {
  const { data, isLoading, error ,mutate} = useSWR(`/api/getOrganizationMembers/${id}`, fetcher, 
    {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  }
);
  return { data, isLoading, error, mutate };
};

export default useOrganizationMembers;
