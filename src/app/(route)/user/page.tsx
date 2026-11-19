"use client";

import { useEffect, useState } from "react";
import {
  Home,
  Loader2,
  Moon,
  Palette,
  Search,
  Sun,
  UserPlus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import OrganizationOwnerTab from "./components/owner";
import PlatformAdminTab from "./components/platformadmin";
import OrganizationTab from "./components/organization";
import { toast } from "sonner";
import UserTab from "./components/user";
import { useTheme } from "@/providers/theme-provider";
import { ThemeCustomizer } from "@/components/common/custom-theme";
import Footer from "@/components/common/footer";

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!;

type Organization = {
  id: string;
  name: string;
  subscription: number;
  users: number;
  owners: number;
  admins: number;
};

type OrganizationOwner = {
  id: string;
  name: string;
  email: string;
  organizations: string[];
  disabled?: boolean;
};

type PlatformAdmin = {
  id: string;
  name: string;
  email: string;
  username: string;
  disabled?: boolean;
};

type PlatformUser = {
  id: string;
  name: string;
  email: string;
  username: string;
  disabled?: boolean;
};

export default function TeamPage() {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [organizationsOwner, setorganizationsOwner] = useState<
    OrganizationOwner[]
  >([]);
  const [platformAdmin, setPlatformAdmin] = useState<PlatformAdmin[]>([]);
  const [isPlatformUsers, setIsPlatformUsers] = useState<PlatformUser[]>([]);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("");
  const { theme, setTheme } = useTheme();
  const [isThemeOpen, setIsThemeOpen] = useState(false);
  const [isAddOrg, setIsAddOrg] = useState(false);
  const [isAddOrgOwner, setIsAddOrgOwner] = useState(false);
  const [isAddAdmin, setIsAddAdmin] = useState(false);
  const [orgName, setOrgName] = useState("");
  const [credits, setCredits] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const [ownerForm, setOwnerForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "",
  });
  const [selectedOrgs, setSelectedOrgs] = useState<string[]>([]);
  const [ownerLoading, setOwnerLoading] = useState(false);
  const [ownerError, setOwnerError] = useState<string | null>(null);
  const [orgLoading, setOrgLoading] = useState(true);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  // Handle Add Organization with API call
  const handleAddOrg = async () => {
    if (!orgName.trim()) {
      setError("Organization name is required");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("access_token");
      const tokenType = localStorage.getItem("token_type") || "Bearer";

      if (!token)
        throw new Error("No authentication token found. Please login again.");

      const response = await fetch(`${BASE_URL}/organisations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${tokenType} ${token}`,
        },
        body: JSON.stringify({
          name: orgName.trim(),
          credits: Number(credits) || 0,
        }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(
          responseData.message ||
            responseData.detail ||
            `Failed to create organization: ${response.status}`
        );
      }

      // Create new organization object
      const newOrg: Organization = {
        id: responseData.id,
        name: responseData.name,
        subscription: responseData.credits || 0,
        users: responseData.count_platform_user || 0,
        owners: responseData.count_org_owner || 0,
        admins: responseData.count_platform_admin || 0,
      };

      // Add to the list
      setOrganizations((prev) => [newOrg, ...prev]);

      // Reset form
      setOrgName("");
      setCredits(0);
      setIsAddOrg(false);
    } catch (err: any) {
      setError(err.message || "Failed to create organization.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch all organizations
  const fetchAllOrganizations = async () => {
    try {
      setOrgLoading(true);
      const token = localStorage.getItem("access_token");
      const tokenType = localStorage.getItem("token_type") || "Bearer";

      const response = await fetch(`${BASE_URL}/organisations`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${tokenType} ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to load organizations");
      }
      // Map API response to UI format
      const mappedOrganizations = data.map((org: any) => ({
        id: org.id,
        name: org.name,
        subscription: org.credits || 0,
        users: org.count_platform_user || 0,
        owners: org.count_org_owner || 0,
        admins: org.count_platform_admin || 0,
      }));
      setOrganizations(mappedOrganizations);
    } catch (err) {
    } finally {
      setOrgLoading(false);
    }
  };

  const fetchAllOrganizationData = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const tokenType = localStorage.getItem("token_type") || "Bearer";

      const response = await fetch(`${BASE_URL}/users`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${tokenType} ${token}`,
        },
      });

      const data = await response.json();

      const getFullName = (u: any) =>
        `${u.first_name || ""} ${u.last_name || ""}`.trim();

      // ----------- ORG OWNERS -----------
      const owners = data
        .filter((user: any) => user.role === "org_owner")
        .map((user: any) => ({
          id: user.id,
          name: getFullName(user),
          email: user.username, // username = email
          organizations: user.org_id ? [user.org_id] : [],
          disabled: user.disabled ?? false,
        }));

      // ----------- PLATFORM ADMINS -----------
      const adminList = data
        .filter((user: any) => user.role === "platform_admin")
        .map((user: any) => ({
          id: user.id,
          name: getFullName(user),
          email: user.username,
          username: user.username,
          disabled: user.disabled ?? false,
        }));

      // ----------- PLATFORM USERS -----------
      const userList = data
        .filter((user: any) => user.role === "platform_user")
        .map((user: any) => ({
          id: user.id,
          name: getFullName(user),
          email: user.username,
          username: user.username,
          disabled: user.disabled ?? false,
        }));

      setorganizationsOwner(owners);
      setPlatformAdmin(adminList);
      setIsPlatformUsers(userList);
    } catch (err) {}
  };

  useEffect(() => {
    fetchAllOrganizations();
    fetchAllOrganizationData();
  }, []);

  useEffect(() => {
    // Refetch data when switching to tabs that need user data
    if (
      activeTab === "Organization owner" ||
      activeTab === "Platform admin" ||
      activeTab === "Platform user"
    ) {
      fetchAllOrganizationData();
    }
  }, [activeTab]);

  // Handle form submission for Add Organization
  const handleOrgSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleAddOrg();
  };

  // Function to get placeholder text based on active tab
  const getSearchPlaceholder = () => {
    switch (activeTab) {
      case "Organization owner":
        return "Search organization owner...";
      case "Platform admin":
        return "Search platform admin...";
      case "Platform user":
        return "Search platform user...";
      default:
        return "Search organization...";
    }
  };

  const [role, setRole] = useState<string>("");
  const tabs =
    role === "superadmin"
      ? [
          "Organization",
          "Organization owner",
          "Platform admin",
          "Platform user",
        ]
      : role === "org_owner"
      ? ["Organization owner", "Platform admin", "Platform user"]
      : role === "platform_admin"
      ? ["Platform admin", "Platform user"]
      : [];

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) return;

    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");

      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );

      const decoded = JSON.parse(jsonPayload);
      setRole(decoded.role);
    } catch (err) {}
  }, []);

  useEffect(() => {
    if (role) {
      const availableTabs =
        role === "superadmin"
          ? [
              "Organization",
              "Organization owner",
              "Platform admin",
              "Platform user",
            ]
          : role === "org_owner"
          ? ["Organization owner", "Platform admin", "Platform user"]
          : role === "platform_admin"
          ? ["Platform admin", "Platform user"]
          : [];

      if (availableTabs.length > 0) {
        setActiveTab(availableTabs[0]); // auto-select first allowed tab
      }
    }
  }, [role]);

  const renderTabContent = () => {
    switch (activeTab) {
      case "Organization":
        // Only superadmin can access Organization tab
        if (role !== "superadmin") return null;

        return (
          <OrganizationTab
            organizations={organizations}
            search={search}
            onOrganizationDeleted={fetchAllOrganizations}
            onUserActionStart={() => setLoading(true)}
            onUserActionEnd={async () => {
              await fetchAllOrganizationData();
              await fetchAllOrganizations();
              setLoading(false);
            }}
          />
        );

      case "Organization owner":
        // superadmin and org_owner can see this tab
        if (role !== "superadmin" && role !== "org_owner") return null;

        return (
          <OrganizationOwnerTab
            owners={organizationsOwner}
            ownerUpdate={fetchAllOrganizationData}
            organizations={organizations}
            search={search}
          />
        );

      case "Platform admin":
        // platform_admin + superadmin + org_owner (your original logic)
        if (
          role !== "superadmin" &&
          role !== "org_owner" &&
          role !== "platform_admin"
        ) {
          return null;
        }

        return (
          <PlatformAdminTab
            admins={platformAdmin}
            adminUpdate={fetchAllOrganizationData}
            search={search}
          />
        );

      case "Platform user":
        if (
          role !== "superadmin" &&
          role !== "org_owner" &&
          role !== "platform_admin"
        )
          return null;

        return (
          <UserTab
            users={isPlatformUsers}
            userUpdate={fetchAllOrganizationData}
            search={search}
          />
        );
      default:
        return null;
    }
  };

  const handleOwnerFormChange = (
    field: keyof typeof ownerForm,
    value: string
  ) => {
    setOwnerForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handle Add Organization Owner with API call
  const handleAddOwner = async () => {
    const { firstName, lastName, email, password } = ownerForm;

    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !email.trim() ||
      !password.trim()
    ) {
      setOwnerError("All fields are required");
      return;
    }

    if (selectedOrgs.length === 0) {
      setOwnerError("Please select at least one organization");
      return;
    }

    setOwnerLoading(true);
    setOwnerError(null);

    try {
      const token = localStorage.getItem("access_token");
      const tokenType = localStorage.getItem("token_type") || "Bearer";

      //  const fullName = `${firstName.trim()} ${lastName.trim()}`;
      if (!token) {
        throw new Error("No authentication token found. Please login again.");
      }
      const response = await fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${tokenType} ${token}`,
        },
        body: JSON.stringify({
          username: ownerForm.email,
          first_name: ownerForm.firstName,
          last_name: ownerForm.lastName,
          password: ownerForm.password,
          role: ownerForm.role,
          org_id: Array.isArray(selectedOrgs) ? selectedOrgs[0] : selectedOrgs,
        }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(
          responseData.message ||
            responseData.detail ||
            `Failed to create organization owner: ${response.status}`
        );
      }

      // Create new organization owner object
      const newOwner: OrganizationOwner = {
        id: responseData.id || Date.now(), // Use actual ID from response or generate temporary one
        name: responseData.fullName,
        email: responseData.email,
        organizations: organizations
          .filter((org) => selectedOrgs.includes(org.id))
          .map((org) => org.name),
      };

      // Add to the list
      setorganizationsOwner((prev) => [newOwner, ...prev]);

      // Reset form
      setOwnerForm({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        role: "",
      });
      setSelectedOrgs([]);
      setIsAddOrgOwner(false);

      // Show success message (optional)
      toast.success("Organization owner added successfully!");
    } catch (err: any) {
      setOwnerError(err.message || "Failed to create organization owner.");
    } finally {
      setOwnerLoading(false);
    }
  };

  // Form submit handler
  const handleAddOwnerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleAddOwner();
  };
  // Add this function to reset owner form when dialog closes
  useEffect(() => {
    if (!isAddOrgOwner) {
      // Reset form when dialog closes
      setOwnerForm({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        role: "",
      });
      setSelectedOrgs([]);
      setOwnerError(null);
    }
  }, [isAddOrgOwner]);

  if (loading || ownerLoading || orgLoading) {
    return (
      <div className="h-screen dark:bg-linear-to-br from-(--background-from) via-(--background-via) to-(--background-to) flex items-center justify-center">
        <div className="flex items-center space-x-3 text-white">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span className="text-lg">Loading data...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col dark:bg-linear-to-br from-(--background-from) via-(--background-via) to-(--background-to)">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/10 backdrop-blur-lg border-b border-white/20">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-linear-to-r from-primary to-accent rounded-lg border border-gray-300/40 flex items-center justify-center">
                <span className="text-light font-bold text-sm">T</span>
              </div>
              <div className="flex items-center">
                <h1 className="text-lg font-bold text-white">Talknact</h1>
              </div>
            </div>
            <span className="text-lg text-white font-bold">
              User Access Management
            </span>

            <div className="flex items-center space-x-2">
              <Button
                onClick={toggleTheme}
                variant="outline"
                size="sm"
                className="bg-white/10 border-white/20 text-light hover:bg-white/20 hover:border-white/30"
                title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
              >
                {theme === "dark" ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </Button>
              <Button
                onClick={() => router.push("/dashboard")}
                variant="default"
                size="sm"
                className="border border-gray-300/40 bg-linear-to-r from-primary to-accent text-light hover:from-(--primary)/90 hover:to-(--accent)/90"
              >
                <Home className="h-4 w-4 mr-1" />
              </Button>
              {(role === "superadmin" || role === "org_owner") && (
                <Button
                  onClick={() => setIsThemeOpen(true)}
                  variant="default"
                  size="sm"
                  className="border border-gray-300/40 bg-linear-to-r from-primary to-accent text-light hover:from-(--primary)/90 hover:to-(--accent)/90"
                >
                  <Palette className="h-4 w-4 mr-1" />
                  Customize Theme
                </Button>
              )}

              <Button
                variant="outline"
                size="sm"
                className="bg-white/10 border-white/20 text-light hover:bg-red-500/20 hover:border-red-500/30"
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-2">
        <div className="my-2 gap-2 flex items-center justify-between">
          {/* Tabs Section */}
          <div className="flex-1">
            <div className="flex space-x-1">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    activeTab === tab
                      ? "bg-linear-to-r from-primary to-accent border border-gray-300/40 text-light shadow-sm"
                      : "text-white hover:bg-white/10"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Search and Button Section */}
          <div className="flex items-center space-x-3">
            <div className="relative w-64">
              <Search
                className="absolute left-4 top-3 text-slate-400"
                size={18}
              />
              <input
                type="text"
                placeholder={getSearchPlaceholder()}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-lg bg-white py-1.5 pl-12 pr-4 text-gray-700 shadow-sm outline-none ring-1 ring-slate-200"
              />
            </div>

            {activeTab === "Organization" && role === "superadmin" && (
              <Button
                variant="default"
                onClick={() => setIsAddOrg(true)}
                size="sm"
                className="border border-gray-300/40 bg-linear-to-r from-primary to-accent text-light hover:from-(--primary)/90 hover:to-(--accent)/90"
              >
                <UserPlus size={18} className="mr-1" />
                Add Organization
              </Button>
            )}

            {activeTab === "Organization owner" && (
              <Button
                variant="default"
                onClick={() => setIsAddOrgOwner(true)}
                size="sm"
                className="border border-gray-300/40 bg-linear-to-r from-primary to-accent text-light hover:from-(--primary)/90 hover:to-(--accent)/90"
              >
                <UserPlus size={18} className="mr-1" />
                Add User
              </Button>
            )}

            {activeTab === "Platform admin" && (
              <Button
                variant="default"
                onClick={() => setIsAddAdmin(true)}
                size="sm"
                className="border border-gray-300/40 bg-linear-to-r from-primary to-accent text-light hover:from-(--primary)/90 hover:to-(--accent)/90"
              >
                <UserPlus size={18} className="mr-1" />
                Add Admin
              </Button>
            )}
          </div>
        </div>

        {/* Render the appropriate tab content */}
        {renderTabContent()}
      </div>

      {/* Add Org Dialog */}
      <Dialog open={isAddOrg} onOpenChange={setIsAddOrg}>
        <DialogContent className="rounded-2xl p-6 max-w-lg text-white dark:bg-linear-to-r from-primary to-accent">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold">
              <span className="text-white">Add Organization</span>
            </DialogTitle>
          </DialogHeader>

          <form className="mt-4 space-y-5" onSubmit={handleOrgSubmit}>
            {error && (
              <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                {error}
              </div>
            )}

            <div>
              <label className="text-sm font-medium text-white">
                Organization Name
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={orgName}
                onChange={(e) => {
                  setOrgName(e.target.value);
                  setError(null);
                }}
                placeholder="Company Inc."
                className="w-full mt-2 rounded-lg border text-gray-800 border-gray-300 px-4 py-3 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-300"
                required
                disabled={loading}
              />
            </div>

            <div>
              <label className="text-sm font-medium text-white">
                Initial Credits
              </label>
              <input
                type="number"
                value={credits}
                onChange={(e) => setCredits(Number(e.target.value))}
                placeholder="0"
                min="0"
                className="w-full mt-2 rounded-lg border text-gray-800 border-gray-300 px-4 py-3 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-300"
                disabled={loading}
              />
              <p className="text-sm text-light/70 mt-1">
                Set the initial credit balance for this organization
              </p>
            </div>
          </form>

          <DialogFooter className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={handleOrgSubmit}
              disabled={loading || !orgName.trim()}
              className="rounded-lg px-5 py-2 bg-linear-to-r from-primary to-accent text-light border border-gray-300/70 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-20"
            >
              {loading ? (
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                "Add"
              )}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add organization owner dialog */}
      <Dialog open={isAddOrgOwner} onOpenChange={setIsAddOrgOwner}>
        <DialogContent className="rounded-2xl p-6 max-w-lg text-white dark:bg-linear-to-r from-primary to-accent">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold text-white">
              Add New User
            </DialogTitle>
          </DialogHeader>

          <form className="mt-2 space-y-6" onSubmit={handleAddOwnerSubmit}>
            {ownerError && (
              <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                {ownerError}
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-white">
                  <span className="font-semibold">First Name</span>
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="text"
                  value={ownerForm.firstName}
                  onChange={(e) =>
                    handleOwnerFormChange("firstName", e.target.value)
                  }
                  placeholder="Enter first name"
                  className="w-full mt-2 rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-gray-900 placeholder:text-gray-500"
                  required
                  disabled={ownerLoading}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-white">
                  <span className="font-semibold">Last Name</span>
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="text"
                  value={ownerForm.lastName}
                  onChange={(e) =>
                    handleOwnerFormChange("lastName", e.target.value)
                  }
                  placeholder="Enter last name"
                  className="w-full mt-2 rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-gray-900 placeholder:text-gray-500"
                  required
                  disabled={ownerLoading}
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-white">
                <span className="font-semibold">Email Address</span>
                <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="email"
                value={ownerForm.email}
                onChange={(e) => handleOwnerFormChange("email", e.target.value)}
                placeholder="Enter email address"
                className="w-full mt-2 rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-gray-900 placeholder:text-gray-500"
                required
                disabled={ownerLoading}
              />
            </div>

            <div>
              <label className="text-sm font-medium text-white">
                <span className="font-semibold">Password</span>
                <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="password"
                value={ownerForm.password}
                onChange={(e) =>
                  handleOwnerFormChange("password", e.target.value)
                }
                placeholder="Enter password"
                className="w-full mt-2 rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-gray-900 placeholder:text-gray-500"
                required
                disabled={ownerLoading}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-white">
                <span className="font-semibold">Role</span>
              </label>
              <select
                value={ownerForm.role}
                onChange={(e) => handleOwnerFormChange("role", e.target.value)}
                className="w-full mt-2 rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-gray-900"
                disabled={ownerLoading}
              >
                <option value="">Select Role</option>
                {/* <option value="org_owner">Owner</option> */}
                <option value="platform_user">Platform User</option>
                <option value="platform_admin">Platform Admin</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-white">
                <span className="font-semibold">Assign Organization</span>
                <span className="text-red-500 ml-1">*</span>
              </label>
              {/* <p className="text-sm text-light/70 mt-1">
                Select organizations this owner will manage
              </p> */}

              <div className="mt-3 space-y-2 max-h-28 overflow-y-auto border border-gray-300 rounded-lg p-4">
                {organizations.map((org) => (
                  <div key={org.id} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`org-${org.id}`}
                      checked={selectedOrgs.includes(org.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedOrgs([...selectedOrgs, org.id]);
                        } else {
                          setSelectedOrgs(
                            selectedOrgs.filter((id) => id !== org.id)
                          );
                        }
                      }}
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      disabled={ownerLoading}
                    />
                    <label
                      htmlFor={`org-${org.id}`}
                      className="ml-3 text-sm text-white"
                    >
                      {org.name}
                    </label>
                  </div>
                ))}

                {organizations.length === 0 && (
                  <p className="text-sm text-light/70 italic text-center py-2">
                    No organizations available. Create an organization first.
                  </p>
                )}
              </div>
            </div>
          </form>

          <DialogFooter className="mt-8 flex justify-end">
            <button
              type="button"
              onClick={handleAddOwner}
              disabled={
                ownerLoading ||
                !ownerForm.firstName ||
                !ownerForm.lastName ||
                !ownerForm.email ||
                !ownerForm.password
              }
              className="rounded-lg px-5 py-2 bg-linear-to-r from-primary to-accent text-light border border-gray-300/70 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-20"
            >
              {ownerLoading ? (
                <Loader2 className="animate-spin h-5 w-5 text-white" />
              ) : (
                "Add"
              )}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add platform Admin dialog */}
      <Dialog open={isAddAdmin} onOpenChange={setIsAddAdmin}>
        <DialogContent className="rounded-2xl p-6 max-w-lg text-white dark:bg-linear-to-r from-primary to-accent">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold text-white">
              Add new user
            </DialogTitle>
          </DialogHeader>

          <form className="mt-2 space-y-6" onSubmit={handleAddOwnerSubmit}>
            {ownerError && (
              <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                {ownerError}
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-white">
                  <span className="font-semibold">First Name</span>
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="text"
                  value={ownerForm.firstName}
                  onChange={(e) =>
                    handleOwnerFormChange("firstName", e.target.value)
                  }
                  placeholder="Enter first name"
                  className="w-full mt-2 rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-gray-900 placeholder:text-gray-500"
                  required
                  disabled={ownerLoading}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-white">
                  <span className="font-semibold">Last Name</span>
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="text"
                  value={ownerForm.lastName}
                  onChange={(e) =>
                    handleOwnerFormChange("lastName", e.target.value)
                  }
                  placeholder="Enter last name"
                  className="w-full mt-2 rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-gray-900 placeholder:text-gray-500"
                  required
                  disabled={ownerLoading}
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-white">
                <span className="font-semibold">Email Address</span>
                <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="email"
                value={ownerForm.email}
                onChange={(e) => handleOwnerFormChange("email", e.target.value)}
                placeholder="Enter email address"
                className="w-full mt-2 rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-gray-900 placeholder:text-gray-500"
                required
                disabled={ownerLoading}
              />
            </div>

            <div>
              <label className="text-sm font-medium text-white">
                <span className="font-semibold">Password</span>
                <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="password"
                value={ownerForm.password}
                onChange={(e) =>
                  handleOwnerFormChange("password", e.target.value)
                }
                placeholder="Enter password"
                className="w-full mt-2 rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-gray-900 placeholder:text-gray-500"
                required
                disabled={ownerLoading}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-white">
                <span className="font-semibold">Role</span>
              </label>
              <select
                value={ownerForm.role}
                onChange={(e) => handleOwnerFormChange("role", e.target.value)}
                className="w-full mt-2 rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-gray-900"
                disabled={ownerLoading}
              >
                <option value="">Select Role</option>
                {/* <option value="org_owner">Owner</option> */}
                <option value="platform_user">Platform User</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-white">
                <span className="font-semibold">Assign Organization</span>
                <span className="text-red-500 ml-1">*</span>
              </label>
              {/* <p className="text-sm text-light/70 mt-1">
                Select organizations this owner will manage
              </p> */}

              <div className="mt-3 space-y-2 max-h-28 overflow-y-auto border border-gray-300 rounded-lg p-4">
                {organizations.map((org) => (
                  <div key={org.id} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`org-${org.id}`}
                      checked={selectedOrgs.includes(org.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedOrgs([...selectedOrgs, org.id]);
                        } else {
                          setSelectedOrgs(
                            selectedOrgs.filter((id) => id !== org.id)
                          );
                        }
                      }}
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      disabled={ownerLoading}
                    />
                    <label
                      htmlFor={`org-${org.id}`}
                      className="ml-3 text-sm text-white"
                    >
                      {org.name}
                    </label>
                  </div>
                ))}

                {organizations.length === 0 && (
                  <p className="text-sm text-light/70 italic text-center py-2">
                    No organizations available. Create an organization first.
                  </p>
                )}
              </div>
            </div>
          </form>
          <DialogFooter className="mt-8 flex justify-end">
            <button
              type="button"
              onClick={handleAddOwner}
              disabled={
                ownerLoading ||
                !ownerForm.firstName ||
                !ownerForm.lastName ||
                !ownerForm.email ||
                !ownerForm.password
              }
              className="rounded-lg px-5 py-2 bg-linear-to-r from-primary to-accent text-light border border-gray-300/70 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-20"
            >
              {ownerLoading ? (
                <Loader2 className="animate-spin h-5 w-5 text-white" />
              ) : (
                "Add"
              )}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <ThemeCustomizer isOpen={isThemeOpen} onOpenChange={setIsThemeOpen} />
      <Footer />
    </div>
  );
}
