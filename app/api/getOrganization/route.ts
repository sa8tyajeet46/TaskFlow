import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

const GET = async () => {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return Response.json(
        { error: "user not authenticated" },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        email: session?.user?.email ?? "",
      },
    });

    const org = await prisma.organizationMember.findMany({
      where: {
        userId: user?.id,
      },
      include: {
        organization: true,
      },
    });

    // Get member count for each organization
    const orgWithMemberCount = await Promise.all(
      org.map(async (orgMember) => {
        const memberCount = await prisma.organizationMember.count({
          where: {
            organizationId: orgMember.organizationId,
          },
        });

        return {
          ...orgMember,
          organizationName: orgMember.organization.name,
          memberCount: memberCount,
        };
      })
    );

    return Response.json(orgWithMemberCount);
  } catch (error) {
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
};

export { GET };