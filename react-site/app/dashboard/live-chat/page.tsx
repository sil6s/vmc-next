import { LiveChatForm } from "@/components/dashboard/LiveChatForm";
import { getDashboardSettings } from "@/lib/settings/settings";

export default async function LiveChatPage() {
  const settings = await getDashboardSettings();

  return (
    <>
      <div className="dashboard-page-head">
        <p className="dashboard-eyebrow">Live Chat</p>
        <h1>Control public chat support</h1>
        <p>Turn the Otto chat launcher on or off without editing code.</p>
      </div>
      <LiveChatForm initialSettings={settings.liveChat} />
    </>
  );
}
