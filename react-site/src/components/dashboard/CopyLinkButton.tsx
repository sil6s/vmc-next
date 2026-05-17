"use client";

import { useState } from "react";
import { Copy } from "lucide-react";

export function CopyLinkButton({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false);

  async function copyValue() {
    if (!value) return;
    await navigator.clipboard?.writeText(value);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <button className="dashboard-test-link" type="button" aria-label={`Copy ${label}`} disabled={!value} onClick={copyValue}>
      <Copy aria-hidden="true" size={14} />
      {copied ? "Copied" : "Copy"}
    </button>
  );
}
