import useTask from '@/hooks/getTask'
import React from 'react'

declare type TaskDropDownProps={
    taskListId:string,
    searchParams: {
      search?: string;
      status?:string;
      priority?: string;
      assignedTOMe?: string;
    };
}
function TaskDropDown({taskListId,searchParams}:TaskDropDownProps) {
    const {data=[],error,isLoading}=useTask(taskListId,searchParams?.search,searchParams?.status,searchParams?.priority,searchParams?.assignedTOMe);
  return (
    <div>{data?.map((task:any)=>{
      return (<div>{task.title}</div>)
    })}</div>
  )
}

export default TaskDropDown