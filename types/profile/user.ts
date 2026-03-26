export type User = {
  username: string | null;
  display_name: string | null;
  avatar_url: string | null;
  banner_url: string | null;
  bio: string | null;
  created_at: string;
  updated_at?: string | null;
};

export type EditUser = {
  username: string | null;
  display_name: string | null;
  avatar_url: string | null;
  banner_url: string | null;
  bio: string | null;
  tool?: any;
}

export type UpdateUser = {
  username?: string | null;
  display_name?: string | null;
  bio?: string | null;
  avatar_file?: File;
  banner_file?: File;
}

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