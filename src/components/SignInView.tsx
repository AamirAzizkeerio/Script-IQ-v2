/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { PageView } from '../types';
import { Sparkles, ArrowRight, Mail, Lock, Loader2, Eye, EyeOff } from 'lucide-react';
import { useAuth } from './AuthContext';

interface SignInViewProps {
  onNavigate: (view: PageView) => void;
  onSetUserEmail: (email: string) => void;
  density?: 'compact' | 'comfortable';
  onSetDensity?: (density: 'compact' | 'comfortable') => void;
  redirectMessage?: string | null;
}

export default function SignInView({ onNavigate, onSetUserEmail, density = 'comfortable', onSetDensity, redirectMessage }: SignInViewProps) {
  const isCompact = density === 'compact';
  const { signIn, signUp, signInWithGoogle, resetPassword } = useAuth();

  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const getFriendlyErrorMessage = (error: any, isSignUpMode: boolean) => {
    if (!error || !error.message) return isSignUpMode ? 'Failed to create account.' : 'Incorrect email or password.';
    const msg = error.message.toLowerCase();
    const code = error.code || '';
    
    if (msg.includes('operation-not-allowed') || code.includes('operation-not-allowed')) {
      return 'Email and Password sign-in is not enabled in Firebase Authentication. Please go to your Firebase Console > Authentication > Sign-in method, click "Add new provider", select "Email/Password", and enable it to activate email login.';
    }
    if (msg.includes('email-already-in-use') || code.includes('email-already-in-use')) {
      return 'This email address is already registered. Please sign in instead or use another email.';
    }
    if (msg.includes('weak-password') || code.includes('weak-password')) {
      return 'Weak password! Firebase requires passwords to be at least 6 characters long.';
    }
    if (msg.includes('invalid-email') || code.includes('invalid-email')) {
      return 'Please enter a valid email address.';
    }
    if (msg.includes('user-not-found') || code.includes('user-not-found')) {
      return 'No account matches this email. Please check the spelling or sign up first.';
    }
    if (msg.includes('wrong-password') || code.includes('wrong-password') || msg.includes('invalid-credential') || code.includes('invalid-credential')) {
      return 'Incorrect email or password. Please double-check your credentials and try again.';
    }
    if (msg.includes('too-many-requests') || code.includes('too-many-requests')) {
      return 'Too many failed login attempts. This account has been temporarily locked. Please try again later or reset your password.';
    }
    return error.message;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setErrorMsg('Please enter your email address.');
      return;
    }
    if (!password) {
      setErrorMsg('Please enter your password.');
      return;
    }
    setErrorMsg('');
    setSuccessMsg('');
    setIsLoading(true);

    try {
      if (isSignUp) {
        await signUp(email, password);
        onSetUserEmail(email);
        onNavigate('dashboard');
      } else {
        await signIn(email, password);
        onSetUserEmail(email);
        onNavigate('dashboard');
      }
    } catch (err: any) {
      console.error("Auth submit error:", err);
      setErrorMsg(getFriendlyErrorMessage(err, isSignUp));
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setErrorMsg('');
    setSuccessMsg('');
    setIsLoading(true);
    try {
      await signInWithGoogle();
      onNavigate('dashboard');
    } catch (err: any) {
      console.error("Google auth error:", err);
      setErrorMsg(getFriendlyErrorMessage(err, false));
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setErrorMsg('Please enter your email address in the field above to reset your password.');
      return;
    }
    setErrorMsg('');
    setSuccessMsg('');
    setIsLoading(true);
    try {
      await resetPassword(email);
      setSuccessMsg('Password reset link has been successfully sent to your email.');
    } catch (err: any) {
      console.error("Reset password error:", err);
      setErrorMsg(getFriendlyErrorMessage(err, false));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div id="signin-view" className={`min-h-screen bg-white flex flex-col justify-center transition-all duration-150 ${isCompact ? 'py-6 sm:px-6 lg:px-8' : 'py-12 sm:px-6 lg:px-8'}`}>
      
      {/* Brand Header */}
      <div className={`sm:mx-auto sm:w-full sm:max-w-md text-center ${isCompact ? 'space-y-2' : 'space-y-4'}`}>
        <button
          onClick={() => onNavigate('home')}
          className="inline-flex items-center gap-2 mx-auto cursor-pointer focus:outline-none"
        >
          <div className="bg-[#4F46E5] text-white p-1 rounded-md">
            <Sparkles className="w-4 h-4" />
          </div>
          <span className="font-sans text-lg font-bold tracking-tight text-black">
            Script<span className="text-[#4F46E5]">IQ</span>
          </span>
        </button>
        
        <div>
          <h1 className={`font-sans font-bold text-black tracking-tight ${isCompact ? 'text-lg sm:text-xl' : 'text-2xl sm:text-3xl font-extrabold'}`}>
            {isSignUp ? 'Create your Creator Account' : 'Sign in to your account'}
          </h1>
          <p className="font-sans text-xs text-gray-500 mt-1">
            Free workspace access. No credit card required.
          </p>
        </div>
      </div>

      {/* Main card */}
      <div className={`sm:mx-auto sm:w-full sm:max-w-md ${isCompact ? 'mt-4' : 'mt-8'}`}>
        <div className={`bg-white border border-gray-200 transition-all ${
          isCompact ? 'py-5 px-4 rounded-md shadow-2xs sm:px-6' : 'py-8 px-4 border-gray-200/80 rounded-2xl shadow-lg sm:px-10'
        }`}>
          
          <form className={isCompact ? 'space-y-4' : 'space-y-6'} onSubmit={handleSubmit}>
            {redirectMessage && (
              <div className="p-3 bg-indigo-50/50 border border-indigo-100 text-[#4F46E5] rounded-xl text-xs flex items-start gap-2 leading-relaxed">
                <span className="text-sm">🔒</span>
                <span className="font-sans font-medium">{redirectMessage}</span>
              </div>
            )}

            {errorMsg && (
              <div className="p-2.5 bg-red-50 text-red-600 rounded-md text-[11px] font-medium border border-red-100">
                {errorMsg}
              </div>
            )}

            {successMsg && (
              <div className="p-2.5 bg-green-50 text-green-700 rounded-md text-[11px] font-medium border border-green-100">
                {successMsg}
              </div>
            )}

            {/* Email Field */}
            <div>
              <label htmlFor="signin-email" className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                Email address
              </label>
              <div className="relative">
                <div className={`absolute inset-y-0 left-0 flex items-center pointer-events-none ${isCompact ? 'pl-3' : 'pl-3.5'}`}>
                  <Mail className={`${isCompact ? 'h-3.5 w-3.5' : 'h-4.5 w-4.5'} text-gray-400`} />
                </div>
                <input
                  id="signin-email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className={`w-full font-sans bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#4F46E5] focus:bg-white focus:border-transparent transition-all ${
                    isCompact ? 'text-xs pl-8.5 pr-3 py-1.5 rounded-md' : 'text-sm pl-11 pr-4 py-3 rounded-xl focus:ring-2'
                  }`}
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="signin-password" className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                Password
              </label>
              <div className="relative">
                <div className={`absolute inset-y-0 left-0 flex items-center pointer-events-none ${isCompact ? 'pl-3' : 'pl-3.5'}`}>
                  <Lock className={`${isCompact ? 'h-3.5 w-3.5' : 'h-4.5 w-4.5'} text-gray-400`} />
                </div>
                <input
                  id="signin-password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className={`w-full font-sans bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#4F46E5] focus:bg-white focus:border-transparent transition-all ${
                    isCompact ? 'text-xs pl-8.5 pr-10 py-1.5 rounded-md' : 'text-sm pl-11 pr-12 py-3 rounded-xl focus:ring-2'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute inset-y-0 right-0 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none cursor-pointer ${isCompact ? 'pr-3' : 'pr-3.5'}`}
                >
                  {showPassword ? (
                    <EyeOff className={isCompact ? 'h-3.5 w-3.5' : 'h-4.5 w-4.5'} />
                  ) : (
                    <Eye className={isCompact ? 'h-3.5 w-3.5' : 'h-4.5 w-4.5'} />
                  )}
                </button>
              </div>
              
              {!isSignUp && (
                <div className="flex items-center justify-end mt-1.5">
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    className="text-[10px] text-[#4F46E5] hover:underline cursor-pointer bg-transparent border-none p-0 focus:outline-none"
                  >
                    Forgot your password?
                  </button>
                </div>
              )}
            </div>

            {/* Submit CTA button */}
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full font-sans font-bold flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50 transition-colors shadow-2xs text-white bg-[#4F46E5] hover:bg-[#4338CA] ${
                  isCompact ? 'px-4 py-2 text-xs rounded-md' : 'px-6 py-3 text-sm rounded-xl'
                }`}
              >
                {isLoading ? (
                  <>
                    <Loader2 className={`${isCompact ? 'w-3.5 h-3.5' : 'w-4 h-4'} animate-spin text-white`} />
                    {isSignUp ? 'Creating Account...' : 'Signing In...'}
                  </>
                ) : (
                  <>
                    {isSignUp ? 'Sign Up' : 'Sign In'}
                    <ArrowRight className={`${isCompact ? 'w-3.5 h-3.5' : 'w-4 h-4'} text-white`} />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Social provider dividers */}
          <div className={isCompact ? 'mt-4' : 'mt-6'}>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-100" />
              </div>
              <div className="relative flex justify-center text-[10px] uppercase">
                <span className="bg-white px-2.5 text-gray-400 font-medium">Or continue with</span>
              </div>
            </div>

            <div className={isCompact ? 'mt-4' : 'mt-6'}>
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={isLoading}
                className={`w-full font-sans border border-gray-200 text-gray-700 hover:text-black hover:bg-gray-50 transition-all cursor-pointer flex items-center justify-center gap-1.5 disabled:opacity-50 ${
                  isCompact ? 'px-3 py-1.5 text-xs rounded-md' : 'px-4 py-2.5 rounded-xl font-semibold'
                }`}
              >
                <svg className={`${isCompact ? 'w-3.5 h-3.5' : 'w-4 h-4'} mr-1`} viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v3.9h6.6c-.28 1.5-1.11 2.76-2.39 3.62v3h3.86c2.26-2.09 3.58-5.16 3.58-8.45z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 24c3.24 0 5.97-1.08 7.96-2.91l-3.86-3c-1.08.72-2.45 1.16-4.1 1.16-3.15 0-5.81-2.13-6.76-5.01H1.36v3.1C3.33 21.29 7.39 24 12 24z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.24 14.25c-.25-.72-.39-1.5-.39-2.3s.14-1.58.39-2.3V6.55H1.36C.49 8.24 0 10.07 0 12s.49 3.76 1.36 5.45l3.88-3.2z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.39 0 3.33 2.71 1.36 6.55l3.88 3.2c.95-2.88 3.61-5 6.76-5z"
                  />
                </svg>
                Google Creator Login
              </button>
            </div>
          </div>

          {/* Toggle between Sign In / Sign Up */}
          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={() => {
                setIsSignUp(!isSignUp);
                setErrorMsg('');
                setSuccessMsg('');
              }}
              className="text-xs text-[#4F46E5] hover:underline cursor-pointer font-medium"
            >
              {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
            </button>
          </div>

          <div className={`text-center text-[11px] text-gray-400 ${isCompact ? 'mt-4' : 'mt-6'}`}>
            By signing in, you agree to our{' '}
            <button onClick={() => onNavigate('terms')} className="text-[#4F46E5] hover:underline cursor-pointer bg-transparent border-none p-0">
              Terms of Service
            </button>{' '}
            and{' '}
            <button onClick={() => onNavigate('privacy')} className="text-[#4F46E5] hover:underline cursor-pointer bg-transparent border-none p-0">
              Privacy Policy
            </button>
            .
          </div>

          {onSetDensity && (
            <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-center gap-3">
              <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">Layout Density:</span>
              <div className="inline-flex rounded-md bg-gray-100 p-0.5">
                <button
                  type="button"
                  onClick={() => onSetDensity('comfortable')}
                  className={`text-[10px] font-medium px-2 py-1 rounded-sm transition-all cursor-pointer ${
                    !isCompact ? 'bg-white text-black shadow-xs' : 'text-gray-500 hover:text-black'
                  }`}
                >
                  Comfortable
                </button>
                <button
                  type="button"
                  onClick={() => onSetDensity('compact')}
                  className={`text-[10px] font-medium px-2 py-1 rounded-sm transition-all cursor-pointer ${
                    isCompact ? 'bg-white text-black shadow-xs' : 'text-gray-500 hover:text-black'
                  }`}
                >
                  High Density
                </button>
              </div>
            </div>
          )}

        </div>
      </div>

    </div>
  );
}
