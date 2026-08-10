import { useState } from "react";
import Navbar from "@/components/Navbar";
import StatusBadge from "@/components/StatusBadge";
import Loader from "@/components/Loader";
import type { Farmer } from "@/data/mockData";
import { getAllFarmers } from "@/services/farmerService";
import { useEffect } from "react";
import { Plus, Users, Clock } from "lucide-react";
import { ethers } from "ethers";
import { addFarmer } from "@/services/farmerService";
const AdminPage = () => {
  const [farmers, setFarmers] = useState<Farmer[]>([]);
  const [form, setForm] = useState({
  name: "",
  aadhaar: "",
  fertilizerKg: "",
  location: "",
});
  const [loading, setLoading] = useState(false);
  const [recentlyAdded, setRecentlyAdded] = useState<Farmer | null>(null);

  const loadFarmers = async () => {
  try {
    const data = await getAllFarmers();

    const formattedFarmers: Farmer[] = data.map((farmer, index) => ({
      id: `F${String(index + 1).padStart(3, "0")}`,
      name: farmer.name,
      fertilizer: `${farmer.fertilizerKg} KG`,
      status: farmer.claimed ? "claimed" : "eligible",
      dealer:
        farmer.dealer === "0x0000000000000000000000000000000000000000"
          ? "—"
          : farmer.dealer,
      claimTime:
        farmer.claimTime === 0
          ? "—"
          : new Date(farmer.claimTime * 1000).toLocaleString(),
      location: farmer.location,
      aadhar: "",
    }));

    setFarmers(formattedFarmers);

  } catch (error) {
    console.error(error);
  }
};

useEffect(() => {
  loadFarmers();
}, []);

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (
    !form.name ||
    !form.aadhaar ||
    !form.fertilizerKg ||
    !form.location
  ) {
    alert("Please fill all fields.");
    return;
  }

  try {
    setLoading(true);

    // Hash Aadhaar Number
    const aadhaarHash = ethers.keccak256(
      ethers.toUtf8Bytes(form.aadhaar)
    );

    // Add farmer to blockchain
    await addFarmer(
      aadhaarHash,
      form.name,
      form.location,
      Number(form.fertilizerKg)
    );
    await loadFarmers();
    alert("Farmer added successfully!");

    // Clear form
    setForm({
      name: "",
      aadhaar: "",
      fertilizerKg: "",
      location: "",
    });

  } catch (error) {
    console.error(error);
    alert("Failed to add farmer.");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground sm:text-3xl">Admin Dashboard</h1>
          <p className="mt-1 text-muted-foreground">Manage farmer records and monitor claims.</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Add Farmer Form */}
          <div className="lg:col-span-1 space-y-6">
            <div className="glass-card p-6">
              <div className="mb-5 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary">
                  <Plus className="h-4 w-4 text-primary" />
                </div>
                <h2 className="font-bold text-foreground">Add Farmer</h2>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                {[
  {
    key: "name",
    label: "Farmer Name",
    placeholder: "Enter full name",
  },
  {
    key: "aadhaar",
    label: "Aadhaar Number",
    placeholder: "Enter Aadhaar Number",
  },
  {
    key: "fertilizerKg",
    label: "Fertilizer Quantity (KG)",
    placeholder: "e.g. 50",
  },
  {
    key: "location",
    label: "Location",
    placeholder: "State / District",
  },
].map((field) => (
                  <div key={field.key}>
                    <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                      {field.label}
                    </label>
                    <input
                      type="text"
                      placeholder={field.placeholder}
                      value={form[field.key as keyof typeof form]}
                      onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                      className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20 transition-all"
                    />
                  </div>
                ))}
                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-md transition-all hover:shadow-lg btn-glow disabled:opacity-50"
                >
                  {loading ? <Loader size="sm" /> : <Plus className="h-4 w-4" />}
                  {loading ? "Adding..." : "Add Farmer"}
                </button>
              </form>
            </div>

            {/* Recently Added */}
            {recentlyAdded && (
              <div className="glass-card animate-scale-in p-5">
                <div className="mb-3 flex items-center gap-2 text-xs font-medium text-muted-foreground">
                  <Clock className="h-3.5 w-3.5" />
                  Recently Added
                </div>
                <p className="font-semibold text-foreground">{recentlyAdded.name}</p>
                <p className="mt-1 text-sm text-muted-foreground">{recentlyAdded.fertilizer}</p>
                <div className="mt-2">
                  <StatusBadge status={recentlyAdded.status} />
                </div>
              </div>
            )}

            {/* Stats */}
            <div className="glass-card p-5">
              <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                <Users className="h-3.5 w-3.5" />
                Quick Stats
              </div>
              <div className="mt-3 grid grid-cols-3 gap-3 text-center">
                <div>
                  <p className="text-xl font-bold text-foreground">{farmers.length}</p>
                  <p className="text-xs text-muted-foreground">Total</p>
                </div>
                <div>
                  <p className="text-xl font-bold text-primary">{farmers.filter((f) => f.status === "claimed").length}</p>
                  <p className="text-xs text-muted-foreground">Claimed</p>
                </div>
                <div>
                  <p className="text-xl font-bold text-accent">{farmers.filter((f) => f.status === "eligible").length}</p>
                  <p className="text-xs text-muted-foreground">Eligible</p>
                </div>
              </div>
            </div>
          </div>

          {/* Farmer Table */}
          <div className="lg:col-span-2">
            <div className="glass-card overflow-hidden">
              <div className="border-b border-border px-6 py-4">
                <h2 className="font-bold text-foreground">Farmer Records</h2>
                <p className="text-xs text-muted-foreground">{farmers.length} registered farmers</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/50">
                      <th className="px-6 py-3 text-left font-medium text-muted-foreground">Name</th>
                      <th className="px-6 py-3 text-left font-medium text-muted-foreground">Fertilizer</th>
                      <th className="px-6 py-3 text-left font-medium text-muted-foreground">Status</th>
                      <th className="px-6 py-3 text-left font-medium text-muted-foreground">Dealer</th>
                      <th className="px-6 py-3 text-left font-medium text-muted-foreground">Claim Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {farmers.map((farmer, i) => (
                      <tr
                        key={farmer.id}
                        className="border-b border-border/50 transition-colors hover:bg-muted/30 animate-fade-in"
                        style={{ animationDelay: `${i * 0.03}s` }}
                      >
                        <td className="px-6 py-3.5 font-medium text-foreground">{farmer.name}</td>
                        <td className="px-6 py-3.5 text-muted-foreground">{farmer.fertilizer}</td>
                        <td className="px-6 py-3.5"><StatusBadge status={farmer.status} /></td>
                        <td className="px-6 py-3.5 text-muted-foreground">{farmer.dealer}</td>
                        <td className="px-6 py-3.5 text-muted-foreground">{farmer.claimTime}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
