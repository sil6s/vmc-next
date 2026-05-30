"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState, useTransition } from "react";
import { AlertTriangle, ArrowDown, ArrowUp, CheckCircle, Eye, EyeOff, ImageIcon, MoreHorizontal, Plus, Search, Trash2, UsersRound } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ShadButton } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { StaffSettings } from "@/lib/settings/types";
import type { PersonProfile, PersonProfileType } from "@/sanity/personProfiles";
import { profileImageAlt, profileImageUrl, profileSlugFromName } from "@/sanity/personProfiles";
import { StatusMessage } from "./StatusMessage";

type ResultStatus = { ok: boolean; message: string };
type PeopleTab = "all" | "doctors" | "team" | "hidden" | "attention";
type VisibilityFilter = "all" | "visible" | "hidden";
type IssueFilter = "all" | "image" | "alt" | "bio";
type SortKey = "order" | "name" | "type" | "visibility" | "status";

function newProfile(profileType: PersonProfileType, sortOrder: number): PersonProfile {
  const name = profileType === "doctor" ? "New Doctor" : "New Team Member";
  const slug = profileSlugFromName(name);
  return {
    _id: `person-${profileType}-${slug}-${Date.now()}`,
    name,
    slug,
    profileType,
    role: profileType === "doctor" ? "Veterinarian" : "Team Member",
    credentials: profileType === "doctor" ? "DVM" : undefined,
    bio: "",
    briefDescription: "",
    education: "",
    specialties: [],
    locationsServed: [],
    imageUrl: "",
    imageAlt: "",
    visible: false,
    displayOnHomepage: true,
    displayOnAboutPage: true,
    featured: false,
    sortOrder
  };
}

function sortedProfiles(profiles: PersonProfile[]) {
  return [...profiles].sort((a, b) => (a.sortOrder || 100) - (b.sortOrder || 100) || a.name.localeCompare(b.name));
}

function contentPreview(profile: PersonProfile) {
  const text = profile.profileType === "doctor" ? profile.bio || "" : profile.briefDescription || profile.bio || "";
  return text.length > 120 ? `${text.slice(0, 120).trim()}...` : text;
}

function issueLabels(profile: PersonProfile) {
  const issues: string[] = [];
  const image = profileImageUrl(profile);
  const visible = profile.visible !== false;
  if (!profile.name?.trim()) issues.push("Missing name");
  if (!profile.role?.trim()) issues.push("Missing role");
  if (!image) issues.push("Needs image");
  if (image && !profile.imageAlt?.trim()) issues.push("Needs alt text");
  if (profile.profileType === "doctor" && visible && !profile.bio?.trim()) issues.push("Needs bio");
  if (profile.profileType === "team" && visible && !profile.briefDescription?.trim() && !profile.bio?.trim()) issues.push("Needs description");
  return issues;
}

function needsAttention(profile: PersonProfile) {
  return issueLabels(profile).length > 0;
}

function profileTypeLabel(profileType: PersonProfileType) {
  return profileType === "doctor" ? "Doctor" : "Team Member";
}

function genericSaveError(message?: string) {
  if (!message) return "Profile could not be saved.";
  if (/duplicate/i.test(message)) return "Duplicate profile name found.";
  if (/name is required/i.test(message)) return "Name is required.";
  if (/role is required/i.test(message)) return "Role is required.";
  if (/slug/i.test(message)) return "Profile link must use lowercase letters, numbers, and hyphens.";
  return "Profile could not be saved.";
}

function ProfileImageCell({ profile, size = 44 }: { profile: PersonProfile; size?: number }) {
  const src = profileImageUrl(profile);
  if (!src) return <Avatar alt="" size={size} />;
  return <Avatar src={src} alt={profileImageAlt(profile)} size={size} />;
}

