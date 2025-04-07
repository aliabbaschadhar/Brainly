import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { useRef, useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { Link, useNavigate } from "react-router-dom";
import { Welcome } from "../components/Welcome";

export function Signup() {
  const navigate = useNavigate();
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeInput, setActiveInput] = useState<string | null>(null);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [formStep, setFormStep] = useState(1);

  useEffect(() => {
    if (usernameRef.current) {
      usernameRef.current.focus();
    }
  }, []);

  const checkPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    setPasswordStrength(strength);
  };

  const nextStep = () => {
    const username = usernameRef.current?.value;

    if (!username || username.length < 3) {
      setError("Username must be at least 3 characters");
      setTimeout(() => setError(""), 3000);
      return;
    }

    setFormStep(2);
    setTimeout(() => {
      if (passwordRef.current) {
        passwordRef.current.focus();
      }
    }, 100);
  };

  const handleKeyPress = (e: React.KeyboardEvent, field: string) => {
    if (e.key === "Enter") {
      if (field === "username") {
        nextStep();
      } else if (field === "password" || field === "confirmPassword") {
        signup();
      }
    }
  };

  async function signup() {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;
    const confirmPassword = confirmPasswordRef.current?.value;

    if (!username || username.length < 3) {
      setError("Username must be at least 3 characters");
      setFormStep(1);
      setTimeout(() => setError(""), 3000);
      return;
    }

    if (!password || password.length < 6) {
      setError("Password must be at least 6 characters");
      setTimeout(() => setError(""), 3000);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords don't match");
      setTimeout(() => setError(""), 3000);
      return;
    }

    try {
      setLoading(true);

      await axios.post(BACKEND_URL + "/api/v1/user/signup", {
        username,
        password,
      });

      setSignupSuccess(true);

      setTimeout(() => {
        navigate("/signin");
      }, 2000);
    } catch (err) {
      setError("Username already taken");
      setTimeout(() => setError(""), 3000);
    } finally {
      setLoading(false);
    }
  }

  const getStrengthClass = () => {
    if (passwordStrength === 0) return "bg-gray-200 dark:bg-gray-700";
    if (passwordStrength === 1) return "bg-red-500";
    if (passwordStrength === 2) return "bg-orange-500";
    if (passwordStrength === 3) return "bg-yellow-500";
    return "bg-green-500";
  };

  const getStrengthText = () => {
    if (passwordStrength === 0) return "Not entered";
    if (passwordStrength === 1) return "Weak";
    if (passwordStrength === 2) return "Fair";
    if (passwordStrength === 3) return "Good";
    return "Strong";
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 flex flex-col lg:flex-row justify-center gap-10 lg:gap-20 items-center p-4">
      <div className="w-full max-w-xl">
        <Welcome />
      </div>

      <div className="bg-white dark:bg-gray-800 w-full max-w-md rounded-2xl border border-gray-200 dark:border-gray-700 shadow-2xl px-8 py-10 relative transition-all duration-300 hover:shadow-blue-100 dark:hover:shadow-blue-900 transform hover:-translate-y-1">
        {error && (
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-500 text-white px-6 py-2 rounded-full shadow-lg text-sm font-medium animate-bounce">
            {error}
          </div>
        )}

        {signupSuccess && (
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-500 text-white px-6 py-2 rounded-full shadow-lg text-sm font-medium animate-pulse">
            Account created successfully! Redirecting...
          </div>
        )}

        <h2 className="text-4xl font-bold text-center text-gray-800 dark:text-gray-100 mb-8 animate-fade-in-up">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-600">
            Join Second Brain
          </span>
        </h2>

        <div className="flex justify-center mb-6">
          <div className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${formStep >= 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-300 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                }`}
            >
              1
            </div>
            <div
              className={`w-10 h-1 transition-colors duration-300 ${formStep >= 2 ? "bg-blue-600" : "bg-gray-300 dark:bg-gray-700"
                }`}
            ></div>
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${formStep >= 2
                  ? "bg-blue-600 text-white"
                  : "bg-gray-300 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                }`}
            >
              2
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {formStep === 1 ? (
            <div
              className={`space-y-2 transition-all duration-300 ${activeInput === "username" ? "scale-105" : ""
                }`}
            >
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block">
                <span className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  Choose a Username
                </span>
              </label>
              <Input
                ref={usernameRef}
                placeholder="Choose a username"
                onFocus={() => setActiveInput("username")}
                onBlur={() => setActiveInput(null)}
                onKeyDown={(e) => handleKeyPress(e, "username")}
                className={`transform transition-all ${activeInput === "username"
                    ? "border-blue-500 ring-2 ring-blue-300"
                    : ""
                  }`}
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Username should be at least 3 characters.
              </p>
              <div className="pt-4">
                <Button
                  onClick={nextStep}
                  variant="primary"
                  text="Continue"
                  fullWidth={true}
                  className="py-3 text-lg font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105"
                />
              </div>
            </div>
          ) : (
            <>
              <div
                className={`space-y-2 transition-all duration-300 ${activeInput === "password" ? "scale-105" : ""
                  }`}
              >
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block">
                  <span className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                    Create a Password
                  </span>
                </label>
                <Input
                  ref={passwordRef}
                  placeholder="Create a password"
                  type="password"
                  onFocus={() => setActiveInput("password")}
                  onBlur={() => setActiveInput(null)}
                  onChange={(e) => checkPasswordStrength(e.target.value)}
                  onKeyDown={(e) => handleKeyPress(e, "password")}
                  className={`transform transition-all ${activeInput === "password"
                      ? "border-blue-500 ring-2 ring-blue-300"
                      : ""
                    }`}
                />

                <div className="mt-2">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                      Password strength:
                    </span>
                    <span
                      className={`text-xs font-medium ${passwordStrength === 0
                          ? "text-gray-500 dark:text-gray-400"
                          : passwordStrength === 1
                            ? "text-red-500"
                            : passwordStrength === 2
                              ? "text-orange-500"
                              : passwordStrength === 3
                                ? "text-yellow-500"
                                : "text-green-500"
                        }`}
                    >
                      {getStrengthText()}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-500 ${getStrengthClass()}`}
                      style={{ width: `${passwordStrength * 25}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              <div
                className={`space-y-2 transition-all duration-300 ${activeInput === "confirmPassword" ? "scale-105" : ""
                  }`}
              >
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block">
                  <span className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                    Confirm Password
                  </span>
                </label>
                <Input
                  ref={confirmPasswordRef}
                  placeholder="Confirm your password"
                  type="password"
                  onFocus={() => setActiveInput("confirmPassword")}
                  onBlur={() => setActiveInput(null)}
                  onKeyDown={(e) => handleKeyPress(e, "confirmPassword")}
                  className={`transform transition-all ${activeInput === "confirmPassword"
                      ? "border-blue-500 ring-2 ring-blue-300"
                      : ""
                    }`}
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button
                  onClick={() => setFormStep(1)}
                  variant="secondary"
                  text="Back"
                  fullWidth={true}
                  className="py-3 text-lg font-semibold transition-all duration-300"
                />
                <Button
                  onClick={signup}
                  variant="primary"
                  text={loading ? "Creating Account..." : "Create Account"}
                  fullWidth={true}
                  loading={loading}
                  className="py-3 text-lg font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105"
                />
              </div>
            </>
          )}

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                Or sign up with
              </span>
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            <button className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
            </button>
            <button className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <button className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
              </svg>
            </button>
          </div>

          <div className="text-center mt-6 border-t border-gray-200 dark:border-gray-700 pt-6">
            <p className="text-gray-600 dark:text-gray-300">
              Already have an account?{" "}
              <Link
                to="/signin"
                className="text-blue-600 dark:text-blue-400 hover:underline font-medium transition-all hover:text-blue-800 dark:hover:text-blue-300"
              >
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
