import { NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { LessonPlanDocument } from "@/components/pdf/LessonPlanDocument";
import type { Phase, MarkingGrid } from "@/lib/fiche-pedagogique";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Non authentifié." }, { status: 401 });
  }

  const { id } = await params;
  const plan = await prisma.lessonPlan.findUnique({ where: { id } });
  if (!plan || (plan.createdById !== session.user.id && session.user.role !== "ADMIN")) {
    return NextResponse.json({ error: "Fiche introuvable." }, { status: 404 });
  }

  const buffer = await renderToBuffer(
    <LessonPlanDocument
      sessionTitle={plan.sessionTitle}
      unitNumber={plan.unitNumber}
      unitTitle={plan.unitTitle}
      lessonNumber={plan.lessonNumber}
      lessonTitle={plan.lessonTitle}
      typeOfSession={plan.typeOfSession}
      date={plan.date.toLocaleDateString("fr-FR")}
      teacherName={plan.teacherName}
      provincialDirectorate={plan.provincialDirectorate}
      school={plan.school}
      classLabel={plan.classLabel}
      boysCount={plan.boysCount}
      girlsCount={plan.girlsCount}
      attendance={plan.attendance}
      learnersWithSpecialNeeds={plan.learnersWithSpecialNeeds}
      competence={plan.competence}
      languageMainSkill={plan.languageMainSkill}
      lessonContentVocab={plan.lessonContentVocab}
      lessonContentGrammar={plan.lessonContentGrammar}
      languageFunctions={plan.languageFunctions}
      objectives={plan.objectives}
      methodsTechniques={plan.methodsTechniques}
      teachingAids={plan.teachingAids}
      durationMin={plan.durationMin}
      phases={plan.phases as unknown as Phase[]}
      activityContext={plan.activityContext}
      appreciationCriteria={plan.appreciationCriteria}
      expectedProduction={plan.expectedProduction}
      markingGrid={plan.markingGrid as unknown as MarkingGrid | null}
    />
  );

  return new NextResponse(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${plan.sessionTitle.replace(/[^a-z0-9]+/gi, "-")}.pdf"`,
    },
  });
}
