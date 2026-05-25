type MetricCardProps = {
  label: string;
  value: string;
  tone?: "gold" | "red" | "green";
};

export function MetricCard({ label, value, tone = "gold" }: MetricCardProps) {
  return (
    <article className={`metric-card ${tone}`}>
      <span>{label}</span>
      <strong>{value}</strong>
    </article>
  );
}
