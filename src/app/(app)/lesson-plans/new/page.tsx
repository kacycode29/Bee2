import { requireActiveLicense } from "@/lib/session";
import { NewLessonPlanForm } from "@/components/lesson-plans/NewLessonPlanForm";

export default async function NewLessonPlanPage() {
  const user = await requireActiveLicense();

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-2xl font-semibold text-slate-900">Nouvelle fiche pédagogique</h1>
      <p className="mt-1 text-sm text-slate-500">
        Choisissez la classe, l&apos;unité et la leçon du programme officiel : la fiche
        (compétence, fonctions, structures, phases de la séance) est générée automatiquement
        selon le canevas APC/PI.
      </p>

      <div className="mt-6">
        <NewLessonPlanForm defaultTeacherName={user.name ?? ""} />
      </div>
    </div>
  );
}
