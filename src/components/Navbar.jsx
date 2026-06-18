import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { usePosts } from '../context/PostsContext.jsx'
import { Button } from './ui/Button.jsx'
import { ThemeSwitcher } from './ui/ThemeSwitcher.jsx'

export function Navbar() {
  const { totalPosts } = usePosts()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="navbar">
      <Link to="/" className="navbar__brand" aria-label="Ir al inicio de PostFlow">
        <span className="navbar__mark">PF</span>
        <span>
          <strong className="navbar__title">PostFlow</strong>
          <span className="navbar__subtitle">Gestioná publicaciones de forma simple y moderna.</span>
        </span>
      </Link>

      <div className="navbar__actions">
        <button
          type="button"
          className="navbar__menu-button"
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((currentValue) => !currentValue)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`navbar__links ${menuOpen ? 'is-open' : ''}`} aria-label="Navegación principal">
          <NavLink
            to="/"
            end
            className={({ isActive }) => `navbar__link ${isActive ? 'is-active' : ''}`}
            onClick={() => setMenuOpen(false)}
          >
            Inicio
          </NavLink>
          <Button to="/posts/new" variant="ghost" className="navbar__link navbar__link--primary" onClick={() => setMenuOpen(false)}>
            Nuevo Post
          </Button>
          <NavLink
            to="/about"
            className={({ isActive }) => `navbar__link ${isActive ? 'is-active' : ''}`}
            onClick={() => setMenuOpen(false)}
          >
            Acerca
          </NavLink>
        </nav>

        <span className="toolbar__count navbar__count">{totalPosts} publicaciones</span>

        <ThemeSwitcher />
      </div>
    </header>
  )
}
