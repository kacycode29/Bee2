import { notFound } from "next/navigation";
import { requireActiveLicense } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { ENUM_TO_CLASS_LEVEL } from "@/lib/lesson-plans";
import { Card, Badge } from "@/components/ui/Card";
import { LinkButton } from "@/components/ui/Button";
import { Download } from "lucide-react";
import type { Phase, MarkingGrid } from "@/lib/fiche-pedagogique";

const SESSION_TYPE_LABEL: Record<string, string> = {
  LEARNING: "Séance d'apprentissage",
  CONSOLIDATION: "Séance de consolidation",
  PROBLEM_SOLVING: "Situation d'intégration",
};

function HeaderField({ label, value }: { label: string; value?: string | number | null }) {
  if (value === null || value === undefined || value === "") return null;
  return (
    <div className="flex justify-between gap-4 border-b border-slate-100 py-1.5 text-sm">
      <dt className="text-slate-500">{label}</dt>
      <dd className="text-right font-medium text-slate-900">{value}</dd>
    </div>
  );
}

function PhaseTable({ phase }: { phase: Phase }) {
  return (
    <div className="mt-4">
      <h3 className="rounded-t-lg bg-slate-900 px-3 py-2 text-sm font-semibold text-white">
        {phase.name}
      </h3>
      <div className="divide-y divide-slate-200 overflow-hidden rounded-b-lg border border-slate-200">
        {phase.steps.map((step, i) => (
          <div key={i} className="p-3">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-slate-900">{step.title}</h4>
              <Badge>{step.timingMin} mn</Badge>
            </div>
            <div className="mt-2 grid gap-3 sm:grid-cols-2">
              {step.teacherActivities.length > 0 && (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Teacher&apos;s activities
                  </p>
                  <ul className="mt-1 list-disc space-y-0.5 pl-4 text-sm text-slate-700">
                    {step.teacherActivities.map((a, j) => (
                      <li key={j}>{a}</li>
                    ))}
                  </ul>
                </div>
              )}
              {step.learnerActivities.length > 0 && (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Learner&apos;s activities
                  </p>
                  <ul className="mt-1 list-disc space-y-0.5 pl-4 text-sm text-slate-700">
                    {step.learnerActivities.map((a, j) => (
                      <li key={j}>{a}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            {step.techniques && (
              <p className="mt-2 text-xs text-slate-500">
                <span className="font-semibold">Techniques : </span>
                {step.techniques}
              </p>
            )}
            {step.remarks && (
              <p className="mt-2 whitespace-pre-wrap rounded bg-slate-50 p-2 text-xs text-slate-600">
                {step.remarks}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function MarkingGridTable({ grid }: { grid: MarkingGrid }) {
  return (
    <Card className="mt-6">
      <h2 className="font-semibold text-slate-900">Grille de correction critériée</h2>
      <div className="mt-3 overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-sm">
          <thead>
            <tr className="bg-slate-100 text-left">
              <th className="p-2">Instruction</th>
              <th className="p-2">Pertinence</th>
              <th className="p-2">Language accuracy</th>
              <th className="p-2">Coherence</th>
            </tr>
          </thead>
          <tbody>
            {grid.rows.map((row, i) => (
              <tr key={i} className="border-t border-slate-200 align-top">
                <td className="p-2 font-medium text-slate-900">{row.instruction}</td>
                <td className="p-2">
                  {row.pertinence.map((ind, j) => (
                    <p key={j} className="text-slate-600">
                      {ind.indicator} <span className="font-semibold">({ind.points} pt)</span>
                    </p>
                  ))}
                </td>
                <td className="p-2">
                  {row.languageAccuracy.map((ind, j) => (
                    <p key={j} className="text-slate-600">
                      {ind.indicator} <span className="font-semibold">({ind.points} pt)</span>
                    </p>
                  ))}
                </td>
                <td className="p-2">
                  {row.coherence.map((ind, j) => (
                    <p key={j} className="text-slate-600">
                      {ind.indicator} <span className="font-semibold">({ind.points} pt)</span>
                    </p>
                  ))}
                </td>
              </tr>
            ))}
            <tr className="border-t border-slate-200 align-top">
              <td className="p-2 font-medium text-slate-900">Refinement (global)</td>
              <td className="p-2 text-slate-400" colSpan={2}>
                {grid.refinement.map((ind, j) => (
                  <p key={j} className="text-slate-600">
                    {ind.indicator} <span className="font-semibold">({ind.points} pt)</span>
                  </p>
                ))}
              </td>
              <td className="p-2" />
            </tr>
          </tbody>
          <tfoot>
            <tr className="border-t-2 border-slate-300 bg-slate-50 font-semibold">
              <td className="p-2">Total</td>
              <td className="p-2">{grid.totals.pertinence} pts</td>
              <td className="p-2">{grid.totals.languageAccuracy} pts</td>
              <td className="p-2">{grid.totals.coherence} pts</td>
            </tr>
            <tr className="bg-slate-50">
              <td className="p-2" colSpan={3}>
                Refinement : {grid.totals.refinement} pts
              </td>
              <td className="p-2 font-semibold">Total général : {grid.totals.grand} pts</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </Card>
  );
}

export default async function LessonPlanDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await requireActiveLicense();
  const { id } = await params;

  const plan = await prisma.lessonPlan.findUnique({ where: { id } });
  if (!plan || plan.createdById !== user.id) notFound();

  const phases = plan.phases as unknown as Phase[];
  const markingGrid = plan.markingGrid as unknown as MarkingGrid | null;

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Badge tone="success">{ENUM_TO_CLASS_LEVEL[plan.classLevel]}</Badge>
            <Badge>{SESSION_TYPE_LABEL[plan.typeOfSession]}</Badge>
            <Badge>{plan.durationMin} min</Badge>
          </div>
          <h1 className="mt-3 text-2xl font-semibold text-slate-900">{plan.sessionTitle}</h1>
          <p className="text-sm text-slate-500">
            Unité {plan.unitNumber} — {plan.unitTitle} · Leçon {plan.lessonNumber} — {plan.lessonTitle}
          </p>
        </div>
        <LinkButton href={`/api/lesson-plans/${plan.id}/pdf`} variant="secondary" size="sm">
          <Download className="h-4 w-4" />
          Export PDF
        </LinkButton>
      </div>

      <Card>
        <h2 className="font-semibold text-slate-900">En-tête de la fiche</h2>
        <dl className="mt-3">
          <HeaderField label="Date" value={plan.date.toLocaleDateString("fr-FR")} />
          <HeaderField label="Enseignant(e)" value={plan.teacherName} />
          <HeaderField label="Direction provinciale" value={plan.provincialDirectorate} />
          <HeaderField label="École" value={plan.school} />
          <HeaderField label="Classe" value={plan.classLabel} />
          <HeaderField
            label="Effectif"
            value={
              plan.boysCount != null || plan.girlsCount != null
                ? `Garçons: ${plan.boysCount ?? "—"}  Filles: ${plan.girlsCount ?? "—"}`
                : undefined
            }
          />
          <HeaderField label="Présence" value={plan.attendance} />
          <HeaderField label="Apprenants à besoins spécifiques" value={plan.learnersWithSpecialNeeds} />
          <HeaderField label="Compétence intermédiaire" value={plan.competence} />
          <HeaderField label="Compétence langagière principale" value={plan.languageMainSkill} />
          <HeaderField label="Contenu — vocabulaire" value={plan.lessonContentVocab} />
          <HeaderField label="Contenu — grammaire" value={plan.lessonContentGrammar} />
          <HeaderField label="Fonction(s) langagière(s)" value={plan.languageFunctions} />
          <HeaderField label="Méthodes / techniques" value={plan.methodsTechniques} />
          <HeaderField label="Matériel didactique" value={plan.teachingAids} />
        </dl>

        {plan.objectives.length > 0 && (
          <div className="mt-3">
            <p className="text-sm text-slate-500">Objectifs</p>
            <ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-slate-700">
              {plan.objectives.map((o, i) => (
                <li key={i}>{o}</li>
              ))}
            </ul>
          </div>
        )}
      </Card>

      {plan.activityContext && (
        <Card>
          <h2 className="font-semibold text-slate-900">Contexte de l&apos;activité</h2>
          <p className="mt-2 whitespace-pre-wrap text-sm text-slate-700">{plan.activityContext}</p>

          {plan.appreciationCriteria.length > 0 && (
            <div className="mt-4">
              <p className="text-sm font-medium text-slate-900">Critères d&apos;appréciation</p>
              <ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-slate-700">
                {plan.appreciationCriteria.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </div>
          )}

          {plan.expectedProduction.length > 0 && (
            <div className="mt-4">
              <p className="text-sm font-medium text-slate-900">Production attendue</p>
              <ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-slate-700">
                {plan.expectedProduction.map((p, i) => (
                  <li key={i}>{p}</li>
                ))}
              </ul>
            </div>
          )}
        </Card>
      )}

      <div>
        {phases.map((phase, i) => (
          <PhaseTable key={i} phase={phase} />
        ))}
      </div>

      {markingGrid && <MarkingGridTable grid={markingGrid} />}
    </div>
  );
}
