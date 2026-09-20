import type { ClassCurriculum, CurriculumLesson, CurriculumUnit } from "@/data/curriculum";
import { buildCompetenceStatement } from "@/data/curriculum";

export type PhaseStep = {
  title: string;
  timingMin: number;
  teacherActivities: string[];
  learnerActivities: string[];
  techniques?: string;
  remarks?: string;
};

export type Phase = {
  name: string;
  steps: PhaseStep[];
};

export type MarkingGridIndicator = { indicator: string; points: number };
export type MarkingGridRow = {
  instruction: string;
  pertinence: MarkingGridIndicator[];
  languageAccuracy: MarkingGridIndicator[];
  coherence: MarkingGridIndicator[];
};
export type MarkingGrid = {
  rows: MarkingGridRow[];
  refinement: MarkingGridIndicator[];
  totals: {
    pertinence: number;
    languageAccuracy: number;
    coherence: number;
    refinement: number;
    grand: number;
  };
};

/** Proportionally scales a baseline (55 min) timing map to the target duration. */
function scaleTiming<K extends string>(
  baseline: Record<K, number>,
  targetTotal: number
): Record<K, number> {
  const keys = Object.keys(baseline) as K[];
  const baselineTotal = keys.reduce((sum, k) => sum + baseline[k], 0);
  if (targetTotal === baselineTotal) return baseline;

  const ratio = targetTotal / baselineTotal;
  const scaled = {} as Record<K, number>;
  let allocated = 0;
  keys.forEach((k, i) => {
    if (i === keys.length - 1) {
      scaled[k] = Math.max(1, targetTotal - allocated);
    } else {
      const v = Math.max(1, Math.round(baseline[k] * ratio));
      scaled[k] = v;
      allocated += v;
    }
  });
  return scaled;
}

function lowerFirst(s: string): string {
  return s.length ? s[0].toLowerCase() + s.slice(1) : s;
}

/** Curriculum functions are written as gerunds (e.g. "Greeting", "Introducing
 * oneself"); this turns the leading gerund into its base verb so generated
 * instructions read naturally ("greet…", "introduce…") instead of "Greeting…". */
const GERUND_TO_VERB: Record<string, string> = {
  greeting: "greet",
  introducing: "introduce",
  giving: "give",
  asking: "ask",
  telling: "tell",
  locating: "locate",
  counting: "count",
  seeking: "seek",
  describing: "describe",
  comparing: "compare",
  expressing: "express",
  talking: "talk",
  apologizing: "apologize",
  ordering: "order",
  inviting: "invite",
  accepting: "accept",
  declining: "decline",
  advising: "advise",
  persuading: "persuade",
  sensitising: "sensitise",
  explaining: "explain",
  discussing: "discuss",
  making: "make",
  narrating: "narrate",
  exchanging: "exchange",
  writing: "write",
  recommending: "recommend",
  identifying: "identify",
  using: "use",
  choosing: "choose",
  inflecting: "inflect",
  requesting: "request",
};

function toInstructionPhrase(fn: string): string {
  const words = fn.split(" ");
  const verb = GERUND_TO_VERB[words[0].toLowerCase()];
  if (!verb) return lowerFirst(fn);
  return [verb, ...words.slice(1).map((w) => w.toLowerCase())].join(" ");
}

function listOrFallback(items: string[], fallback: string): string {
  return items.length > 0 ? items.join(", ") : fallback;
}

export type SessionSkill = "Listening" | "Speaking" | "Reading" | "Writing";

// ---------------------------------------------------------------------------
// LEARNING SESSION
// ---------------------------------------------------------------------------

const LEARNING_BASELINE = {
  warmUp: 3,
  review: 5,
  introContext: 7,
  inputStage: 15,
  controlled: 7,
  semiControlled: 8,
  followUp: 3,
  admin: 7,
} as const;

