import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { Card, Badge } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

async function toggleRoleAction(formData: FormData) {
  "use server";
  const admin = await requireAdmin();
  const id = String(formData.get("id"));
  if (id === admin.id) return;

  const user = await prisma.user.findUniqueOrThrow({ where: { id } });
  await prisma.user.update({
    where: { id },
    data: { role: user.role === "ADMIN" ? "TEACHER" : "ADMIN" },
  });
  revalidatePath("/admin/users");
}

export default async function AdminUsersPage() {
  const admin = await requireAdmin();
  const users = await prisma.user.findMany({
    include: { licenseKey: true },
    orderBy: { createdAt: "desc" },
    take: 200,
  });

  return (
    <div>
      <h1 className="text-2xl font-semibold text-slate-900">Enseignants</h1>
      <p className="mt-1 text-sm text-slate-500">{users.length} comptes.</p>

      <Card className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-slate-500">
              <th className="py-2 pr-4 font-medium">Nom d&apos;utilisateur</th>
              <th className="py-2 pr-4 font-medium">Rôle</th>
              <th className="py-2 pr-4 font-medium">Licence</th>
              <th className="py-2 pr-4 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-b border-slate-100">
                <td className="py-2 pr-4">@{u.username}</td>
                <td className="py-2 pr-4">
                  <Badge tone={u.role === "ADMIN" ? "warning" : "default"}>{u.role}</Badge>
                </td>
                <td className="py-2 pr-4">
                  {u.licenseKey ? (
                    <Badge tone={u.licenseKey.status === "ACTIVE" ? "success" : "danger"}>
                      {u.licenseKey.status}
                    </Badge>
                  ) : (
                    <Badge>Aucune</Badge>
                  )}
                </td>
                <td className="py-2 pr-4">
                  {u.id !== admin.id && (
                    <form action={toggleRoleAction}>
                      <input type="hidden" name="id" value={u.id} />
                      <Button type="submit" variant="ghost" size="sm">
                        {u.role === "ADMIN" ? "Rétrograder" : "Promouvoir admin"}
                      </Button>
                    </form>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
