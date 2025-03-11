import fetcher from "@/lib/fetcher";
import useSWR from "swr";

const useSingleOrganization = (id:string) => {
  const { data, isLoading, error ,mutate} = useSWR(`/api/getSingleOrganization/${id}`, fetcher, 
    {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  }
);
  return { data, isLoading, error, mutate };
};

export default useSingleOrganization;
