import { Link } from 'react-router-dom';
import ReactPlayer from 'react-player';
import heroArt from 'assets/images/logo-blue-art2.png';
import { appConfig } from '../../config/env';

const HeroSection = () => {
  return (
    <section className="bg-white/60 pt-4">
      <div className="section-shell lg:flex lg:items-center lg:gap-12">
        <div className="flex-1 space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
            Rewards meet real utility
          </div>
          <div className="space-y-3">
            <h1 className="text-3xl font-bold leading-tight text-ink sm:text-4xl lg:text-5xl">
              Effortless orders. Automatic crypto rewards.
            </h1>
            <p className="max-w-2xl text-base text-ink/80">
              ELO pairs day-to-day food ordering with transparent token rewards. Stake, swap, and
              buy into the pre-sale to unlock perks for loyal customers and early supporters.
            </p>
            <p className="text-base font-semibold text-ink">
              Every checkout earns $ELO. Holders unlock staking yields and community drops.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link to="/pre-sale" className="btn-primary">
              Get $ELO
              <svg className="h-4 w-4" viewBox="0 0 24 24" stroke="currentColor" fill="none">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m9 5 7 7-7 7" />
              </svg>
            </Link>
            {appConfig.whitepaperUrl && (
              <a
                href={appConfig.whitepaperUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-outline"
              >
                Whitepaper
                <svg className="h-4 w-4" viewBox="0 0 24 24" stroke="currentColor" fill="none">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 8h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2h2m5-4v12m0-12L9 6m3-2 3 2"
                  />
                </svg>
              </a>
            )}
          </div>
          <div className="flex flex-wrap gap-4 text-xs font-semibold uppercase tracking-wide text-muted">
            <span className="pill">Secure by design</span>
            <span className="pill">Multi-chain ready</span>
            <span className="pill">Built for customers</span>
          </div>
        </div>

        <div className="relative mt-8 w-full max-w-xl flex-1 lg:mt-0">
          <div className="absolute -inset-4 rounded-[28px] bg-gradient-to-tr from-primary/20 via-white to-secondary/20 blur-3xl" />
          <div className="relative overflow-hidden rounded-[24px] border border-ink/5 bg-white shadow-card">
            {appConfig.heroVideoUrl ? (
              <div className="relative pt-[56.25%]">
                <ReactPlayer
                  url={appConfig.heroVideoUrl}
                  width="100%"
                  height="100%"
                  style={{ position: 'absolute', top: 0, left: 0 }}
                  controls
                  light={heroArt}
                  playIcon={
                    <button className="btn-primary text-sm">
                      Play video
                      <svg className="h-4 w-4" viewBox="0 0 24 24" stroke="currentColor" fill="none">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m8 5 12 7-12 7V5Z" />
                      </svg>
                    </button>
                  }
                />
              </div>
            ) : (
              <img src={heroArt} alt="ELO token" className="w-full object-cover" />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
