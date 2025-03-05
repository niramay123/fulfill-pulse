
import { Bell, Menu, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface NavbarProps {
  toggleSidebar: () => void;
}

export function Navbar({ toggleSidebar }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "fixed top-0 right-0 left-0 z-50 py-3 px-4 md:px-6 transition-all duration-200",
        scrolled ? "bg-background/70 backdrop-blur-md border-b" : "bg-transparent"
      )}
      style={{ left: "var(--sidebar-width, 0px)" }}
    >
      <div className="flex items-center justify-between max-w-[1800px] mx-auto">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleSidebar}
            className="mr-2 lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div className="relative hidden md:flex items-center">
            <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
            <Input 
              className="pl-9 w-[300px] bg-secondary border-none shadow-none focus-visible:ring-1" 
              placeholder="Search inventory, orders..."
              type="search"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
