import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useMutation as apolloUseMutation } from "@apollo/client";
import { CREATE_USER } from "@/lib/graphql/mutations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

const Signup = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [createUser, { loading }] = apolloUseMutation(CREATE_USER, {
    onCompleted: (data) => {
      if (data.signup.token) {
        toast({
          title: "Account created!",
          description: "Welcome to Scribe — your space to share stories.",
        });
        navigate("/");
      }
    },
    onError: (error) => {
      toast({
        title: "Signup failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createUser({
      variables: {
        input: { username: name, email, password },
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <Card className="w-full max-w-md p-10 border border-gray-200 rounded-2xl shadow-sm">
        {/* 🌿 Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-serif font-bold text-gray-900 mb-2">
            Join Scribe
          </h1>
          <p className="text-gray-600">
            Create your account and start sharing your ideas.
          </p>
        </div>

        {/* 📝 Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-gray-800">
              Name
            </Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name"
              className="rounded-md border-gray-300 focus:border-[#1A8917] focus:ring-[#1A8917]"
              required
            />
          </div>

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
              minLength={6}
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
                Creating account...
              </>
            ) : (
              "Create Account"
            )}
          </Button>
        </form>

        {/* 🔗 Footer */}
        <p className="text-center mt-8 text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-[#1A8917] hover:underline font-medium"
          >
            Sign in
          </Link>
        </p>
      </Card>
    </div>
  );
};

export default Signup;
