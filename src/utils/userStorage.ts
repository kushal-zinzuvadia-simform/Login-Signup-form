import { type User } from "../types/userSchema";

export const getUsers = (): User[] => {
  const users = localStorage.getItem("users");

  return users ? JSON.parse(users) : [];
};

export const saveUsers = (users: User[]) => {
  localStorage.setItem("users", JSON.stringify(users));
};

export const userExists = (users: User[], email: string) => {
  return users.some((user) => user.email.toLowerCase() === email.toLowerCase());
};
