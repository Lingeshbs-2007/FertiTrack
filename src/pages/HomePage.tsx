import { Link } from "react-router-dom";
import { Shield, Store, Globe, Leaf, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";

const features = [
  {
    icon: Shield,
    title: "Admin Dashboard",
    description: "Manage farmer records, approve claims, and monitor the entire supply chain.",
    to: "/admin",
    color: "text-primary",
    bg: "bg-secondary",
  },
  {
    icon: Store,
    title: "Dealer Portal",
    description: "Verify farmer eligibility and process fertilizer claims in real-time.",
    to: "/dealer",
    color: "text-info",
    bg: "bg-info/10",
  },
  {
    icon: Globe,
    title: "Public Dashboard",
    description: "Transparent view of system stats, claim data, and distribution analytics.",
    to: "/public",
    color: "text-accent",
    bg: "bg-accent/10",
  },
];

const HomePage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="gradient-hero-subtle">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-secondary px-4 py-1.5 text-sm font-medium text-primary animate-fade-in">
              <Leaf className="h-4 w-4" />
              Transparent Fertilizer Distribution
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-6xl animate-fade-in" style={{ animationDelay: "0.1s" }}>
              Ferti<span className="text-primary">Track</span> 🌿
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground animate-fade-in" style={{ animationDelay: "0.2s" }}>
              Ensuring every farmer gets their fair share of fertilizers through a transparent, verifiable, and efficient tracking system.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <Link
                to="/admin"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3 font-semibold text-primary-foreground shadow-md transition-all hover:shadow-lg btn-glow hover:scale-105"
              >
                Get Started
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/public"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-8 py-3 font-semibold text-foreground transition-all hover:bg-muted hover:scale-105"
              >
                View Dashboard
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="mb-12 text-center">
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
            How it works
          </h2>
          <p className="mt-2 text-muted-foreground">
            Three roles, one transparent system.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <Link
              key={f.to}
              to={f.to}
              className="glass-card hover-lift p-6 animate-fade-in-up group"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl ${f.bg}`}>
                <f.icon className={`h-6 w-6 ${f.color}`} />
              </div>
              <h3 className="text-lg font-bold text-foreground">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {f.description}
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                Explore <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">
        © 2026 FertiTrack. Built for transparency.
      </footer>
    </div>
  );
};

export default HomePage;
