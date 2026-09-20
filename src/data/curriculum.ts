/**
 * Official Burkina Faso English curriculum (post-primaire), transcribed from
 * "PLANIFICATION DETAILLEE - CLASSES DE L'ENSEIGNEMENT POST-PRIMAIRE GENERAL
 * - DISCIPLINE : ANGLAIS" (Ministère de l'Enseignement Secondaire, Commission
 * Nationale des Programmes Scolaires, Sous-commission de l'Anglais).
 *
 * This is reference data (shared across all users), not something teachers
 * edit — it drives the curriculum-accurate lesson plan generator so a
 * generated "fiche pédagogique" matches the real programme (unit, lesson,
 * functions, structures/lexis, objectives) instead of a generic template.
 */

export type ClassLevel = "6e" | "5e" | "4e" | "3e";

export const CLASS_LABELS: Record<ClassLevel, string> = {
  "6e": "Sixième (6e)",
  "5e": "Cinquième (5e)",
  "4e": "Quatrième (4e)",
  "3e": "Troisième (3e)",
};

export interface CurriculumLesson {
  number: string;
  title: string;
  functions: string[];
  grammar: string[];
  vocabulary: string[];
  objectives: string[];
  hours: number;
}

export interface CurriculumUnit {
  number: string;
  title: string;
  month: string;
  trimester: 1 | 2 | 3;
  lessons: CurriculumLesson[];
}

export interface ClassCurriculum {
  level: ClassLevel;
  label: string;
  weeklyHours: number;
  totalHours: number;
  coefficient: number;
  /** Fixed year-round "compétence intermédiaire" statement (6e/5e). */
  competence?: string;
  /** Per-trimester themes used to build the competence statement (4e/3e). */
  trimesterThemes?: { trimester: 1 | 2 | 3; themes: string[] }[];
  /** Generic reading/writing sub-skill objectives, repeated every unit (4e/3e). */
  genericObjectives?: string[];
  units: CurriculumUnit[];
}

const COMPETENCE_6E_5E =
  "Communiquer dans un langage très élémentaire sur des sujets en lien avec son environnement immédiat et les thèmes émergents lorsque l'interlocuteur parle très lentement, distinctement et facilite l'interaction.";

/**
 * Builds the "Competence" field for 4e/3e fiches: the official wording
 * inserts the trimester's theme list into a fixed template.
 */
export function buildCompetenceStatement(
  curriculum: ClassCurriculum,
  trimester: 1 | 2 | 3
): string {
  if (curriculum.competence) return curriculum.competence;
  const themes = curriculum.trimesterThemes?.find((t) => t.trimester === trimester)?.themes ?? [];
  const themeList = themes.join(", ");
  return `L'apprenant doit pouvoir lire et comprendre un texte, écouter et comprendre une production orale, et communiquer (à l'oral et à l'écrit) dans un langage simple sur les thèmes "${themeList}", pour décrire une expérience ou exprimer une opinion, lorsque l'interlocuteur parle lentement, distinctement et facilite l'interaction.`;
}

