import type { User } from "../types/userSchema";

export const getCurrentUser = (): User | null => {
  const user = localStorage.getItem("currentUser");

  return user ? JSON.parse(user) : null;
};

export const logout = () => {
  localStorage.removeItem("currentUser");
};
