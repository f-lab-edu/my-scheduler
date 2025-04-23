import { TeamType } from "@/types/teamType";
export async function getTeams(uid: string): Promise<TeamType[]> {
  try {
    const response = await fetch(`/api/user/${uid}/teams`);

    if (!response.ok) {
      const errJson = await response.json().catch(() => ({}));
      throw new Error(errJson.error || "팀 목록을 불러오는데 실패했습니다.");
    }
    return (await response.json()) as TeamType[];
  } catch (error: any) {
    console.error("getTeams error:", error);
    throw new Error(
      error.message || "알 수 없는 오류로 팀을 불러올 수 없습니다."
    );
  }
}
