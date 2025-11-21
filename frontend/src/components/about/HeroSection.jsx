const HeroSection = () => {
  return (
    <section className="bg-white py-14">
      <div className="section-shell text-center">
        <p className="text-xs font-semibold uppercase tracking-wide text-primary">About us</p>
        <h1 className="text-3xl font-bold text-ink sm:text-4xl">
          A reward system designed for everyday ordering
        </h1>
        <p className="mx-auto max-w-3xl text-base text-ink/70">
          ELO blends a familiar ordering experience with transparent, on-chain rewards. We’re
          building a customer-first ecosystem where loyalty, staking, and NFT perks live in one
          streamlined interface.
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
