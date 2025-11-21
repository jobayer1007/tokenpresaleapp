import { Fragment, useState } from 'react';
import items from './nft.json';
import GalleryItemDetails from './GalleryItemDetails';
import useScroll from '../../hooks/useScroll';
import { appConfig } from '../../config/env';

const rowsPerPage = 12;

const resolveImage = (item) => {
  if (item.image?.startsWith('http')) return item.image.trim();
  if (appConfig.galleryImageBase) {
    return `${appConfig.galleryImageBase}${item.image?.trim() || ''}`;
  }
  return 'https://images.unsplash.com/photo-1505238680356-667803448bb6?auto=format&fit=crop&w=600&q=80';
};

const GalleryItems = () => {
  const [executeScroll, scrollRef] = useScroll();
  const [page, setPage] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);
  const [itemDetailsDialogOpen, setItemDetailsDialogOpen] = useState(false);

  const pageCount = Math.ceil(items.length / rowsPerPage);

  const handleChangePage = (direction) => {
    setPage((prev) => {
      const next = direction === 'next' ? prev + 1 : prev - 1;
      return Math.min(Math.max(next, 0), pageCount - 1);
    });
    executeScroll();
  };

  const handleItemDetailsDialogToggle = () => {
    setItemDetailsDialogOpen((prev) => !prev);
  };

  const handleClickItem = (item) => {
    setSelectedItem(item);
    handleItemDetailsDialogToggle();
  };

  const pagedItems = items.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Fragment>
      <div className="flex items-center justify-between rounded-xl border border-ink/5 bg-white px-4 py-3 text-sm font-semibold text-ink/70">
        <span>
          Page {page + 1} of {pageCount}
        </span>
        <div className="flex items-center gap-2">
          <button
            className="btn-outline"
            onClick={() => handleChangePage('prev')}
            disabled={page === 0}
            type="button"
          >
            Prev
          </button>
          <button
            className="btn-outline"
            onClick={() => handleChangePage('next')}
            disabled={page >= pageCount - 1}
            type="button"
          >
            Next
          </button>
        </div>
      </div>
      <div className="grid gap-4" ref={scrollRef}>
        <div className="grid gap-4 sm:grid-cols-3 md:grid-cols-4">
          {pagedItems.map((item) => (
            <button
              key={item.name}
              onClick={() => handleClickItem(item)}
              className="fadeInUp block overflow-hidden rounded-2xl border border-ink/5 bg-white shadow-soft transition hover:-translate-y-1 hover:shadow-card"
              type="button"
            >
              <div
                className="aspect-square w-full bg-cover bg-center"
                style={{ backgroundImage: `url(${resolveImage(item)})` }}
              />
              <div className="px-3 py-2 text-left">
                <p className="text-sm font-semibold text-ink">{item.name}</p>
                <p className="text-xs font-semibold uppercase tracking-wide text-ink/60">
                  {item.description || 'ELO NFT'}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
      {itemDetailsDialogOpen && (
        <GalleryItemDetails
          item={selectedItem}
          open={itemDetailsDialogOpen}
          handleClose={handleItemDetailsDialogToggle}
          imageSrc={selectedItem ? resolveImage(selectedItem) : ''}
        />
      )}
    </Fragment>
  );
};

export default GalleryItems;
