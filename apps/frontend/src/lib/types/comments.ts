export interface IComment {
  id: string;
  title: string;
  content: string;
  date: string;
  isRecommended: boolean;
  isBuyer: boolean;
  likes: number;
  dislikes: number;
  replies?: IComment[];
}
