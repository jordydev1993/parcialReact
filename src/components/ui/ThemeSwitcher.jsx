import { useTheme } from '../../context/ThemeContext.jsx'

export function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      type="button"
      className="navbar__theme-button"
      onClick={toggleTheme}
      aria-label={theme === 'dark' ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}
      title={theme === 'dark' ? 'Tema oscuro' : 'Tema claro'}
    >
      {theme === 'dark' ? '☀' : '◐'}
    </button>
  )
}
