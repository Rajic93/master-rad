
export interface AccessRule {
  feature: string;
  accessGroups: string[];
  isPublic: boolean;
  accessLevel: number;
}