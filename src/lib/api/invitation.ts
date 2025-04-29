export async function createInvitation(
  teamId: string,
  emails: string[]
): Promise<void> {
  const response = await fetch(`/api/teams/${teamId}/invitations`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ emails }),
  });

  const json = await response.json();
  if (!response.ok) {
    throw new Error(json.error || "초대 생성에 실패했습니다.");
  }
}
