import { NavLink } from 'react-router-dom';

function MenuItems() {
  return (
    <nav className="flex flex-wrap gap-3 text-sm font-semibold text-ink/70">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/pre-sale">Pre-sale</NavLink>
      <NavLink to="/swap">Swap</NavLink>
    </nav>
  );
}

export default MenuItems;
