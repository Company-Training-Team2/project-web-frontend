// MOCK DATA — the real backend has GET /api/admin/vendors/pending and
// PUT /api/admin/vendors/{id}/{approve|reject|request-changes} (see
// AdminController.cs / src/services/admin.service.ts), but AdminVendorDto
// only returns Id/UserId/Email/BusinessName/BioDescription/PhoneNumber/City/
// ApprovalStatus/IsVerified — no portfolio images, compliance documents, or
// verification-insight fields. This richer fixture set stands in for what a
// future, fuller admin vendor-review endpoint would need to return.

export interface AdminPendingVendor {
  id: string;
  businessName: string;
  category: string;
  location: string;
  ownerName: string;
  description: string;
  idVerified: boolean;
  yearsInBusiness: number;
  images: string[];
  verification: {
    identityCheck: "Passed" | "Failed" | "Pending";
    backgroundCheck: "Passed" | "Failed" | "Pending";
    bankVerification: "Success" | "Failed" | "Pending";
    riskLevel: "Low" | "Medium" | "High";
  };
  documents: { name: string; meta: string }[];
}

export const ADMIN_PENDING_VENDORS: AdminPendingVendor[] = [
  {
    id: "pv1",
    businessName: "Celestial Florals",
    category: "Decoration & Artistic Floral Installation",
    location: "Paris, FR",
    ownerName: "Elena Moretti",
    description:
      "Celestial Florals crafts immersive floral installations for luxury weddings and galas across Western Europe.",
    idVerified: true,
    yearsInBusiness: 6,
    images: ["/vendor-placeholder-3.jpg", "/vendor-placeholder-5.jpg", "/vendor-placeholder-1.jpg"],
    verification: { identityCheck: "Passed", backgroundCheck: "Passed", bankVerification: "Success", riskLevel: "Low" },
    documents: [
      { name: "Business License", meta: "Validated: 2024-01-12" },
      { name: "Tax Certification", meta: "Status: Compliant" },
      { name: "Insurance Dossier", meta: "Covered up to $2M" },
    ],
  },
  {
    id: "pv2",
    businessName: "Grandeur Events",
    category: "Full-Service Planning",
    location: "London, UK",
    ownerName: "Marcus Thorne",
    description: "End-to-end event planning for corporate galas and destination weddings.",
    idVerified: true,
    yearsInBusiness: 9,
    images: ["/vendor-placeholder-4.jpg", "/vendor-placeholder-2.jpg"],
    verification: { identityCheck: "Passed", backgroundCheck: "Pending", bankVerification: "Pending", riskLevel: "Medium" },
    documents: [
      { name: "Business License", meta: "Validated: 2023-11-02" },
      { name: "Tax Certification", meta: "Status: Under Review" },
      { name: "Insurance Dossier", meta: "Covered up to $1M" },
    ],
  },
  {
    id: "pv3",
    businessName: "The Artisan Plate",
    category: "Bespoke Catering",
    location: "Milan, IT",
    ownerName: "Sienna Blake",
    description: "Seasonal tasting menus and bespoke catering for intimate luxury gatherings.",
    idVerified: false,
    yearsInBusiness: 4,
    images: ["/vendor-placeholder-1.jpg"],
    verification: { identityCheck: "Pending", backgroundCheck: "Pending", bankVerification: "Pending", riskLevel: "Medium" },
    documents: [
      { name: "Business License", meta: "Awaiting upload" },
      { name: "Tax Certification", meta: "Awaiting upload" },
      { name: "Insurance Dossier", meta: "Awaiting upload" },
    ],
  },
  {
    id: "pv4",
    businessName: "Lumina AV Solutions",
    category: "Technical Production",
    location: "Berlin, DE",
    ownerName: "Arthur Sterling",
    description: "Lighting, sound, and stage production for large-scale corporate and gala events.",
    idVerified: true,
    yearsInBusiness: 11,
    images: ["/vendor-placeholder-2.jpg", "/vendor-placeholder-4.jpg"],
    verification: { identityCheck: "Passed", backgroundCheck: "Passed", bankVerification: "Success", riskLevel: "Low" },
    documents: [
      { name: "Business License", meta: "Validated: 2022-06-18" },
      { name: "Tax Certification", meta: "Status: Compliant" },
      { name: "Insurance Dossier", meta: "Covered up to $5M" },
    ],
  },
];
