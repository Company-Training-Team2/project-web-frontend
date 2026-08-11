"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

import Sidebar from "@/components/layout/Sidebar";
import AdminTopBar from "@/components/admin/AdminTopBar";
import AdminConnectionError from "@/components/admin/AdminConnectionError";
import SettingsHeader from "@/components/admin/settings/SettingsHeader";
import PlatformSettingsCard from "@/components/admin/settings/PlatformSettingsCard";
import CommissionFinancialsCard from "@/components/admin/settings/CommissionFinancialsCard";
import VendorCategoriesCard from "@/components/admin/settings/VendorCategoriesCard";
import BrandSettingsCard from "@/components/admin/settings/BrandSettingsCard";
import SystemControlsCard from "@/components/admin/settings/SystemControlsCard";
import RolesAccessCard from "@/components/admin/settings/RolesAccessCard";
import { useRequireAdminAuth } from "@/hooks/useRequireAdminAuth";
import { adminService, AdminSettingsDto, getAdminErrorMessage } from "@/services/admin.service";

// Real, callable endpoint — GET/PUT /api/admin/settings, backed by a real
// AdminSettings row. Only 7 fields exist there (see AdminSettingsDto):
// commission %, tax %, max images/packages per listing, platform name, logo
// URL, support email. Language, brand color, vendor-category CRUD, and the
// system/2FA toggles the original mockup had have no backing field —
// LOCAL_ONLY_DEFAULTS below covers exactly those, kept as local UI state
// (each card discloses it isn't persisted) rather than faked as saved.
const LOCAL_ONLY_DEFAULTS = {
  language: "English (US)",
  brandColor: "#a03818",
  systemAlerts: true,
  vendorRequestPings: true,
  twoFactorRequired: false,
};

export default function AdminSettingsPage() {
  useRequireAdminAuth();

  const [settings, setSettings] = useState<AdminSettingsDto | null>(null);
  const [status, setStatus] = useState<"loading" | "error" | "ready">("loading");
  const [local, setLocal] = useState(LOCAL_ONLY_DEFAULTS);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    adminService
      .getSettings()
      .then((data) => {
        setSettings(data);
        setStatus("ready");
      })
      .catch(() => setStatus("error"));
  }, []);

  const patch = (next: Partial<AdminSettingsDto>) =>
    setSettings((prev) => (prev ? { ...prev, ...next } : prev));

  const patchLocal = (next: Partial<typeof LOCAL_ONLY_DEFAULTS>) =>
    setLocal((prev) => ({ ...prev, ...next }));

  const toggleLocal = (key: "systemAlerts" | "vendorRequestPings" | "twoFactorRequired") =>
    setLocal((prev) => ({ ...prev, [key]: !prev[key] }));

  const handleSave = async () => {
    if (!settings) return;
    setIsSaving(true);
    try {
      const saved = await adminService.updateSettings({
        commissionPercentage: settings.commissionPercentage,
        taxPercentage: settings.taxPercentage,
        maxImagesPerWorkPost: settings.maxImagesPerWorkPost,
        maxPackagesPerWorkPost: settings.maxPackagesPerWorkPost,
        platformName: settings.platformName,
        platformLogoUrl: settings.platformLogoUrl,
        supportEmail: settings.supportEmail,
      });
      setSettings(saved);
      toast.success("Settings saved.");
    } catch (error) {
      toast.error(getAdminErrorMessage(error, "Couldn't save settings. Please try again."));
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    adminService
      .getSettings()
      .then((data) => {
        setSettings(data);
        setLocal(LOCAL_ONLY_DEFAULTS);
        toast.info("Changes reset.");
      })
      .catch(() => toast.error("Couldn't reload settings."));
  };

  return (
    <div className="min-h-screen bg-[#EDE0D2] flex overflow-x-hidden">
      <Sidebar />

      <main className="flex-1 p-3 md:p-6 min-w-0 overflow-x-hidden">
        <AdminTopBar searchPlaceholder="Search system settings..." />
        <SettingsHeader onReset={handleReset} onSave={handleSave} isSaving={isSaving} />

        {status === "error" ? (
          <div className="mt-6">
            <AdminConnectionError label="platform settings" />
          </div>
        ) : status === "loading" || !settings ? (
          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-40 animate-pulse rounded-[16px] bg-[#DCCFC0]/50 lg:col-span-2" />
            ))}
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3 min-w-0">
            <div className="space-y-6 lg:col-span-2 min-w-0">
              <PlatformSettingsCard
                platformName={settings.platformName}
                supportEmail={settings.supportEmail}
                maxImagesPerWorkPost={settings.maxImagesPerWorkPost}
                maxPackagesPerWorkPost={settings.maxPackagesPerWorkPost}
                language={local.language}
                onChange={patch}
                onChangeLocal={patchLocal}
              />
              <CommissionFinancialsCard
                commissionRate={settings.commissionPercentage}
                taxRate={settings.taxPercentage}
                onChange={(patchValues) =>
                  patch({
                    commissionPercentage: patchValues.commissionRate ?? settings.commissionPercentage,
                    taxPercentage: patchValues.taxRate ?? settings.taxPercentage,
                  })
                }
              />
              <VendorCategoriesCard />
            </div>

            <div className="space-y-6 min-w-0">
              <BrandSettingsCard
                logoUrl={settings.platformLogoUrl ?? ""}
                brandColor={local.brandColor}
                onChangeLogoUrl={(platformLogoUrl) => patch({ platformLogoUrl })}
                onChangeBrandColor={(brandColor) => patchLocal({ brandColor })}
              />
              <SystemControlsCard
                systemAlerts={local.systemAlerts}
                vendorRequestPings={local.vendorRequestPings}
                twoFactorRequired={local.twoFactorRequired}
                onToggle={toggleLocal}
              />
              <RolesAccessCard />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
