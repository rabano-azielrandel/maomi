export type User = {
  username: string | null;
  display_name: string | null;
  avatar_url: string | null;
  banner_url: string | null;
  bio: string | null;
  created_at: string;
};

type UserFollows = {
  follower: number;
  following: number;
};

export type ProfileProps = {
  user: User;
  follows: UserFollows;
  onUpdate?: (data: User) => void;
};

export type HeaderProps = {
  displayName : string;
  postCount : number;
}