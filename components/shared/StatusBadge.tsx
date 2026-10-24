import type { OrderStatus, UserStatus } from "@/lib/models/types";
import { orderStatusMeta, userStatusMeta } from "@/lib/utils/statusColor";
import { Badge } from "@/components/ui/Badge";

export function OrderStatusBadge({ status }: { status: OrderStatus }) {
  const meta = orderStatusMeta[status];
  return <Badge className={meta.badge}>{meta.label}</Badge>;
}

export function UserStatusBadge({ status }: { status: UserStatus }) {
  const meta = userStatusMeta[status];
  return <Badge className={meta.badge}>{meta.label}</Badge>;
}
