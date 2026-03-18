export type User = {
  username: string;
  displayName: string;
  avatar?: string;
  bio?: string;
};

export type ProfileProps = {
  user: User;
  onUpdate?: (data: User) => void;
};

export type HeaderProps = {
  displayName : string;
  postCount : number;
}