const SIXIEME: ClassCurriculum = {
  level: "6e",
  label: CLASS_LABELS["6e"],
  weeklyHours: 5,
  totalHours: 140,
  coefficient: 2,
  competence: COMPETENCE_6E_5E,
  units: [
    {
      number: "01",
      title: "At school",
      month: "Octobre",
      trimester: 1,
      lessons: [
        {
          number: "01",
          title: "Greetings",
          functions: ["Greeting", "Introducing oneself", "Introducing another person"],
          grammar: ["Simple present (to be, to have, to have got)", "Personal pronouns", "Possessive adjectives"],
          vocabulary: ["Some English-speaking countries"],
          objectives: [
            "greet formally",
            "greet informally",
            "introduce themselves to one another",
            "introduce another person",
            "identify some English-speaking countries",
          ],
          hours: 6,
        },
        {
          number: "02",
          title: "Classroom language",
          functions: ["Giving orders", "Giving instructions", "Seeking permission", "Giving permission", "Asking for information"],
          grammar: ["Imperatives", "Yes/no questions", "May I…? Can you…?"],
          vocabulary: [],
          objectives: [
            "give orders",
            "give instructions to one another",
            "ask for information",
            "ask for permission",
            "ask for repetition",
          ],
          hours: 6,
        },
        {
          number: "03",
          title: "Classroom objects and cardinal numbers",
          functions: ["Locating classroom objects", "Counting objects / people"],
          grammar: [
            "Plural of nouns: There is / are",
            "Demonstrative adjectives (this/that is; these/those are)",
            "Wh-questions (what, where, how many, how much…)",
            "Prepositions of place",
          ],
          vocabulary: [],
          objectives: [
            "identify classroom objects",
            "locate classroom objects",
            "count from 1 to 19",
          ],
          hours: 6,
        },
      ],
    },
    {
      number: "02",
      title: "Plans and activities",
      month: "Novembre",
      trimester: 1,
      lessons: [
        {
          number: "01",
          title: "Time and days of the week",
          functions: ["Asking and telling the time", "Telling about a day's timetable", "Telling about a week's programme"],
          grammar: ["Simple present (ordinary verbs)"],
          vocabulary: [],
          objectives: [
            "count from 20 to 100",
            "tell the time from an analogue watch as well as a digital watch",
            "ask the time",
            "name the days of the week",
            "ask and answer questions about their daily timetables",
          ],
          hours: 6,
        },
        {
          number: "02",
          title: "The date",
          functions: ["Telling, asking and writing the date", "Giving specific dates (events, birthdates…)"],
          grammar: ["Wh-questions (when)"],
          vocabulary: ["Months of the year", "Days of the week"],
          objectives: [
            "name the months of the year",
            "count ordinal numbers from 1st to 31st",
            "use ordinal numbers with days and months",
            "tell, ask and write the date",
          ],
          hours: 6,
        },
        {
          number: "03",
          title: "Holidays and Sports",
          functions: ["Describing sport actions / events"],
          grammar: ["Present continuous", "Review simple present"],
          vocabulary: ["School events, sports"],
          objectives: [
            "name some sports",
            "describe sport actions",
            "give the dates of their school events and holidays",
          ],
          hours: 6,
        },
      ],
    },
    {
      number: "03",
      title: "Socialisation",
      month: "Décembre",
      trimester: 1,
      lessons: [
        {
          number: "01",
          title: "Family members",
          functions: ["Talking about family members and their activities"],
          grammar: [],
          vocabulary: ["Family members and their activities"],
          objectives: [
            "identify family members",
            "use vocabulary of household chores in their own sentences",
          ],
          hours: 5,
        },
        {
          number: "02",
          title: "School regulations",
          functions: ["Expressing obligation and prohibition"],
          grammar: ["Can / can't", "Must / mustn't"],
          vocabulary: [],
          objectives: [
            "list regulations of their school",
            "make the difference between what they must or must not do at school",
          ],
          hours: 4,
        },
        {
          number: "03",
          title: "Good manners",
          functions: ["Apologizing", "Expressing regret", "Expressing gratitude"],
          grammar: [],
          vocabulary: ["Idiomatic expressions: I'm sorry…, Excuse me…, Thank you / thanks"],
          objectives: ["use appropriate expressions in given situations"],
          hours: 4,
        },
      ],
    },
    {
      number: "04",
      title: "Description of people and things",
      month: "Janvier",
      trimester: 2,
      lessons: [
        {
          number: "01",
          title: "Colours and clothing items",
          functions: ["Describing things"],
          grammar: ["Indefinite, definite articles"],
          vocabulary: ["Colours and clothing items"],
          objectives: ["identify colours", "name clothing items"],
          hours: 6,
        },
        {
          number: "02",
          title: "Describing people",
          functions: ["Describing people's moods", "Describing people's physical appearances"],
          grammar: ["Qualifying adjectives"],
          vocabulary: [],
          objectives: ["describe people's moods and physical appearances"],
          hours: 6,
        },
        {
          number: "03",
          title: "Comparing people and things",
          functions: ["Comparing people and things"],
          grammar: [
            "Comparatives of equality",
            "Comparatives of inferiority",
            "Comparatives of superiority",
          ],
          vocabulary: [],
          objectives: [
            "compare people and things using the comparison of superiority",
            "compare people and things using the comparison of inferiority",
            "compare people and things using the comparison of equality",
          ],
          hours: 6,
        },
      ],
    },
    {
      number: "05",
      title: "Possession",
      month: "Février",
      trimester: 2,
      lessons: [
        {
          number: "01",
          title: "Possession",
          functions: ["Expressing possession"],
          grammar: ["Possessive pronouns"],
          vocabulary: [],
          objectives: ["use possessive pronouns to express ownership"],
          hours: 6,
        },
        {
          number: "02",
          title: "People and their properties",
          functions: ["Expressing other people's properties"],
          grammar: [
            "Possessive case (John's, Paul's, Fatou's, the pupil's, the girl's, the learners', the boys')",
            "Whose + noun (Whose book …?)",
          ],
          vocabulary: [],
          objectives: ["use the possessive case"],
          hours: 6,
        },
        {
          number: "03",
          title: "Attitudes towards public and private properties",
          functions: [
            "Talking about attitudes towards public and private properties",
            "Talking about correct attitudes towards regulations",
          ],
          grammar: ["Review Can and Must"],
          vocabulary: ["Public and private properties"],
          objectives: [
            "choose appropriate actions to preserve public and private properties",
          ],
          hours: 6,
        },
      ],
    },
    {
      number: "06",
      title: "Cooking and food",
      month: "Mars",
      trimester: 2,
      lessons: [
        {
          number: "01",
          title: "Meals, dishes and cutlery",
          functions: ["Talking about meals and dishes", "Talking about cutlery"],
          grammar: [],
          vocabulary: ["Dishes", "Cutlery items"],
          objectives: [
            "name the different meals and dishes",
            "name the different cutlery items",
            "choose their preferred meals",
          ],
          hours: 5,
        },
        {
          number: "02",
          title: "Ways of cooking food (frying, boiling, grilling, baking, roasting)",
          functions: ["Talking about cooking methods and utensils", "Describing cooking procedures"],
          grammar: ["Sequence adverbs (first, then, next, after that, finally)", "Quantifiers (any, some, no)"],
          vocabulary: [],
          objectives: [
            "name the different cooking ways and some appropriate ingredients",
            "name some cooking materials",
            "describe the process of cooking of a meal",
          ],
          hours: 4,
        },
        {
          number: "03",
          title: "At the restaurant",
          functions: ["Ordering meals at the restaurant"],
          grammar: ["Review of yes/no questions and wh-questions (What can I do for you? Have you got any …?)"],
          vocabulary: ["Soft drinks, alcohol (spirits), fried rice, chicken, brochettes"],
          objectives: ["ask for the menu at a restaurant", "order meals and drinks on the menu", "ask for the bill"],
          hours: 4,
        },
      ],
    },
    {
      number: "07",
      title: "A visit in town",
      month: "Avril",
      trimester: 3,
      lessons: [
        {
          number: "01",
          title: "Travelling",
          functions: ["Talking about travel documents", "Asking for and giving information"],
          grammar: ["Simple future"],
          vocabulary: ["Travel documents", "Means of transportation"],
          objectives: [
            "identify a few common travel documents",
            "name means of transportation",
            "use vocabulary related to a given means of transportation",
          ],
          hours: 6,
        },
        {
          number: "02",
          title: "Places and their locations",
          functions: ["Asking for and giving directions"],
          grammar: ["Imperatives (go straight, turn left…)"],
          vocabulary: ["Places (airport, railway station, bus station…)"],
          objectives: ["locate places", "ask for directions", "give directions"],
          hours: 6,
        },
        {
          number: "03",
          title: "Entertainment in town",
          functions: ["Talking about types of entertainment", "Inviting somebody to an entertainment", "Accepting / declining invitations"],
          grammar: ["Future (going to + infinitive)", "Can I invite you to …"],
          vocabulary: [],
          objectives: [
            "name a few types of entertainment",
            "invite somebody to a given entertainment",
            "accept / decline invitations",
          ],
          hours: 6,
        },
      ],
    },
    {
      number: "08",
      title: "At the farm and the zoo",
      month: "Mai",
      trimester: 3,
      lessons: [
        {
          number: "01",
          title: "Farm animals",
          functions: ["Talking about farm animals and farming tools"],
          grammar: [],
          vocabulary: ["Farm animals (goat, sheep, cow…)", "Farming tools (hoe, plough, watering can…)"],
          objectives: ["name some farm animals", "describe some farm animals", "name some farming tools"],
          hours: 3,
        },
        {
          number: "02",
          title: "Vegetables",
          functions: ["Talking about vegetables", "Describing the process of growing vegetables"],
          grammar: ["Review sequence adverbs (first, then, next, after all, finally)"],
          vocabulary: ["Cabbage, onion, carrot, eggplant, okra, tomato…"],
          objectives: [
            "name some vegetables",
            "describe some vegetables",
            "describe the process of growing a given vegetable",
          ],
          hours: 3,
        },
        {
          number: "03",
          title: "Wild animals",
          functions: ["Talking about wild animals"],
          grammar: ["Review adjectives"],
          vocabulary: ["Lion, elephant, hyena, hare…"],
          objectives: ["name some wild animals", "describe some wild animals"],
          hours: 2,
        },
      ],
    },
  ],
};

