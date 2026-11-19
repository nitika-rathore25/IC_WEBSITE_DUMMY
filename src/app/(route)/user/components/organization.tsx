"use client";

import { useState } from "react";
import {
  EllipsisVertical,
  UserPlus,
  Edit,
  Trash2,
  X,
  Loader2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
}

interface Organization {
  id: string;
  name: string;
  subscription: number;
  users: number;
  owners: number;
  admins: number;
}

interface OrganizationTabProps {
  organizations: Organization[];
  search: string;
  onOrganizationDeleted?: () => void;
  onUserActionStart?: () => void;
  onUserActionEnd?: () => void;
}

interface UserRegistrationData {
  firstName: string;
  email: string;
  lastName: string;
  password: string;
  role: string;
  organisation_id?: string;
}

export default function OrganizationTab({
  organizations,
  search,
  onOrganizationDeleted,
  onUserActionEnd,
  onUserActionStart
}: OrganizationTabProps) {
  const [dropdownOpenIndex, setDropdownOpenIndex] = useState<number | null>(
    null
  );
  const [isAddnewUser, setIsAddnewUser] = useState(false);
  const [isRename, setIsRename] = useState(false);
  const [newOrgName, setNewOrgName] = useState<string>("");
  const [isRenaming, setIsRenaming] = useState(false);
  const [renameError, setRenameError] = useState<string | null>(null);

  const [isDelete, setIsDelete] = useState(false);
  const [selectedOrgName, setSelectedOrgName] = useState<string>("");
  const [selectedOrgId, setSelectedOrgId] = useState<string>("");
  const [credits, setCredits] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  // Add User States
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [userData, setUserData] = useState<UserRegistrationData>({
    firstName: "",
    email: "",
    lastName: "",
    password: "",
    role: "",
  });

  const filteredOrganizations = organizations.filter((org) =>
    org.name.toLowerCase().includes(search.toLowerCase())
  );

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((w) => w[0])
      .join("")
      .toUpperCase();
  };

  const handleRenameConfirm = async () => {
    if (!selectedOrgId || !newOrgName.trim()) {
      setRenameError("Organization name cannot be empty.");
      return;
    }

    setIsRenaming(true);
    setRenameError(null);

    try {
      const token = localStorage.getItem("access_token");
      const tokenType = localStorage.getItem("token_type") || "Bearer";

      if (!token) {
        throw new Error("No authentication token found. Please login again.");
      }

      const response = await fetch(
        `${BASE_URL}/organisations/${selectedOrgId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${tokenType} ${token}`,
          },
          body: JSON.stringify({
            name: newOrgName.trim(),
            credits: Number(credits) || 0,
          }),
        }
      );

      if (!response.ok) {
        let errorMessage = `Failed to rename organization: ${response.status}`;
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorData.detail || errorMessage;
        } catch (e) {
          errorMessage = response.statusText || errorMessage;
        }
        throw new Error(errorMessage);
      }

      setIsRename(false);
      setNewOrgName("");

      if (onOrganizationDeleted) {
        onOrganizationDeleted();
      }
    } catch (err: any) {
      setRenameError(err.message || "Failed to rename organization.");
    } finally {
      setIsRenaming(false);
    }
  };

  const handleRenameOrganization = (orgName: string, orgId: string) => {
    setSelectedOrgName(orgName);
    setSelectedOrgId(orgId);
    setNewOrgName(orgName);
    setRenameError(null);
    setIsRename(true);
    setDropdownOpenIndex(null);
  };

  const handleAddUserClick = (orgName: string, orgId: string) => {
    setSelectedOrgName(orgName);
    setSelectedOrgId(orgId);
    setIsAddnewUser(true);
    setUserData({
      firstName: "",
      email: "",
      lastName: "",
      password: "",
      role: "",
    });
    setDropdownOpenIndex(null);
  };

  const handleAddUserSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !userData.firstName.trim() ||
      !userData.email.trim() ||
      !userData.lastName.trim() ||
      !userData.password
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsAddingUser(true);
    onUserActionStart?.();
    try {
      const token = localStorage.getItem("access_token");
      const tokenType = localStorage.getItem("token_type") || "Bearer";

      if (!token) {
        throw new Error("No authentication token found. Please login again.");
      }

      const payload = {
        username: userData.email.trim(),
        first_name: userData.firstName.trim(),
        last_name: userData.lastName.trim(),
        password: userData.password,
        role: userData.role,
        org_id: selectedOrgId,
      };

      const response = await fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${tokenType} ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        let errorMessage = `Failed to add user: ${response.status}`;
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorData.detail || errorMessage;
        } catch (e) {
          errorMessage = response.statusText || errorMessage;
        }
        throw new Error(errorMessage);
      }
      setIsAddnewUser(false);
       onUserActionEnd?.(); 
      toast.success("User added successfully");
      setUserData({
        firstName: "",
        email: "",
        lastName: "",
        password: "",
        role: "",
      });
    } catch (err: any) {
      toast.error(err.message || "Failed to add user");
    } finally {
      setIsAddingUser(false);
    }
  };

  const handleUserInputChange = (
    field: keyof UserRegistrationData,
    value: string
  ) => {
    setUserData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCloseAddUserDialog = () => {
    setIsAddnewUser(false);
    setUserData({
      firstName: "",
      email: "",
      lastName: "",
      password: "",
      role: "",
    });
  };

  const handleDeleteOrganization = (orgName: string, orgId: string) => {
    setSelectedOrgName(orgName);
    setSelectedOrgId(orgId);
    setIsDelete(true);
    setDeleteError(null);
    setDropdownOpenIndex(null);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedOrgId) return;

    setIsDeleting(true);
    setDeleteError(null);

    try {
      const token = localStorage.getItem("access_token");
      const tokenType = localStorage.getItem("token_type") || "Bearer";

      if (!token) {
        throw new Error("No authentication token found. Please login again.");
      }

      const response = await fetch(
        `${BASE_URL}/organisations/${selectedOrgId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${tokenType} ${token}`,
          },
        }
      );

      if (!response.ok) {
        let errorMessage = `Failed to delete organization: ${response.status}`;
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorData.detail || errorMessage;
        } catch (e) {
          errorMessage = response.statusText || errorMessage;
        }
        throw new Error(errorMessage);
      }

      setIsDelete(false);

      if (onOrganizationDeleted) {
        onOrganizationDeleted();
      }
    } catch (err: any) {
      setDeleteError(err.message || "Failed to delete organization.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="mt-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredOrganizations.map((org, index) => {
          const initials = getInitials(org.name);

          return (
            <div
              key={org.id}
              className="bg-white rounded-xl p-5 shadow-sm ring-1 ring-slate-200 hover:shadow-md transition"
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100 text-base font-semibold text-purple-700">
                    {initials}
                  </div>
                  <div>
                    <h3
                      className="font-semibold text-slate-800"
                      // onClick={() => handleOrgNameClick(org)}
                    >
                      {org.name}
                    </h3>
                  </div>
                </div>

                <DropdownMenu
                  open={dropdownOpenIndex === index}
                  onOpenChange={(open) => {
                    setDropdownOpenIndex(open ? index : null);
                  }}
                >
                    <button
                      className="rounded-md p-1 hover:bg-slate-100 transition-colors"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                    >
                      <EllipsisVertical className="text-slate-600" size={20} />
                    </button>
                  <DropdownMenuContent
                    align="end"
                    sideOffset={5}
                    className="min-w-45 bg-white border border-gray-200 rounded-md shadow-lg z-50"
                  >
                    <DropdownMenuItem
                      onClick={(e) => {
                        e.preventDefault();
                        handleAddUserClick(org.name, org.id);
                      }}
                      className="flex text-slate-700 hover:bg-gray-200 items-center gap-2 px-3 py-2 text-sm cursor-pointer"
                    >
                      <UserPlus size={16} />
                      <span>Add User</span>
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      onClick={(e) => {
                        e.preventDefault();
                        handleRenameOrganization(org.name, org.id);
                      }}
                      className="flex text-slate-700 hover:bg-gray-200 items-center gap-2 px-3 py-2 text-sm cursor-pointer"
                    >
                      <Edit size={16} />
                      <span>Update Organization</span>
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      onClick={(e) => {
                        e.preventDefault();
                        handleDeleteOrganization(org.name, org.id);
                      }}
                      className="flex items-center hover:bg-gray-200 gap-2 px-3 py-2 text-sm text-red-600 cursor-pointer"
                    >
                      <Trash2 size={16} />
                      <span>Delete Organization</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div
                className="mt-4 space-y-3 text-sm"
              >
                <div className="flex items-start justify-between gap-4">
                  <p className="text-slate-700">
                    <span className="font-semibold">Subscription:</span> $
                    {Number(org.subscription).toFixed(2)}
                  </p>
                  <div className="text-slate-700 flex items-center gap-2">
                    <span className="font-semibold whitespace-nowrap">
                      Users:
                    </span>
                    <span className="rounded-full px-3 py-1 text-xs font-medium bg-blue-100 text-blue-700">
                      {org.users}
                    </span>
                  </div>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <p className="flex items-center text-slate-700 gap-2">
                    <span className="font-semibold">Owners:</span>
                    <span className="rounded-full px-3 py-1 text-xs font-medium bg-green-100 text-green-700">
                      {org.owners}
                    </span>
                  </p>
                  <p className="flex items-center text-slate-700 gap-2">
                    <span className="font-semibold">Admins:</span>
                    <span className="rounded-full px-3 py-1 text-xs font-medium bg-green-100 text-green-700">
                      {org.admins}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredOrganizations.length === 0 && (
        <div className="text-center py-12">
          <div className="text-white text-lg">
            No organizations found
            {search && ` matching "${search}"`}
          </div>
        </div>
      )}

      {/* ADD NEW USER DIALOG */}
      <Dialog open={isAddnewUser} onOpenChange={handleCloseAddUserDialog}>
        <DialogContent className="rounded-2xl p-6 max-w-lg text-white dark:bg-linear-to-r from-primary to-accent">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold text-white">
              Add new user to {selectedOrgName}
            </DialogTitle>
          </DialogHeader>
           <form className="mt-2 space-y-6" onSubmit={handleAddUserSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-white">
                  <span className="font-semibold">First Name</span>
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="text"
                  value={userData.firstName}
                  onChange={(e) =>
                    handleUserInputChange("firstName", e.target.value)
                  }
                  placeholder="Enter First Name"
                  className="w-full mt-2 rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-gray-900 placeholder:text-gray-500"
                  required
                  disabled={isAddingUser}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-white">
                  <span className="font-semibold">Last Name</span>
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="text"
                  value={userData.lastName}
                  onChange={(e) =>
                    handleUserInputChange("lastName", e.target.value)
                  }
                  placeholder="Enter Last Name"
                  className="w-full mt-2 rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-gray-900 placeholder:text-gray-500"
                  required
                  disabled={isAddingUser}
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
                value={userData.email}
                onChange={(e) => handleUserInputChange("email", e.target.value)}
                placeholder="Enter email address"
                className="w-full mt-2 rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-gray-900 placeholder:text-gray-500"
                required
                disabled={isAddingUser}
              />
            </div>

            <div>
              <label className="text-sm font-medium text-white">
                <span className="font-semibold">Password</span>
                <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="password"
                value={userData.password}
                onChange={(e) =>
                  handleUserInputChange("password", e.target.value)
                }
                placeholder="Enter password"
                className="w-full mt-2 rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-gray-900 placeholder:text-gray-500"
                required
                disabled={isAddingUser}
              />
            </div>

            <div>
              <label className="text-sm font-medium text-white">
                <span className="font-semibold">Role</span>
              </label>
              <select
                value={userData.role}
                onChange={(e) => handleUserInputChange("role", e.target.value)}
                className="w-full mt-2 rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-gray-900"
                disabled={isAddingUser}
              >
                <option value="">Select Role</option>
                <option value="platform_user">Platform User</option>
                <option value="org_owner">Organization owner</option>
                <option value="platform_admin">Platform Admin</option>
              </select>
            </div>

            <DialogFooter className="mt-8 flex justify-end gap-3">
              <button
                type="submit"
                disabled={isAddingUser}
                className="rounded-lg px-5 py-2 bg-linear-to-r from-primary to-accent text-light border border-gray-300/70 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-25"
              >
                {isAddingUser ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Adding...
                  </>
                ) : (
                  "Add User"
                )}
              </button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Rename Organization Dialog */}
      <Dialog open={isRename} onOpenChange={setIsRename}>
        <DialogContent className="rounded-2xl p-6 max-w-lg text-white dark:bg-linear-to-r from-primary to-accent">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold text-white">
              Rename Organization
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {renameError && (
              <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                {renameError}
              </div>
            )}

            <div>
              <label className="text-sm font-medium text-white">
                <span className="font-semibold">New Organization Name</span>
                <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="text"
                value={newOrgName}
                onChange={(e) => setNewOrgName(e.target.value)}
                placeholder="Enter new organization name"
                className="w-full mt-2 rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-gray-900 placeholder:text-gray-500"
                disabled={isRenaming}
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
              />
              <p className="text-sm text-light/70 mt-1">
                Set the initial credit balance for this organization
              </p>
            </div>
          </div>

          <DialogFooter className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={handleRenameConfirm}
              disabled={isRenaming || !newOrgName.trim()}
              className="rounded-lg px-5 py-2 bg-linear-to-r from-primary to-accent text-light border border-gray-400/80 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-25"
            >
              {isRenaming ? (
                <>
                  <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                  Renaming...
                </>
              ) : (
                "Rename"
              )}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Organization Confirmation Dialog */}
      <Dialog open={isDelete} onOpenChange={setIsDelete}>
        <DialogContent className="rounded-2xl p-6 max-w-lg text-white dark:bg-linear-to-r from-primary to-accent">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold text-white">
              Delete {selectedOrgName}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {deleteError && (
              <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                {deleteError}
              </div>
            )}

            <p className="text-white">
              Are you sure you want to delete <strong>{selectedOrgName}</strong>{" "}
              organization? This action cannot be undone.
            </p>
          </div>

          <DialogFooter className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={handleDeleteConfirm}
              disabled={isDeleting}
              className="rounded-lg px-5 py-2 bg-red-600 text-light border border-red-700 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-20"
            >
              {isDeleting ? (
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
                "Delete"
              )}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
