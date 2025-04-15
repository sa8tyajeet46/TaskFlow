"use server"
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export default async function updateTaskList(
  taskid: string,
 
  newTaskListId: string,
  
) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return Error("user not authenticated");
    }

   const task=await prisma.task.findUnique({
    where:{
        id:taskid
    }
   });

   if(!task)
   {
    return Error("task not found");
   }

   await prisma.task.update({
    where:{
        id:taskid
    },
    data:{
        taskListId:newTaskListId
    }
   })

    return task;
  } catch (error) {
    // console.log(error);
    return Error("Internal Server Error");
  }
}
