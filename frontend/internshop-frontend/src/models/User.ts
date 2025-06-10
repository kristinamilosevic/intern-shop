export interface UserProps {
  id?: number;
  username?: string;
  password?: string;
  registrationDate?: string;
  phone?: string;
}

export class User {
  id: number = 0;
  username: string = "";
  password: string = "";
  registrationDate: string = "";
  phone: string = "";

  static fromProps(props: UserProps): User {
    const user = new User();
    Object.assign(user, props);
    return user;
  }
}
