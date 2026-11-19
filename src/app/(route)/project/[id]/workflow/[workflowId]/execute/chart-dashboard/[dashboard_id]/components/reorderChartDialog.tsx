"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";
import { ChartData, reOrderdCharts } from "./api";

interface ReorderChartsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  chartsData: ChartData[];
  chartsIds: string[];
  dashboardId: string;
  onDragStart: (e: React.DragEvent<HTMLDivElement>, index: number) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>, dropIndex: number) => void;
}

export function ReorderChartsDialog({
  open,
  onOpenChange,
  chartsData,
  chartsIds,
  dashboardId,
  onDragStart,
  onDragOver,
  onDrop,
}: ReorderChartsDialogProps) {
  const [savingOrder, setSavingOrder] = useState(false);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger
        render={
          <Button
            variant="default"
            size="sm"
            disabled={chartsIds.length === 0}
            className="bg-linear-to-r from-primary to-accent text-light hover:from-(--primary)/90 hover:to-(--accent)/90"
          >
            Reorder Charts
          </Button>
        }
      ></DialogTrigger>

      <DialogContent className="dark:bg-linear-to-br max-w-5xl from-(--background-from) via-(--background-via) to-(--background-to) border-white/20 text-white">
        <DialogHeader>
          <DialogTitle className="text-white">Reorder Charts</DialogTitle>
        </DialogHeader>
        <p className="italic text-sm text-gray-300">
          Drag and drop the charts below to rearrange their order.
        </p>

        <div className="flex flex-col gap-2 mt-4">
          {chartsData && chartsData.length > 0 ? (
            chartsData.map((chart, index) => (
              <div
                key={index}
                draggable
                onDragStart={(e) => onDragStart(e, index)}
                onDragOver={onDragOver}
                onDrop={(e) => onDrop(e, index)}
              >
                <div className="cursor-pointer p-2 rounded text-white hover:bg-gray-200 dark:hover:bg-white/10 transition-colors">
                  {chart.title}
                </div>
                {index < chartsIds.length - 1 && (
                  <div className="border-t border-white/20 my-1" />
                )}
              </div>
            ))
          ) : (
            <div className="flex items-center justify-center h-32 text-gray-400 italic text-sm">
              No charts available
            </div>
          )}
        </div>

        <DialogFooter>
          <Button
            variant="default"
            className="bg-linear-to-r from-primary to-accent hover:from-(--primary)/90 hover:to-(--accent)/90 border border-gray-400/70 text-light"
            onClick={async () => {
              try {
                setSavingOrder(true);
                await reOrderdCharts(dashboardId, chartsIds);
                onOpenChange(false);
                toast.success("Chart order saved successfully!");
              } catch (err) {
                toast.error("Failed to save chart order");
              } finally {
                setSavingOrder(false);
              }
            }}
            disabled={savingOrder}
          >
            {savingOrder && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}