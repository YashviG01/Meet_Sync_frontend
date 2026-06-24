import {
  getStrength,
  strengthConfig,
} from "../utils/passwordStrength";

const barColors = [
  "bg-gray-200",
  "bg-red-400",
  "bg-orange-400",
  "bg-yellow-400",
  "bg-green-500",
];

const PasswordStrengthMeter = ({ password }) => {
  const strength = getStrength(password);

  const activeColor = barColors[strength];

  return (
    <div className="mt-2.5">
      <div className="flex gap-1 mb-1">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`flex-1 h-1 rounded-full ${
              i <= strength
                ? activeColor
                : "bg-gray-200"
            }`}
          />
        ))}
      </div>

      <div className="flex justify-between">
        <span className="text-[10px] font-semibold tracking-wider text-gray-400">
          STRENGTH
        </span>

        <span className="text-[10px] font-semibold tracking-wider">
          {strengthConfig[strength].label}
        </span>
      </div>
    </div>
  );
};

export default PasswordStrengthMeter;