import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";

import { Users, CheckCircle, Clock } from "lucide-react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import {
  getTotalFarmers,
  getTotalClaimed,
} from "@/services/farmerService";

const PublicPage = () => {
  const [totalFarmers, setTotalFarmers] = useState(0);
  const [claimedFarmers, setClaimedFarmers] = useState(0);

  useEffect(() => {
  const loadDashboard = async () => {
    try {
      const total = await getTotalFarmers();
      const claimed = await getTotalClaimed();

      setTotalFarmers(total);
      setClaimedFarmers(claimed);
    } catch (err) {
      console.error(err);
    }
  };

  loadDashboard();
}, []);
 
const eligibleFarmers = totalFarmers - claimedFarmers;

const chartData = [
  { name: "Claimed", value: claimedFarmers },
  { name: "Eligible", value: eligibleFarmers },
];

const COLORS = [
  "hsl(152, 60%, 36%)",
  "hsl(210, 80%, 52%)",
];

const statCards = [
  {
    icon: Users,
    label: "Total Farmers",
    value: totalFarmers,
    color: "text-primary",
    bg: "bg-secondary",
  },
  {
    icon: CheckCircle,
    label: "Claimed",
    value: claimedFarmers,
    color: "text-primary",
    bg: "bg-secondary",
  },
  {
    icon: Clock,
    label: "Eligible",
    value: eligibleFarmers,
    color: "text-info",
    bg: "bg-info/10",
  },
];
  const pct =
  totalFarmers === 0
    ? "0.0"
    : ((claimedFarmers / totalFarmers) * 100).toFixed(1);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground sm:text-3xl">Public Dashboard</h1>
          <p className="mt-1 text-muted-foreground">Transparent overview of fertilizer distribution.</p>
        </div>

        {/* Stats */}
        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          {statCards.map((s, i) => (
            <div
              key={s.label}
              className="glass-card hover-lift p-6 animate-fade-in-up"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="flex items-center gap-3">
                <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${s.bg}`}>
                  <s.icon className={`h-5 w-5 ${s.color}`} />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                  <p className="text-2xl font-bold text-foreground">{s.value.toLocaleString()}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Pie Chart */}
          <div className="glass-card p-6 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <h2 className="mb-1 font-bold text-foreground">Distribution Overview</h2>
            <p className="mb-4 text-xs text-muted-foreground">Claimed vs unclaimed fertilizer allocations</p>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={110}
                  paddingAngle={4}
                  dataKey="value"
                  stroke="none"
                >
                  {chartData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    borderRadius: "12px",
                    border: "1px solid hsl(150,15%,88%)",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Highlight */}
          <div className="glass-card p-6 flex flex-col justify-center animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <p className="text-sm text-muted-foreground">Claim Rate</p>
            <p className="text-5xl font-extrabold text-primary mt-2">{pct}%</p>
            <p className="mt-2 text-muted-foreground">
              of registered farmers have successfully claimed their fertilizer allocations.
            </p>
            <div className="mt-6 h-3 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full gradient-hero transition-all duration-1000"
                style={{ width: `${pct}%` }}
              />
            </div>
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicPage;
