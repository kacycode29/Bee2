import { NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import { auth } from "@/auth";
import { getTextWithExercises } from "@/lib/texts";
import { generateClozeExercise } from "@/lib/text-engine";
import { TextWorksheetDocument } from "@/components/pdf/TextWorksheetDocument";
import type { VocabEntry, TrueFalseEntry } from "@/lib/exercises";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Non authentifié." }, { status: 401 });
  }

  const { id } = await params;
  const text = await getTextWithExercises(id);
  if (!text) {
    return NextResponse.json({ error: "Texte introuvable." }, { status: 404 });
  }

  const vocabExercise = text.exercises.find((e) => e.type === "VOCAB_MATCH");
  const trueFalseExercise = text.exercises.find((e) => e.type === "TRUE_FALSE");
  const comprehensionExercise = text.exercises.find((e) => e.type === "COMPREHENSION");

  const buffer = await renderToBuffer(
    <TextWorksheetDocument
      title={text.title}
      level={text.level}
      theme={text.theme}
      body={text.body}
      vocabulary={(vocabExercise?.data as unknown as VocabEntry[]) ?? []}
      trueFalse={(trueFalseExercise?.data as unknown as TrueFalseEntry[]) ?? []}
      questions={
        ((comprehensionExercise?.data as unknown as { question: string }[]) ?? []).map(
          (q) => q.question
        )
      }
      cloze={generateClozeExercise(text.body, text.level)}
    />
  );

  return new NextResponse(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${text.title.replace(/[^a-z0-9]+/gi, "-")}.pdf"`,
    },
  });
}
