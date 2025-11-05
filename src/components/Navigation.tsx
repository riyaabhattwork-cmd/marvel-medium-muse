import { Link, useNavigate } from "react-router-dom";
import { PenSquare, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { removeAuthToken, isAuthenticated } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";

const Navigation = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const authenticated = isAuthenticated();

  const handleLogout = () => {
    removeAuthToken();
    toast({
      title: "Logged out successfully",
      description: "See you again soon!",
    });
    navigate("/");
  };

  const NavLink = ({ to, label }) => (
    <Link
      to={to}
      className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group"
    >
      {label}
      <span className="absolute left-0 -bottom-0.5 w-0 h-[1px] bg-foreground group-hover:w-full transition-all duration-300"></span>
    </Link>
  );

  return (
    <nav className="border-b border-gray-200 bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center">
              <h1 className="text-3xl font-serif font-bold text-gray-900">
                Scribe
              </h1>
            </Link>
            <div className="hidden md:flex items-center gap-6 text-sm">
              <NavLink to="/our-story" label="Our story" />
              <NavLink to="/membership" label="Membership" />
            </div>
          </div>

          <div className="flex items-center gap-4">
            {authenticated ? (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate("/write")}
                  className="text-gray-600 hover:text-gray-900"
                >
                  <PenSquare className="h-5 w-5 mr-1" />
                  Write
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate("/profile")}
                  className="text-gray-600 hover:text-gray-900"
                >
                  <User className="h-5 w-5 mr-1" />
                  Profile
                </Button>
                <Button variant="ghost" size="sm" onClick={handleLogout} className="text-gray-600 hover:text-gray-900">
                  <LogOut className="h-5 w-5 mr-1" />
                  Sign out
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate("/login")}
                  className="text-gray-600 hover:text-gray-900"
                >
                  Sign In
                </Button>
                <Button
                  size="sm"
                  onClick={() => navigate("/signup")}
                  className="bg-gray-900 text-white hover:bg-gray-800 rounded-full"
                >
                  Get started
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