const CINQUIEME: ClassCurriculum = {
  level: "5e",
  label: CLASS_LABELS["5e"],
  weeklyHours: 5,
  totalHours: 140,
  coefficient: 2,
  competence: COMPETENCE_6E_5E,
  units: [
    {
      number: "01",
      title: "Child's rights and duties",
      month: "Octobre",
      trimester: 1,
      lessons: [
        {
          number: "01",
          title: "Child's rights at home and at school",
          functions: ["Sensitising"],
          grammar: [
            "Equivalents of defective auxiliaries: May (to be allowed to/to be permitted to)",
            "Can (to be able to)",
            "Must (have to, to be obliged to)",
          ],
          vocabulary: [],
          objectives: ["define child's rights", "enumerate some child's rights at home and at school"],
          hours: 6,
        },
        {
          number: "02",
          title: "Child's duties at home and at school",
          functions: ["Sensitising"],
          grammar: ["Passive voice"],
          vocabulary: [],
          objectives: ["enumerate some child's duties at home and at school"],
          hours: 6,
        },
        {
          number: "03",
          title: "Children and the law",
          functions: ["Talking about laws which protect children"],
          grammar: ["Question tags"],
          vocabulary: [],
          objectives: [
            "enumerate some laws which protect children",
            "identify some laws about children's education",
          ],
          hours: 6,
        },
      ],
    },
    {
      number: "02",
      title: "Environmental education",
      month: "Novembre",
      trimester: 1,
      lessons: [
        {
          number: "01",
          title: "Environment and health",
          functions: ["Talking about household and classroom wastes and appropriate environmental attitudes", "Giving reasons"],
          grammar: ["If clause (first conditional)", "Adverbs of frequency (always, often, usually, sometimes, never…)"],
          vocabulary: [],
          objectives: [
            "enumerate some household and classroom wastes",
            "enumerate appropriate environmental attitudes",
            "say why their environment should be kept clean and nice",
          ],
          hours: 6,
        },
        {
          number: "02",
          title: "Pollution",
          functions: ["Talking about sources of pollution and environmental attitudes", "Making recommendations"],
          grammar: ["Simple future"],
          vocabulary: [],
          objectives: [
            "identify the main sources of pollution",
            "list appropriate environmental attitudes",
            "recommend appropriate environmental attitudes",
          ],
          hours: 6,
        },
        {
          number: "03",
          title: "Wildlife",
          functions: ["Giving reasons"],
          grammar: ["If clause (second conditional)"],
          vocabulary: ["Wildlife (plants and animals)"],
          objectives: [
            "identify some wild animals",
            "identify some wild plants",
            "give some reasons for protecting wildlife",
          ],
          hours: 6,
        },
      ],
    },
    {
      number: "03",
      title: "Health and sanitation",
      month: "Décembre",
      trimester: 1,
      lessons: [
        {
          number: "01",
          title: "Cleanliness",
          functions: ["Talking about cleanliness", "Persuading"],
          grammar: ["Double comparatives", "Need"],
          vocabulary: [],
          objectives: ["define cleanliness", "explain the necessity of cleanliness", "write slogans to promote cleanliness"],
          hours: 5,
        },
        {
          number: "02",
          title: "Food and hygiene",
          functions: ["Talking about a balanced diet", "Describing appropriate hygienic attitudes"],
          grammar: ["Reflexive pronouns", "Review must, mustn't, need", "Exclamatory forms"],
          vocabulary: ["Food items"],
          objectives: ["define a balanced diet", "describe appropriate hygienic attitudes"],
          hours: 4,
        },
        {
          number: "03",
          title: "Sports and health",
          functions: ["Explaining the impact of sports on health", "Comparing sports"],
          grammar: ["Superlatives"],
          vocabulary: ["Some popular sports"],
          objectives: [
            "name some popular sports",
            "give some advantages of the practice of sports",
            "explain the impact of the practice of sports on health",
            "compare sports",
          ],
          hours: 4,
        },
      ],
    },
    {
      number: "04",
      title: "Citizenship",
      month: "Janvier",
      trimester: 2,
      lessons: [
        {
          number: "01",
          title: "Local institutions",
          functions: ["Talking about the roles of institutions"],
          grammar: ["Relative pronouns (which, who, whom, that…)"],
          vocabulary: ["Institutions (Town Council, Regional Council…)"],
          objectives: [
            "name the main institutions at the levels of region, province, department and village",
            "specify their roles",
          ],
          hours: 6,
        },
        {
          number: "02",
          title: "Elections",
          functions: ["Talking about elections"],
          grammar: ["Review the simple past"],
          vocabulary: ["Voting materials (ballot box, polling card, ballot paper, voting booth…)"],
          objectives: ["identify voting materials", "enumerate conditions to be elected or be an elector"],
          hours: 6,
        },
        {
          number: "03",
          title: "National institutions",
          functions: ["Talking about institutions"],
          grammar: ["Review the simple present and the present progressive"],
          vocabulary: ["National institutions (National Assembly, Mediation, Presidency, Prime Ministry…)"],
          objectives: ["name the main institutions", "specify the role of each institution"],
          hours: 6,
        },
      ],
    },
    {
      number: "05",
      title: "Road safety",
      month: "Février",
      trimester: 2,
      lessons: [
        {
          number: "01",
          title: "Dangerous attitudes in the traffic",
          functions: ["Talking about dangerous attitudes in the traffic", "Sensitising about dangerous attitudes in the traffic"],
          grammar: ["Imperatives"],
          vocabulary: [],
          objectives: [
            "enumerate dangerous attitudes in the traffic",
            "distinguish between appropriate and inappropriate attitudes in the traffic",
          ],
          hours: 6,
        },
        {
          number: "02",
          title: "Risky places in the traffic",
          functions: ["Describing attitudes to avoid accidents", "Advising"],
          grammar: ["Imperatives (do / don't)"],
          vocabulary: ["Some risky places (bend or curve, crossroads, pedestrian crossing…)"],
          objectives: [
            "identify risky places on roads",
            "describe appropriate attitudes to avoid accidents at risky places",
            "advise peers about appropriate attitudes to avoid accidents",
          ],
          hours: 6,
        },
        {
          number: "03",
          title: "Safe practices in the traffic",
          functions: ["Talking about safe attitudes in the traffic", "Giving advice", "Sensitising"],
          grammar: ["Adverbs of frequency (always, often, usually, sometimes, never…)"],
          vocabulary: [],
          objectives: ["identify safe attitudes to adopt in the traffic", "give advice to people about safe attitudes in traffic"],
          hours: 6,
        },
      ],
    },
    {
      number: "06",
      title: "Jobs and activities",
      month: "Mars",
      trimester: 2,
      lessons: [
        {
          number: "01",
          title: "At the farm",
          functions: ["Talking about farming activities and tools"],
          grammar: ["Formation of nouns derived from verbs (farm → farmer)"],
          vocabulary: ["Farming tools", "Farming activities"],
          objectives: [
            "name various farm activities",
            "identify farming tools on pictures or drawings",
            "describe the use of some farming tools",
          ],
          hours: 5,
        },
        {
          number: "02",
          title: "On the construction site",
          functions: ["Talking about jobs on the construction site"],
          grammar: ["Review the formation of nouns derived from verbs (build → builder)"],
          vocabulary: ["Jobs on the construction site (architect, engineer, mason, topographer)"],
          objectives: [
            "identify various jobs on the construction site",
            "name the various professional workers on the construction site",
            "describe the various jobs on a construction site",
          ],
          hours: 4,
        },
        {
          number: "03",
          title: "At the office",
          functions: ["Talking about office workers, equipment and activities"],
          grammar: ["Review the wh-questions (why, whose, what for…)"],
          vocabulary: ["Office workers", "Office equipment", "Office activities"],
          objectives: [
            "name various office workers",
            "identify office equipment",
            "identify stationery",
            "describe office activities",
          ],
          hours: 4,
        },
      ],
    },
    {
      number: "07",
      title: "Art and culture",
      month: "Avril",
      trimester: 3,
      lessons: [
        {
          number: "01",
          title: "Major cultural events in Burkina Faso",
          functions: ["Talking about major cultural and artistic events in Burkina Faso"],
          grammar: ["Perception verbs (to see, to hear, to smell, to feel…)"],
          vocabulary: [
            "Major cultural and artistic events (International Art and Craft Trade Fair of Ouagadougou – SIAO, National Culture Week – SNC, Panafrican Film and Television Festival of Ouagadougou – FESPACO)",
          ],
          objectives: ["identify the major cultural and artistic events in Burkina Faso", "describe the events"],
          hours: 6,
        },
        {
          number: "02",
          title: "Tourism",
          functions: ["Talking about tourism"],
          grammar: ["Wh-questions (why, whose, what for…)"],
          vocabulary: ["Tourist sites (the ruins of Loropeni, Sindou Peaks…)", "Tourist activities (hunting, sight-seeing…)"],
          objectives: [
            "identify tourist sites",
            "enumerate major tourist activities taking place in Burkina Faso",
            "describe some tourist activities or sites",
          ],
          hours: 6,
        },
        {
          number: "03",
          title: "The market",
          functions: ["Talking about activities on a typical African market"],
          grammar: ["Expressions such as: The day when…, The place where…"],
          vocabulary: [],
          objectives: ["describe a typical African market", "describe activities on a market"],
          hours: 6,
        },
      ],
    },
    {
      number: "08",
      title: "Information and communication technologies",
      month: "Mai",
      trimester: 3,
      lessons: [
        {
          number: "01",
          title: "Writing a personal letter",
          functions: ["Exchanging information through letters"],
          grammar: ["Quantifiers (each, every, both)"],
          vocabulary: ["The opening, body and closing of the letter"],
          objectives: ["identify the different parts of a letter", "write a letter"],
          hours: 3,
        },
        {
          number: "02",
          title: "The computer and office work today",
          functions: ["Talking about the use of a computer"],
          grammar: ["\"To do\" vs. \"to make\""],
          vocabulary: ["The different elements of a computer"],
          objectives: [
            "list office tasks done with a computer",
            "enumerate the advantages of doing office work with a computer",
          ],
          hours: 3,
        },
        {
          number: "03",
          title: "The Internet",
          functions: ["Talking about the uses of the Internet", "Giving opinions"],
          grammar: ["Quantifiers (all the, the whole…)"],
          vocabulary: ["The uses of the internet (to browse, to download, to chat…)"],
          objectives: [
            "enumerate the various uses of the Internet",
            "list the advantages and disadvantages of using the Internet",
            "discuss the advantages and disadvantages of using the Internet",
          ],
          hours: 2,
        },
      ],
    },
  ],
};

