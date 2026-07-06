interface MetricCardProps {
  label: string;
  value: string | number;
  unit?: string;
  accent?: 'emerald' | 'teal' | 'cyan' | 'violet' | 'amber';
  sublabel?: string;
}

const accentMap = {
  emerald: 'text-emerald-400',
  teal: 'text-teal-400',
  cyan: 'text-cyan-400',
  violet: 'text-violet-400',
  amber: 'text-amber-400',
};

export default function MetricCard({ label, value, unit, accent = 'emerald', sublabel }: MetricCardProps) {
  return (
    <div className="glass-card rounded-2xl p-5 text-center transition-transform hover:-translate-y-1">
      <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-emerald-100/50">{label}</p>
      <p className={`text-2xl font-black ${accentMap[accent]}`}>
        {value}
        {unit && <span className="ml-1 text-xs font-medium opacity-60">{unit}</span>}
      </p>
      {sublabel && <p className="mt-1 text-[10px] text-emerald-100/40">{sublabel}</p>}
    </div>
  );
}
