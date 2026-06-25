import { Calendar, Clock, CheckCircle2, XCircle } from "lucide-react";
import StatsCard from "./StatsCard";

const STATS = [
  {
    icon:      <Calendar size={20} />,
    title:     "Total Meetings",
    count:     "142",
    secondary: "+12 from last month",
    accent:    "indigo",
    trend:     "+126",
    trendUp:   true,
  },
  {
    icon:      <Clock size={20} />,
    title:     "Upcoming",
    count:     "8",
    secondary: "Next meeting in 15 min",
    accent:    "blue",
    trend:     "Today",
    trendUp:   true,
  },
  {
    icon:      <CheckCircle2 size={20} />,
    title:     "Completed",
    count:     "128",
    secondary: "98.2% completion rate",
    accent:    "green",
    trend:     "98.2%",
    trendUp:   true,
  },
  {
    icon:      <XCircle size={20} />,
    title:     "Cancelled",
    count:     "6",
    secondary: "4 fewer than last week",
    accent:    "red",
    trend:     "-4",
    trendUp:   false,
  },
];

export default function StatsGrid() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {STATS.map((s) => (
        <StatsCard key={s.title} {...s} />
      ))}
    </div>
  );
}
