import { Fragment, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Account from '../../account';
import Networks from '../../Chains/Networks';
import logo from 'assets/images/logo-elo.png';
import Contracts from '../../shared/Contracts';
import Navbar from './Navbar';
import SideDrawer from './SideDrawer';

const mainLinks = [
  { label: 'Home', href: '/' },
  { label: 'Pre-sale', href: '/pre-sale' },
  { label: 'Swap', href: '/swap' },
  { label: 'Stake', href: '/stake' },
  { label: 'Gallery', href: '/gallery' },
];

const moreMenuLinks = [
  { label: 'About us', href: '/about' },
  { label: 'Transactions', href: '/transactions' },
  { label: 'NFTs', href: '/nfts' },
];

const MainNavigation = () => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [contractsDialogOpen, setContractsDialogOpen] = useState(false);

  const handleContractsDialogToggle = () => setContractsDialogOpen((prev) => !prev);
  const handleDrawerToggle = () => setMobileDrawerOpen((prev) => !prev);

  const renderLink = (link) => {
    const baseClasses =
      'rounded-full px-3 py-2 text-sm font-semibold text-ink/80 transition hover:bg-ink/5 hover:text-ink';
    return (
      <NavLink
        key={link.href}
        to={link.href}
        end={link.href === '/'}
        className={({ isActive }) => `${baseClasses} ${isActive ? 'bg-ink/5 text-ink' : ''}`}
      >
        {link.label}
      </NavLink>
    );
  };

  return (
    <Fragment>
      <header className="fixed inset-x-0 top-0 z-40 border-b border-ink/5 bg-white/80 backdrop-blur-lg">
        <div className="section-shell">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-3">
              <button
                className="inline-flex items-center justify-center rounded-full p-2 text-ink/70 md:hidden hover:bg-ink/5"
                onClick={handleDrawerToggle}
                aria-label="Toggle navigation"
                type="button"
              >
                <span className="h-0.5 w-5 bg-ink block mb-1" />
                <span className="h-0.5 w-5 bg-ink block mb-1" />
                <span className="h-0.5 w-4 bg-ink block" />
              </button>
              <Link to="/" className="flex items-center gap-2">
                <img src={logo} alt="ELO logo" className="h-9 w-9 rounded-lg border border-ink/5" />
                <span className="text-base font-semibold text-ink">ELO</span>
              </Link>
            </div>

            <nav className="hidden items-center gap-1 md:flex">
              {mainLinks.map(renderLink)}
              <Navbar
                moreMenuLinks={moreMenuLinks}
                handleClickContracts={handleContractsDialogToggle}
              />
            </nav>

            <div className="flex items-center gap-2">
              <Networks />
              <Account />
            </div>
          </div>
        </div>
      </header>

      <SideDrawer
        mainLinks={mainLinks}
        moreMenuLinks={moreMenuLinks}
        onClose={handleDrawerToggle}
        open={mobileDrawerOpen}
        handleClickContracts={handleContractsDialogToggle}
      />
      <Contracts open={contractsDialogOpen} handleClose={handleContractsDialogToggle} />
    </Fragment>
  );
};

export default MainNavigation;
