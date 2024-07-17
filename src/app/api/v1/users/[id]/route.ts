import { getUserById } from "@/modules/user/services";

export async function GET(
  request: Request,
  { params: { id } }: { params: { id: string } },
) {
  const user = await getUserById(id);
  return Response.json(user);
}
