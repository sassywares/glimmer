import { userService } from "@/modules/user/user.service";

export async function GET(
  _: Request,
  { params: { id } }: { params: { id: string } },
) {
  const user = await userService.getById(id);
  return Response.json(user);
}
