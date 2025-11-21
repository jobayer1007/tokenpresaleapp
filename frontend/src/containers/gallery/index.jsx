import React, { Fragment } from 'react';
import GalleryItems from '../../components/gallery/GalleryItems';

export default function Gallery() {
  return (
    <Fragment>
      <section className="section-shell pb-6 text-center">
        <p className="text-xs font-semibold uppercase tracking-wide text-primary">Gallery</p>
        <h1 className="text-3xl font-bold text-ink sm:text-4xl">NFT marketplace preview</h1>
        <p className="mx-auto max-w-2xl text-base text-ink/70">
          Explore sample collectibles destined for ELO customers and community members.
        </p>
      </section>
      <section className="border-y border-ink/5 bg-surface py-10">
        <div className="section-shell">
          <GalleryItems />
        </div>
      </section>
    </Fragment>
  );
}
