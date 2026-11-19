"use client";

import {
  EllipsisVertical,
  Key,
  RefreshCcw,
  ToggleLeft,
  UserPen,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!;

interface Organization {
  id: string;
  name: string;
}

interface OrganizationOwner {
  id: string;
  name: string;
  email: string;
  organizations: string[];
  disabled?: boolean;
}

interface OrganizationOwnerTabProps {
  owners: OrganizationOwner[];
  search: string;
  organizations: Organization[];
  ownerUpdate?: () => void;
}

export default function OrganizationOwnerTab({
  owners,
  search,
  organizations,
  ownerUpdate,
}: OrganizationOwnerTabProps) {
  const filteredOwners = owners.filter(
    (owner) =>
      owner.name.toLowerCase().includes(search.toLowerCase()) ||
      owner.email.toLowerCase().includes(search.toLowerCase())
  );
  const [isResetPass, setIsResetPass] = useState(false);
  const [isDeactivate, setIsDeactivate] = useState(false);
  const [selectedOwner, setSelectedOwner] = useState<OrganizationOwner | null>(
    null
  );
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [resetError, setResetError] = useState("");
  const [resetLoading, setResetLoading] = useState(false);
  const [statusInput, setStatusInput] = useState("");
  const [statusError, setStatusError] = useState("");
  const [statusLoading, setStatusLoading] = useState(false);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((w) => w[0])
      .join("")
      .toUpperCase();
  };

  const handleRestpass = (owner: OrganizationOwner) => {
    setSelectedOwner(owner);
    setIsResetPass(true);
  };

  const handleResetPassword = async () => {
    if (!currentPassword.trim()) {
      setResetError("Current password is required.");
      return;
    }

    if (!newPassword.trim()) {
      setResetError("New password cannot be empty.");
      return;
    }

    try {
      setResetLoading(true);
      setResetError("");

      const token = localStorage.getItem("access_token");
      const tokenType = localStorage.getItem("token_type") || "Bearer";

      if (!token) throw new Error("No authentication token found.");

      const response = await fetch(
        `${BASE_URL}/users/${selectedOwner?.id}/password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${tokenType} ${token}`,
          },
          body: JSON.stringify({
            current_password: currentPassword,
            new_password: newPassword,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.detail || "Failed to reset password.");
      }

      toast.success("Password reset successfully!");

      // Reset dialog
      setCurrentPassword("");
      setNewPassword("");
      setIsResetPass(false);
    } catch (err: any) {
      setResetError(err.message || "Password reset failed.");
    } finally {
      setResetLoading(false);
    }
  };

  const handleStatusDialog = (owner: OrganizationOwner) => {
    setSelectedOwner(owner);
    setIsDeactivate(true);
    setStatusInput("");
    setStatusError("");
  };

  const handleUserStatus = async () => {
    const action = selectedOwner?.disabled ? "activate" : "deactivate";

    if (statusInput.trim().toLowerCase() !== action) {
      setStatusError(`Please type '${action}' to confirm.`);
      return;
    }

    try {
      setStatusLoading(true);
      setStatusError("");

      const token = localStorage.getItem("access_token");
      const tokenType = localStorage.getItem("token_type") || "Bearer";

      if (!token) throw new Error("No authentication token found.");

      const response = await fetch(
        `${BASE_URL}/users/${selectedOwner?.id}/status`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${tokenType} ${token}`,
          },
          body: JSON.stringify({
            disabled: !selectedOwner?.disabled, // toggle
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.detail || "Failed to update user status.");
      }

      toast.success(
        `${selectedOwner?.name} has been successfully ${
          selectedOwner?.disabled ? "activated" : "deactivated"
        }.`
      );
        if (ownerUpdate) {
        ownerUpdate();
      }
      setIsDeactivate(false);
      setStatusInput("");
    } catch (err: any) {
      setStatusError(err.message || "Failed to update user status.");
    } finally {
      setStatusLoading(false);
    }
  };

  return (
    <div className="mt-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredOwners.map((owner) => (
          <div
            key={owner.id}
            className={`
            group relative rounded-xl p-5 transition
            ${
              owner.disabled
                ? "dark:bg-white/30 bg-gray-400/50 border border-red-400 hover:border-red-500 text-white hover:shadow-red-300 shadow-sm"
                : "bg-white ring-1 ring-slate-200 hover:shadow-md"
            }
          `}
          >
            {owner.disabled && (
              <div
                className="
                  absolute top-4 left-1/2 -translate-x-1/2 -translate-y-1/2
                  bg-red-500/80 text-white text-xs px-3 py-1 rounded-lg
                  hidden group-hover:block shadow-lg z-50
                "
              >
                User Deactivated
              </div>
            )}

            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-linear-to-r from-primary to-accent text-base font-semibold text-light">
                  {getInitials(owner.name)}
                </div>
                <div>
                  <h3
                    className={`font-semibold ${
                      owner.disabled ? "text-white" : "text-slate-800"
                    }`}
                  >
                    {owner.name}
                  </h3>
                </div>
              </div>

              {/* Fixed DropdownMenu */}
              <DropdownMenu>
                  <button className="rounded-md p-1 hover:bg-slate-100 transition-colors focus:outline-none">
                    <EllipsisVertical className="text-slate-600" size={20} />
                  </button>
                <DropdownMenuContent
                  align="end"
                  sideOffset={5}
                  className="min-w-45 bg-white border border-gray-200 rounded-md shadow-lg z-50"
                >
                  {!owner.disabled && (
                    <>
                      <DropdownMenuItem
                        onClick={() => handleRestpass(owner)}
                        className="flex text-slate-700 hover:bg-gray-200 items-center gap-2 px-3 py-2 text-sm cursor-pointer"
                      >
                        <Key size={16} />
                        <span>Reset Password</span>
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuItem
                    onClick={() => handleStatusDialog(owner)}
                    className="flex text-slate-700 hover:bg-gray-200 items-center gap-2 px-3 py-2 text-sm cursor-pointer"
                  >
                    <ToggleLeft size={16} />

                    {owner.disabled ? (
                      <span>Activate User</span>
                    ) : (
                      <span>Deactivate User</span>
                    )}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="mt-4 space-y-3 text-sm">
              <p
                className={` ${
                  owner.disabled ? "text-white" : "text-slate-800"
                }`}
              >
                <span
                  className={`font-semibold ${
                    owner.disabled ? "text-white" : "text-slate-800"
                  }`}
                >
                  Email:
                </span>{" "}
                {owner.email}
              </p>
              {owner.organizations.length > 0 && (
                <p
                  className={`text-sm whitespace-nowrap overflow-hidden text-ellipsis ${
                    owner.disabled ? "text-white" : "text-slate-800"
                  }`}
                >
                  <span className="font-semibold">Organizations:</span>{" "}
                  {organizations
                    .filter((org) => owner.organizations.includes(org.id))
                    .map((org) => org.name)
                    .join(", ")}
                </p>
              )}

              {owner.organizations.length == 0 && (
                 <p
                className={`italic ${
                  owner.disabled ? "text-white" : "text-slate-500"
                }`}
              >
                  No organizations assigned
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredOwners.length === 0 && (
        <div className="text-center py-12">
          <div className="text-white text-lg">
            No organization owners found
            {search && ` matching "${search}"`}
          </div>
        </div>
      )}
      {/* Reset Password Dialog */}
      <Dialog open={isResetPass} onOpenChange={setIsResetPass}>
        <DialogContent className="rounded-2xl p-6 text-white max-w-2xl dark:bg-linear-to-r from-primary to-accent">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold text-white">
              Reset Password: {selectedOwner?.name}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <p className="text-white">
              Enter the current password and new password for:
              <strong> {selectedOwner?.email}</strong>
            </p>

            {resetError && (
              <div className="bg-red-100 text-red-700 px-3 py-2 rounded-lg">
                {resetError}
              </div>
            )}

            {/* Current Password */}
            <div>
              <label className="text-sm font-medium text-white">
                Current Password
                <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter current password"
                className="w-full mt-2 rounded-lg border border-gray-300 px-4 py-2 outline-none 
          focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-gray-900"
              />
            </div>

            {/* New Password */}
            <div>
              <label className="text-sm font-medium text-white">
                New Password
                <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                className="w-full mt-2 rounded-lg border border-gray-300 px-4 py-2 outline-none 
          focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-gray-900"
              />
            </div>
          </div>

          <DialogFooter className="mt-3 flex justify-end">
            <button
              disabled={resetLoading}
              onClick={handleResetPassword}
              className="rounded-lg px-5 py-2 bg-linear-to-r from-primary to-accent 
        text-light border border-gray-300/70 disabled:opacity-60"
            >
              {resetLoading ? "Resetting..." : "Reset Password"}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Deactivate User Dialog */}
      <Dialog open={isDeactivate} onOpenChange={setIsDeactivate}>
        <DialogContent className="rounded-2xl p-6 max-w-lg text-white dark:bg-linear-to-r from-primary to-accent">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold text-white">
              {selectedOwner?.disabled ? "Activate User" : "Deactivate User"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <p className="text-white">
              Are you sure you want to{" "}
              <strong>
                {selectedOwner?.disabled ? "activate" : "deactivate"}
              </strong>{" "}
              user: <strong>{selectedOwner?.name}</strong>?
            </p>

            {statusError && (
              <div className="bg-red-100 text-red-700 px-3 py-2 rounded-lg">
                {statusError}
              </div>
            )}

            <div>
              <label className="text-sm font-medium text-white">
                Type{" "}
                <b>{selectedOwner?.disabled ? "'activate'" : "'deactivate'"}</b>{" "}
                to confirm
              </label>
              <input
                type="text"
                value={statusInput}
                onChange={(e) => setStatusInput(e.target.value)}
                placeholder={`eg. ${
                  selectedOwner?.disabled ? "activate" : "deactivate"
                }`}
                className="w-full mt-2 rounded-lg border border-gray-300 px-4 py-2 outline-none 
          focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-gray-900"
              />
            </div>
          </div>

          <DialogFooter className="mt-3 flex justify-end">
            <button
              disabled={statusLoading}
              onClick={handleUserStatus}
              className="rounded-lg px-5 py-2 bg-linear-to-r from-primary to-accent 
        text-light border border-gray-300/70 disabled:opacity-60"
            >
              {statusLoading
                ? selectedOwner?.disabled
                  ? "Activating..."
                  : "Deactivating..."
                : selectedOwner?.disabled
                ? "Activate User"
                : "Deactivate User"}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
