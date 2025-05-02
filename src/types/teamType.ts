export interface MemberType {
  name: string;
  email: string;
  mobile: string;
  uid: string;
}

export interface TeamType {
  createdAt?: number;
  createdBy?: string;
  id: string;
  teamName: string;
  members: MemberType[];
}
