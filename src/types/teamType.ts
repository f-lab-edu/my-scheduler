export interface MemberType {
  name: string;
  email: string;
  mobile: string;
  uid: string;
}

export interface TeamType {
  id: string;
  teamName: string;
  members: MemberType[];
}
