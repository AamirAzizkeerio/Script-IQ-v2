/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { PageView } from '../types';
import { Sparkles, ArrowLeft, Home } from 'lucide-react';

interface NotFoundProps {
  onNavigate: (view: PageView) => void;
}

export default function NotFoundView({ onNavigate }: NotFoundProps) {
  return (
    <div id="not-found-page" className="min-h-screen bg-white flex flex-col justify-center items-center p-6 text-center">
      
      {/* Brand Icon */}
      <div className="bg-[#4F46E5]/10 text-[#4F46E5] p-3 rounded-2xl mb-6">
        <Sparkles className="w-8 h-8" />
      </div>

      {/* Hero 404 Texts */}
      <h1 className="font-sans text-7xl font-extrabold text-black tracking-tight mb-2">
        404
      </h1>
      
      <h2 className="font-sans text-xl sm:text-2xl font-bold text-gray-900 mb-4">
        Page Not Found
      </h2>

      <p className="font-sans text-sm text-gray-500 max-w-md mb-8 leading-relaxed">
        The link you followed may be broken, or the page may have been removed. Don’t worry, you can easily find your way back.
      </p>

      {/* Back to Safety actions */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <button
          onClick={() => onNavigate('home')}
          className="w-full sm:w-auto font-sans font-semibold text-sm flex items-center justify-center gap-2 px-5 py-3 text-white bg-[#4F46E5] hover:bg-[#4338CA] rounded-xl cursor-pointer transition-colors shadow-xs"
        >
          <Home className="w-4 h-4" />
          Back to Home
        </button>
        <button
          onClick={() => window.history.back()}
          className="w-full sm:w-auto font-sans font-semibold text-sm flex items-center justify-center gap-2 px-5 py-3 text-gray-700 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl cursor-pointer transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Go Back
        </button>
      </div>

    </div>
  );
}
