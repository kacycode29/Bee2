import { redirect } from "next/navigation";
import { requireActiveLicense } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { countWords } from "@/lib/text-engine";
import { Card } from "@/components/ui/Card";
import { Input, Label, Select, Textarea } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import type { CefrLevel } from "@prisma/client";

const LEVELS: CefrLevel[] = ["A1", "A2", "B1", "B2", "C1", "C2"];

async function createTextAction(formData: FormData) {
  "use server";
  const user = await requireActiveLicense();

  const title = String(formData.get("title") ?? "").trim();
  const level = String(formData.get("level") ?? "B1") as CefrLevel;
  const theme = String(formData.get("theme") ?? "").trim();
  const ageGroup = String(formData.get("ageGroup") ?? "").trim() || null;
  const tagsRaw = String(formData.get("tags") ?? "");
  const body = String(formData.get("body") ?? "").trim();

  if (!title || !theme || !body) {
    throw new Error("Titre, thème et texte sont obligatoires.");
  }

  const tags = tagsRaw
    .split(",")
    .map((t) => t.trim().toLowerCase())
    .filter(Boolean);

  const text = await prisma.text.create({
    data: {
      title,
      level,
      theme,
      ageGroup,
      tags,
      body,
      wordCount: countWords(body),
      source: "TEACHER_IMPORT",
      createdById: user.id,
    },
  });

  redirect(`/library/${text.id}`);
}

export default async function NewTextPage() {
  await requireActiveLicense();

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-2xl font-semibold text-slate-900">Ajouter un texte</h1>
      <p className="mt-1 text-sm text-slate-500">
        Importez votre propre support de lecture pour générer une fiche de leçon.
      </p>

      <Card className="mt-6">
        <form action={createTextAction} className="space-y-4">
          <div>
            <Label htmlFor="title">Titre</Label>
            <Input id="title" name="title" required maxLength={140} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="level">Niveau CECRL</Label>
              <Select id="level" name="level" defaultValue="B1">
                {LEVELS.map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </Select>
            </div>
            <div>
              <Label htmlFor="ageGroup">Tranche d&apos;âge (optionnel)</Label>
              <Input id="ageGroup" name="ageGroup" placeholder="ex: 4e-3e" />
            </div>
          </div>

          <div>
            <Label htmlFor="theme">Thème</Label>
            <Input id="theme" name="theme" required placeholder="ex: Environnement" />
          </div>

          <div>
            <Label htmlFor="tags">Mots-clés (séparés par des virgules)</Label>
            <Input id="tags" name="tags" placeholder="ex: climat, écologie, futur" />
          </div>

          <div>
            <Label htmlFor="body">Texte</Label>
            <Textarea id="body" name="body" required rows={14} />
          </div>

          <Button type="submit">Enregistrer le texte</Button>
        </form>
      </Card>
    </div>
  );
}
