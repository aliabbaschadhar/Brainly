import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { useRef, useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { Link, useNavigate } from "react-router-dom";
import { Welcome } from "../components/Welcome";

export function Signin() {
  const navigate = useNavigate();
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeInput, setActiveInput] = useState<string | null>(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // Focus the username input on component mount
  useEffect(() => {
    if (usernameRef.current) {
      usernameRef.current.focus();
    }
  }, []);

  async function signin() {
    if (!usernameRef.current?.value) {
      setActiveInput("username");
      setError("Please enter your username");
      setTimeout(() => setError(""), 3000);
      return;
    }

    if (!passwordRef.current?.value) {
      setActiveInput("password");
      setError("Please enter your password");
      setTimeout(() => setError(""), 3000);
      return;
    }

    try {
      setLoading(true);
      const username = usernameRef.current?.value;
      const password = passwordRef.current?.value;

      const response = await axios.post(BACKEND_URL + "/api/v1/user/signin", {
        username,
        password,
      });

      const jwt = response.data.token;
      localStorage.setItem("token", jwt);

      // Show success message before redirecting
      setShowSuccessMessage(true);

      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (err) {
      setError("Invalid username or password");
      setTimeout(() => setError(""), 3000);
    } finally {
      setLoading(false);
    }
  }

  // Handle Enter key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      signin();
    }
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

        {showSuccessMessage && (
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-500 text-white px-6 py-2 rounded-full shadow-lg text-sm font-medium animate-pulse">
            Login successful! Redirecting...
          </div>
        )}

        <h2 className="text-4xl font-bold text-center text-gray-800 dark:text-gray-100 mb-8 animate-fade-in-up">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-600">
            Welcome Back
          </span>
        </h2>

        <div className="space-y-6">
          <div className={`space-y-2 transition-all duration-300 ${activeInput === 'username' ? 'scale-105' : ''}`}>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block">
              <span className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Username
              </span>
            </label>
            <Input
              ref={usernameRef}
              placeholder="Enter your username"
              onFocus={() => setActiveInput('username')}
              onBlur={() => setActiveInput(null)}
              onKeyDown={handleKeyPress}
              className={`transform transition-all ${activeInput === 'username' ? 'border-blue-500 ring-2 ring-blue-300' : ''}`}
            />
          </div>

          <div className={`space-y-2 transition-all duration-300 ${activeInput === 'password' ? 'scale-105' : ''}`}>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block">
              <span className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Password
              </span>
            </label>
            <Input
              ref={passwordRef}
              placeholder="Enter your password"
              type="password"
              onFocus={() => setActiveInput('password')}
              onBlur={() => setActiveInput(null)}
              onKeyDown={handleKeyPress}
              className={`transform transition-all ${activeInput === 'password' ? 'border-blue-500 ring-2 ring-blue-300' : ''}`}
            />
            <div className="flex justify-end">
              <button className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors">
                Forgot password?
              </button>
            </div>
          </div>

          <div className="pt-4">
            <Button
              onClick={signin}
              variant="primary"
              text={loading ? "Logging in..." : "Log In"}
              fullWidth={true}
              loading={loading}
              className="py-3 text-lg font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105 group"
            />
          </div>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">Or continue with</span>
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            <button className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
            </button>
            <button className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
              </svg>
            </button>
            <button className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
              </svg>
            </button>
          </div>

          <div className="text-center mt-6 border-t border-gray-200 dark:border-gray-700 pt-6">
            <p className="text-gray-600 dark:text-gray-300">
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-600 dark:text-blue-400 hover:underline font-medium transition-all hover:text-blue-800 dark:hover:text-blue-300">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
