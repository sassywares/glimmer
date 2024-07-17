import { apiRoutes } from "@/routes";
import { useQueryService } from "@/modules/shared/hooks";

import type { User } from "../user.types";

export function useUsers() {
  return useQueryService<never, User[]>({
    queryKey: ["users"],
    url: apiRoutes.v1.users,
  });
}
