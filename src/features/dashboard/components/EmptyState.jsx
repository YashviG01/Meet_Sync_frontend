import { CalendarX } from "lucide-react";

export default function EmptyState({
  title = "No meetings found",
  description = "You don't have any meetings scheduled.",
  action,
}) {
  return (
    <tr>
      <td colSpan={5}>
        <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
          <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
            <CalendarX size={24} className="text-gray-400" />
          </div>
          <p className="text-sm font-semibold text-gray-700 mb-1">{title}</p>
          <p className="text-xs text-gray-400 max-w-xs leading-relaxed">{description}</p>
          {action && <div className="mt-5">{action}</div>}
        </div>
      </td>
    </tr>
  );
}
