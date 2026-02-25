import { UserForm } from "@/components/admin/user-form";
import { store } from "@/lib/store";
import { notFound } from "next/navigation";

export default async function EditUserPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = store.getUserById(id);

  if (!user) notFound();

  return (
    <div className="max-w-3xl space-y-6">
      <header>
        <h1 className="text-3xl font-serif">Edit User</h1>
      </header>
      <UserForm
        mode="edit"
        userId={user.id}
        initialValues={{ name: user.name, email: user.email, role: user.role }}
      />
    </div>
  );
}
