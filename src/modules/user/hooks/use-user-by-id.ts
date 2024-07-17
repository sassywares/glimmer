import { apiRoutes } from "@/routes";
import { useQueryService } from "@/modules/shared/hooks";

import type { User } from "../user.types";

export function useUserById(id: string) {
  return useQueryService<never, User>({
    queryKey: ["user", id],
    url: apiRoutes.v1.user(id),
  });
}
