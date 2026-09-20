import { prisma } from "@/lib/prisma";
import type { CefrLevel } from "@prisma/client";
import {
  buildActivities,
  buildAssessment,
  buildObjectives,
  buildWarmup,
  extractKeyVocabulary,
} from "@/lib/text-engine";

export async function generateLessonPlan({
  textId,
  userId,
  level,
  durationMin,
}: {
  textId: string;
  userId: string;
  level: CefrLevel;
  durationMin: number;
}) {
  const text = await prisma.text.findUniqueOrThrow({ where: { id: textId } });

  const vocabulary = extractKeyVocabulary(text.body, level).map((v) => ({
    word: v.word,
    sentence: v.sentence,
  }));

  const lessonPlan = await prisma.lessonPlan.create({
    data: {
      title: `${text.title} — fiche ${level}`,
      level,
      durationMin,
      objectives: buildObjectives(text.theme, level),
      warmup: buildWarmup(text.theme),
      vocabulary,
      activities: buildActivities(text.theme, level, durationMin),
      assessment: buildAssessment(level),
      textId: text.id,
      createdById: userId,
    },
  });

  return lessonPlan;
}
