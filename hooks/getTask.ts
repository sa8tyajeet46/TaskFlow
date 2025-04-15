import fetcher from "@/lib/fetcher";
import queryString from "query-string";
import useSWR from "swr";

const useTask = (id:string,search?:string,status?:string,priority?:string,assignedTOMe?:string) => {
  const query = {
    search: search,
    status: status,
    priority:priority,
    assignedTOMe:assignedTOMe,
  };
  
  // Construct the URL with all parameters in one go
  const url = queryString.stringifyUrl(
    {
      url: `/api/getTaskList/${id}`, // replace with your actual base path
      query: query,
    },
    {
      skipEmptyString: true,
      skipNull: true,
    }
  );
 
  const { data, isLoading, error ,mutate} = useSWR(url, fetcher,
    {
    // revalidateIfStale: false,
    // revalidateOnFocus: false,
    // revalidateOnReconnect: false,
  }
);
  return { data, isLoading, error, mutate };
};

export default useTask;
