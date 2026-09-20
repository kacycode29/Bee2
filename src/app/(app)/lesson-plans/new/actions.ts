"use server";

import { redirect } from "next/navigation";
import { requireActiveLicense } from "@/lib/session";
import { createOfficialLessonPlan } from "@/lib/lesson-plans";
import type { ClassLevel } from "@/data/curriculum";
import type { SessionType } from "@prisma/client";
import type { SessionSkill } from "@/lib/fiche-pedagogique";

export async function createLessonPlanAction(formData: FormData) {
  const user = await requireActiveLicense();

  const classLevel = String(formData.get("classLevel")) as ClassLevel;
  const unitNumber = String(formData.get("unitNumber"));
  const lessonNumber = String(formData.get("lessonNumber") ?? "") || undefined;
  const sessionType = String(formData.get("sessionType")) as SessionType;
  const mainSkill = String(formData.get("mainSkill") ?? "Speaking") as SessionSkill;
  const durationMin = Number(formData.get("durationMin") ?? 55);

  const teacherName = String(formData.get("teacherName") ?? user.username ?? "");
  const school = String(formData.get("school") ?? "") || undefined;
  const provincialDirectorate = String(formData.get("provincialDirectorate") ?? "") || undefined;
  const classLabel = String(formData.get("classLabel") ?? classLevel);
  const boysCountRaw = String(formData.get("boysCount") ?? "");
  const girlsCountRaw = String(formData.get("girlsCount") ?? "");
  const attendance = String(formData.get("attendance") ?? "") || undefined;
  const learnersWithSpecialNeeds = String(formData.get("learnersWithSpecialNeeds") ?? "") || undefined;
  const dateRaw = String(formData.get("date") ?? "");

  const plan = await createOfficialLessonPlan({
    userId: user.id,
    teacherName,
    provincialDirectorate,
    school,
    classLabel,
    boysCount: boysCountRaw ? Number(boysCountRaw) : undefined,
    girlsCount: girlsCountRaw ? Number(girlsCountRaw) : undefined,
    attendance,
    learnersWithSpecialNeeds,
    classLevel,
    unitNumber,
    lessonNumber,
    sessionType,
    mainSkill,
    durationMin: Number.isFinite(durationMin) && durationMin > 0 ? durationMin : 55,
    date: dateRaw ? new Date(dateRaw) : undefined,
  });

  redirect(`/lesson-plans/${plan.id}`);
}
