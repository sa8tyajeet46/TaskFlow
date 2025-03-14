"use server"
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { ChartNoAxesColumnDecreasing } from "lucide-react";

export default async function CreateTask(
    title: string,
  description: string,
  projectId: string,
  taskListId: string,
  createdById:string,
  status?:string,
  priority?:string,
  dueDate?:Date,


  assignedToId?:string,

) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return Error("user not authenticated");
    }
    const user = await prisma.user.findUnique({
      where: {
        email: session?.user?.email ?? ""
      }
    });
   
    console.log(assignedToId)

      const task = await prisma.task.create({
        data: {
         title:title,
         description:description,
         projectId:projectId,
         taskListId:taskListId,
         status:status,
         priority:priority,
         dueDate:dueDate,
         createdById:user?.id ?? "",
         assignedToId:assignedToId,
         estimatedHours:0.00,
        },
      });

    
      

    return task;
  } catch (error) {
    console.log(error);
    return Error("Internal Server Error");
  }
}
