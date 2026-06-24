const PasswordRules = ({ password }) => {
  const rules = [
    {
      label: "At least 8 characters",
      met: password.length >= 8,
    },
    {
      label: "Uppercase & lowercase",
      met:
        /[A-Z]/.test(password) &&
        /[a-z]/.test(password),
    },
    {
      label: "At least one number",
      met: /[0-9]/.test(password),
    },
  ];

  return (
    <div className="space-y-2.5">
      {rules.map((rule) => (
        <div
          key={rule.label}
          className="flex items-center gap-2.5"
        >
          <div
            className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
              rule.met
                ? "border-green-500 bg-green-500"
                : "border-gray-300"
            }`}
          >
            {rule.met && (
              <svg
                width="8"
                height="8"
                viewBox="0 0 10 8"
                fill="none"
              >
                <path
                  d="M1 4l3 3 5-6"
                  stroke="white"
                  strokeWidth="1.5"
                />
              </svg>
            )}
          </div>

          <span
            className={`text-sm ${
              rule.met
                ? "text-green-600"
                : "text-gray-500"
            }`}
          >
            {rule.label}
          </span>
        </div>
      ))}
    </div>
  );
};

export default PasswordRules;