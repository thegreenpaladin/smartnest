import { CredentialsForm } from "@/components/auth/credentials-form";
import Link from "next/link";

export default function AccountSignInPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 pt-32 pb-20 flex flex-col items-center justify-center gap-4">
      <CredentialsForm
        title="Your Account"
        helperText="Optional sign-in for faster checkout and order tracking."
        callbackUrl="/account"
      />
      <p className="text-xs text-neutral-500">
        Don&apos;t have an account? <Link href="/account/register" className="text-black underline">Register</Link>
      </p>
    </div>
  );
}
