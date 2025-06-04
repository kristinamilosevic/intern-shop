export interface UserProps {
  username?: string;
  password?: string;
  registrationDate?: string;
  phone?: string;
}

export class User {
  username: string;
  password: string;
  registrationDate: string;
  phone: string;

  constructor({
    username = "",
    password = "",
    registrationDate = "",
    phone = ""
  }: UserProps = {}) {
    this.username = username;
    this.password = password;
    this.registrationDate = registrationDate;
    this.phone = phone;
  }
}