const GENERIC_OBJECTIVES_4E_3E = [
  "grasp the meaning of a spoken or written text",
  "skim a text (for the general idea or the gist)",
  "scan a text (for specific information or details)",
  "identify the topic sentence and the secondary ideas of a paragraph",
  "write a paragraph",
  "use the vocabulary and grammar items to express themselves either orally or in writing",
];

const QUATRIEME: ClassCurriculum = {
  level: "4e",
  label: CLASS_LABELS["4e"],
  weeklyHours: 3,
  totalHours: 84,
  coefficient: 2,
  genericObjectives: GENERIC_OBJECTIVES_4E_3E,
  trimesterThemes: [
    { trimester: 1, themes: ["Families", "Health", "Young people in danger"] },
    { trimester: 2, themes: ["Teen times", "Environmental education", "Women"] },
    { trimester: 3, themes: ["Road safety", "Advantages and drawbacks of ICTs", "The Net Generation"] },
  ],
  units: [
    {
      number: "1",
      title: "Families",
      month: "Octobre",
      trimester: 1,
      lessons: [
        {
          number: "01",
          title: "Traditional families vs modern families (size, characteristics…)",
          functions: ["Talking about family relations"],
          grammar: [
            "Extended family members",
            "Review comparatives and superlatives",
            "Past frequentative tense",
            "Coordination: Go and get it; he came and told me",
          ],
          vocabulary: [],
          objectives: [],
          hours: 4,
        },
        {
          number: "02",
          title: "Generation gap",
          functions: ["Talking about family relations"],
          grammar: [],
          vocabulary: [],
          objectives: [],
          hours: 4,
        },
      ],
    },
    {
      number: "2",
      title: "Health",
      month: "Novembre",
      trimester: 1,
      lessons: [
        {
          number: "01",
          title: "Diseases (malaria, sexually transmissible/transmitted diseases (AIDS), female genital mutilations)",
          functions: ["Talking about symptoms, transmission modes", "Giving advice"],
          grammar: [
            "Passive: He was given some medicines. (progressive: Fanta is being examined by the doctor.)",
            "Should / Ought to",
            "Imperative",
          ],
          vocabulary: [],
          objectives: [],
          hours: 4,
        },
        {
          number: "02",
          title: "Traditional and modern medicine / cures",
          functions: ["Giving advice"],
          grammar: [
            "Negative imperative: Don't have many sexual partners.",
            "Indirect + negative: I told him (not) to go.",
            "Insistence: Do bring me a mango!",
          ],
          vocabulary: [],
          objectives: [],
          hours: 4,
        },
      ],
    },
    {
      number: "3",
      title: "Young people in danger",
      month: "Décembre",
      trimester: 1,
      lessons: [
        {
          number: "01",
          title: "Drug addiction",
          functions: ["Giving reasons"],
          grammar: [
            "Hard drugs / soft drugs",
            "Adjectival nouns (the young, the old, the poor, the English)",
            "One (one another, oneself, one's own)",
            "Present tense with future meaning (you'll see him when…)",
          ],
          vocabulary: [],
          objectives: [],
          hours: 3,
        },
        {
          number: "02",
          title: "Young people in artisanal mine sites (prostitution, drug abuse, child labour…)",
          functions: ["Persuading"],
          grammar: [],
          vocabulary: [],
          objectives: [],
          hours: 3,
        },
      ],
    },
    {
      number: "4",
      title: "Teen times",
      month: "Janvier",
      trimester: 2,
      lessons: [
        {
          number: "01",
          title: "Characteristics of teenagers",
          functions: ["Talking about teenagers, their rights, and civic responsibilities"],
          grammar: [
            "Agreement / disagreement: So do I; so is he; I think so; neither/nor",
            "Determiners: Own (e.g. My own), each",
            "Subordination: Which (= ce qui/ce que), All (that)",
            "Review relative clauses",
          ],
          vocabulary: [],
          objectives: [],
          hours: 4,
        },
        {
          number: "02",
          title: "Child's rights and civic responsibilities",
          functions: ["Talking about teenagers, their rights, and civic responsibilities"],
          grammar: [],
          vocabulary: [],
          objectives: [],
          hours: 4,
        },
      ],
    },
    {
      number: "5",
      title: "Environmental education",
      month: "Février",
      trimester: 2,
      lessons: [
        {
          number: "01",
          title: "Climate change: causes and effects",
          functions: ["Talking about causes and effects of climate change"],
          grammar: [
            "Noun formation — prefix: ecocitizen; suffix: citizenship, cleanliness",
            "Indirect interrogation: Tell me where he is. Tell me why he is here. Let me know when/how/what/if he is coming.",
          ],
          vocabulary: [],
          objectives: [],
          hours: 4,
        },
        {
          number: "02",
          title: "Eco-citizenship",
          functions: ["Sensitising on environmental issues"],
          grammar: [],
          vocabulary: [],
          objectives: [],
          hours: 4,
        },
      ],
    },
    {
      number: "6",
      title: "Women",
      month: "Mars",
      trimester: 2,
      lessons: [
        {
          number: "01",
          title: "Women's empowerment (access to education, access to land…)",
          functions: ["Talking about women and development"],
          grammar: [
            "Verb + preposition: care for, be afraid of, pleased with, willing to",
            "ING after prepositions: before going, after coming, without sleeping",
          ],
          vocabulary: [],
          objectives: [],
          hours: 3,
        },
        {
          number: "02",
          title: "The contribution of women in economies",
          functions: ["Talking about women and development"],
          grammar: [],
          vocabulary: [],
          objectives: [],
          hours: 3,
        },
      ],
    },
    {
      number: "7",
      title: "Road safety",
      month: "Avril",
      trimester: 3,
      lessons: [
        {
          number: "01",
          title: "Statistics on road accidents",
          functions: ["Giving causes and effects", "Expressing opinions"],
          grammar: [
            "A time when…; a place where…; the reason why…",
            "Adverbs (manner, place, time) and their position",
            "Past perfect",
            "For vs. during",
          ],
          vocabulary: [],
          objectives: [],
          hours: 4,
        },
        {
          number: "02",
          title: "Reducing road accidents",
          functions: ["Expressing opinions"],
          grammar: [],
          vocabulary: [],
          objectives: [],
          hours: 4,
        },
      ],
    },
    {
      number: "8",
      title: "Information and communication technologies",
      month: "Mai",
      trimester: 3,
      lessons: [
        {
          number: "01",
          title: "Advantages and drawbacks of ICTs",
          functions: ["Talking about ICTs"],
          grammar: ["Conjunctions (until/till, while, as soon as, so as to, in order to)"],
          vocabulary: [],
          objectives: [],
          hours: 2,
        },
        {
          number: "02",
          title: "The Net Generation",
          functions: ["Talking about ICTs"],
          grammar: [],
          vocabulary: [],
          objectives: [],
          hours: 2,
        },
      ],
    },
  ],
};

