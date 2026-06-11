export type OttoLocationKey = "fortThomas" | "independence";

function ottoClinicId(value: string | undefined, fallback: string) {
  if (!value || value.startsWith("REPLACE_WITH_")) return fallback;
  return value;
}

export const OTTO_CLINIC_IDS: Record<OttoLocationKey, string> = {
  fortThomas: ottoClinicId(process.env.NEXT_PUBLIC_OTTO_FORT_THOMAS_CLINIC_ID, "cmom0dckc0sgp6501aorlulzf"),
  independence: ottoClinicId(process.env.NEXT_PUBLIC_OTTO_INDEPENDENCE_CLINIC_ID, "cmom0koio0xsd65010qy8yam0")
};

