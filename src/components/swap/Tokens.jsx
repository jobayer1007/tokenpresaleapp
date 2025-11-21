import { useMemo, useState } from 'react';

const itemsPerPage = 12;

function Tokens({ open, handleClose, setToken, tokenList }) {
  const tokens = useMemo(() => (tokenList ? Object.keys(tokenList) : []), [tokenList]);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState('');

  const filteredTokens = useMemo(() => {
    const lowered = search.toLowerCase();
    return tokens.filter((t) => tokenList[t].name.toLowerCase().includes(lowered));
  }, [tokens, search, tokenList]);

  const pagedTokens = filteredTokens.slice(page * itemsPerPage, page * itemsPerPage + itemsPerPage);
  const totalPages = Math.ceil(filteredTokens.length / itemsPerPage);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 p-4 backdrop-blur-sm">
      <div className="card w-full max-w-md space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-base font-semibold text-ink">Select a token</p>
          <button
            className="rounded-full p-2 text-ink/70 hover:bg-ink/5"
            onClick={handleClose}
            aria-label="Close token selector"
            type="button"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" stroke="currentColor" fill="none">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="rounded-xl border border-ink/10 bg-surface px-3 py-2 focus-within:border-primary">
          <input
            type="text"
            placeholder="Search tokens"
            className="w-full bg-transparent text-sm font-semibold text-ink outline-none"
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(0);
            }}
            value={search}
            autoFocus
          />
        </div>

        <div className="max-h-96 space-y-2 overflow-auto">
          {pagedTokens.length === 0 && (
            <div className="text-center text-sm font-semibold text-ink/60">
              No results. Try a different search.
            </div>
          )}
          {pagedTokens.map((token) => (
            <button
              key={token}
              className="flex w-full items-center gap-3 rounded-xl border border-ink/5 bg-white px-3 py-2 text-left transition hover:border-primary/60"
              onClick={() => {
                setToken(tokenList[token]);
                handleClose();
              }}
              type="button"
            >
              <img
                src={tokenList[token].logoURI}
                alt={`${tokenList[token].symbol} logo`}
                className="h-8 w-8 rounded-full bg-surface"
              />
              <div>
                <p className="text-sm font-semibold text-ink">{tokenList[token].name}</p>
                <p className="text-xs font-semibold text-ink/60">{tokenList[token].symbol}</p>
              </div>
            </button>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-between">
            <button
              className="btn-outline"
              onClick={() => setPage((p) => Math.max(p - 1, 0))}
              disabled={page === 0}
              type="button"
            >
              Previous
            </button>
            <p className="text-sm font-semibold text-ink/70">
              Page {page + 1} of {totalPages}
            </p>
            <button
              className="btn-outline"
              onClick={() => setPage((p) => Math.min(p + 1, totalPages - 1))}
              disabled={page >= totalPages - 1}
              type="button"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Tokens;
