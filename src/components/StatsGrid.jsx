export function StatsGrid({ total, sessionCreated, sessionDeleted, visible }) {
  const stats = [
    { icon: '📄', label: 'Total de publicaciones', value: total },
    { icon: '✍️', label: 'Creadas esta sesión',    value: sessionCreated },
    { icon: '🗑️', label: 'Eliminadas esta sesión', value: sessionDeleted },
    { icon: '🔎', label: 'Resultados visibles',    value: visible },
  ]

  return (
    <section className="stats-grid" aria-label="Estadísticas del panel">
      {stats.map(({ icon, label, value }) => (
        <div key={label} className="stat-card">
          <span className="stat-icon" aria-hidden="true">{icon}</span>
          <span className="stat-label">{label}</span>
          <span className="stat-value">{value}</span>
        </div>
      ))}
    </section>
  )
}
