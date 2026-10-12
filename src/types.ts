export type CommitmentCategory = 'proposito' | 'identidade' | 'publico' | 'equipe';

export interface CommitmentItem {
  id: string;
  category: CommitmentCategory;
  title: string;
  description: string;
  tag: string;
  iconName: string;
}

export interface MemberCommitment {
  id: string;
  name: string;
  role: string;
  selectedItemIds: string[];
  personalCommitment?: string;
  createdAt: string;
}
