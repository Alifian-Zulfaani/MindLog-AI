import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { login } from "@/actions/auth-actions";

export default function LoginPage() {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">Login ke MindLog AI</h1>
        <form action={login} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <Input name="email" type="email" placeholder="nama@email.com" required />
          </div>
          <Button type="submit" className="w-full">
            Masuk dengan Magic Link
          </Button>
        </form>
      </div>
    </div>
  );
}