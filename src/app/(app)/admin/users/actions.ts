"use server";

import bcrypt from "bcryptjs";
import { customAlphabet } from "nanoid";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/session";
import { prisma } from "@/lib/prisma";

// Same unambiguous alphabet as license keys (no 0/O, 1/I) — easy to read
// aloud over the phone when an admin hands a teacher their temporary
// password.
const genTempPassword = customAlphabet("ABCDEFGHJKLMNPQRSTUVWXYZ23456789", 10);

export type ResetPasswordState = { username: string; tempPassword: string } | { error: string } | null;

export async function resetUserPasswordAction(
  _prevState: ResetPasswordState,
  formData: FormData
): Promise<ResetPasswordState> {
  const admin = await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return { error: "Utilisateur invalide." };

  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) return { error: "Utilisateur introuvable." };
  if (user.id === admin.id) {
    return { error: "Utilisez la page « Mot de passe oublié » pour votre propre compte." };
  }

  const tempPassword = genTempPassword();
  const passwordHash = await bcrypt.hash(tempPassword, 12);
  await prisma.user.update({ where: { id }, data: { passwordHash } });

  revalidatePath("/admin/users");
  return { username: user.username, tempPassword };
}
