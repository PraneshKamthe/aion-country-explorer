import { LoginForm } from "@/components/login-form";

export default function LoginPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Welcome!</h1>
          <p className="text-muted-foreground mt-2">
            Sign in to explore countries
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
