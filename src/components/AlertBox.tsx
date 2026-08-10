import { CheckCircle, XCircle, AlertTriangle, Info } from "lucide-react";

type AlertType = "success" | "error" | "warning" | "info";

interface AlertBoxProps {
  type: AlertType;
  title: string;
  message: string;
}

const config: Record<AlertType, { icon: typeof CheckCircle; classes: string }> = {
  success: { icon: CheckCircle, classes: "border-primary/30 bg-secondary text-primary" },
  error: { icon: XCircle, classes: "border-destructive/30 bg-destructive/10 text-destructive" },
  warning: { icon: AlertTriangle, classes: "border-warning/30 bg-warning/10 text-warning" },
  info: { icon: Info, classes: "border-info/30 bg-info/10 text-info" },
};

const AlertBox = ({ type, title, message }: AlertBoxProps) => {
  const { icon: Icon, classes } = config[type];
  return (
    <div className={`flex items-start gap-3 rounded-xl border p-4 animate-scale-in ${classes}`}>
      <Icon className="mt-0.5 h-5 w-5 shrink-0" />
      <div>
        <p className="font-semibold">{title}</p>
        <p className="mt-0.5 text-sm opacity-80">{message}</p>
      </div>
    </div>
  );
};

export default AlertBox;
