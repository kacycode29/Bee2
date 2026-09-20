import Link from "next/link";
import { listTexts, listThemes } from "@/lib/texts";
import { Card, Badge } from "@/components/ui/Card";
import { LinkButton } from "@/components/ui/Button";
import { Select } from "@/components/ui/Input";
import type { CefrLevel } from "@prisma/client";
import { Plus, Search } from "lucide-react";

const LEVELS: CefrLevel[] = ["A1", "A2", "B1", "B2", "C1", "C2"];

const LEVEL_TONE: Record<CefrLevel, "default" | "success" | "warning"> = {
  A1: "success",
  A2: "success",
  B1: "default",
  B2: "default",
  C1: "warning",
  C2: "warning",
};

export default async function LibraryPage({
  searchParams,
}: {
  searchParams: Promise<{ level?: string; theme?: string; q?: string }>;
}) {
  const params = await searchParams;
  const level = (params.level as CefrLevel) || undefined;
  const theme = params.theme || undefined;
  const q = params.q || undefined;

  const [texts, themes] = await Promise.all([listTexts({ level, theme, q }), listThemes()]);

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Bibliothèque de textes</h1>
          <p className="mt-1 text-sm text-slate-500">
            {texts.length} texte{texts.length > 1 ? "s" : ""} disponible
            {texts.length > 1 ? "s" : ""}.
          </p>
        </div>
        <LinkButton href="/library/new" size="sm">
          <Plus className="h-4 w-4" />
          Ajouter un texte
        </LinkButton>
      </div>

      <Card className="mt-6">
        <form method="get" className="grid gap-4 sm:grid-cols-4">
          <div className="sm:col-span-2">
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Recherche
            </label>
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                name="q"
                defaultValue={q}
                placeholder="Titre ou mot-clé..."
                className="w-full rounded-lg border border-slate-300 py-2 pl-9 pr-3 text-sm shadow-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Niveau CECRL
            </label>
            <Select name="level" defaultValue={level ?? ""}>
              <option value="">Tous</option>
              {LEVELS.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Thème</label>
            <Select name="theme" defaultValue={theme ?? ""}>
              <option value="">Tous</option>
              {themes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </Select>
          </div>
          <div className="sm:col-span-4">
            <button
              type="submit"
              className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
            >
              Filtrer
            </button>
            {(level || theme || q) && (
              <Link
                href="/library"
                className="ml-3 text-sm font-medium text-slate-500 hover:underline"
              >
                Réinitialiser
              </Link>
            )}
          </div>
        </form>
      </Card>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {texts.map((text) => (
          <Link key={text.id} href={`/library/${text.id}`}>
            <Card className="h-full transition-shadow hover:shadow-md">
              <div className="flex items-center gap-2">
                <Badge tone={LEVEL_TONE[text.level]}>{text.level}</Badge>
                <Badge>{text.theme}</Badge>
              </div>
              <h3 className="mt-3 font-semibold text-slate-900">{text.title}</h3>
              <p className="mt-2 line-clamp-3 text-sm text-slate-500">{text.body}</p>
              <p className="mt-3 text-xs text-slate-400">{text.wordCount} mots</p>
            </Card>
          </Link>
        ))}
      </div>

      {texts.length === 0 && (
        <Card className="mt-6 text-center text-sm text-slate-500">
          Aucun texte ne correspond à ces critères.
        </Card>
      )}
    </div>
  );
}
