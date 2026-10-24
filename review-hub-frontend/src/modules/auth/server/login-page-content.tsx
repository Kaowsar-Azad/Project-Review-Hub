import { LoginForm } from "../client/login-form";

export function LoginPageContent() {
  return (
    <div className="w-full max-w-md mx-auto px-4 pt-2 sm:pt-4 pb-8 flex flex-col justify-center">
      <LoginForm />
    </div>
  );
}
