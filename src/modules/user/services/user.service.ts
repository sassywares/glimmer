import { User } from "../user.types";

import axios from "axios";

export const userService = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

export async function getUsers(): Promise<User[]> {
  return userService.get("/users").then((res) => res.data);
}

export async function getUserById(id: string): Promise<User | undefined> {
  return userService.get(`/users/${id}`).then((res) => res.data);
}
