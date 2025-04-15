import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

// Export the handler function directly
export async function GET(
  req: NextRequest,
  { params }: { params: { id?: string } }
) {
  try {
    const session = await auth();
    
    if (!session?.user?.email) {
      return Response.json({ error: "user not authenticated" }, { status: 401 });
    }
    const user = await prisma.user.findUnique({
      where: {
        email: session?.user?.email ?? ""
      }
    });

    const { id } = params;

    const searchParams = req.nextUrl.searchParams;
    const search = searchParams.get("search");
    const status = searchParams.get("status");
    const priority = searchParams.get("priority");
    const assignedTOMe = searchParams.get("assignedTOMe");

    const where: any = {
      taskListId: id,
      title: {
        contains: search ?? "",
      },
    };

    // Only add status to the where clause if it exists
    if (status) {
      where.status = status;
    }

    if (priority) {
      where.priority = priority;
    }

    if (assignedTOMe && assignedTOMe === "true") {
      where.assignedToId = user?.id ?? "";
    }
    const tasks = await prisma.task.findMany({
      where
    });
    
    
 
    
    return Response.json(tasks);
  } catch (error) {
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}