export interface useMeParams {}

export interface UserMeType {
  expires: string;
  user: {
    email: string;
    id: string;
    image: string;
    name: string;
    role: string;
  };
}
