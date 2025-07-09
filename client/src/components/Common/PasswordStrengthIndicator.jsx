import React from "react";
import { Shield, ShieldCheck, ShieldAlert } from "lucide-react";

const PasswordStrengthIndicator = ({ password }) => {
  // Calculate password strength score
  const getPasswordStrength = (password) => {
    if (!password) return { score: 0, label: "", color: "", bgColor: "" };

    let score = 0;
    const checks = {
      length: password.length >= 6,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      longLength: password.length >= 8,
    };

    // Calculate score based on criteria
    if (checks.length) score++;
    if (checks.lowercase) score++;
    if (checks.uppercase) score++;
    if (checks.number) score++;
    if (checks.special) score++;
    if (checks.longLength) score++;

    // Determine strength level
    if (score <= 2) {
      return {
        score,
        label: "Weak",
        color: "text-red-600",
        bgColor: "bg-red-500",
        icon: ShieldAlert,
        requirements: checks,
      };
    } else if (score <= 4) {
      return {
        score,
        label: "Medium",
        color: "text-yellow-600",
        bgColor: "bg-yellow-500",
        icon: Shield,
        requirements: checks,
      };
    } else {
      return {
        score,
        label: "Strong",
        color: "text-green-600",
        bgColor: "bg-green-500",
        icon: ShieldCheck,
        requirements: checks,
      };
    }
  };

  const strength = getPasswordStrength(password);

  if (!password) return null;

  const IconComponent = strength.icon;
  const progressWidth = (strength.score / 6) * 100;

  return (
    <div className="mt-2 space-y-2">
      {/* Strength indicator bar */}
      <div className="flex items-center space-x-2">
        <IconComponent className={`h-4 w-4 ${strength.color}`} />
        <div className="flex-1">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-300 ${strength.bgColor}`}
              style={{ width: `${progressWidth}%` }}
            />
          </div>
        </div>
        <span className={`text-xs font-medium ${strength.color}`}>
          {strength.label}
        </span>
      </div>

      {/* Requirements checklist */}
      <div className="text-xs space-y-1">
        <div className="grid grid-cols-2 gap-1">
          <div
            className={`flex items-center space-x-1 ${
              strength.requirements.length ? "text-green-600" : "text-gray-400"
            }`}
          >
            <span className="text-xs">•</span>
            <span>6+ characters</span>
          </div>
          <div
            className={`flex items-center space-x-1 ${
              strength.requirements.uppercase
                ? "text-green-600"
                : "text-gray-400"
            }`}
          >
            <span className="text-xs">•</span>
            <span>Uppercase</span>
          </div>
          <div
            className={`flex items-center space-x-1 ${
              strength.requirements.lowercase
                ? "text-green-600"
                : "text-gray-400"
            }`}
          >
            <span className="text-xs">•</span>
            <span>Lowercase</span>
          </div>
          <div
            className={`flex items-center space-x-1 ${
              strength.requirements.number ? "text-green-600" : "text-gray-400"
            }`}
          >
            <span className="text-xs">•</span>
            <span>Number</span>
          </div>
        </div>
        {strength.score >= 3 && (
          <div className="flex items-center space-x-1 text-xs text-gray-500">
            <span className="text-xs">💡</span>
            <span>
              Add special characters and make it 8+ chars for extra security
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default PasswordStrengthIndicator;
