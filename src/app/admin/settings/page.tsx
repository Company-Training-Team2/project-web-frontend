"use client";

import { useState } from "react";
import { toast } from "sonner";

import Sidebar from "@/components/layout/Sidebar";
import SettingsTopBar from "@/components/admin/settings/SettingsTopBar";
import SettingsHeader from "@/components/admin/settings/SettingsHeader";
import PlatformSettingsCard from "@/components/admin/settings/PlatformSettingsCard";
import CommissionFinancialsCard from "@/components/admin/settings/CommissionFinancialsCard";
import VendorCategoriesCard from "@/components/admin/settings/VendorCategoriesCard";
import BrandSettingsCard from "@/components/admin/settings/BrandSettingsCard";
import SystemControlsCard from "@/components/admin/settings/SystemControlsCard";
import RolesAccessCard from "@/components/admin/settings/RolesAccessCard";
import { useRequireAdminAuth } from "@/hooks/useRequireAdminAuth";

// No PlatformSettings/SystemSettings endpoint exists on the backend yet —
// this whole screen is local state only. "Save Changes" just confirms the
// values look right, nothing is persisted server-side.
const DEFAULT_SETTINGS = {
  siteName: "EventHub Global",
  supportEmail: "concierge@eventhub.com",
  language: "English (US)",
  commissionRate: 12.5,
  taxRate: 8.0,
  categories: ["Weddings", "Photography", "Catering", "Venues"],
  brandColor: "#a03818",
  systemAlerts: true,
  vendorRequestPings: true,
  twoFactorRequired: false,
};

export default function AdminSettingsPage() {
  useRequireAdminAuth();
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [isSaving, setIsSaving] = useState(false);

  const patch = (next: Partial<typeof DEFAULT_SETTINGS>) => setSettings((prev) => ({ ...prev, ...next }));

  const toggle = (key: "systemAlerts" | "vendorRequestPings" | "twoFactorRequired") =>
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast.success("Settings saved.");
    }, 600);
  };

  const handleReset = () => {
    setSettings(DEFAULT_SETTINGS);
    toast.info("Changes reset.");
  };

  return (
    <div className="min-h-screen bg-[#EDE0D2] flex overflow-x-hidden">
      <Sidebar />

      <main className="flex-1 p-3 md:p-6 min-w-0 overflow-x-hidden">
        <SettingsTopBar />
        <SettingsHeader onReset={handleReset} onSave={handleSave} isSaving={isSaving} />

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3 min-w-0">
          <div className="space-y-6 lg:col-span-2 min-w-0">
            <PlatformSettingsCard
              siteName={settings.siteName}
              supportEmail={settings.supportEmail}
              language={settings.language}
              onChange={patch}
            />
            <CommissionFinancialsCard
              commissionRate={settings.commissionRate}
              taxRate={settings.taxRate}
              onChange={patch}
            />
            <VendorCategoriesCard
              categories={settings.categories}
              onChange={(categories) => patch({ categories })}
            />
          </div>

          <div className="space-y-6 min-w-0">
            <BrandSettingsCard brandColor={settings.brandColor} onChange={patch} />
            <SystemControlsCard
              systemAlerts={settings.systemAlerts}
              vendorRequestPings={settings.vendorRequestPings}
              twoFactorRequired={settings.twoFactorRequired}
              onToggle={toggle}
            />
            <RolesAccessCard />
          </div>
        </div>
      </main>
    </div>
  );
}
