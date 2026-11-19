"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Plus } from "lucide-react";

interface GeneralDialogsProps {
  // Info dialog
  isInfoDialogOpen: boolean;
  setisInfoDialogOpen: (open: boolean) => void;
  selectedEntry: { title: string; info: string } | null;

  // Create dashboard dialog
  isCreateDashboardOpen: boolean;
  setIsCreateDashboardOpen: (open: boolean) => void;
  dashboardName: string;
  setDashboardName: (value: string) => void;
  dashboardDescription: string;
  setDashboardDescription: (value: string) => void;
  isCreating: boolean;
  handleCreateDashboard: () => void;
  createDashboard: () => Promise<any>;
}

export default function GeneralDialogs({
  isInfoDialogOpen,
  setisInfoDialogOpen,
  selectedEntry,
  isCreateDashboardOpen,
  setIsCreateDashboardOpen,
  dashboardName,
  setDashboardName,
  dashboardDescription,
  setDashboardDescription,
  isCreating,
  handleCreateDashboard,
  createDashboard,
}: GeneralDialogsProps) {
  return (
    <>
      {/* Info Dialog */}
      <Dialog
        open={isInfoDialogOpen}
        onOpenChange={(open) => setisInfoDialogOpen(open)}
      >
        <DialogContent className="dark:bg-linear-to-br from-(--background-from) via-(--background-via) to-(--background-to) border-white/20 text-white">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-white">
              {selectedEntry?.title}
            </DialogTitle>
          </DialogHeader>

          <div className="py-4 dark: text-white">
            <p className="leading-relaxed">{selectedEntry?.info}</p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Create dashboard modal */}
      <Dialog
        open={isCreateDashboardOpen}
        onOpenChange={setIsCreateDashboardOpen}
      >
        <DialogContent className="border-white/20 text-white max-w-lg dark:bg-linear-to-r from-primary to-accent">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-white">
              Create New Dashboard
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="dashboard-name" className="text-white">
                Dashboard Name
              </Label>
              <Input
                id="dashboard-name"
                placeholder="Enter dashboard name"
                value={dashboardName}
                onChange={(e) => setDashboardName(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-300"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dashboard-description" className="text-white">
                Description (Optional)
              </Label>
              <Textarea
                id="dashboard-description"
                placeholder="Enter dashboard description"
                value={dashboardDescription}
                onChange={(e) => setDashboardDescription(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-300 min-h-20"
              />
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              onClick={() => {
                handleCreateDashboard();
              }}
              disabled={isCreating}
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                createDashboard();
              }}
              disabled={isCreating || !dashboardName.trim()}
              className="bg-linear-to-r from-primary to-accent text-white hover:from-(--primary)/90 hover:to-(--accent)/90 border border-white/20 text-light "
            >
              {isCreating ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4 mr-2" />
                  Create
                </>
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}