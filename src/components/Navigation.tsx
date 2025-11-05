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
    <nav className="border-b border-gray-200 bg-white sticky top-0 z-50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold text-[#242424] font-serif">
              Scribe
            </h1>
          </Link>

          {/* Center Nav Links */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink to="/" label="Home" />
            <NavLink to="/our-story" label="Our Story" />
            <NavLink to="/membership" label="Membership" />
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {authenticated ? (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate("/write")}
                >
                  <PenSquare className="h-4 w-4 mr-2" />
                  Write
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate("/profile")}
                >
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </Button>
                <Button variant="ghost" size="sm" onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate("/login")}
                >
                  Sign In
                </Button>
                <Button
                  size="sm"
                  onClick={() => navigate("/signup")}
                  className="bg-[#1A8917] text-white hover:bg-[#0F730C]"
                >
                  Get Started
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
