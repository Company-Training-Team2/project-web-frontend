"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Camera } from "lucide-react";

import { useRequireAuth } from "@/hooks/useRequireAuth";
import { getUserErrorMessage, userService } from "@/services/user.service";

// Was rendering — the admin executive-portal nav, wrong for a
// customer settings page (see profileSettings.tsx for the full note). This
// screen already has its own back-to-/profile top bar below.
//
// Also had no auth gate at all (unlike profileSettings.tsx, which links here)
// — a logged-out visitor could load this form and see/edit the hardcoded
// "Eleanor St. James" placeholder values below (GET /users/me 401s and is
// silently swallowed, leaving the placeholders in place). The backend still
// rejects the actual save (UsersController is [Authorize]), so no real data
// was ever at risk, but the page had no business being reachable while
// logged out. useRequireAuth() redirects to /login before that can happen,
// same as every other customer-only screen.
export default function EditProfile() {
  useRequireAuth();
  const router = useRouter();

  const [emailNotifications, setEmailNotifications] = useState(true);

  // Keep the exact existing values as initial values.
  // They will be replaced with the real API data after GET /users/me.
  const [fullName, setFullName] = useState("Eleanor St. James");
  const [email, setEmail] = useState("eleanor.sj@eventhub.com");
  const [phoneNumber, setPhoneNumber] = useState("+1 (555) 012-3456");
  const [city, setCity] = useState("San Francisco, CA");

  const [avatarUrl, setAvatarUrl] = useState(
    "https://i.pravatar.cc/160?img=47"
  );

  // Success modal
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Error message
  const [errorMessage, setErrorMessage] = useState("");

  // Saving state
  const [isSaving, setIsSaving] = useState(false);

  // ─── Get current user profile ──────────────────────────────────────────────

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const profile = await userService.getMe();

        setFullName(profile.fullName ?? "Eleanor St. James");
        setEmail(profile.email ?? "eleanor.sj@eventhub.com");
        setPhoneNumber(profile.phoneNumber ?? "+1 (555) 012-3456");
        setCity(profile.city ?? "San Francisco, CA");

        setAvatarUrl(
          profile.avatarUrl || "https://i.pravatar.cc/160?img=47"
        );
      } catch (error) {
        console.error("Failed to load profile:", error);
      }
    };

    loadProfile();
  }, []);

  // ─── Update profile ────────────────────────────────────────────────────────

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setErrorMessage("");
    setIsSaving(true);

    console.log("Save Changes clicked");

    try {
      // PUT /users/me — returns the saved profile directly, no separate
      // re-fetch needed.
      const updatedProfile = await userService.updateMe({
        fullName,
        email,
        phoneNumber,
        city,
        avatarUrl,
      });

      console.log("Profile updated successfully");

      setFullName(updatedProfile.fullName ?? "Eleanor St. James");
      setEmail(updatedProfile.email ?? "eleanor.sj@eventhub.com");
      setPhoneNumber(
        updatedProfile.phoneNumber ?? "+1 (555) 012-3456"
      );
      setCity(updatedProfile.city ?? "San Francisco, CA");

      setAvatarUrl(
        updatedProfile.avatarUrl ||
          "https://i.pravatar.cc/160?img=47"
      );

      // Show success modal
      setShowSuccessModal(true);
    } catch (error: unknown) {
      console.error("Failed to update profile:", error);
      setErrorMessage(getUserErrorMessage(error, "Failed to update profile."));
    } finally {
      setIsSaving(false);
    }
  };

  // ─── Close success modal and return to profile ──────────────────────────────

  const handleCloseSuccess = () => {
    setShowSuccessModal(false);
    router.push("/profile");
  };

  return (
    <div className="min-h-screen bg-[#EDE0D2]">
      <main>
        {/* Top bar */}

        <div className="flex items-center border-b border-[#DCCFC0] bg-[#F6ECE0] px-8 py-5">
          <Link
            href="/profile"
            className="flex items-center gap-4 text-[#A3391C]"
          >
            <ArrowLeft className="h-5 w-5" />

            <span className="text-2xl font-semibold">
              Edit Profile
            </span>
          </Link>
        </div>

        <div className="flex justify-center px-6 py-12">
          <div className="w-full max-w-[560px] rounded-[20px] border border-[#DCCFC0] bg-[#F6ECE0] p-10 shadow-[0_2px_20px_rgba(43,38,34,0.05)]">
            <form
              className="space-y-10"
              onSubmit={handleSubmit}
            >
              {/* Photo */}

              <div className="flex flex-col items-center gap-3">
                <div className="relative">
                  <img
                    src={avatarUrl}
                    alt="Eleanor St. James"
                    className="h-28 w-28 rounded-2xl border-2 border-[#A3391C]/50 object-cover"
                  />

                  <button
                    type="button"
                    aria-label="Change photo"
                    className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-[#A3391C] text-white ring-4 ring-[#EDE0D2]"
                  >
                    <Camera className="h-4 w-4" />
                  </button>
                </div>

                <button
                  type="button"
                  className="text-sm font-semibold uppercase tracking-wide text-[#A3391C] hover:underline"
                >
                  Change photo
                </button>
              </div>

              {/* Fields */}

              <div className="grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-[13px] text-[#8B7E72]">
                    Full Name
                  </label>

                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) =>
                      setFullName(e.target.value)
                    }
                    className="w-full border-0 border-b border-[#C9B9A8] bg-transparent px-0 pb-2 text-[15px] font-medium text-[#2B2622] outline-none focus:border-[#A3391C]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-[13px] text-[#8B7E72]">
                    Email Address
                  </label>

                  <input
                    type="email"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    className="w-full border-0 border-b border-[#C9B9A8] bg-transparent px-0 pb-2 text-[15px] font-medium text-[#2B2622] outline-none focus:border-[#A3391C]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-[13px] text-[#8B7E72]">
                    Phone Number
                  </label>

                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) =>
                      setPhoneNumber(e.target.value)
                    }
                    className="w-full border-0 border-b border-[#C9B9A8] bg-transparent px-0 pb-2 text-[15px] font-medium text-[#2B2622] outline-none focus:border-[#A3391C]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-[13px] text-[#8B7E72]">
                    Location / City
                  </label>

                  <input
                    type="text"
                    value={city}
                    onChange={(e) =>
                      setCity(e.target.value)
                    }
                    className="w-full border-0 border-b border-[#C9B9A8] bg-transparent px-0 pb-2 text-[15px] font-medium text-[#2B2622] outline-none focus:border-[#A3391C]"
                  />
                </div>
              </div>

              {/* Preferences */}

              <div>
                <p className="mb-4 text-[13px] font-bold uppercase tracking-[0.08em] text-[#A3391C]">
                  Preferences
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-[15px] text-[#2B2622]">
                    Email Notifications
                  </span>

                  <button
                    type="button"
                    role="switch"
                    aria-checked={emailNotifications}
                    onClick={() =>
                      setEmailNotifications(
                        (v) => !v
                      )
                    }
                    style={{
                      position: "relative",
                      width: "46px",
                      height: "26px",
                      borderRadius: "999px",
                      flexShrink: 0,
                      border: "none",
                      padding: 0,
                      cursor: "pointer",
                      backgroundColor:
                        emailNotifications
                          ? "#A3391C"
                          : "#D8CCC0",
                      transition:
                        "background-color 0.2s ease",
                    }}
                  >
                    <span
                      style={{
                        position: "absolute",
                        top: "3px",
                        left: emailNotifications
                          ? "23px"
                          : "3px",
                        width: "20px",
                        height: "20px",
                        borderRadius: "50%",
                        backgroundColor: "#ffffff",
                        transition:
                          "left 0.2s ease",
                      }}
                    />
                  </button>
                </div>
              </div>

              {/* Error message */}

              {errorMessage && (
                <div className="rounded-[10px] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {errorMessage}
                </div>
              )}

              {/* Save Changes */}

              <button
                type="submit"
                disabled={isSaving}
                className="w-full rounded-[10px] bg-[#A3391C] py-4 text-[15px] font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSaving ? "Saving..." : "Save Changes"}
              </button>
            </form>
          </div>
        </div>
      </main>

      {/* ─── Success Modal ─────────────────────────────────────────────────── */}

      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-[445px] rounded-[10px] bg-white shadow-[0_4px_20px_rgba(0,0,0,0.25)]">
            <div className="px-6 py-6">
              <p className="text-[15px] text-[#555555]">
                Profile updated successfully!
              </p>
            </div>

            <div className="border-t border-[#E5E5E5] px-6 py-4 text-right">
              <button
                type="button"
                onClick={handleCloseSuccess}
                className="text-[14px] font-semibold text-[#0066FF] hover:underline"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}