import { ReactNode } from "react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface DashboardLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  breadcrumbs?: { label: string; href?: string }[];
  action?: ReactNode;
}

const DashboardLayout = ({ children, title, subtitle, breadcrumbs, action }: DashboardLayoutProps) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 pt-24 pb-12">
        {/* Breadcrumbs */}
        {breadcrumbs && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            {breadcrumbs.map((crumb, index) => (
              <div key={index} className="flex items-center gap-2">
                {crumb.href ? (
                  <button
                    onClick={() => navigate(crumb.href!)}
                    className="hover:text-primary transition-colors"
                  >
                    {crumb.label}
                  </button>
                ) : (
                  <span className="text-foreground">{crumb.label}</span>
                )}
                {index < breadcrumbs.length - 1 && <span>/</span>}
              </div>
            ))}
          </div>
        )}

        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/dashboard")}
              className="shrink-0"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">{title}</h1>
              {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
            </div>
          </div>
          {action && <div>{action}</div>}
        </div>

        {/* Content */}
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
