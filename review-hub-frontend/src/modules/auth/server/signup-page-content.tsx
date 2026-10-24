import { SignUpForm } from "../client/signup-form";

export function SignUpPageContent() {
  return (
    <div className="w-full max-w-md mx-auto px-4 pt-2 sm:pt-4 pb-8 flex flex-col justify-center">
      <SignUpForm />
    </div>
  );
}
