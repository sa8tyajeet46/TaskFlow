"use client";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useDebounce } from "use-debounce";
import queryString from "query-string";

type SearchInputProps = {
  id: string;
};

function SearchInput({ id }: SearchInputProps) {
  const router = useRouter();
  const [value, setValue] = useState("");
  const [debouncedValue] = useDebounce(value, 500); // faster debounce for better UX

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    const currentQueryParams = queryString.parse(window.location.search);
    const newQueryParams = {
      ...currentQueryParams,
      search: debouncedValue,
    };

    const url = queryString.stringifyUrl(
      {
        url: `/project/${id}`,
        query: newQueryParams,
      },
      {
        skipEmptyString: true,
        skipNull: true,
      }
    );

    router.push(url);
  }, [debouncedValue]);

  return (
    <div className="relative w-full max-w-md hidden lg:block">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
      <Input
        type="text"
        placeholder="Search tasks..."
        value={value}
        onChange={handleSearch}
        className="pl-10 py-2 bg-white border border-gray-300 rounded-xl shadow-sm focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 transition"
      />
    </div>
  );
}

export default SearchInput;
