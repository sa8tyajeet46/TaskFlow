"use server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import {decodeJwt, jwtDecrypt, jwtVerify} from "jose"
import nodemailer from 'nodemailer';

export default async function acceptOrganizationInvite(
  id: string
) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return {
        success: false,
        message: "user not authenticated",
      };
    }

    const secretEncoded = new TextEncoder().encode(process.env.JWT_SECRET);

    // Verify and decode the token
    const { payload } = await jwtVerify(id, secretEncoded);

    if (session?.user?.email != payload?.email) {
      return {
        success: false,
        message: "user not authenticated",
      };
    }

    const user = await prisma.user.findUnique({
      where: {
        email: String(payload?.email),
      },
    });
    if (!user) {
      return {
        success: false,
        message: "user not authenticated",
      };
    }

    const organization = await prisma.organization.findUnique({
      where: {
        id: String(payload?.id) ?? "",
      },
    });
    if (!organization) {
      return {
        success: false,
        message: "organization not found",
      };
    }
    const om = await prisma.organizationMember.findUnique({
      where: {
        organizationId_userId: {
          organizationId: organization.id,
          userId: user.id,
        },
      },
    });
    if (om) {
      return {
        success: false,
        message: "already a member",
      };
    }

    const organizationMember = await prisma.organizationMember.create({
      data: {
        userId: user.id,
        organizationId: organization.id,
        role: "member",
      },
    });

    return {
      success: true,
      message: "joined successfully",
      organizationMember,
    };

  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Internal Server Error",
    };
  }
}
