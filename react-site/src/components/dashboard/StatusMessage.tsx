"use client";

export function StatusMessage({ message, ok }: { message: string; ok: boolean }) {
  if (!message) {
    return null;
  }

  return (
    <p className={ok ? "dashboard-toast dashboard-toast-success" : "dashboard-toast dashboard-toast-error"} role="status">
      {message}
    </p>
  );
}
