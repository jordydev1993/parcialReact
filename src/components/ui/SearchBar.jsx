import { Input } from './Input.jsx'

export function SearchBar({ label, value, onChange, placeholder }) {
  return (
    <div className="ui-search-bar">
      <label className="sr-only" htmlFor="search-posts">
        {label}
      </label>
      <span className="ui-search-bar__icon" aria-hidden="true">
        ⌕
      </span>
      <Input
        id="search-posts"
        className="ui-search-bar__input"
        type="search"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  )
}