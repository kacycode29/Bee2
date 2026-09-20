import { prisma } from "@/lib/prisma";
import type { CefrLevel } from "@prisma/client";

export type LibraryFilters = {
  level?: CefrLevel;
  theme?: string;
  q?: string;
};

export async function listTexts(filters: LibraryFilters) {
  return prisma.text.findMany({
    where: {
      isPublished: true,
      ...(filters.level ? { level: filters.level } : {}),
      ...(filters.theme ? { theme: filters.theme } : {}),
      ...(filters.q
        ? {
            OR: [
              { title: { contains: filters.q, mode: "insensitive" } },
              { tags: { has: filters.q.toLowerCase() } },
            ],
          }
        : {}),
    },
    orderBy: [{ level: "asc" }, { title: "asc" }],
  });
}

export async function listThemes() {
  const rows = await prisma.text.findMany({
    where: { isPublished: true },
    select: { theme: true },
    distinct: ["theme"],
    orderBy: { theme: "asc" },
  });
  return rows.map((r) => r.theme);
}

export async function getTextWithExercises(id: string) {
  return prisma.text.findUnique({
    where: { id },
    include: { exercises: { orderBy: { order: "asc" } }, createdBy: true },
  });
}
