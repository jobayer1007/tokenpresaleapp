const SnackbarAlert = ({ openAlert, setOpenAlert, msg }) => {
  if (!openAlert) return null;

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <div className="flex items-start gap-3 rounded-xl bg-ink text-white px-4 py-3 shadow-card">
        <div className="text-sm font-semibold">{msg}</div>
        <button
          className="ml-2 rounded-full p-1 text-white/70 transition hover:bg-white/10"
          onClick={() => setOpenAlert(false)}
          aria-label="Close alert"
          type="button"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" stroke="currentColor" fill="none">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default SnackbarAlert;
