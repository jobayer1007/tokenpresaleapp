import ImageWithFallback from '../ui/ImageWithFallback';
import placeholder from 'assets/images/placeholder.svg';

export default function GalleryItemDetails({ item, open, handleClose, imageSrc }) {
  if (!open || !item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 p-4 backdrop-blur-sm">
      <div className="card w-full max-w-2xl space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-base font-semibold text-ink">NFT Details</p>
          <button
            className="rounded-full p-2 text-ink/70 hover:bg-ink/5"
            onClick={handleClose}
            aria-label="Close NFT details"
            type="button"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" stroke="currentColor" fill="none">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-ink/5 bg-surface p-3">
            <ImageWithFallback
              width="100%"
              height="100%"
              fallbackSrc={placeholder}
              alt={item.name}
              className="w-full rounded-xl object-cover"
              src={imageSrc}
            />
          </div>
          <div className="space-y-2">
            <p className="text-xl font-bold text-ink">{item.name}</p>
            <p className="text-sm text-ink/70">{item.description}</p>
            <div className="flex flex-wrap gap-2">
              {item.attributes?.map((attribute, i) => (
                <span
                  key={i}
                  className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary"
                >
                  {attribute.trait_type}: {attribute.value}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
