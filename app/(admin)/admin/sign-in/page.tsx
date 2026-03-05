import { CredentialsForm } from "@/components/auth/credentials-form";

export default function AdminSignIn() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-50 px-6">
      <CredentialsForm
        title="Admin Access"
        helperText="Sign in with your administrator credentials to manage catalog and orders."
        callbackUrl="/admin"
      />
    </div>
  );
}
