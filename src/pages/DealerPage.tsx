import { useState } from "react";
import Navbar from "@/components/Navbar";
import AlertBox from "@/components/AlertBox";
import Loader from "@/components/Loader";
import {
  getFarmerByAadhaar,
  claimFertilizer,
} from "@/services/farmerService";
import { Search, Package, User, MapPin, CreditCard } from "lucide-react";

const DealerPage = () => {
  const [aadhaar, setAadhaar] = useState("");
  const [searching, setSearching] = useState(false);
  const [result, setResult] = useState<null | "found" | "not_found">(null);
  const [farmer, setFarmer] = useState<any>(null);
  const [claiming, setClaiming] = useState(false);
  const [claimDone, setClaimDone] = useState(false);

  const handleSearch = async () => {
  if (!aadhaar.trim()) return;

  try {
    setSearching(true);
    setResult(null);
    setFarmer(null);
    setClaimDone(false);

    const foundFarmer = await getFarmerByAadhaar(aadhaar);

    if (foundFarmer) {
      setFarmer(foundFarmer);
      setResult("found");
    } else {
      setResult("not_found");
    }

  } catch (error) {
    console.error(error);
    setResult("not_found");
  } finally {
    setSearching(false);
  }
};

  const handleClaim = async () => {
  if (!farmer) return;

  try {
    setClaiming(true);

    await claimFertilizer(aadhaar);

    const updatedFarmer = await getFarmerByAadhaar(aadhaar);

    setFarmer(updatedFarmer);

    setClaimDone(true);

  } catch (error) {
    console.error(error);
    alert("Failed to process claim.");
  } finally {
    setClaiming(false);
  }
};

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-foreground sm:text-3xl">Dealer Portal</h1>
          <p className="mt-1 text-muted-foreground">Verify farmer eligibility and process claims.</p>
        </div>

        {/* Search */}
        <div className="glass-card p-6 mb-6">
          <label className="mb-2 block text-sm font-medium text-muted-foreground">
            Enter Aadhaar Number
          </label>
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Enter 12-digit Aadhaar Number"
              value={aadhaar}
              onChange={(e) => setAadhaar(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="flex-1 rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20 transition-all"
            />
            <button
              onClick={handleSearch}
              disabled={searching}
              className="flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-md transition-all hover:shadow-lg btn-glow disabled:opacity-50"
            >
              {searching ? <Loader size="sm" /> : <Search className="h-4 w-4" />}
              Search
            </button>
          </div>
        </div>

        {/* Not Found */}
        {result === "not_found" && (
          <AlertBox type="warning" title="Not Found" message="No farmer record matches your search. Please verify the ID or name." />
        )}

        {/* Found */}
        {result === "found" && farmer && (
          <div className="space-y-4 animate-fade-in">
            {/* Farmer Info Card */}
            <div className="glass-card p-6">
              <h2 className="mb-4 font-bold text-foreground">Farmer Details</h2>
              <div className="space-y-3">
                {[
                  { icon: User, label: "Name", value: farmer.name },
                  { icon: MapPin, label: "Location", value: farmer.location },
                  { icon: Package, label: "Fertilizer", value: `${farmer.fertilizerKg} KG` },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3 border-b border-border/50 pb-3 last:border-0 last:pb-0">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-secondary">
                      <item.icon className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">{item.label}</p>
                      <p className="text-sm font-medium text-foreground">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Status + Claim */}
            {claimDone ? (
              <AlertBox type="success" title="Claim Processed" message={`Fertilizer "${farmer.fertilizerKg} KG" has been successfully claimed by ${farmer.name}.`} />
            ) : farmer.claimed ? (
              <AlertBox type="error" title="Already Claimed" message="This farmer has already claimed their fertilizer allocation." />
            ) : (
              <button
                onClick={handleClaim}
                disabled={claiming}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-md transition-all hover:shadow-lg btn-glow disabled:opacity-50"
              >
                {claiming ? <Loader size="sm" /> : <Package className="h-4 w-4" />}
                {claiming ? "Processing Claim..." : "Process Claim"}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DealerPage;
