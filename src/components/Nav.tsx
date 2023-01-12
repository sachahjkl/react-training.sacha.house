import { Entries, capitalize } from 'utils';
import { Link, NavLink } from 'react-router-dom';

import { RoutesType } from 'router';
import { navBindings } from 'consts';

interface NavProps {
  routes: RoutesType;
}
export default function Nav({ routes }: NavProps) {
  const classNameNavItem = 'inline-block font-bold transition-transform hover:scale-110';

  const activeNavClasses = ({ isActive }: { isActive: boolean }) =>
    `transition-all ${isActive ? 'underline' : ''}` as const;

  return (
    <nav className="rounded-b bg-neutral-100/70 p-3 shadow-md backdrop-blur-2xl transition-shadow">
      <ul className="flex flex-wrap items-center gap-3">
        <li className="mr-3 flex items-center gap-2">
          <img
            src="/favicon.png"
            alt="react logo"
            className="inline-block w-[2em] animate-spin-slow transition-all hover:animate-spin "
          />
          <Link to={routes.home.path}>
            <h1 className="text-lg font-bold"> React Training</h1>
          </Link>
        </li>
        {(Object.entries(routes) as Entries<typeof routes>).map(([label, route]) => (
          <li key={label} className={classNameNavItem}>
            {navBindings[label] || ''}
            <NavLink to={route.path} className={activeNavClasses}>
              {capitalize(label)}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
