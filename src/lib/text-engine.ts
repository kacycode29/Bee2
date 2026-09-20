import type { CefrLevel } from "@prisma/client";
import { isCommonWord } from "@/data/common-words";

export function countWords(body: string): number {
  return body.trim().split(/\s+/).filter(Boolean).length;
}

export function splitSentences(body: string): string[] {
  return body
    .replace(/\n+/g, " ")
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);
}

const CLOZE_COUNT_BY_LEVEL: Record<CefrLevel, number> = {
  A1: 4,
  A2: 5,
  B1: 6,
  B2: 8,
  C1: 8,
  C2: 10,
};

export type ClozeItem = {
  sentence: string;
  answer: string;
  blanked: string;
};

/**
 * Fully mechanical cloze (fill-in-the-blank) generator: removes one
 * distinctive content word per chosen sentence and replaces it with a
 * blank. Always produces a valid, checkable exercise for any text.
 */
export function generateClozeExercise(body: string, level: CefrLevel): ClozeItem[] {
  const sentences = splitSentences(body).filter((s) => s.split(/\s+/).length >= 5);
  const count = Math.min(CLOZE_COUNT_BY_LEVEL[level], sentences.length);
  const step = Math.max(1, Math.floor(sentences.length / Math.max(count, 1)));

  const items: ClozeItem[] = [];
  for (let i = 0; i < sentences.length && items.length < count; i += step) {
    const sentence = sentences[i];
    const words = sentence.match(/[A-Za-z]+(?:'[A-Za-z]+)?/g) ?? [];
    const target = words
      .filter((w) => w.length >= 5 && !isCommonWord(w))
      .sort((a, b) => b.length - a.length)[0];
    if (!target) continue;

    const re = new RegExp(`\\b${target}\\b`);
    const blanked = sentence.replace(re, "_____");
    items.push({ sentence, answer: target, blanked });
  }
  return items;
}
