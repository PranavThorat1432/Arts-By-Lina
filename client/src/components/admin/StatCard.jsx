export const StatCard = ({ title, value, icon: Icon, trend, trendType = "up", subtitle }) => {
  // trendType: "up" (green), "down" (red), "info" (gold/neutral)
  const trendColorMap = {
    up: "bg-green-50 text-green-700",
    down: "bg-red-50 text-red-600",
    info: "bg-amber-50 text-amber-700",
  };

  return (
    <div className="bg-white rounded-2xl border border-earth-150 p-5 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="font-body text-[11px] font-bold uppercase tracking-wider text-earth-500">{title}</span>
          {Icon && (
            <div className="w-9 h-9 bg-brand-cream rounded-xl flex items-center justify-center text-brand-gold shrink-0">
              <Icon size={18} />
            </div>
          )}
        </div>
        <div className="flex items-baseline gap-2">
          <span className="font-display text-3xl font-bold text-brand-brown">{value ?? "0"}</span>
          {trend && (
            <span className={`font-body text-[10px] font-bold px-2 py-0.5 rounded-full ${trendColorMap[trendType] || trendColorMap.up}`}>
              {trend}
            </span>
          )}
        </div>
      </div>
      {subtitle && (
        <p className="font-body text-[10px] text-earth-400 mt-2 leading-relaxed">{subtitle}</p>
      )}
    </div>
  );
};

