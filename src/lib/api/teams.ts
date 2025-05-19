import { TeamType } from "@/types/teamType";

export interface CreateTeamType {
  teamId: string;
}

export async function createTeam(teamName: string): Promise<CreateTeamType> {
  const response = await fetch("/api/teams/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ teamName }),
  });

  const json = await response.json();
  if (!response.ok) throw new Error(json.error || "팀 생성에 실패했습니다.");

  return json as CreateTeamType;
}
