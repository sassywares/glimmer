export async function GET(
  request: Request,
  { params: { id } }: { params: { id: string } },
) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${id}`,
  );

  const user = await response.json();

  return Response.json(user);
}