export function generateLearningPhases({
  unit,
  lesson,
  mainSkill,
  durationMin,
  isFirstLessonOfUnit,
}: {
  unit: CurriculumUnit;
  lesson: CurriculumLesson;
  mainSkill: SessionSkill;
  durationMin: number;
  isFirstLessonOfUnit: boolean;
}): Phase[] {
  const t = scaleTiming(LEARNING_BASELINE, durationMin);
  const vocab = listOrFallback(lesson.vocabulary, "le vocabulaire clé de la leçon");
  const grammar = listOrFallback(lesson.grammar, "les structures grammaticales de la leçon");
  const functions = listOrFallback(lesson.functions, lesson.title);

  const discovery: Phase = {
    name: "DISCOVERY PHASE",
    steps: [
      {
        title: "Warm up",
        timingMin: t.warmUp,
        teacherActivities: [
          "greets the students",
          "asks the date and gets a student to write it on the board",
          "initiates a song, a game, an anecdote or tongue twisters",
        ],
        learnerActivities: ["respond to the greeting", "tell the date and write it on the board", "sing / play / listen"],
        techniques: "individually, then chorally",
      },
      {
        title: "Review of the previous lesson / pre-requisites",
        timingMin: t.review,
        teacherActivities: isFirstLessonOfUnit
          ? ["(not applicable — first lesson of the unit; time redistributed to the following steps)"]
          : ["asks questions on the previous lesson", "gets learners to correct any homework"],
        learnerActivities: isFirstLessonOfUnit ? [] : ["answer questions", "correct their homework"],
      },
      {
        title: "Introducing the lesson and the learning context",
        timingMin: t.introContext,
        teacherActivities: [
          `presents a short situation related to "${unit.title.toLowerCase()}" / "${lesson.title.toLowerCase()}" (oral explanation, picture, short dialogue or realia)`,
          "asks leading questions to make learners predict what the lesson will be about",
          "announces the lesson",
        ],
        learnerActivities: ["observes / listens", "answers the leading questions", "formulates hypotheses about the lesson"],
      },
    ],
  };

  const input: Phase = {
    name: "INPUT STAGE",
    steps: [
      {
        title: "Presenting the new vocabulary items",
        timingMin: Math.ceil(t.inputStage * 0.4),
        teacherActivities: [
          `presents the new words / phrases in context, using realia, pictures, mime, synonyms/antonyms or explanations: ${vocab}`,
          "gets learners to repeat the new items chorally, in rows and individually",
        ],
        learnerActivities: ["listens and repeats", "reads and copies the new vocabulary items"],
        remarks: "Teacher writes model sentences on the board.",
      },
      {
        title: "Presenting the new grammar item(s)",
        timingMin: Math.ceil(t.inputStage * 0.35),
        teacherActivities: [
          `teaches the grammar item(s) inductively, eliciting examples and getting learners to draw the rule: ${grammar}`,
        ],
        learnerActivities: ["observes and analyses the examples", "draws the rule"],
        remarks: "The grammar item(s) can also be taught deductively if necessary.",
      },
      {
        title: "Presenting the skill and activities",
        timingMin: Math.max(1, t.inputStage - Math.ceil(t.inputStage * 0.4) - Math.ceil(t.inputStage * 0.35)),
        teacherActivities: [
          `helps learners familiarise with the tools necessary to perform the ${mainSkill.toLowerCase()} tasks`,
        ],
        learnerActivities: ["observes", "listens / reads", "responds"],
      },
    ],
  };

  const practice: Phase = {
    name: "PRACTICE PHASE (Manipulation stage)",
    steps: [
      {
        title: "Controlled activities",
        timingMin: t.controlled,
        teacherActivities: [
          `engages learners in a controlled activity built on the function(s): ${functions}`,
          "monitors and helps if necessary",
        ],
        learnerActivities: ["performs the task individually"],
        techniques: "gap filling / matching / true-false / MCQ (one correct answer only)",
      },
      {
        title: "Semi-controlled activities",
        timingMin: t.semiControlled,
        teacherActivities: ["engages learners in a semi-controlled activity reusing the new language item(s)", "monitors and helps if necessary"],
        learnerActivities: ["performs the task individually, in pairs or in groups"],
        techniques: "sentence building / short guided dialogue / limited-response questions",
      },
    ],
  };

  const followUp: Phase = {
    name: "FOLLOW-UP / HOMEWORK",
    steps: [
      {
        title: "Homework",
        timingMin: t.followUp,
        teacherActivities: [
          `assigns a short homework activity reusing today's vocabulary and grammar (${lesson.title.toLowerCase()})`,
        ],
        learnerActivities: ["copies the homework"],
      },
    ],
  };

  const admin: Phase = {
    name: "COPYING AND EXECUTING ADMINISTRATIVE TASKS",
    steps: [
      {
        title: "Administrative tasks",
        timingMin: t.admin,
        teacherActivities: [
          "indicates what to copy (the learning situation and the contents of the input stage)",
          "checks attendance",
          "fills in the record book",
        ],
        learnerActivities: ["copies the lesson content", "answers the roll-call"],
      },
    ],
  };

  return [discovery, input, practice, followUp, admin];
}

