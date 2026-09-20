import { NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { LessonPlanDocument } from "@/components/pdf/LessonPlanDocument";
import type { ActivityStep, VocabCandidate } from "@/lib/text-engine";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Non authentifié." }, { status: 401 });
  }

  const { id } = await params;
  const plan = await prisma.lessonPlan.findUnique({ where: { id }, include: { text: true } });
  if (!plan || (plan.createdById !== session.user.id && session.user.role !== "ADMIN")) {
    return NextResponse.json({ error: "Fiche introuvable." }, { status: 404 });
  }

  const buffer = await renderToBuffer(
    <LessonPlanDocument
      title={plan.title}
      level={plan.level}
      durationMin={plan.durationMin}
      textTitle={plan.text.title}
      objectives={plan.objectives}
      warmup={plan.warmup}
      vocabulary={plan.vocabulary as unknown as VocabCandidate[]}
      activities={plan.activities as unknown as ActivityStep[]}
      assessment={plan.assessment}
    />
  );

  return new NextResponse(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${plan.title.replace(/[^a-z0-9]+/gi, "-")}.pdf"`,
    },
  });
}
