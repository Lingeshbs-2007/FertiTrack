import { CheckCircle2, Clock3, Sparkles } from "lucide-react";

interface StatusBadgeProps {
  status: "eligible" | "claimed" | "pending";
}

const config = {
  eligible: {
    label: "Eligible",
    icon: Sparkles,
    classes:
      "bg-primary/10 text-primary ring-1 ring-inset ring-primary/30",
    dot: "bg-primary shadow-[0_0_0_3px_hsl(var(--primary)/0.18)]",
  },
  claimed: {
    label: "Claimed",
    icon: CheckCircle2,
    classes:
      "bg-muted text-muted-foreground ring-1 ring-inset ring-border",
    dot: "bg-muted-foreground/60",
  },
  pending: {
    label: "Pending",
    icon: Clock3,
    classes:
      "bg-warning/10 text-warning ring-1 ring-inset ring-warning/30",
    dot: "bg-warning shadow-[0_0_0_3px_hsl(var(--warning)/0.18)] animate-pulse",
  },
} as const;

const StatusBadge = ({ status }: StatusBadgeProps) => {
  const { label, icon: Icon, classes, dot } = config[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-all hover:scale-[1.03] ${classes}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
      <Icon className="h-3 w-3" />
      {label}
    </span>
  );
};

export default StatusBadge;
