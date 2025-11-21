import { Link, useLocation } from 'react-router-dom';
import { appConfig } from '../../../config/env';

const linkBase =
  'block rounded-lg px-3 py-2 text-sm font-semibold text-ink/80 hover:bg-ink/5 hover:text-ink';

const SideDrawer = ({ mainLinks, moreMenuLinks, onClose, open, handleClickContracts }) => {
  const router = useLocation();

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-ink/40 backdrop-blur-sm md:hidden" onClick={onClose}>
      <div
        className="absolute left-0 top-0 h-full w-72 border-r border-ink/10 bg-white shadow-card"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-4 py-4 border-b border-ink/5">
          <span className="text-sm font-semibold text-ink">Navigate</span>
          <button
            className="rounded-full p-1.5 text-ink/70 transition hover:bg-ink/5"
            onClick={onClose}
            aria-label="Close menu"
            type="button"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" stroke="currentColor" fill="none">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="space-y-1 p-4">
          {mainLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              onClick={onClose}
              className={`${linkBase} ${router.pathname === link.href ? 'bg-ink/5 text-ink' : ''}`}
            >
              {link.label}
            </Link>
          ))}
          {moreMenuLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              onClick={onClose}
              className={`${linkBase} ${router.pathname === link.href ? 'bg-ink/5 text-ink' : ''}`}
            >
              {link.label}
            </Link>
          ))}
          {appConfig.whitepaperUrl && (
            <a href={appConfig.whitepaperUrl} target="_blank" rel="noreferrer" className={linkBase}>
              ELO Whitepaper
            </a>
          )}
          <button
            className={`${linkBase} w-full text-left`}
            onClick={() => {
              onClose();
              handleClickContracts();
            }}
            type="button"
          >
            Contracts
          </button>
        </div>
      </div>
    </div>
  );
};

export default SideDrawer;
