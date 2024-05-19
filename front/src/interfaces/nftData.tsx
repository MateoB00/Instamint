export interface NftInterface {
  id: number;
  title: string;
  description: string;
  hashtags: string[];
  mediaUrl: string;
  location: string;
  pathFirebase: string;
  isDraft: boolean;
}