function PeopleStatsRow({ profiles }: { profiles: PersonProfile[] }) {
  const doctors = profiles.filter((profile) => profile.profileType === "doctor").length;
  const team = profiles.filter((profile) => profile.profileType === "team").length;
  const visible = profiles.filter((profile) => profile.visible !== false).length;
  const hidden = profiles.length - visible;
  const attention = profiles.filter(needsAttention).length;
  const stats = [
    ["Total People", profiles.length],
    ["Doctors", doctors],
    ["Team Members", team],
    ["Visible", visible],
    ["Hidden", hidden],
    ["Need Attention", attention]
  ];

  return (
    <div className="people-stats-row" aria-label="People profile summary">
      {stats.map(([label, value]) => (
        <Card className="people-stat-card" key={label}>
          <CardContent>
            <span>{label}</span>
            <strong>{value}</strong>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function VisibilitySwitch({ profile, onChange }: { profile: PersonProfile; onChange: (profile: PersonProfile, visible: boolean) => void }) {
  return (
    <label className="people-visibility-switch" title="When off, this person is saved but hidden from the website.">
      <Switch checked={profile.visible !== false} onCheckedChange={(checked) => onChange(profile, checked)} aria-label={`Visible on website for ${profile.name}`} />
      <span>Visible</span>
    </label>
  );
}

function PersonStatusBadges({ profile }: { profile: PersonProfile }) {
  const issues = issueLabels(profile);
  if (profile.visible === false) return <Badge variant="muted">Hidden</Badge>;
  if (!issues.length) return <Badge variant="default">Ready</Badge>;
  return (
    <>
      {issues.map((issue) => (
        <Badge variant="gold" key={issue}>{issue}</Badge>
      ))}
    </>
  );
}

function ProfileActions({
  profile,
  onPreview,
  onEdit,
  onMove,
  onToggle,
  onDuplicate,
  onRemove
}: {
  profile: PersonProfile;
  onPreview: (profile: PersonProfile) => void;
  onEdit: (profile: PersonProfile) => void;
  onMove: (profile: PersonProfile, direction: -1 | 1) => void;
  onToggle: (profile: PersonProfile, visible?: boolean) => void;
  onDuplicate: (profile: PersonProfile) => void;
  onRemove: (profile: PersonProfile) => void;
}) {
  return (
    <div className="people-table-actions">
      <ShadButton type="button" variant="ghost" size="sm" onClick={() => onPreview(profile)}>Preview</ShadButton>
      <ShadButton type="button" variant="ghost" size="sm" onClick={() => onEdit(profile)}>Edit</ShadButton>
      <details className="people-more-menu">
        <summary aria-label={`More actions for ${profile.name}`}>
          <MoreHorizontal aria-hidden="true" size={16} />
          More
        </summary>
        <div>
          <button type="button" onClick={() => onMove(profile, -1)}><ArrowUp aria-hidden="true" size={14} /> Move up</button>
          <button type="button" onClick={() => onMove(profile, 1)}><ArrowDown aria-hidden="true" size={14} /> Move down</button>
          <button type="button" onClick={() => onToggle(profile)}>{profile.visible === false ? <Eye aria-hidden="true" size={14} /> : <EyeOff aria-hidden="true" size={14} />}{profile.visible === false ? "Show on Website" : "Hide from website"}</button>
          <button type="button" onClick={() => onDuplicate(profile)}><Plus aria-hidden="true" size={14} /> Duplicate</button>
          <button type="button" onClick={() => onRemove(profile)}><Trash2 aria-hidden="true" size={14} /> Remove</button>
        </div>
      </details>
    </div>
  );
}

function PeopleDataTable({
  profiles,
  onPreview,
  onEdit,
  onMove,
  onToggle,
  onDuplicate,
  onRemove
}: {
  profiles: PersonProfile[];
  onPreview: (profile: PersonProfile) => void;
  onEdit: (profile: PersonProfile) => void;
  onMove: (profile: PersonProfile, direction: -1 | 1) => void;
  onToggle: (profile: PersonProfile, visible?: boolean) => void;
  onDuplicate: (profile: PersonProfile) => void;
  onRemove: (profile: PersonProfile) => void;
}) {
  if (!profiles.length) {
    return (
      <div className="people-empty-state">
        <CheckCircle aria-hidden="true" size={28} />
        <h3>Everything looks good.</h3>
        <p>Profiles with missing images, alt text, or bios will appear here.</p>
      </div>
    );
  }

  return (
    <div className="people-table-wrap">
      <table className="dashboard-table people-table">
        <thead>
          <tr>
            <th>Person</th>
            <th>Type</th>
            <th>Profile Content</th>
            <th>Visibility</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {profiles.map((profile) => {
            const preview = contentPreview(profile);
            return (
              <tr key={profile._id}>
                <td>
                  <div className="people-person-cell">
                    <ProfileImageCell profile={profile} />
                    <span>
                      <strong>{profile.name || "Unnamed person"}</strong>
                      <small>{[profile.role, profile.credentials].filter(Boolean).join(" | ") || "No role added"}</small>
                    </span>
                  </div>
                </td>
                <td><Badge variant={profile.profileType === "doctor" ? "red" : "muted"}>{profileTypeLabel(profile.profileType)}</Badge></td>
                <td className="people-content-preview">{preview || (profile.profileType === "doctor" ? "No bio added" : "No description added")}</td>
                <td><VisibilitySwitch profile={profile} onChange={onToggle} /></td>
                <td><div className="people-badge-stack"><PersonStatusBadges profile={profile} /></div></td>
                <td>
                  <ProfileActions profile={profile} onPreview={onPreview} onEdit={onEdit} onMove={onMove} onToggle={onToggle} onDuplicate={onDuplicate} onRemove={onRemove} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function PeopleToolbar({
  search,
  setSearch,
  typeFilter,
  setTypeFilter,
  visibilityFilter,
  setVisibilityFilter,
  issueFilter,
  setIssueFilter,
  sort,
  setSort,
  onAdd
}: {
  search: string;
  setSearch: (value: string) => void;
  typeFilter: "all" | PersonProfileType;
  setTypeFilter: (value: "all" | PersonProfileType) => void;
  visibilityFilter: VisibilityFilter;
  setVisibilityFilter: (value: VisibilityFilter) => void;
  issueFilter: IssueFilter;
  setIssueFilter: (value: IssueFilter) => void;
  sort: SortKey;
  setSort: (value: SortKey) => void;
  onAdd: () => void;
}) {
  return (
    <div className="people-toolbar">
      <label className="people-search-field">
        <span>Search people</span>
        <div>
          <Search aria-hidden="true" size={16} />
          <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search people..." />
        </div>
      </label>
      <label className="dashboard-field">
        <span>Type</span>
        <select value={typeFilter} onChange={(event) => setTypeFilter(event.target.value as "all" | PersonProfileType)}>
          <option value="all">All</option>
          <option value="doctor">Doctors</option>
          <option value="team">Team Members</option>
        </select>
      </label>
      <label className="dashboard-field">
        <span>Visibility</span>
        <select value={visibilityFilter} onChange={(event) => setVisibilityFilter(event.target.value as VisibilityFilter)}>
          <option value="all">All</option>
          <option value="visible">Visible</option>
          <option value="hidden">Hidden</option>
        </select>
      </label>
      <label className="dashboard-field">
        <span>Issue</span>
        <select value={issueFilter} onChange={(event) => setIssueFilter(event.target.value as IssueFilter)}>
          <option value="all">All</option>
          <option value="image">Needs image</option>
          <option value="alt">Needs alt text</option>
          <option value="bio">Needs bio/description</option>
        </select>
      </label>
      <label className="dashboard-field">
        <span>Sort</span>
        <select value={sort} onChange={(event) => setSort(event.target.value as SortKey)}>
          <option value="order">Custom order</option>
          <option value="name">Name</option>
          <option value="type">Type</option>
          <option value="visibility">Visibility</option>
          <option value="status">Status</option>
        </select>
      </label>
      <ShadButton type="button" onClick={onAdd}>
        <Plus aria-hidden="true" size={16} />
        Add Person
      </ShadButton>
    </div>
  );
}

function AddPersonDialog({ open, onOpenChange, onChoose }: { open: boolean; onOpenChange: (open: boolean) => void; onChoose: (type: PersonProfileType) => void }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="people-add-dialog">
        <DialogHeader>
          <DialogTitle>Add Person</DialogTitle>
          <DialogDescription>Choose the kind of website profile to create.</DialogDescription>
        </DialogHeader>
        <div className="people-add-choices">
          <button type="button" onClick={() => onChoose("doctor")}>
            <UsersRound aria-hidden="true" size={22} />
            <strong>Doctor</strong>
            <span>For veterinarians with credentials, full bio, education, and profile details.</span>
          </button>
          <button type="button" onClick={() => onChoose("team")}>
            <UsersRound aria-hidden="true" size={22} />
            <strong>Team Member</strong>
            <span>For shorter website profiles with role, photo, and brief description.</span>
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function PersonPreviewDialog({ profile, onEdit, onClose }: { profile: PersonProfile | null; onEdit: (profile: PersonProfile) => void; onClose: () => void }) {
  if (!profile) return null;
  const text = contentPreview(profile) || (profile.profileType === "doctor" ? "No bio added" : "No description added");

  return (
    <Dialog open={Boolean(profile)} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="people-preview-dialog">
        <DialogHeader>
          <DialogTitle>Website Preview</DialogTitle>
          <DialogDescription>Preview how this profile appears on the website.</DialogDescription>
        </DialogHeader>
        <div className="people-preview-card">
          <ProfileImageCell profile={profile} size={86} />
          <div>
            <Badge variant={profile.visible === false ? "muted" : "red"}>{profile.visible === false ? "Hidden" : "Visible on website"}</Badge>
            <h3>{profile.name}</h3>
            <p>{profile.role}</p>
            {profile.profileType === "doctor" && profile.credentials && <strong>{profile.credentials}</strong>}
            <span>{text}</span>
          </div>
        </div>
        <div className="people-dialog-actions">
          <ShadButton type="button" onClick={() => onEdit(profile)}>Edit Profile</ShadButton>
          <ShadButton type="button" variant="ghost" onClick={onClose}>Close</ShadButton>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function RemovePersonDialog({
  profile,
  onClose,
  onHide,
  onRemove
}: {
  profile: PersonProfile | null;
  onClose: () => void;
  onHide: (profile: PersonProfile) => void;
  onRemove: (profile: PersonProfile) => void;
}) {
  if (!profile) return null;
  return (
    <Dialog open={Boolean(profile)} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="people-remove-dialog">
        <DialogHeader>
          <DialogTitle>Remove this profile?</DialogTitle>
          <DialogDescription>This removes the person from the website profile list. If you may need this profile later, hide it instead.</DialogDescription>
        </DialogHeader>
        <div className="people-dialog-actions">
          <ShadButton type="button" variant="ghost" onClick={onClose}>Cancel</ShadButton>
          <ShadButton type="button" variant="ghost" onClick={() => onHide(profile)}>Hide instead</ShadButton>
          <ShadButton type="button" variant="destructive" onClick={() => onRemove(profile)}>Remove profile</ShadButton>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function SwitchField({ label, description, checked, onChange }: { label: string; description: string; checked: boolean; onChange: (checked: boolean) => void }) {
  return (
    <label className="staff-switch-row">
      <span>
        <strong>{label}</strong>
        <em>{description}</em>
      </span>
      <Switch checked={checked} onCheckedChange={onChange} aria-label={label} />
    </label>
  );
}

function PersonEditorSheet({
  profile,
  open,
  onOpenChange,
  onSave,
  onRemove
}: {
  profile: PersonProfile | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (profile: PersonProfile) => void;
  onRemove: (profile: PersonProfile) => void;
}) {
  const [draft, setDraft] = useState<PersonProfile | null>(profile);
  const [uploading, setUploading] = useState(false);

  if (!draft) return null;

  const update = <Key extends keyof PersonProfile>(key: Key, value: PersonProfile[Key]) => {
    setDraft((current) => current ? { ...current, [key]: value } : current);
  };

  function updateType(value: PersonProfileType) {
    setDraft((current) => current ? {
      ...current,
      profileType: value,
      role: current.role || (value === "doctor" ? "Veterinarian" : "Team Member"),
      credentials: value === "doctor" ? current.credentials || "DVM" : undefined
    } : current);
  }

  async function uploadImage(file?: File) {
    if (!file || !file.type.startsWith("image/")) return;
    setUploading(true);
    const form = new FormData();
    form.set("file", file);
    try {
      const response = await fetch("/api/sanity/person-profiles/", { method: "POST", body: form });
      const data = await response.json().catch(() => ({}));
      if (response.ok && data.image) {
        setDraft((current) => current ? { ...current, image: data.image, imageUrl: data.url || current.imageUrl } : current);
      }
    } finally {
      setUploading(false);
    }
  }

  const warnings = issueLabels(draft);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="people-editor-sheet">
        <SheetHeader>
          <SheetTitle>Edit Profile</SheetTitle>
          <SheetDescription>Update this person&apos;s website profile.</SheetDescription>
        </SheetHeader>

        {warnings.length > 0 && (
          <Alert tone="warning" className="staff-profile-alert">
            <AlertTriangle aria-hidden="true" size={18} />
            <div>
              <AlertTitle>Profile needs attention</AlertTitle>
              <AlertDescription>{warnings.join(", ")}</AlertDescription>
            </div>
          </Alert>
        )}

        <div className="staff-editor-scroll">
          <section>
            <h3>Basic details</h3>
            <div className="dashboard-form-grid">
              <label className="dashboard-field">
                <span>Name</span>
                <input value={draft.name} onChange={(event) => update("name", event.target.value)} onBlur={() => !draft.slug && update("slug", profileSlugFromName(draft.name))} />
              </label>
              <label className="dashboard-field">
                <span>Role</span>
                <input value={draft.role} onChange={(event) => update("role", event.target.value)} />
              </label>
              <label className="dashboard-field">
                <span>Profile type</span>
                <select value={draft.profileType} onChange={(event) => updateType(event.target.value as PersonProfileType)}>
                  <option value="doctor">Doctor</option>
                  <option value="team">Team Member</option>
                </select>
              </label>
              {draft.profileType === "doctor" && (
                <label className="dashboard-field">
                  <span>Credentials</span>
                  <input value={draft.credentials || ""} onChange={(event) => update("credentials", event.target.value)} />
                </label>
              )}
            </div>
          </section>

          <section>
            <h3>Profile photo</h3>
            <div className="staff-image-editor">
              {profileImageUrl(draft) ? (
                <Image src={profileImageUrl(draft)} alt={profileImageAlt(draft)} width={132} height={132} />
              ) : (
                <div><ImageIcon aria-hidden="true" size={28} /></div>
              )}
              <div className="dashboard-form-grid">
                <label className="dashboard-field">
                  <span>Upload or select image</span>
                  <input type="file" accept="image/*" onChange={(event) => uploadImage(event.target.files?.[0])} />
                  <small>{uploading ? "Uploading image..." : "Choose a clear profile photo."}</small>
                </label>
                <label className="dashboard-field">
                  <span>Image URL</span>
                  <input value={draft.imageUrl || ""} onChange={(event) => update("imageUrl", event.target.value)} />
                </label>
                <label className="dashboard-field">
                  <span>Image alt text</span>
                  <input value={draft.imageAlt || ""} onChange={(event) => update("imageAlt", event.target.value)} />
                </label>
                <label className="dashboard-field">
                  <span>Image caption</span>
                  <input value={draft.imageCaption || ""} onChange={(event) => update("imageCaption", event.target.value)} />
                </label>
              </div>
            </div>
          </section>

          <section>
            <h3>Website visibility</h3>
            <div className="staff-switch-grid">
              <SwitchField label="Visible on website" description="When off, this person is hidden from the website." checked={draft.visible !== false} onChange={(checked) => update("visible", checked)} />
              <SwitchField label="Show on homepage" description="Include this profile on the homepage." checked={draft.displayOnHomepage !== false} onChange={(checked) => update("displayOnHomepage", checked)} />
              <SwitchField label="Show on About page" description="Include this profile on the About page." checked={draft.displayOnAboutPage !== false} onChange={(checked) => update("displayOnAboutPage", checked)} />
              <SwitchField label="Featured profile" description="Use this when a profile should be highlighted." checked={draft.featured === true} onChange={(checked) => update("featured", checked)} />
              <label className="dashboard-field">
                <span>Sort order</span>
                <input type="number" value={draft.sortOrder || 100} onChange={(event) => update("sortOrder", Number(event.target.value))} />
              </label>
            </div>
          </section>

          <section>
            <h3>Bio and details</h3>
            {draft.profileType === "doctor" ? (
              <>
                <label className="dashboard-field">
                  <span>Full bio</span>
                  <textarea value={draft.bio || ""} onChange={(event) => update("bio", event.target.value)} rows={5} />
                </label>
                <label className="dashboard-field">
                  <span>Education</span>
                  <textarea value={draft.education || ""} onChange={(event) => update("education", event.target.value)} rows={3} />
                </label>
                <label className="dashboard-field">
                  <span>Specialties</span>
                  <input value={(draft.specialties || []).join(", ")} onChange={(event) => update("specialties", event.target.value.split(",").map((item) => item.trim()).filter(Boolean))} />
                </label>
                <label className="dashboard-field">
                  <span>Care philosophy</span>
                  <textarea value={draft.carePhilosophy || ""} onChange={(event) => update("carePhilosophy", event.target.value)} rows={3} />
                </label>
                <label className="dashboard-field">
                  <span>Professional interests</span>
                  <textarea value={draft.professionalInterests || ""} onChange={(event) => update("professionalInterests", event.target.value)} rows={3} />
                </label>
              </>
            ) : (
              <label className="dashboard-field">
                <span>Brief description</span>
                <textarea value={draft.briefDescription || draft.bio || ""} onChange={(event) => update("briefDescription", event.target.value)} rows={4} />
              </label>
            )}
          </section>

          <section>
            <h3>Optional website details</h3>
            <div className="dashboard-form-grid">
              {draft.profileType === "doctor" && (
                <label className="dashboard-field">
                  <span>Years of experience</span>
                  <input value={draft.yearsExperience || ""} onChange={(event) => update("yearsExperience", event.target.value)} />
                </label>
              )}
              <label className="dashboard-field">
                <span>Locations served</span>
                <input value={(draft.locationsServed || []).join(", ")} onChange={(event) => update("locationsServed", event.target.value.split(",").map((item) => item.trim()).filter(Boolean))} />
              </label>
              <label className="dashboard-field">
                <span>Button label</span>
                <input value={draft.ctaLabel || ""} onChange={(event) => update("ctaLabel", event.target.value)} />
              </label>
              <label className="dashboard-field">
                <span>Button link</span>
                <input value={draft.ctaLink || ""} onChange={(event) => update("ctaLink", event.target.value)} />
              </label>
              <label className="dashboard-field">
                <span>Search title</span>
                <input value={draft.seoTitle || ""} onChange={(event) => update("seoTitle", event.target.value)} />
              </label>
              <label className="dashboard-field">
                <span>Search description</span>
                <textarea value={draft.seoDescription || ""} onChange={(event) => update("seoDescription", event.target.value)} rows={3} />
              </label>
            </div>
          </section>
        </div>

        <div className="staff-dialog-actions">
          <ShadButton type="button" variant="ghost" onClick={() => onOpenChange(false)}>Cancel</ShadButton>
          <ShadButton type="button" variant="ghost" onClick={() => onRemove(draft)}>Remove</ShadButton>
          <ShadButton type="button" onClick={() => onSave(draft)}>Save Profile</ShadButton>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export function StaffForm({ initialStaff, initialProfiles }: { initialStaff: StaffSettings; initialProfiles: PersonProfile[] }) {
  const [profiles, setProfiles] = useState<PersonProfile[]>(initialProfiles);
  const [activeTab, setActiveTab] = useState<PeopleTab>("all");
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<"all" | PersonProfileType>("all");
  const [visibilityFilter, setVisibilityFilter] = useState<VisibilityFilter>("all");
  const [issueFilter, setIssueFilter] = useState<IssueFilter>("all");
  const [sort, setSort] = useState<SortKey>("order");
  const [addOpen, setAddOpen] = useState(false);
  const [editing, setEditing] = useState<PersonProfile | null>(null);
  const [previewing, setPreviewing] = useState<PersonProfile | null>(null);
  const [removing, setRemoving] = useState<PersonProfile | null>(null);
  const [status, setStatus] = useState<ResultStatus>({ ok: true, message: "" });
  const [isPending, startTransition] = useTransition();
  const hasLegacyData = initialStaff.doctors.length > 0 || initialStaff.staffMembers.length > 0;

  const filteredProfiles = useMemo(() => {
    const query = search.trim().toLowerCase();
    return sortedProfiles(profiles)
      .filter((profile) => {
        if (activeTab === "doctors" && profile.profileType !== "doctor") return false;
        if (activeTab === "team" && profile.profileType !== "team") return false;
        if (activeTab === "hidden" && profile.visible !== false) return false;
        if (activeTab === "attention" && !needsAttention(profile)) return false;
        return true;
      })
      .filter((profile) => typeFilter === "all" || profile.profileType === typeFilter)
      .filter((profile) => visibilityFilter === "all" || (visibilityFilter === "visible" ? profile.visible !== false : profile.visible === false))
      .filter((profile) => {
        const issues = issueLabels(profile);
        if (issueFilter === "all") return true;
        if (issueFilter === "image") return issues.includes("Needs image");
        if (issueFilter === "alt") return issues.includes("Needs alt text");
        return issues.includes("Needs bio") || issues.includes("Needs description");
      })
      .filter((profile) => !query || `${profile.name} ${profile.role} ${profile.credentials || ""}`.toLowerCase().includes(query))
      .sort((a, b) => {
        if (sort === "name") return a.name.localeCompare(b.name);
        if (sort === "type") return a.profileType.localeCompare(b.profileType) || a.name.localeCompare(b.name);
        if (sort === "visibility") return Number(b.visible !== false) - Number(a.visible !== false) || a.name.localeCompare(b.name);
        if (sort === "status") return issueLabels(b).length - issueLabels(a).length || a.name.localeCompare(b.name);
        return (a.sortOrder || 100) - (b.sortOrder || 100) || a.name.localeCompare(b.name);
      });
  }, [activeTab, issueFilter, profiles, search, sort, typeFilter, visibilityFilter]);

  function upsertLocal(profile: PersonProfile) {
    setProfiles((current) => {
      const exists = current.some((item) => item._id === profile._id);
      return exists ? current.map((item) => (item._id === profile._id ? profile : item)) : [...current, profile];
    });
  }

  function saveProfile(profile: PersonProfile, action: "create" | "update" = profiles.some((item) => item._id === profile._id) ? "update" : "create") {
    startTransition(async () => {
      const next = { ...profile, slug: profile.slug || profileSlugFromName(profile.name) };
      const response = await fetch("/api/sanity/person-profiles/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, profile: next })
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        setStatus({ ok: false, message: genericSaveError(data.error) });
        return;
      }
      upsertLocal(next);
      setEditing(null);
      setAddOpen(false);
      setStatus({ ok: true, message: "Profile updated." });
    });
  }

  function toggleVisibility(profile: PersonProfile, visible?: boolean) {
    saveProfile({ ...profile, visible: visible ?? profile.visible === false }, "update");
  }

  function moveProfile(profile: PersonProfile, direction: -1 | 1) {
    const siblings = sortedProfiles(profiles.filter((item) => item.profileType === profile.profileType));
    const index = siblings.findIndex((item) => item._id === profile._id);
    const swap = siblings[index + direction];
    if (!swap) return;
    const nextProfile = { ...profile, sortOrder: swap.sortOrder || index + direction + 1 };
    const nextSwap = { ...swap, sortOrder: profile.sortOrder || index + 1 };
    upsertLocal(nextProfile);
    upsertLocal(nextSwap);
    saveProfile(nextProfile, "update");
    saveProfile(nextSwap, "update");
  }

  function duplicateProfile(profile: PersonProfile) {
    const slug = `${profileSlugFromName(profile.name)}-copy`;
    const copy = { ...profile, _id: `person-${profile.profileType}-${slug}-${Date.now()}`, name: `${profile.name} Copy`, slug, visible: false, sortOrder: profiles.length + 1 };
    setEditing(copy);
  }

  function hideProfile(profile: PersonProfile) {
    saveProfile({ ...profile, visible: false }, "update");
    setRemoving(null);
  }

  function removeProfile(profile: PersonProfile) {
    startTransition(async () => {
      const response = await fetch("/api/sanity/person-profiles/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "delete", id: profile._id })
      });
      if (!response.ok) {
        setStatus({ ok: false, message: "Profile could not be removed." });
        return;
      }
      setProfiles((current) => current.filter((item) => item._id !== profile._id));
      setRemoving(null);
      setEditing(null);
      setStatus({ ok: true, message: "Profile removed." });
    });
  }

  function migrateLegacy() {
    startTransition(async () => {
      const response = await fetch("/api/sanity/person-profiles/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "migrate" })
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        setStatus({ ok: false, message: "Existing people could not be prepared." });
        return;
      }
      setStatus({ ok: true, message: `Prepared ${data.created || 0} profiles. Refresh to view them here.` });
    });
  }

  function chooseNewProfile(profileType: PersonProfileType) {
    setAddOpen(false);
    setEditing(newProfile(profileType, profiles.filter((profile) => profile.profileType === profileType).length + 1));
  }

  return (
    <div className="people-manager">
      <div className="dashboard-page-head with-action people-page-head">
        <div>
          <p className="dashboard-eyebrow">People</p>
          <h1>People</h1>
          <p>Manage doctor and team member profiles shown on the Veterinary Medical Centers website.</p>
        </div>
        <div className="dashboard-studio-handoff-actions">
          <ShadButton type="button" onClick={() => setAddOpen(true)}>
            <Plus aria-hidden="true" size={16} />
            Add Person
          </ShadButton>
          <ShadButton asChild variant="ghost">
            <Link href="/about/" target="_blank" rel="noopener noreferrer">Preview Website</Link>
          </ShadButton>
        </div>
      </div>

      {profiles.length === 0 && hasLegacyData && (
        <Alert tone="warning" className="staff-profile-alert">
          <AlertTriangle aria-hidden="true" size={20} />
          <div>
            <AlertTitle>Existing people found</AlertTitle>
            <AlertDescription>Prepare the existing doctor and team profiles so they can be managed here.</AlertDescription>
            <ShadButton type="button" disabled={isPending} onClick={migrateLegacy}>{isPending ? "Preparing..." : "Prepare profiles"}</ShadButton>
          </div>
        </Alert>
      )}

      <PeopleStatsRow profiles={profiles} />

      <Card className="people-table-card">
        <CardContent>
          <div className="people-table-head">
            <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as PeopleTab)}>
              <TabsList>
                <TabsTrigger value="all">All People</TabsTrigger>
                <TabsTrigger value="doctors">Doctors</TabsTrigger>
                <TabsTrigger value="team">Team Members</TabsTrigger>
                <TabsTrigger value="hidden">Hidden</TabsTrigger>
                <TabsTrigger value="attention">Needs Attention</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <PeopleToolbar search={search} setSearch={setSearch} typeFilter={typeFilter} setTypeFilter={setTypeFilter} visibilityFilter={visibilityFilter} setVisibilityFilter={setVisibilityFilter} issueFilter={issueFilter} setIssueFilter={setIssueFilter} sort={sort} setSort={setSort} onAdd={() => setAddOpen(true)} />

          <PeopleDataTable profiles={filteredProfiles} onPreview={setPreviewing} onEdit={setEditing} onMove={moveProfile} onToggle={toggleVisibility} onDuplicate={duplicateProfile} onRemove={setRemoving} />
        </CardContent>
      </Card>

      <StatusMessage {...status} />

      <AddPersonDialog open={addOpen} onOpenChange={setAddOpen} onChoose={chooseNewProfile} />
      <PersonEditorSheet key={editing?._id || "person-editor"} profile={editing} open={Boolean(editing)} onOpenChange={(open) => !open && setEditing(null)} onSave={saveProfile} onRemove={setRemoving} />
      <PersonPreviewDialog profile={previewing} onEdit={(profile) => { setPreviewing(null); setEditing(profile); }} onClose={() => setPreviewing(null)} />
      <RemovePersonDialog profile={removing} onClose={() => setRemoving(null)} onHide={hideProfile} onRemove={removeProfile} />
    </div>
  );
}
