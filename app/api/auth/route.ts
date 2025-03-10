import { auth } from "@/auth";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    const res=!!(await auth())
    return Response.json(res);
  }

