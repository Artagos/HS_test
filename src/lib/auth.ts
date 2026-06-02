import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-change-in-prod";

export type JWTPayload = {
  userId: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
};

export function signToken(payload: { userId: string; email: string; role: string }): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string): JWTPayload {
  return jwt.verify(token, JWT_SECRET) as JWTPayload;
}

export function getAuthUser(req: NextRequest) {
  const token = req.cookies.get("hs_token")?.value;
  if (!token) return null;
  try {
    return verifyToken(token);
  } catch {
    return null;
  }
}

export function requireAuth(req: NextRequest) {
  const user = getAuthUser(req);
  if (!user) {
    return { error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }), user: null };
  }
  return { error: null, user };
}

export function requireRole(req: NextRequest, role: string) {
  const auth = requireAuth(req);
  if (auth.error) return auth;
  if (auth.user.role !== role) {
    return { error: NextResponse.json({ error: "Forbidden" }, { status: 403 }), user: null };
  }
  return auth;
}
