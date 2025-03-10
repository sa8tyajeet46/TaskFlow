import fetcher from "@/lib/fetcher";
import useSWR from "swr";

const useOrganization = () => {
  const { data, isLoading, error ,mutate} = useSWR(`/api/getOrganization`, fetcher, 
    {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  }
);
  return { data, isLoading, error, mutate };
};

export default useOrganization;
