"use client";

import { useState } from "react";
import { CalendarCheck } from "lucide-react";
import { BookAppointmentExperience } from "@/components/sections/BookAppointmentExperience";
import { ShadButton } from "@/components/ui/Button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import type { PublicLocation } from "@/lib/settings/public";

type TriggerVariant = "primary" | "secondary" | "ghost";

export function ServiceAppointmentDialogTrigger({
  label = "Book an Appointment",
  variant = "primary",
  className,
  portalUrl,
  pharmacyUrl,
  liveChatEnabled,
  locations
}: {
  label?: string;
  variant?: TriggerVariant;
  className?: string;
  portalUrl: string;
  pharmacyUrl: string;
  liveChatEnabled: boolean;
  locations: PublicLocation[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <ShadButton className={className} variant={variant}>
          <CalendarCheck aria-hidden="true" size={17} />
          {label}
        </ShadButton>
      </DialogTrigger>
      {open && (
        <DialogContent className="service-booking-dialog">
          <DialogHeader className="service-booking-dialog-header">
            <DialogTitle>Book an appointment</DialogTitle>
            <DialogDescription>
              Choose the right appointment path for Veterinary Medical Centers.
            </DialogDescription>
          </DialogHeader>
          <div className="service-booking-dialog-body">
            <BookAppointmentExperience
              portalUrl={portalUrl}
              pharmacyUrl={pharmacyUrl}
              liveChatEnabled={liveChatEnabled}
              locations={locations}
            />
          </div>
        </DialogContent>
      )}
    </Dialog>
  );
}
