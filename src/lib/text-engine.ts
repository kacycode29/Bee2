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

export function splitParagraphs(body: string): string[] {
  return body
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
}

const VOCAB_COUNT_BY_LEVEL: Record<CefrLevel, number> = {
  A1: 5,
  A2: 6,
  B1: 8,
  B2: 10,
  C1: 12,
  C2: 12,
};

const CLOZE_COUNT_BY_LEVEL: Record<CefrLevel, number> = {
  A1: 4,
  A2: 5,
  B1: 6,
  B2: 8,
  C1: 8,
  C2: 10,
};

export type VocabCandidate = {
  word: string;
  sentence: string;
};

/**
 * Heuristic key-vocabulary extraction: picks distinctive (non-common,
 * alphabetic, length >= 5) words and returns each with a sentence of
 * context from the text. No dictionary is consulted — definitions, when
 * shown, come from curated content (seed texts) or are left for the
 * teacher to fill in for their own imports.
 */
export function extractKeyVocabulary(body: string, level: CefrLevel): VocabCandidate[] {
  const sentences = splitSentences(body);
  const seen = new Set<string>();
  const candidates: VocabCandidate[] = [];

  for (const sentence of sentences) {
    const words = sentence.match(/[A-Za-z]+(?:'[A-Za-z]+)?/g) ?? [];
    for (const raw of words) {
      const word = raw.toLowerCase();
      if (word.length < 5) continue;
      if (isCommonWord(word)) continue;
      if (seen.has(word)) continue;
      seen.add(word);
      candidates.push({ word: raw, sentence });
    }
  }

  candidates.sort((a, b) => b.word.length - a.word.length);
  return candidates.slice(0, VOCAB_COUNT_BY_LEVEL[level]);
}

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

const OBJECTIVE_TEMPLATES: Record<CefrLevel, string> = {
  A1: "Comprendre des mots et expressions très simples liés à {theme} dans un texte court.",
  A2: "Comprendre l'essentiel d'un texte court et simple sur {theme}, en identifiant les informations principales.",
  B1: "Comprendre les points principaux d'un texte clair sur {theme} et en dégager le sens général.",
  B2: "Comprendre le contenu et l'argumentation d'un texte sur {theme}, y compris des détails et des nuances.",
  C1: "Comprendre un texte long et complexe sur {theme}, en identifiant les intentions implicites de l'auteur.",
  C2: "Comprendre et analyser de façon critique un texte riche et nuancé sur {theme}.",
};

export function buildObjectives(theme: string, level: CefrLevel): string[] {
  return [
    OBJECTIVE_TEMPLATES[level].replace("{theme}", theme.toLowerCase()),
    "Acquérir et réemployer le vocabulaire clé du texte à l'oral et à l'écrit.",
    "S'exprimer sur le thème du texte lors d'une activité de production orale ou écrite.",
  ];
}

export function buildWarmup(theme: string): string {
  return `Discussion rapide en classe entière : demander aux élèves ce qu'ils savent déjà sur "${theme}" et noter au tableau 3 à 5 mots qu'ils associent au sujet. Objectif : activer le vocabulaire et les connaissances préalables avant la lecture.`;
}

export type ActivityStep = {
  title: string;
  description: string;
  minutes: number;
};

function roundTo5(n: number): number {
  return Math.max(5, Math.round(n / 5) * 5);
}

export function buildActivities(
  theme: string,
  level: CefrLevel,
  durationMin: number
): ActivityStep[] {
  const warmup = roundTo5(durationMin * 0.1);
  const preReading = roundTo5(durationMin * 0.15);
  const reading = roundTo5(durationMin * 0.3);
  const vocab = roundTo5(durationMin * 0.2);
  const production = roundTo5(durationMin * 0.2);
  const wrapup = Math.max(5, durationMin - warmup - preReading - reading - vocab - production);

  return [
    {
      title: "Mise en route",
      description: `Brainstorming collectif autour du thème "${theme}" pour activer les connaissances des élèves.`,
      minutes: warmup,
    },
    {
      title: "Avant la lecture",
      description:
        "Présenter le titre du texte et faire formuler des hypothèses sur son contenu (prediction). Pré-enseigner 2 ou 3 mots clés indispensables à la compréhension globale.",
      minutes: preReading,
    },
    {
      title: "Lecture et compréhension",
      description:
        "Lecture individuelle silencieuse du texte, puis correction collective des questions de compréhension (vrai/faux et questions ouvertes).",
      minutes: reading,
    },
    {
      title: "Travail sur le vocabulaire",
      description:
        "Les élèves relèvent le vocabulaire clé dans le texte, en déduisent le sens à l'aide du contexte, puis complètent l'exercice à trous.",
      minutes: vocab,
    },
    {
      title: "Production",
      description:
        level === "A1" || level === "A2"
          ? "Activité orale guidée : en binômes, les élèves réemploient 3 mots du texte dans de courtes phrases."
          : "Débat ou production écrite courte : les élèves donnent leur avis sur le sujet en réutilisant le vocabulaire et les idées du texte.",
      minutes: production,
    },
    {
      title: "Bilan",
      description: "Retour collectif sur les objectifs de la séance et annonce du prolongement (devoirs, séance suivante).",
      minutes: wrapup,
    },
  ];
}

export function buildAssessment(level: CefrLevel): string {
  return level === "A1" || level === "A2"
    ? "Évaluation formative à l'oral : capacité à répondre aux questions vrai/faux et à réemployer 2-3 mots de vocabulaire dans une phrase simple."
    : "Évaluation formative : qualité des réponses aux questions de compréhension, pertinence du vocabulaire réemployé lors de la production, participation au débat/à l'écrit.";
}
