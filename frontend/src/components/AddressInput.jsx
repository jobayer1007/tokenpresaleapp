const AddressInput = ({ value, onChange, placeholder = 'Wallet address', autoFocus = false }) => {
  return (
    <input
      type="text"
      className="w-full rounded-xl border border-ink/10 bg-white px-3 py-2 text-sm font-semibold text-ink outline-none focus:border-primary"
      value={value}
      onChange={(e) => onChange && onChange(e.target.value)}
      placeholder={placeholder}
      autoFocus={autoFocus}
      autoComplete="off"
    />
  );
};

export default AddressInput;
