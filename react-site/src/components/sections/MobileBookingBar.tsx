"use client";

import { CalendarDays, Phone } from "lucide-react";

export function MobileBookingBar({ bookingHref, phone }: { bookingHref: string; phone: string }) {
  return (
    <nav className="mobile-booking-bar" aria-label="Quick appointment actions">
      <a href={bookingHref} data-analytics-event="mobile_booking_click">
        <CalendarDays aria-hidden="true" size={18} />
        Book Online
      </a>
      <a href={`tel:${phone}`} data-analytics-event="phone_click">
        <Phone aria-hidden="true" size={18} />
        Call Us
      </a>
    </nav>
  );
}
