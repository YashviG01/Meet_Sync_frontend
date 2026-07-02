/**
 * Circular icon button used in the bottom control bar.
 *
 * @param {Object}      props
 * @param {JSX.Element} props.icon       - Icon element (e.g. <Mic size={18} />)
 * @param {boolean}     [props.active]   - Active/on state styling
 * @param {boolean}     [props.disabled] - Disabled state
 * @param {string}      props.label      - Accessible label + tooltip text
 * @param {Function}    props.onClick
 */
const ControlButton = ({ icon, active = true, disabled = false, label, onClick }) => {
  return (
    <div className="group relative">
      <button
        type="button"
        aria-label={label}
        disabled={disabled}
        onClick={onClick}
        className={`flex h-[42px] w-[42px] items-center justify-center rounded-full border
          transition-all duration-150 active:scale-95
          disabled:cursor-not-allowed disabled:opacity-40 disabled:active:scale-100
          ${
            active
              ? "border-meeting-accent/35 bg-meeting-accentBg text-meeting-accent hover:bg-meeting-accent/25"
              : "border-white/10 bg-white/5 text-white/55 hover:bg-white/10 hover:text-white"
          }`}
      >
        {icon}
      </button>

      {/* Tooltip */}
      <span
        className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap
          rounded-md bg-black/80 px-2 py-1 text-[11px] text-white opacity-0
          transition-opacity duration-150 group-hover:opacity-100"
      >
        {label}
      </span>
    </div>
  );
};

export default ControlButton;