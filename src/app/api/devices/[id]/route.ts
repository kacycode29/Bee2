import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Non authentifié." }, { status: 401 });
  }
  const { id } = await params;

  const activation = await prisma.activation.findUnique({ where: { id } });
  if (!activation || activation.userId !== session.user.id) {
    return NextResponse.json({ error: "Appareil introuvable." }, { status: 404 });
  }

  await prisma.activation.update({ where: { id }, data: { revoked: true } });
  return NextResponse.json({ ok: true });
}
