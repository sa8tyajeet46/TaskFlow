"use server"
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export  async function CreateTaskList(
projectId:string,
name:string,
position?:number
) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return Error("user not authenticated");
    }

    const taskList = await prisma.taskList.create({
      data: {
        projectId: projectId,
        name: name,
        position: position,
      },
    });

    return taskList;
  } catch (error) {
    return Error("Internal Server Error");
  }
}
