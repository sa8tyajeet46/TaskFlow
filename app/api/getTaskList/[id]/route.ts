import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

// Export the handler function directly
export async function GET(
  req: Request,
  { params }: { params: { id?: string } }
) {
  try {
    const session = await auth();
    
    if (!session?.user?.email) {
      return Response.json({ error: "user not authenticated" }, { status: 401 });
    }
    
    const { id } = params;
    
    const taskList = await prisma.taskList.findMany({
      where: {
        projectId: id
      },
    });
    
    return Response.json(taskList);
  } catch (error) {
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}