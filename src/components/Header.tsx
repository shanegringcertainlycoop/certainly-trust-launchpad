import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PartnershipDialog } from "@/components/PartnershipDialog";
import certainlyLogo from "@/assets/certainly-logo.png";
import { cn } from "@/lib/utils";

const navItems = [
  {
    label: "Who We Serve",
    href: "/for",
    children: [
      { label: "Certification Organizations", href: "/for/certification-orgs" },
      { label: "Launching a Certification", href: "/for/new-certification" },
      { label: "Service Providers", href: "/for/service-providers" },
    ],
  },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Marketing", href: "/services/marketing" },
      { label: "Operations", href: "/services/operations" },
      { label: "Technology", href: "/services/technology" },
    ],
  },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [partnershipOpen, setPartnershipOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const location = useLocation();

  const isActive = (href: string) =>
    location.pathname === href || location.pathname.startsWith(href + "/");

  return (
    <>
      <PartnershipDialog open={partnershipOpen} onOpenChange={setPartnershipOpen} />
      <header className="sticky top-0 z-50 bg-cream/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src={certainlyLogo} alt="Certainly" width={100} height={32} className="h-8 w-auto" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) =>
              item.children ? (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(item.href)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <Link
                    to={item.href}
                    className={cn(
                      "text-sm font-medium transition-colors hover:text-primary",
                      isActive(item.href) ? "text-primary" : "text-foreground/70"
                    )}
                  >
                    {item.label}
                  </Link>
                  {openDropdown === item.href && (
                    <div className="absolute top-full left-0 pt-2">
                      <div className="bg-white rounded-lg shadow-lg border border-border py-2 min-w-[180px]">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            to={child.href}
                            className={cn(
                              "block px-4 py-2 text-sm transition-colors hover:bg-light-gray",
                              isActive(child.href)
                                ? "text-primary font-medium"
                                : "text-foreground/70"
                            )}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary",
                    isActive(item.href) ? "text-primary" : "text-foreground/70"
                  )}
                >
                  {item.label}
                </Link>
              )
            )}
            <Button
              variant="cta"
              size="sm"
              onClick={() => setPartnershipOpen(true)}
            >
              Explore a Partnership
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <div className="md:hidden border-t border-border bg-cream">
            <nav className="px-6 py-4 space-y-1">
              {navItems.map((item) => (
                <div key={item.href}>
                  <Link
                    to={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "block py-2 text-sm font-medium transition-colors",
                      isActive(item.href) ? "text-primary" : "text-foreground/70"
                    )}
                  >
                    {item.label}
                  </Link>
                  {item.children?.map((child) => (
                    <Link
                      key={child.href}
                      to={child.href}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "block py-2 pl-4 text-sm transition-colors",
                        isActive(child.href)
                          ? "text-primary font-medium"
                          : "text-foreground/60"
                      )}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              ))}
              <div className="pt-3">
                <Button
                  variant="cta"
                  className="w-full"
                  onClick={() => {
                    setMobileOpen(false);
                    setPartnershipOpen(true);
                  }}
                >
                  Explore a Partnership
                </Button>
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
};
