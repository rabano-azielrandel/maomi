export type User = {
  username: string | null;
  display_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  created_at: string;
};

export type UserFollows = {
  following: number | null;
  follower: number | null;
}

export type ProfileProps = {
  user: User;
  onUpdate?: (data: User) => void;
};

export type HeaderProps = {
  displayName : string;
  postCount : number;
}