import certik from 'assets/images/partners/certik.svg';
import fairyproof from 'assets/images/partners/fairyproof.png';
import { appConfig } from '../../config/env';
import DiscordIcon from '../ui/icons/Discord';
import MediumIcon from '../ui/icons/Medium';

const partners = [
  { label: 'certik', src: certik, width: 150, href: 'https://www.certik.com/' },
  { label: 'fairyproof', src: fairyproof, width: 130, href: 'https://www.fairyproof.com/' },
];

const Footer = () => {
  return (
    <footer className="border-t border-ink/5 bg-white/70 py-12">
      <div className="section-shell items-center">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted">Audited by</p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-6">
            {partners.map((partner) => (
              <a
                key={partner.label}
                href={partner.href}
                target="_blank"
                rel="noreferrer"
                className="opacity-80 grayscale transition hover:opacity-100"
              >
                <img src={partner.src} alt={partner.label} width={partner.width} />
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 text-sm font-semibold text-ink/80">
          {appConfig.social.twitter && (
            <a
              href={appConfig.social.twitter}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-ink/10 px-3 py-2 transition hover:border-primary hover:text-primary"
            >
              Twitter
            </a>
          )}
          {appConfig.social.telegram && (
            <a
              href={appConfig.social.telegram}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-ink/10 px-3 py-2 transition hover:border-primary hover:text-primary"
            >
              Telegram
            </a>
          )}
          {appConfig.social.discord && (
            <a
              href={appConfig.social.discord}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-ink/10 px-3 py-2 transition hover:border-primary hover:text-primary"
            >
              <DiscordIcon className="h-4 w-4" /> Discord
            </a>
          )}
          {appConfig.whitepaperUrl && (
            <a
              href={appConfig.whitepaperUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-ink/10 px-3 py-2 transition hover:border-primary hover:text-primary"
            >
              <MediumIcon className="h-4 w-4" /> Whitepaper
            </a>
          )}
          {appConfig.contactEmail && (
            <a
              href={`mailto:${appConfig.contactEmail}`}
              className="rounded-full border border-ink/10 px-3 py-2 transition hover:border-primary hover:text-primary"
            >
              {appConfig.contactEmail}
            </a>
          )}
        </div>

        <p className="text-center text-xs font-semibold uppercase tracking-wide text-muted">
          © {new Date().getFullYear()} {appConfig.brandName}. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
