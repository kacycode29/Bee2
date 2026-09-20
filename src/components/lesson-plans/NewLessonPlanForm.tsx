"use client";

import { useMemo, useState } from "react";
import { CURRICULUM, CLASS_LABELS, type ClassLevel } from "@/data/curriculum";
import { Card } from "@/components/ui/Card";
import { Input, Label, Select } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { createLessonPlanAction } from "@/app/(app)/lesson-plans/new/actions";

const CLASS_LEVELS: ClassLevel[] = ["6e", "5e", "4e", "3e"];

const SESSION_TYPES = [
  { value: "LEARNING", label: "Séance d'apprentissage (Learning session)" },
  { value: "CONSOLIDATION", label: "Séance de consolidation (fin de leçon)" },
  { value: "PROBLEM_SOLVING", label: "Situation d'intégration (fin d'unité)" },
];

const SKILLS = ["Listening", "Speaking", "Reading", "Writing"];

export function NewLessonPlanForm({ defaultTeacherName }: { defaultTeacherName: string }) {
  const [classLevel, setClassLevel] = useState<ClassLevel>("6e");
  const [unitNumber, setUnitNumber] = useState(CURRICULUM["6e"].units[0].number);
  const [sessionType, setSessionType] = useState("LEARNING");
  const [lessonNumber, setLessonNumber] = useState(CURRICULUM["6e"].units[0].lessons[0].number);

  const curriculum = CURRICULUM[classLevel];
  const units = curriculum.units;
  const selectedUnit = units.find((u) => u.number === unitNumber) ?? units[0];
  const lessons = selectedUnit.lessons;

  const needsLesson = sessionType !== "PROBLEM_SOLVING";

  const summary = useMemo(() => {
    if (!needsLesson) {
      return `Portera sur toute l'unité ${selectedUnit.number} (${selectedUnit.title}) : ${lessons
        .map((l) => l.title)
        .join(", ")}.`;
    }
    const lesson = lessons.find((l) => l.number === lessonNumber) ?? lessons[0];
    return `Leçon ${lesson.number} — ${lesson.title}.`;
  }, [needsLesson, selectedUnit, lessons, lessonNumber]);

  return (
    <form action={createLessonPlanAction} className="space-y-6">
      <Card>
        <h2 className="font-semibold text-slate-900">Programme</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="classLevel">Classe</Label>
            <Select
              id="classLevel"
              name="classLevel"
              value={classLevel}
              onChange={(e) => {
                const lvl = e.target.value as ClassLevel;
                setClassLevel(lvl);
                const firstUnit = CURRICULUM[lvl].units[0];
                setUnitNumber(firstUnit.number);
                setLessonNumber(firstUnit.lessons[0].number);
              }}
            >
              {CLASS_LEVELS.map((lvl) => (
                <option key={lvl} value={lvl}>
                  {CLASS_LABELS[lvl]}
                </option>
              ))}
            </Select>
          </div>

          <div>
            <Label htmlFor="sessionType">Type de séance</Label>
            <Select
              id="sessionType"
              name="sessionType"
              value={sessionType}
              onChange={(e) => setSessionType(e.target.value)}
            >
              {SESSION_TYPES.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </Select>
          </div>

          <div>
            <Label htmlFor="unitNumber">Unité</Label>
            <Select
              id="unitNumber"
              name="unitNumber"
              value={unitNumber}
              onChange={(e) => {
                setUnitNumber(e.target.value);
                const unit = units.find((u) => u.number === e.target.value);
                if (unit) setLessonNumber(unit.lessons[0].number);
              }}
            >
              {units.map((u) => (
                <option key={u.number} value={u.number}>
                  Unité {u.number} — {u.title} ({u.month})
                </option>
              ))}
            </Select>
          </div>

          {needsLesson && (
            <div>
              <Label htmlFor="lessonNumber">Leçon</Label>
              <Select
                id="lessonNumber"
                name="lessonNumber"
                value={lessonNumber}
                onChange={(e) => setLessonNumber(e.target.value)}
              >
                {lessons.map((l) => (
                  <option key={l.number} value={l.number}>
                    Leçon {l.number} — {l.title}
                  </option>
                ))}
              </Select>
            </div>
          )}

          {sessionType === "LEARNING" && (
            <div>
              <Label htmlFor="mainSkill">Compétence langagière principale</Label>
              <Select id="mainSkill" name="mainSkill" defaultValue="Speaking">
                {SKILLS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </Select>
            </div>
          )}

          <div>
            <Label htmlFor="durationMin">Durée (minutes)</Label>
            <Input id="durationMin" name="durationMin" type="number" min={20} max={120} defaultValue={55} />
          </div>
        </div>

        <p className="mt-4 rounded-lg bg-amber-50 p-3 text-sm text-amber-800">{summary}</p>
      </Card>

      <Card>
        <h2 className="font-semibold text-slate-900">Informations administratives</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="date">Date</Label>
            <Input id="date" name="date" type="date" defaultValue={new Date().toISOString().slice(0, 10)} />
          </div>
          <div>
            <Label htmlFor="teacherName">Enseignant(e)</Label>
            <Input id="teacherName" name="teacherName" defaultValue={defaultTeacherName} required />
          </div>
          <div>
            <Label htmlFor="school">École / Établissement</Label>
            <Input id="school" name="school" placeholder="ex: CEG de Ouagadougou" />
          </div>
          <div>
            <Label htmlFor="provincialDirectorate">Direction provinciale</Label>
            <Input id="provincialDirectorate" name="provincialDirectorate" />
          </div>
          <div>
            <Label htmlFor="classLabel">Classe (libellé)</Label>
            <Input id="classLabel" name="classLabel" placeholder={`ex: ${classLevel} A`} defaultValue={classLevel} required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="boysCount">Garçons</Label>
              <Input id="boysCount" name="boysCount" type="number" min={0} />
            </div>
            <div>
              <Label htmlFor="girlsCount">Filles</Label>
              <Input id="girlsCount" name="girlsCount" type="number" min={0} />
            </div>
          </div>
          <div>
            <Label htmlFor="attendance">Effectif présent</Label>
            <Input id="attendance" name="attendance" placeholder="ex: 45/50" />
          </div>
          <div>
            <Label htmlFor="learnersWithSpecialNeeds">Apprenants à besoins spécifiques</Label>
            <Input id="learnersWithSpecialNeeds" name="learnersWithSpecialNeeds" placeholder="ex: aucun" />
          </div>
        </div>
      </Card>

      <Button type="submit" size="lg">
        Générer la fiche pédagogique
      </Button>
    </form>
  );
}
