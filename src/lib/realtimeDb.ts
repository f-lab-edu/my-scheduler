import { admin } from "@/lib/firebase";
export function getRtdb() {
  return admin.database();
}
