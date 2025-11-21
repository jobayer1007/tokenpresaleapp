import certik from 'assets/images/partners/certik.svg';
import binancechain from 'assets/images/partners/binancechain.svg';
import coinmarketcap from 'assets/images/partners/coinmarketcap.svg';
import fairyproof from 'assets/images/partners/fairyproof.png';

const partners = [
  { label: 'binancechain', src: binancechain, href: 'https://www.bnbchain.org/' },
  { label: 'coinmarketcap', src: coinmarketcap, href: 'https://coinmarketcap.com/' },
  { label: 'certik', src: certik, href: 'https://www.certik.com/' },
  { label: 'fairyproof', src: fairyproof, href: 'https://www.fairyproof.com/' },
];

const PartnersSection = () => {
  return (
    <section className="py-12">
      <div className="section-shell">
        <div className="text-center space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">Ecosystem</p>
          <h3 className="text-xl font-semibold text-ink">Trusted partners and infra</h3>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-4">
          {partners.map((partner) => (
            <a
              key={partner.label}
              href={partner.href}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center rounded-xl border border-ink/5 bg-white px-4 py-3 opacity-80 transition hover:opacity-100"
            >
              <img src={partner.src} alt={partner.label} className="max-h-10" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
