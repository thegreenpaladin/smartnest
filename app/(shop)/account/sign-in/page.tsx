import { CredentialsForm } from "@/components/auth/credentials-form";

export default function AccountSignInPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 pt-32 pb-20 flex items-center justify-center">
      <CredentialsForm
        title="Your Account"
        helperText="Optional sign-in for faster checkout and order tracking."
        callbackUrl="/account"
      />
    </div>
  );
}
