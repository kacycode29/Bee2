import { prisma } from "@/lib/prisma";
import type { SchoolClassLevel, SessionType } from "@prisma/client";
import { CURRICULUM, getUnit, getLesson, type ClassLevel } from "@/data/curriculum";
import {
  generateLearningPhases,
  generateTaskBasedPhases,
  buildLanguageContent,
  buildCompetence,
  type SessionSkill,
} from "@/lib/fiche-pedagogique";

export const CLASS_LEVEL_TO_ENUM: Record<ClassLevel, SchoolClassLevel> = {
  "6e": "SIXIEME",
  "5e": "CINQUIEME",
  "4e": "QUATRIEME",
  "3e": "TROISIEME",
};

export const ENUM_TO_CLASS_LEVEL: Record<SchoolClassLevel, ClassLevel> = {
  SIXIEME: "6e",
  CINQUIEME: "5e",
  QUATRIEME: "4e",
  TROISIEME: "3e",
};

export type CreateLessonPlanInput = {
  userId: string;
  teacherName: string;
  provincialDirectorate?: string;
  school?: string;
  classLabel: string;
  boysCount?: number;
  girlsCount?: number;
  attendance?: string;
  learnersWithSpecialNeeds?: string;
  classLevel: ClassLevel;
  unitNumber: string;
  lessonNumber?: string;
  sessionType: SessionType;
  mainSkill: SessionSkill;
  durationMin: number;
  date?: Date;
};

export async function createOfficialLessonPlan(input: CreateLessonPlanInput) {
  const curriculum = CURRICULUM[input.classLevel];
  const unit = getUnit(input.classLevel, input.unitNumber);
  if (!unit) throw new Error("Unité introuvable.");

  const isLearningOrConsolidation = input.sessionType !== "PROBLEM_SOLVING";
  const targetLessons = isLearningOrConsolidation
    ? (() => {
        if (!input.lessonNumber) throw new Error("Leçon requise pour ce type de séance.");
        const found = getLesson(input.classLevel, input.unitNumber, input.lessonNumber);
        if (!found) throw new Error("Leçon introuvable.");
        return [found.lesson];
      })()
    : unit.lessons;

  const { vocabulary, grammar, functions, objectives: curriculumObjectives } = buildLanguageContent(targetLessons);
  const objectives = curriculumObjectives.length > 0 ? curriculumObjectives : curriculum.genericObjectives ?? [];
  const competence = buildCompetence(curriculum, unit.trimester);

  const lessonTitle = targetLessons.map((l) => l.title).join(" ; ");
  const lessonNumbers = targetLessons.map((l) => l.number).join(",");

  let sessionTitle: string;
  let phasesPayload: unknown;
  let activityContext: string | undefined;
  let appreciationCriteria: string[] = [];
  let expectedProduction: string[] = [];
  let markingGrid: unknown;

  if (input.sessionType === "LEARNING") {
    sessionTitle = targetLessons[0].title;
    phasesPayload = generateLearningPhases({
      unit,
      lesson: targetLessons[0],
      mainSkill: input.mainSkill,
      durationMin: input.durationMin,
      isFirstLessonOfUnit: targetLessons[0].number === unit.lessons[0].number,
    });
  } else {
    const result = generateTaskBasedPhases({
      sessionType: input.sessionType,
      unit,
      lessons: targetLessons,
      durationMin: input.durationMin,
    });
    sessionTitle =
      input.sessionType === "CONSOLIDATION"
        ? `Consolidation — ${targetLessons[0].title}`
        : `Problem solving — ${unit.title}`;
    phasesPayload = result.phases;
    activityContext = result.activityContext;
    appreciationCriteria = result.appreciationCriteria;
    expectedProduction = result.expectedProduction;
    markingGrid = result.markingGrid;
  }

  const lessonPlan = await prisma.lessonPlan.create({
    data: {
      date: input.date ?? new Date(),
      teacherName: input.teacherName,
      provincialDirectorate: input.provincialDirectorate,
      school: input.school,
      classLabel: input.classLabel,
      boysCount: input.boysCount,
      girlsCount: input.girlsCount,
      attendance: input.attendance,
      learnersWithSpecialNeeds: input.learnersWithSpecialNeeds,

      classLevel: CLASS_LEVEL_TO_ENUM[input.classLevel],
      unitNumber: unit.number,
      unitTitle: unit.title,
      lessonNumber: lessonNumbers,
      lessonTitle,
      sessionTitle,

      competence,
      typeOfSession: input.sessionType,
      languageMainSkill: input.mainSkill,
      lessonContentVocab: vocabulary.join(", "),
      lessonContentGrammar: grammar.join(", "),
      languageFunctions: functions.join(", "),
      objectives,
      methodsTechniques: "Approche inductive, interactions (travail individuel, en paires, en groupes).",
      teachingAids: "Tableau, réalia, images/dessins, flashcards, vidéos.",
      durationMin: input.durationMin,

      phases: phasesPayload as object,

      activityContext,
      appreciationCriteria,
      expectedProduction,
      markingGrid: markingGrid as object | undefined,

      createdById: input.userId,
    },
  });

  return lessonPlan;
}
