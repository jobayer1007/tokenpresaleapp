import { useState } from 'react';
import { CopyToClipboard as Copy } from 'react-copy-to-clipboard';

const CopyText = ({ text }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <Copy text={text} onCopy={handleCopy}>
      <button
        className="inline-flex items-center gap-1 rounded-full border border-ink/10 bg-white px-3 py-1 text-xs font-semibold text-ink/80 shadow-soft transition hover:bg-surface"
        type="button"
      >
        <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" stroke="currentColor" fill="none">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M8 7h9a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1Zm0 0V6a1 1 0 0 1 1-1h6"
          />
        </svg>
        {copied ? 'Copied' : 'Copy'}
      </button>
    </Copy>
  );
};

export default CopyText;
