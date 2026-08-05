"use client";

import { useSearchParams } from "next/navigation";
import RegisterForm from "./RegisterForm";
import VendorRegisterWizard from "./VendorRegisterWizard";

/** Reads ?role= and picks the customer RegisterForm vs the Vendor's 3-step
 * wizard. Previously /register?role=vendor silently rendered RegisterForm
 * for every role — this is the fix. */
export default function RegisterRouter() {
  const searchParams = useSearchParams();
  const role = searchParams.get("role") === "vendor" ? "vendor" : "customer";

  return role === "vendor" ? <VendorRegisterWizard /> : <RegisterForm />;
}
