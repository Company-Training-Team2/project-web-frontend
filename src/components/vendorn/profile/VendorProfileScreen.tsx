"use client";

import { useEffect, useState } from "react";
import { Loader2, Pencil } from "lucide-react";

import VendorSidebar from "@/components/layout/VendorSidebar";
import VendorBottomNav from "@/components/vendorn/orders/VendorBottomNav";
import { useRequireVendorAuth } from "@/hooks/useRequireVendorAuth";
import { useAuth } from "@/context/AuthContext";
import {
  vendorPortalService,
  getVendorPortalErrorMessage,
  VendorProfile,
  VendorDashboard,
  VendorWorkPost,
  UpdateVendorProfilePayload,
} from "@/services/vendorPortal.service";

import ProfileTopBar from "./ProfileTopBar";
import ProfileHero from "./ProfileHero";
import ProfileStatsBar from "./ProfileStatsBar";
import ProfileAbout from "./ProfileAbout";
import ProfilePortfolio from "./ProfilePortfolio";
import ProfileConnect from "./ProfileConnect";
import ProfilePackages from "./ProfilePackages";
import ProfileEditForm from "./ProfileEditForm";

export default function VendorProfileScreen() {
  const { isVendor, isLoading: authLoading } = useRequireVendorAuth();
  const { user } = useAuth();

  const [profile, setProfile] = useState<VendorProfile | null>(null);
  const [dashboard, setDashboard] = useState<VendorDashboard | null>(null);
  const [services, setServices] = useState<VendorWorkPost[]>([]);
  const [error, setError] = useState<string | null>(null);

  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const load = () => {
    setError(null);
    Promise.all([
      vendorPortalService.getProfile(),
      vendorPortalService.getDashboard(),
      vendorPortalService.getServices(),
    ])
      .then(([p, d, s]) => {
        setProfile(p);
        setDashboard(d);
        setServices(s);
      })
      .catch((err) => setError(getVendorPortalErrorMessage(err, "Couldn't load your profile.")));
  };

  useEffect(() => {
    if (!isVendor) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, [isVendor]);

  const handleSave = async (payload: UpdateVendorProfilePayload) => {
    setSaving(true);
    setSaveError(null);
    try {
      const updated = await vendorPortalService.updateProfile(payload);
      setProfile(updated);
      setEditing(false);
    } catch (err) {
      setSaveError(getVendorPortalErrorMessage(err, "Couldn't save your profile."));
    } finally {
      setSaving(false);
    }
  };

  if (authLoading || !isVendor) return null;

  return (
    <div className="min-h-screen bg-[#EDE0D2] flex overflow-x-hidden">
      <VendorSidebar />

      <main className="flex-1 p-3 pb-24 md:p-6 md:pb-8 min-w-0 overflow-x-hidden">
        <ProfileTopBar businessName={profile?.businessName ?? ""} />

        {error ? (
          <div className="mt-6 flex flex-col items-center gap-3 py-24 text-center">
            <p className="text-sm text-[#A3391C]">{error}</p>
            <button onClick={load} className="text-sm font-semibold text-[#A3391C] hover:underline">
              Try again
            </button>
          </div>
        ) : !profile || !dashboard ? (
          <div className="mt-6 flex items-center justify-center gap-2 py-24 text-[#8B7E72]">
            <Loader2 className="size-5 animate-spin" />
            Loading profile…
          </div>
        ) : editing ? (
          <div className="mt-6 max-w-3xl">
            <ProfileEditForm
              profile={profile}
              onCancel={() => {
                setEditing(false);
                setSaveError(null);
              }}
              onSave={handleSave}
              onLogoUploaded={setProfile}
              saving={saving}
              error={saveError}
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            <div className="lg:col-span-2 flex flex-col gap-6 min-w-0">
              <ProfileHero
                profile={profile}
                averageRating={dashboard.averageRating}
                reviewCount={dashboard.reviewCount}
              />
              <ProfileStatsBar
                averageRating={dashboard.averageRating}
                totalBookings={dashboard.totalBookings}
                totalWorkPosts={dashboard.totalWorkPosts}
                reviewCount={dashboard.reviewCount}
              />
              <ProfileAbout bioDescription={profile.bioDescription} />
              <ProfilePortfolio services={services} />
              <ProfilePackages services={services} />
            </div>

            <div className="flex flex-col gap-6 min-w-0">
              <ProfileConnect
                phoneNumber={profile.phoneNumber}
                email={user?.email ?? ""}
                city={profile.city}
              />

              <button
                onClick={() => setEditing(true)}
                className="flex items-center justify-center gap-2 bg-[#A3391C] text-white rounded-xl py-3 text-sm font-semibold hover:opacity-90"
              >
                <Pencil size={15} />
                Edit Profile
              </button>
            </div>
          </div>
        )}
      </main>

      <VendorBottomNav />
    </div>
  );
}
