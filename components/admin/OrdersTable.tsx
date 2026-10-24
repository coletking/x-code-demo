import { Eye } from "lucide-react";
import type { Order } from "@/lib/models/types";
import { OrderStatusBadge } from "@/components/shared/StatusBadge";
import { formatCurrency, formatDisplayDate, formatDisplayTime } from "@/lib/utils/date";

export function OrdersTable({
  orders,
  onView,
}: {
  orders: Order[];
  onView: (order: Order) => void;
}) {
  if (orders.length === 0) {
    return (
      <div className="px-5 py-12 text-center text-sm text-primary-900/50">
        No orders match these filters.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[720px] text-left text-sm">
        <thead>
          <tr className="border-b border-primary-900/8 text-xs text-primary-900/50">
            <th className="px-5 py-3 font-medium">Patient</th>
            <th className="px-5 py-3 font-medium">Service</th>
            <th className="px-5 py-3 font-medium">Date &amp; time</th>
            <th className="px-5 py-3 font-medium">Invoice</th>
            <th className="px-5 py-3 font-medium">Status</th>
            <th className="px-5 py-3 font-medium" />
          </tr>
        </thead>
        <tbody className="divide-y divide-primary-900/6">
          {orders.map((order) => (
            <tr key={order.id} className="hover:bg-primary-50/50">
              <td className="px-5 py-3">
                <p className="font-medium text-primary-950">{order.patientName}</p>
                <p className="text-xs text-primary-900/50">{order.patientEmail}</p>
              </td>
              <td className="px-5 py-3 text-primary-900/75">{order.serviceName}</td>
              <td className="px-5 py-3 text-primary-900/75">
                {formatDisplayDate(order.date)}
                <br />
                <span className="text-xs text-primary-900/50">{formatDisplayTime(order.time)}</span>
              </td>
              <td className="px-5 py-3">
                <p className="text-primary-900/75">{order.invoiceNumber}</p>
                <p className="text-xs font-medium text-primary-800">{formatCurrency(order.price)}</p>
              </td>
              <td className="px-5 py-3">
                <OrderStatusBadge status={order.status} />
              </td>
              <td className="px-5 py-3 text-right">
                <button
                  onClick={() => onView(order)}
                  className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-primary-700 hover:bg-primary-50"
                >
                  <Eye size={14} /> View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
