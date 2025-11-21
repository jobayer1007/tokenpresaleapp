import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { appConfig } from '../../../config/env';

const Navbar = ({ moreMenuLinks, handleClickContracts }) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        className="btn-outline"
        onClick={() => setOpen((prev) => !prev)}
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
      >
        More
        <svg
          className="h-4 w-4 text-ink/70"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 9-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-56 rounded-xl border border-ink/5 bg-white p-2 shadow-card">
          {moreMenuLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="block rounded-lg px-3 py-2 text-sm font-semibold text-ink/80 hover:bg-ink/5 hover:text-ink"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          {appConfig.whitepaperUrl && (
            <a
              href={appConfig.whitepaperUrl}
              target="_blank"
              rel="noreferrer"
              className="block rounded-lg px-3 py-2 text-sm font-semibold text-ink/80 hover:bg-ink/5 hover:text-ink"
              onClick={() => setOpen(false)}
            >
              ELO Whitepaper
            </a>
          )}
          <button
            className="block w-full rounded-lg px-3 py-2 text-left text-sm font-semibold text-ink/80 hover:bg-ink/5 hover:text-ink"
            onClick={() => {
              setOpen(false);
              handleClickContracts();
            }}
            type="button"
          >
            Contracts
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
