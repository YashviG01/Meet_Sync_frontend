const Checkbox = ({
  checked,
  onChange,
  label,
}) => {
  return (
    <label className="flex items-center gap-2.5 cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-400"
      />

      <span className="text-sm text-gray-600">
        {label}
      </span>
    </label>
  );
};

export default Checkbox;