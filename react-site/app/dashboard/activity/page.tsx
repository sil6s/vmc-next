import { getActivityLog } from "@/lib/settings/settings";

function summarize(value: unknown) {
  const text = typeof value === "string" ? value : JSON.stringify(value);
  return text.length > 90 ? `${text.slice(0, 90)}...` : text;
}

export default async function ActivityPage() {
  const activity = await getActivityLog(25);

  return (
    <>
      <div className="dashboard-page-head">
        <p className="dashboard-eyebrow">Activity</p>
        <h1>Recent dashboard activity</h1>
        <p>The most recent 25 dashboard changes are logged with the admin, action, details, timestamp, and status.</p>
      </div>
      <section className="dashboard-card">
        {activity.length ? (
          <div className="dashboard-table-wrap">
            <table className="dashboard-table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Action</th>
                  <th>Details</th>
                  <th>When</th>
                  <th>Status</th>
                  <th>Section</th>
                  <th>Previous</th>
                  <th>New</th>
                </tr>
              </thead>
              <tbody>
                {activity.map((entry) => (
                  <tr key={entry.id}>
                    <td>{entry.userEmail}</td>
                    <td>{entry.action}</td>
                    <td>{entry.details}</td>
                    <td>{new Date(entry.createdAt).toLocaleString()}</td>
                    <td><span className={entry.status === "success" ? "dashboard-badge is-active" : "dashboard-badge"}>{entry.status}</span></td>
                    <td><span className="dashboard-badge is-active">{entry.section}</span></td>
                    <td>{summarize(entry.previousValue)}</td>
                    <td>{summarize(entry.newValue)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="dashboard-muted">No dashboard activity has been recorded yet.</p>
        )}
      </section>
    </>
  );
}