const TROISIEME: ClassCurriculum = {
  level: "3e",
  label: CLASS_LABELS["3e"],
  weeklyHours: 3,
  totalHours: 84,
  coefficient: 2,
  genericObjectives: [
    "skim a text (reading for the general idea or the gist)",
    "scan a text (reading for specific information or details)",
    "identify the topic sentence and the secondary ideas of a paragraph",
    "write a paragraph",
    "use the vocabulary and grammar items to express themselves either orally or in writing",
  ],
  trimesterThemes: [
    { trimester: 1, themes: ["Love and marriage celebrations", "Food and health", "Migrations"] },
    { trimester: 2, themes: ["Heroes", "The environment", "Training and jobs"] },
    { trimester: 3, themes: ["Tolerance", "Literature and Civilization"] },
  ],
  units: [
    {
      number: "1",
      title: "Love and marriage celebrations",
      month: "Octobre",
      trimester: 1,
      lessons: [
        {
          number: "01",
          title: "The ideal partner (physical and moral features)",
          functions: ["Discussing advantages and drawbacks", "Describing features"],
          grammar: ["Review of past perfect tense", "Indirect / direct speech", "Adverbs"],
          vocabulary: [],
          objectives: [],
          hours: 4,
        },
        {
          number: "02",
          title: "Traditional weddings vs modern weddings",
          functions: ["Discussing advantages and drawbacks"],
          grammar: [],
          vocabulary: [],
          objectives: [],
          hours: 4,
        },
      ],
    },
    {
      number: "2",
      title: "Food and health",
      month: "Novembre",
      trimester: 1,
      lessons: [
        {
          number: "01",
          title: "Sound nutrition",
          functions: ["Explaining purpose", "Arguing"],
          grammar: [
            "Infinitive after passive (she was heard to say… He was made to sing)",
            "Modals: Need / dare",
            "Passive voice",
            "If clauses (type 3)",
          ],
          vocabulary: [],
          objectives: [],
          hours: 4,
        },
        {
          number: "02",
          title: "Local foods contribution to sound nutrition",
          functions: ["Arguing"],
          grammar: [],
          vocabulary: [],
          objectives: [],
          hours: 4,
        },
      ],
    },
    {
      number: "3",
      title: "Migrations",
      month: "Décembre",
      trimester: 1,
      lessons: [
        {
          number: "01",
          title: "Home migration (rural exodus)",
          functions: ["Giving reasons", "Sensitising"],
          grammar: [
            "Coordination: Yet, however, still, as well as",
            "I'd like to; If you want to",
            "So he is; So I am",
          ],
          vocabulary: [],
          objectives: [],
          hours: 3,
        },
        {
          number: "02",
          title: "Overseas migration",
          functions: ["Giving reasons", "Sensitising"],
          grammar: [],
          vocabulary: [],
          objectives: [],
          hours: 3,
        },
      ],
    },
    {
      number: "4",
      title: "Heroes",
      month: "Janvier",
      trimester: 2,
      lessons: [
        {
          number: "01",
          title: "African outstanding figures and the impact of their ideas on the youth",
          functions: ["Narrating events", "Expressing opinions", "Making contrasts"],
          grammar: ["Conjunctions (whenever, wherever, since, although, unless, whether…or)"],
          vocabulary: [],
          objectives: [],
          hours: 4,
        },
        {
          number: "02",
          title: "National heroes (biography, achievements…) (project work)",
          functions: ["Narrating events", "Expressing opinions"],
          grammar: ["Relative clauses", "Exclamatives"],
          vocabulary: [],
          objectives: [],
          hours: 4,
        },
      ],
    },
    {
      number: "5",
      title: "The environment",
      month: "Février",
      trimester: 2,
      lessons: [
        {
          number: "01",
          title: "Renewable energy",
          functions: ["Discussing reasons", "Persuading"],
          grammar: [
            "Interrogatives — alternative forms (e.g. what are you cutting down the tree for?)",
            "Review: I don't either – So is he; So does he",
            "Question tags",
          ],
          vocabulary: [],
          objectives: [],
          hours: 4,
        },
        {
          number: "02",
          title: "Sustainable development (protecting the environment)",
          functions: ["Sensitising"],
          grammar: [],
          vocabulary: [],
          objectives: [],
          hours: 4,
        },
      ],
    },
    {
      number: "6",
      title: "Training and jobs",
      month: "Mars",
      trimester: 2,
      lessons: [
        {
          number: "01",
          title: "School majors and careers (educational counselling)",
          functions: ["Talking about training and job opportunities", "Sensitising"],
          grammar: [
            "Obligation (I am to leave here at 6; I've got to …)",
            "Infinitive without to (after see, watch, hear, listen, make, have, let, must, can, may, might…)",
            "Infinitive with to (after ask, tell, understand, teach, explain, find out, know, wonder, advise, show, forget, learn…)",
          ],
          vocabulary: [],
          objectives: [],
          hours: 3,
        },
        {
          number: "02",
          title: "Self-employment initiatives",
          functions: ["Talking about training and job opportunities"],
          grammar: ["A/An of distribution (e.g. twice a week; 10 miles an hour)"],
          vocabulary: [],
          objectives: [],
          hours: 3,
        },
      ],
    },
    {
      number: "7",
      title: "Tolerance",
      month: "Avril",
      trimester: 3,
      lessons: [
        {
          number: "01",
          title: "Cultural tolerance",
          functions: ["Sensitising", "Giving opinions"],
          grammar: [
            "Possessive pronouns (a friend of his/mine…)",
            "Demonstrative (e.g. that of…)",
            "Affixes: prefixes/suffixes in noun formation (friendship, neighborhood…)",
            "Unexpressed relative (e.g. a pen to write with)",
          ],
          vocabulary: [],
          objectives: [],
          hours: 4,
        },
        {
          number: "02",
          title: "Religious tolerance",
          functions: ["Sensitising", "Giving opinions"],
          grammar: [],
          vocabulary: [],
          objectives: [],
          hours: 4,
        },
      ],
    },
    {
      number: "8",
      title: "Literature and Civilization",
      month: "Mai",
      trimester: 3,
      lessons: [
        {
          number: "01",
          title: "Songs / Poems (authentic)",
          functions: ["Talking about the anglophone culture"],
          grammar: ["Review ING forms", "Progressive / simple tenses"],
          vocabulary: [],
          objectives: [],
          hours: 2,
        },
        {
          number: "02",
          title: "Plays (authentic)",
          functions: ["Giving opinions"],
          grammar: [
            "Perfect / simple past tenses",
            "Perfect progressive tense (+ since, for)",
            "Future time",
            "Conditional tense",
            "some, any, no",
          ],
          vocabulary: [],
          objectives: [],
          hours: 2,
        },
      ],
    },
  ],
};

export const CURRICULUM: Record<ClassLevel, ClassCurriculum> = {
  "6e": SIXIEME,
  "5e": CINQUIEME,
  "4e": QUATRIEME,
  "3e": TROISIEME,
};

export function getUnit(level: ClassLevel, unitNumber: string): CurriculumUnit | undefined {
  return CURRICULUM[level].units.find((u) => u.number === unitNumber);
}

export function getLesson(
  level: ClassLevel,
  unitNumber: string,
  lessonNumber: string
): { unit: CurriculumUnit; lesson: CurriculumLesson } | undefined {
  const unit = getUnit(level, unitNumber);
  const lesson = unit?.lessons.find((l) => l.number === lessonNumber);
  if (!unit || !lesson) return undefined;
  return { unit, lesson };
}
