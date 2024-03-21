"use client";

import useDebounce from "@/hooks/use-debounce";
import { useRouter } from "next/navigation";
import qs from "query-string";
import { useEffect, useState } from "react";
import Input from "./Input";

const SearchInput = () => {
    const router=useRouter();
    const[value,setValue]=useState<string>("");
    const debouncedValue=useDebounce<string>(value,500);
    useEffect(()=>{
        const query={title:debouncedValue,};
        const url=qs.stringifyUrl({ 
            url:'/admin',
            query:query
         });
         router.push(url); 
    },[debouncedValue,router]);
    return ( 
        <Input placeholder="Search for symptoms"
        value={value}
        onChange={(e)=>setValue(e.target.value)}
        />
     );
}

export default SearchInput;