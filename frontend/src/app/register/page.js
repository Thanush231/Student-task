import Link from "next/link";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";


export default function RegisterPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md">
        <Card>
          <h1 className="text-3xl font-bold text-center text-blue-600">
            Create Account
          </h1>

          <p className="text-center text-gray-500 mt-2">
            Register to manage your tasks.
          </p>

          <form className="mt-6 space-y-4">
            <div>
              <label className="block mb-2 text-sm font-medium">
                Full Name
              </label>

              <Input
                type="text"
                name="name"
                placeholder="Enter your full name"
              />
            </div>

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

            <div>
              <label className="block mb-2 text-sm font-medium">
                Confirm Password
              </label>

              <Input
                type="password"
                name="confirmPassword"
                placeholder="Confirm your password"
              />
            </div>

            <Button type="submit">
              Register
            </Button>
          </form>

          <p className="text-center mt-6 text-sm">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-blue-600 hover:underline"
            >
              Login
            </Link>
          </p>
        </Card>
      </div>
    </main>
  );
}