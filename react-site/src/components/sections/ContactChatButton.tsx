"use client";

import { MessageCircle } from "lucide-react";
import { ShadButton } from "@/components/ui/Button";

export function ContactChatButton({ className }: { className?: string }) {
  return (
    <ShadButton
      className={className}
      type="button"
      onClick={() => window.dispatchEvent(new Event("vmc:open-chat-support"))}
    >
      <MessageCircle aria-hidden="true" size={17} />
      Start chat
    </ShadButton>
  );
}
