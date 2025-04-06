"use server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import {SignJWT} from "jose"
import nodemailer from 'nodemailer';

export default async function sendOrganizationInvite(
  organizationId: string,
  email: string
) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return {
        success: false,
        message: "user not authenticated",
      };
    }

    if (!organizationId) {
      return {
        success: false,
        message: "please provide organization Id",
      };
    }
    const organization = await prisma.organization.findUnique({
      where: {
        id: organizationId,
      },
    });

    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (user) {
      const organizationMember = await prisma.organizationMember.findUnique({
        where: {
          organizationId_userId: {
            organizationId: organizationId,
            userId: user.id ?? "",
          },
        },
      });
      if (organizationMember) {
        return {
          success: false,
          message: "Already a member",
        };
      }
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);

    const jwt_signed_organizationId = await new SignJWT({
      id: organization?.id,
      email: email,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("2h")
      .sign(secret);

    const link = `${process.env.APP_DOMAIN}/acceptInvitation/${jwt_signed_organizationId}`;

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: true, // Set to true for port 465, otherwise false
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: process.env.NEXT_PUBLIC_EMAIL_TO,
      to: email,

      subject: "Organization Invite",
      text: `click on the link to ${link} join ${organization?.name} from ${email}`,
      // html: message.html,
    });
    return {
      success: true,
      message: "inviataion sent",
    };
  } catch (error) {
    return {
      success:false,
      message: "Internal Server Error",
    };

  }
}
