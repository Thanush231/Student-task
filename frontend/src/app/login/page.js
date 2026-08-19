import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md">
        <Card>
          <h1 className="text-3xl font-bold text-center text-blue-600">
            Login
          </h1>

          <p className="text-center text-gray-500 mt-2">
            Welcome back! Please login to continue.
          </p>

          <form className="mt-6 space-y-4">
            <div>
              <label className="block mb-2 text-sm font-medium">
                Email
              </label>

              <Input
                type="email"
                name="email"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">
                Password
              </label>

              <Input
                type="password"
                name="password"
                placeholder="Enter your password"
              />
            </div>

            <Button type="submit">
              Login
            </Button>
          </form>

          <p className="text-center mt-6 text-sm">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="text-blue-600 hover:underline"
            >
              Register
            </Link>
          </p>
        </Card>
      </div>
    </main>
  );
}