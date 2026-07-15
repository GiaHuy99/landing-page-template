type StatCardProps = {
  value: string;
  label: string;
  className?: string;
};

export default function StatCard({ value, label, className = "" }: StatCardProps) {
  return (
    <div
      className={`text-center px-4 py-6 border border-white/10 bg-navy/40 backdrop-blur-sm ${className}`}
    >
      <p className="text-3xl md:text-4xl font-semibold text-gold mb-2">{value}</p>
      <p className="text-xs md:text-sm uppercase tracking-widest text-cream">{label}</p>
    </div>
  );
}
