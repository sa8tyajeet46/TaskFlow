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
    
    const projectMembers = await prisma.projectMember.findMany({
      where: {
        projectId: id
      },
      include:{
        user:true
      }
    });
    const faltArray=projectMembers.map((item) => {
        // Extract user data
        const { user } = item;
        
        // Create flattened object by combining the item and user properties
        const flattened = {
          id: item.id,
          projectId: item.projectId,
          userId: item.userId,
          role: item.role,
          createdAt: item.createdAt,
          // User properties
          userName: user.name,
          userImage: user.image,
          userEmail: user.email,
          userEmailVerified: user.emailVerified,
          userHashedPassword: user.hashedPassword,
          userCreatedAt: user.createdAt,
          userUpdateAt: user.updateAt,
          userFavoriteIds: user.favoriteIds
        };
        
        return flattened;
    });
    return Response.json(faltArray);
  } catch (error) {
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}