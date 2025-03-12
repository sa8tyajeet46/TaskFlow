"use server"
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export default async function CreateProject(
  projectName: string,
  description: string,
  organizationId: string,
  startDate: Date,
  endDate: Date
) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return Error("user not authenticated");
    }

    const project = await prisma.$transaction(async (tx) => {
      const user = await tx.user.findUnique({
        where: {
          email: session?.user?.email ?? "",
        },
      });

      const project = await tx.project.create({
        data: {
          name: projectName,
          description: description,
          organizationId: organizationId,
          startDate: startDate,
          endDate: endDate,
          createdById: user?.id || "",
        },
      });

      const projectMember = await tx.projectMember.create({
        data: {
          projectId: project.id ?? "",
          userId: user?.id ?? "",
          role: "admin",
        },
      });

      return project;
    });

    return project;
  } catch (error) {
    // console.log(error);
    return Error("Internal Server Error");
  }
}
