import { getUsers } from "@/modules/user/services";

export async function GET() {
  const users = await getUsers();
  return Response.json(users);
}
