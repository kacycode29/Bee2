import { notFound, redirect } from "next/navigation";
import { requireActiveLicense } from "@/lib/session";
import { getTextWithExercises } from "@/lib/texts";
import { generateClozeExercise } from "@/lib/text-engine";
import {
  parseVocabLines,
  parseTrueFalseLines,
  parseQuestionLines,
  replaceExercisesOfType,
  type VocabEntry,
  type TrueFalseEntry,
} from "@/lib/exercises";
import { Card, Badge } from "@/components/ui/Card";
import { Button, LinkButton } from "@/components/ui/Button";
import { Label, Textarea } from "@/components/ui/Input";
import { Download } from "lucide-react";

export default async function TextDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await requireActiveLicense();
  const { id } = await params;
  const text = await getTextWithExercises(id);
  if (!text) notFound();

  const vocabExercise = text.exercises.find((e) => e.type === "VOCAB_MATCH");
  const trueFalseExercise = text.exercises.find((e) => e.type === "TRUE_FALSE");
  const comprehensionExercise = text.exercises.find((e) => e.type === "COMPREHENSION");
  const cloze = generateClozeExercise(text.body, text.level);

  const isOwner = text.createdById === user.id;

  async function saveVocabAction(formData: FormData) {
    "use server";
    await requireActiveLicense();
    const raw = String(formData.get("vocab") ?? "");
    const entries: VocabEntry[] = parseVocabLines(raw);
    await replaceExercisesOfType(text!.id, "VOCAB_MATCH", entries.map((e) => e));
    redirect(`/library/${text!.id}`);
  }

  async function saveTrueFalseAction(formData: FormData) {
    "use server";
    await requireActiveLicense();
    const raw = String(formData.get("truefalse") ?? "");
    const entries: TrueFalseEntry[] = parseTrueFalseLines(raw);
    await replaceExercisesOfType(text!.id, "TRUE_FALSE", entries.map((e) => e));
    redirect(`/library/${text!.id}`);
  }

  async function saveQuestionsAction(formData: FormData) {
    "use server";
    await requireActiveLicense();
    const raw = String(formData.get("questions") ?? "");
    const questions = parseQuestionLines(raw);
    await replaceExercisesOfType(
      text!.id,
      "COMPREHENSION",
      questions.map((q) => ({ question: q }))
    );
    redirect(`/library/${text!.id}`);
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone="success">{text.level}</Badge>
          <Badge>{text.theme}</Badge>
          {text.ageGroup && <Badge>{text.ageGroup}</Badge>}
          <Badge tone="default">{text.wordCount} mots</Badge>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-slate-900">{text.title}</h1>
          <LinkButton href={`/api/texts/${text.id}/pdf`} variant="secondary" size="sm">
            <Download className="h-4 w-4" />
            Fiche élève PDF
          </LinkButton>
        </div>
        {text.source === "TEACHER_IMPORT" && (
          <p className="mt-1 text-xs text-slate-400">Texte importé par un enseignant.</p>
        )}
      </div>

      <Card>
        <h2 className="font-semibold text-slate-900">Texte</h2>
        <div className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-slate-700">
          {text.body}
        </div>
      </Card>

      <Card className="border-amber-200 bg-amber-50">
        <h2 className="font-semibold text-slate-900">Utiliser ce texte comme support</h2>
        <p className="mt-1 text-sm text-slate-600">
          Les fiches de leçon Bee2 suivent le canevas officiel APC/PI et le programme du
          post-primaire. Générez-en une depuis{" "}
          <LinkButton href="/lesson-plans/new" size="sm" className="mx-1 inline-flex">
            Nouvelle fiche
          </LinkButton>{" "}
          en choisissant la classe, l&apos;unité et la leçon du programme ; vous pouvez ensuite
          vous appuyer sur ce texte comme support de lecture pendant la séance.
        </p>
      </Card>

      {vocabExercise && (
        <Card>
          <h2 className="font-semibold text-slate-900">Vocabulaire clé</h2>
          <dl className="mt-3 space-y-2 text-sm">
            {(vocabExercise.data as unknown as VocabEntry[]).map((v) => (
              <div key={v.word} className="flex gap-3">
                <dt className="w-32 shrink-0 font-medium text-slate-900">{v.word}</dt>
                <dd className="text-slate-600">{v.definition}</dd>
              </div>
            ))}
          </dl>
        </Card>
      )}

      {trueFalseExercise && (
        <Card>
          <h2 className="font-semibold text-slate-900">Vrai ou faux</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {(trueFalseExercise.data as unknown as TrueFalseEntry[]).map((tf, i) => (
              <li key={i} className="flex items-start justify-between gap-3">
                <span className="text-slate-700">{tf.statement}</span>
                <Badge tone={tf.answer ? "success" : "danger"}>
                  {tf.answer ? "Vrai" : "Faux"}
                </Badge>
              </li>
            ))}
          </ul>
        </Card>
      )}

      {comprehensionExercise && (
        <Card>
          <h2 className="font-semibold text-slate-900">Questions de compréhension</h2>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-slate-700">
            {(comprehensionExercise.data as unknown as { question: string }[]).map((q, i) => (
              <li key={i}>{q.question}</li>
            ))}
          </ol>
        </Card>
      )}

      <Card>
        <h2 className="font-semibold text-slate-900">Texte à trous (généré automatiquement)</h2>
        <p className="mt-1 text-sm text-slate-500">
          Retrouvez le mot manquant dans chaque phrase.
        </p>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-slate-700">
          {cloze.map((c, i) => (
            <li key={i}>{c.blanked}</li>
          ))}
        </ol>
        <details className="mt-3 text-sm">
          <summary className="cursor-pointer font-medium text-amber-600">
            Voir les réponses
          </summary>
          <ol className="mt-2 list-decimal space-y-1 pl-5 text-slate-600">
            {cloze.map((c, i) => (
              <li key={i}>{c.answer}</li>
            ))}
          </ol>
        </details>
      </Card>

      {isOwner && (
        <Card>
          <h2 className="font-semibold text-slate-900">
            Compléter les exercices de ce texte
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Ce texte est le vôtre : ajoutez du vocabulaire, des affirmations vrai/faux et des
            questions de compréhension pour enrichir la fiche générée.
          </p>

          <div className="mt-4 space-y-6">
            <form action={saveVocabAction}>
              <Label htmlFor="vocab">Vocabulaire (un par ligne : mot :: définition)</Label>
              <Textarea
                id="vocab"
                name="vocab"
                rows={4}
                placeholder={"sustainable :: qui peut être maintenu dans le temps"}
                defaultValue={
                  vocabExercise
                    ? (vocabExercise.data as unknown as VocabEntry[])
                        .map((v) => `${v.word} :: ${v.definition}`)
                        .join("\n")
                    : ""
                }
              />
              <Button type="submit" variant="secondary" size="sm" className="mt-2">
                Enregistrer le vocabulaire
              </Button>
            </form>

            <form action={saveTrueFalseAction}>
              <Label htmlFor="truefalse">
                Vrai/Faux (un par ligne : affirmation :: vrai|faux)
              </Label>
              <Textarea
                id="truefalse"
                name="truefalse"
                rows={4}
                placeholder={"The story takes place in London. :: faux"}
                defaultValue={
                  trueFalseExercise
                    ? (trueFalseExercise.data as unknown as TrueFalseEntry[])
                        .map((v) => `${v.statement} :: ${v.answer ? "vrai" : "faux"}`)
                        .join("\n")
                    : ""
                }
              />
              <Button type="submit" variant="secondary" size="sm" className="mt-2">
                Enregistrer le vrai/faux
              </Button>
            </form>

            <form action={saveQuestionsAction}>
              <Label htmlFor="questions">Questions de compréhension (une par ligne)</Label>
              <Textarea
                id="questions"
                name="questions"
                rows={4}
                placeholder={"What is the main idea of the text?"}
                defaultValue={
                  comprehensionExercise
                    ? (comprehensionExercise.data as unknown as { question: string }[])
                        .map((q) => q.question)
                        .join("\n")
                    : ""
                }
              />
              <Button type="submit" variant="secondary" size="sm" className="mt-2">
                Enregistrer les questions
              </Button>
            </form>
          </div>
        </Card>
      )}
    </div>
  );
}
