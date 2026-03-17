export type User = {
  username: string;
  displayName: string;
  bio?: string;
  avatar?: string;
};

export type ProfileProps = {
  user: User;
  onUpdate?: (data: User) => void;
};