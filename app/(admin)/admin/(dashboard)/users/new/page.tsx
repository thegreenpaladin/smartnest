import { UserForm } from "@/components/admin/user-form";

export default function NewUserPage() {
  return (
    <div className="max-w-3xl space-y-6">
      <header>
        <h1 className="text-3xl font-serif">Add User</h1>
      </header>
      <UserForm mode="create" />
    </div>
  );
}