// ---------------------------------------------------------------------------
// CONSOLIDATION / PROBLEM-SOLVING SESSIONS
// ---------------------------------------------------------------------------

const TASK_BASED_BASELINE = {
  warmUp: 3,
  taskSetting: 5,
  taskExecution: 20,
  presentingResults: 15,
  feedback: 5,
  admin: 7,
} as const;

function buildInstructions(unit: CurriculumUnit, lessons: CurriculumLesson[]): string[] {
  const functions = Array.from(new Set(lessons.flatMap((l) => l.functions))).filter(Boolean);
  const base = functions.length > 0 ? functions : [unit.title];
  const picked = base.slice(0, Math.max(2, Math.min(4, base.length)));
  return picked.map((fn) => {
    const phrase = `${toInstructionPhrase(fn)}, using two (2) sentences.`;
    return phrase[0].toUpperCase() + phrase.slice(1);
  });
}

function buildActivityContext(unit: CurriculumUnit, lessons: CurriculumLesson[]): string {
  const lessonTitles = lessons.map((l) => l.title.toLowerCase()).join(" and ");
  return (
    `At school / at home, a situation comes up that is directly related to "${unit.title}" (${lessonTitles}). ` +
    `Basing on what you studied in this unit, produce a short, coherent oral or written production ` +
    `(a dialogue, a short text or a presentation) in which you:`
  );
}

export function buildMarkingGrid(instructions: string[]): MarkingGrid {
  const rows: MarkingGridRow[] = instructions.map((instruction) => ({
    instruction,
    pertinence: [{ indicator: "The production addresses this instruction.", points: 1 }],
    languageAccuracy: [
      { indicator: "The learner uses appropriate vocabulary.", points: 1 },
      { indicator: "The learner uses appropriate grammar / structures.", points: 1 },
    ],
    coherence: [
      { indicator: "The ideas are relevant and well organised.", points: 1.5 },
      { indicator: "The execution is fluent / the response is correct.", points: 1.5 },
    ],
  }));

  const refinement: MarkingGridIndicator[] = [
    { indicator: "The learner speaks audibly.", points: 1 },
    { indicator: "The learner uses appropriate gestures / presentation.", points: 1 },
  ];

  const totals = {
    pertinence: instructions.length * 1,
    languageAccuracy: instructions.length * 2,
    coherence: instructions.length * 3,
    refinement: 2,
    grand: instructions.length * 6 + 2,
  };

  return { rows, refinement, totals };
}

