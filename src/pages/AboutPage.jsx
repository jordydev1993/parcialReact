import { Badge } from '../components/ui/Badge.jsx'
import { Card } from '../components/ui/Card.jsx'

export function AboutPage() {
  return (
    <section className="page-frame">
      <div className="page-hero">
        <span className="eyebrow">Acerca de</span>
        <h1>Una SPA minimalista pensada para publicaciones.</h1>
        <p>
          PostFlow organiza la experiencia en capas simples para que navegar, crear y editar contenido se sienta
          claro, rápido y moderno.
        </p>
      </div>

      <div className="about-grid">
        <Card className="about-card">
          <Badge variant="primary">Objetivo</Badge>
          <h3>Resolver gestión de posts con una interfaz liviana</h3>
          <p className="about-copy">
            El foco está en evitar pantallas vacías y dar siempre contexto visual, acciones claras y lectura cómoda.
          </p>
        </Card>

        <Card className="about-card">
          <Badge variant="secondary">Tecnologías</Badge>
          <h3>React, Vite y React Router</h3>
          <ul className="about-list">
            <li>React para componer la interfaz.</li>
            <li>Vite para desarrollo rápido.</li>
            <li>React Router para navegar entre vistas.</li>
            <li>Context + hooks para estado y reutilización.</li>
          </ul>
        </Card>

        <Card className="about-card">
          <Badge variant="muted">Integrantes</Badge>
          <h3>Equipo de desarrollo</h3>
          <ul className="about-list">
            <li>Lozano Melani</li>
            <li>Galvan Camila</li>
            <li>Martinez Sofia</li>
            <li>Huansi Jordy</li>
          </ul>
        </Card>
      </div>
    </section>
  )
}
