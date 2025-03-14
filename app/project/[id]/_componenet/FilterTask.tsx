import { Button } from '@/components/ui/button'
import { Label } from '@radix-ui/react-label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import React, { useState } from 'react'
import queryString from 'query-string';
import { useRouter } from 'next/navigation';
import { Checkbox } from '@/components/ui/checkbox';

declare type FilterTaskProps={
    id:string
}
function FilterTask({id}:FilterTaskProps) {
    const router=useRouter();
    const [status,setStatus]=useState("");
    const [priority, setPriority] = useState("");
    const [assignedTOMe,setassignedTOMe]=useState(false);
    
    const handleFilter=(e:React.MouseEvent)=>{
     e.preventDefault();
     const currentQueryParams = queryString.parse(window.location.search);

     const newQueryParams = {
       ...currentQueryParams,
       status: status,
       priority:priority,
       assignedTOMe:assignedTOMe
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
    }
    const cancelFilter=(e:React.MouseEvent)=>{
        e.preventDefault();
        const currentQueryParams = queryString.parse(window.location.search);

     const newQueryParams = {
       
       search: currentQueryParams?.search
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
         
          setStatus("");
          setPriority("");
          setassignedTOMe(false)
          router.push(url);
    }
  return (
     <div className="">
    <div className="">
      <Label htmlFor="status">Status</Label>
      <Select
       value={status} 
       onValueChange={setStatus}
    
       >
        <SelectTrigger>
          <SelectValue placeholder="Select status" />
        </SelectTrigger>
        <SelectContent className='bg-white'>
          <SelectItem value="TODO">To Do</SelectItem>
          <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
          <SelectItem value="REVIEW">Review</SelectItem>
          <SelectItem value="DONE">Done</SelectItem>
        </SelectContent>
      </Select>
    </div>
     <div className="space-y-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select value={priority} onValueChange={setPriority}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="LOW">Low</SelectItem>
                      <SelectItem value="MEDIUM">Medium</SelectItem>
                      <SelectItem value="HIGH">High</SelectItem>
                      <SelectItem value="URGENT">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
    <Checkbox checked={assignedTOMe} onCheckedChange={(checked:boolean)=>{
        setassignedTOMe(checked);
    }}></Checkbox>
      <Label htmlFor="priority">Assigned to me</Label>
    </div>
    <Button onClick={handleFilter}>Apply Filter</Button>
    <Button onClick={cancelFilter}>Remove Filters</Button></div>
  )
}

export default FilterTask