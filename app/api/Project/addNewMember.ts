"use server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";


export default async function addMemberToProject(
  id: string,
  projectId:string
) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return {
        success: false,
        message: "user not authenticated",
      };
    }

    const user = await prisma.user.findUnique({
      where: {
        email: session?.user?.email ?? "",
      },
    });

    if (!user) {
      return {
        success: false,
        message: "user not authenticated",
      };
    }

    const project = await prisma.project.findUnique({
      where: {
        id: projectId,
      },
    });
    if (!project) {
      return {
        success: false,
        message: "Project not found",
      };
    }

    const usertobeAdded = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    if (!usertobeAdded) {
      return {
        success: false,
        message: "user not found",
      };
    }

    const isUserAdminOfProject = await prisma.projectMember.findFirst({
      where: {
        projectId: project.id,
        userId: user?.id,
      },
    });

    if (isUserAdminOfProject?.role != "admin") {
      return {
        success: false,
        message: "only admin can add new members",
      };
    }

    const isAlreadyaMember = await prisma.projectMember.findFirst({
      where: {
        projectId: projectId,
        userId: usertobeAdded?.id ?? "",
      },
    });

    if (isAlreadyaMember) {
      return {
        success: false,
        message: "already a member",
      };
    }

    const projectMember = await prisma.projectMember.create({
      data: {
        projectId: project.id,
        userId: usertobeAdded.id,
      },
    });

    return {
      success: true,
      message: "joined successfully",
      projectMember,
    };
  } catch (error) {
    return {
      success: false,
      message: "Internal Server Error",
    };
  }
}