export function generateTaskBasedPhases({
  sessionType,
  unit,
  lessons,
  durationMin,
}: {
  sessionType: "CONSOLIDATION" | "PROBLEM_SOLVING";
  unit: CurriculumUnit;
  lessons: CurriculumLesson[];
  durationMin: number;
}): {
  phases: Phase[];
  activityContext: string;
  instructions: string[];
  appreciationCriteria: string[];
  expectedProduction: string[];
  markingGrid: MarkingGrid;
} {
  const t = scaleTiming(TASK_BASED_BASELINE, durationMin);
  const instructions = buildInstructions(unit, lessons);
  const activityContext = buildActivityContext(unit, lessons);
  const grammar = Array.from(new Set(lessons.flatMap((l) => l.grammar))).filter(Boolean);
  const vocabulary = Array.from(new Set(lessons.flatMap((l) => l.vocabulary))).filter(Boolean);

  const appreciationCriteria =
    sessionType === "CONSOLIDATION"
      ? [
          "produces a coherent conversation / text",
          `uses appropriate vocabulary (${listOrFallback(vocabulary, "vocabulary of the unit")})`,
          `uses appropriate grammar (${listOrFallback(grammar, "structures of the unit")})`,
          "uses acceptable pronunciation",
          "speaks / writes with acceptable fluency",
        ]
      : [
          "produces a conversation / text that fulfils every instruction",
          "uses an appropriate vocabulary",
          "uses an appropriate grammar",
          "uses an appropriate pronunciation",
          "uses relevant ideas",
          "speaks audibly and uses appropriate gestures (oral productions)",
        ];

  const expectedProduction = instructions.map((instr) => `A production that fulfils: "${instr}"`);

  const preparation: Phase = {
    name: "PREPARATION",
    steps: [
      {
        title: "Warm up",
        timingMin: t.warmUp,
        teacherActivities: ["greets learners", "asks the date and gets it written on the board", "sings a song / plays a short warm-up activity"],
        learnerActivities: ["respond", "tell the date and write it on the board", "sing / play"],
      },
    ],
  };

  const taskSetting: Phase = {
    name: "TASK SETTING",
    steps: [
      {
        title: "Conducting preliminary activities",
        timingMin: t.taskSetting,
        teacherActivities: [
          "brings learners to recall what has been seen in the unit",
          "organises learners in pairs or groups",
          "describes the activity context, gives clear instructions, sets the appreciation criteria and a time limit",
        ],
        learnerActivities: ["listens to / reads the teacher's instructions", "asks questions if necessary", "gets organised"],
        remarks: `Activity context: ${activityContext}\n${instructions.map((i, idx) => `${idx + 1}. ${i}`).join("\n")}`,
      },
    ],
  };

  const taskExecution: Phase = {
    name: sessionType === "PROBLEM_SOLVING" ? "PROBLEM SOLVING (task execution)" : "TASK EXECUTION",
    steps: [
      {
        title: "Solving the task",
        timingMin: t.taskExecution,
        teacherActivities: ["monitors the work", "helps if necessary, without giving the answer"],
        learnerActivities: ["executes the task individually, in pairs or in groups, following the instructions"],
      },
    ],
  };

  const performance: Phase = {
    name: "PERFORMANCE",
    steps: [
      {
        title: "Presenting the results",
        timingMin: t.presentingResults,
        teacherActivities: [
          "listens to / observes the learners' productions",
          "takes notes and writes down recurring mistakes to correct after the performance",
        ],
        learnerActivities: ["presents the production to the class (individually or in pairs/groups)"],
        remarks: "Assessment is always individual, even in a group presentation.",
      },
      {
        title: "Providing feedback",
        timingMin: t.feedback,
        teacherActivities: ["helps learners improve their final productions (language and ideas)"],
        learnerActivities: ["listens to some productions", "makes contributions"],
      },
    ],
  };

  const admin: Phase = {
    name: "COPYING AND EXECUTING ADMINISTRATIVE TASKS",
    steps: [
      {
        title: "Administrative tasks",
        timingMin: t.admin,
        teacherActivities: [
          "indicates what to copy (the activity context and one sample production)",
          "checks attendance and fills in the record book",
        ],
        learnerActivities: ["copies the final production", "answers the roll-call"],
      },
    ],
  };

  return {
    phases: [preparation, taskSetting, taskExecution, performance, admin],
    activityContext,
    instructions,
    appreciationCriteria,
    expectedProduction,
    markingGrid: buildMarkingGrid(instructions),
  };
}

export function buildLanguageContent(lessons: CurriculumLesson[]) {
  const vocabulary = Array.from(new Set(lessons.flatMap((l) => l.vocabulary))).filter(Boolean);
  const grammar = Array.from(new Set(lessons.flatMap((l) => l.grammar))).filter(Boolean);
  const functions = Array.from(new Set(lessons.flatMap((l) => l.functions))).filter(Boolean);
  const objectives = Array.from(new Set(lessons.flatMap((l) => l.objectives))).filter(Boolean);
  return { vocabulary, grammar, functions, objectives };
}

export function buildCompetence(curriculum: ClassCurriculum, trimester: 1 | 2 | 3): string {
  return buildCompetenceStatement(curriculum, trimester);
}
