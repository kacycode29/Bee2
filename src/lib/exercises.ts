import { prisma } from "@/lib/prisma";
import type { ExerciseType } from "@prisma/client";

export type VocabEntry = { word: string; definition: string };
export type TrueFalseEntry = { statement: string; answer: boolean };

export function parseVocabLines(raw: string): VocabEntry[] {
  return raw
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [word, ...rest] = line.split("::");
      return { word: word.trim(), definition: rest.join("::").trim() };
    })
    .filter((e) => e.word && e.definition);
}

export function parseTrueFalseLines(raw: string): TrueFalseEntry[] {
  return raw
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [statement, answerRaw] = line.split("::");
      const answer = (answerRaw ?? "").trim().toLowerCase().startsWith("v") ||
        (answerRaw ?? "").trim().toLowerCase().startsWith("t");
      return { statement: (statement ?? "").trim(), answer };
    })
    .filter((e) => e.statement);
}

export function parseQuestionLines(raw: string): string[] {
  return raw
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

export function formatVocabLines(entries: VocabEntry[]): string {
  return entries.map((e) => `${e.word} :: ${e.definition}`).join("\n");
}

export function formatTrueFalseLines(entries: TrueFalseEntry[]): string {
  return entries.map((e) => `${e.statement} :: ${e.answer ? "vrai" : "faux"}`).join("\n");
}

/**
 * Each exercise type is stored as a single Exercise row per text, whose
 * `data` holds the whole list (matches how seed content is written).
 */
export async function replaceExercisesOfType(
  textId: string,
  type: ExerciseType,
  items: unknown[]
) {
  await prisma.$transaction([
    prisma.exercise.deleteMany({ where: { textId, type } }),
    ...(items.length > 0
      ? [prisma.exercise.create({ data: { textId, type, order: 0, data: items as object } })]
      : []),
  ]);
}
