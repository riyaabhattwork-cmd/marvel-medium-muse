import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useMutation as apolloUseMutation } from "@apollo/client";
import { LOGIN } from "@/lib/graphql/mutations";
import { setAuthToken } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [login, { loading }] = apolloUseMutation(LOGIN, {
    onCompleted: (data) => {
      setAuthToken(data.login.token);
      toast({
        title: "Welcome back!",
        description: "You have successfully signed in.",
      });
      navigate("/");
    },
    onError: (error) => {
      toast({
        title: "Login failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login({
      variables: {
        input: { email, password },
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <Card className="w-full max-w-md p-10 border border-gray-200 shadow-sm rounded-2xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-serif font-bold text-gray-900 mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-600">Sign in to continue your journey</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-800">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="rounded-md border-gray-300 focus:border-[#1A8917] focus:ring-[#1A8917]"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-gray-800">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="rounded-md border-gray-300 focus:border-[#1A8917] focus:ring-[#1A8917]"
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-[#1A8917] hover:bg-[#166f13] text-white font-medium rounded-full transition-all duration-200 ease-in-out"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </Button>
        </form>

        <p className="text-center mt-8 text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-[#1A8917] hover:underline font-medium"
          >
            Sign up
          </Link>
        </p>
      </Card>
    </div>
  );
};

export default Login;
