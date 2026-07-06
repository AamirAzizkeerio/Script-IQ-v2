/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { PageView } from '../types';
import { ArrowLeft, Shield, FileText, CheckCircle, HelpCircle } from 'lucide-react';

interface LegalProps {
  onNavigate: (view: PageView) => void;
}

export function PrivacyView({ onNavigate }: LegalProps) {
  return (
    <div id="privacy-page" className="bg-white min-h-screen pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        
        {/* Back navigation */}
        <button
          onClick={() => onNavigate('home')}
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#4F46E5] hover:text-[#4338CA] mb-8 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </button>

        {/* Title */}
        <div className="space-y-4 pb-8 border-b border-gray-100">
          <div className="bg-[#4F46E5]/10 text-[#4F46E5] w-12 h-12 rounded-xl flex items-center justify-center">
            <Shield className="w-6 h-6" />
          </div>
          <h1 className="font-sans text-3xl sm:text-4xl font-extrabold text-black tracking-tight">
            Privacy Policy
          </h1>
          <p className="font-sans text-sm text-gray-500">
            Last Updated: June 26, 2026
          </p>
        </div>

        {/* Content body */}
        <div className="py-8 space-y-6 font-sans text-sm text-gray-600 leading-relaxed">
          <p>
            At <strong>ScriptIQ</strong>, we respect your privacy and are committed to protecting any personal data we process. This Privacy Policy describes how we collect, use, and share information in connection with our web application.
          </p>

          <h3 className="font-sans font-bold text-lg text-black pt-4">1. Information We Collect</h3>
          <p>
            Because ScriptIQ is currently a frontend-only demonstration app, we do not store any of your personal details, email addresses, or generated scripts on external database servers. Any data you enter (including your emails, project topics, and customized scripts) is saved entirely within your own local browser storage (such as state memory or localStorage).
          </p>

          <h3 className="font-sans font-bold text-lg text-black pt-4">2. Cookies and Browser Storage</h3>
          <p>
            We use standard browser-level session storage or localStorage mechanisms to keep track of your active workspace projects and current view states. This data never leaves your computer and is not transmitted to our servers or any third parties.
          </p>

          <h3 className="font-sans font-bold text-lg text-black pt-4">3. Future Third-Party Integrations</h3>
          <p>
            Please note that as ScriptIQ scales, we may introduce secure authentication systems (such as Supabase Auth) and AI processing pipelines (such as OpenAI or Google Gemini). Once integrated, those platforms will handle personal credentials and script inquiries in accordance with their own respective privacy rules.
          </p>

          <h3 className="font-sans font-bold text-lg text-black pt-4">4. Your Rights</h3>
          <p>
            Since all your data resides in your own local web browser, you have absolute control over it. You can clear your browser cookies, cache, or site preferences at any time to delete all projects and email variables stored inside this workspace.
          </p>
        </div>

      </div>
    </div>
  );
}

export function TermsView({ onNavigate }: LegalProps) {
  return (
    <div id="terms-page" className="bg-white min-h-screen pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        
        {/* Back navigation */}
        <button
          onClick={() => onNavigate('home')}
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#4F46E5] hover:text-[#4338CA] mb-8 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </button>

        {/* Title */}
        <div className="space-y-4 pb-8 border-b border-gray-100">
          <div className="bg-[#4F46E5]/10 text-[#4F46E5] w-12 h-12 rounded-xl flex items-center justify-center">
            <FileText className="w-6 h-6" />
          </div>
          <h1 className="font-sans text-3xl sm:text-4xl font-extrabold text-black tracking-tight">
            Terms of Service
          </h1>
          <p className="font-sans text-sm text-gray-500">
            Last Updated: June 26, 2026
          </p>
        </div>

        {/* Content body */}
        <div className="py-8 space-y-6 font-sans text-sm text-gray-600 leading-relaxed">
          <p>
            Welcome to <strong>ScriptIQ</strong>. By accessing our web application, you agree to comply with and be bound by the following terms and conditions.
          </p>

          <h3 className="font-sans font-bold text-lg text-black pt-4">1. Use of the Service</h3>
          <p>
            ScriptIQ is provided "as is" and "as available" for educational, prototyping, and creator workflows. Because it operates entirely client-side, we make no guarantees about data preservation. It is your responsibility to copy and safeguard your generated scripts outside this browser window.
          </p>

          <h3 className="font-sans font-bold text-lg text-black pt-4">2. Intellectual Property</h3>
          <p>
            All scripts, titles, descriptions, and tag sets generated by the AI engine inside this workspace are fully yours to use, modify, publish, and monetize on your YouTube channels. We claim no ownership over your creative output.
          </p>

          <h3 className="font-sans font-bold text-lg text-black pt-4">3. Prohibited Content</h3>
          <p>
            You agree not to use our script tools to generate bulk spam, malicious misinformation, hate speech, or content violating YouTube’s Community Guidelines. ScriptIQ reserves the right to restrict sandbox features if malicious activity is detected.
          </p>

          <h3 className="font-sans font-bold text-lg text-black pt-4">4. Modifications of Terms</h3>
          <p>
            We reserve the right to modify these Terms of Service at any time. Your continued use of the application following any updates constitutes acceptance of the new terms.
          </p>
        </div>

      </div>
    </div>
  );
}

export function RefundView({ onNavigate }: LegalProps) {
  return (
    <div id="refund-page" className="bg-white min-h-screen pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        
        {/* Back navigation */}
        <button
          onClick={() => onNavigate('home')}
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#4F46E5] hover:text-[#4338CA] mb-8 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </button>

        {/* Title */}
        <div className="space-y-4 pb-8 border-b border-gray-100">
          <div className="bg-[#4F46E5]/10 text-[#4F46E5] w-12 h-12 rounded-xl flex items-center justify-center">
            <CheckCircle className="w-6 h-6" />
          </div>
          <h1 className="font-sans text-3xl sm:text-4xl font-extrabold text-black tracking-tight">
            Refund Policy
          </h1>
          <p className="font-sans text-sm text-gray-500">
            Last Updated: June 26, 2026
          </p>
        </div>

        {/* Content body */}
        <div className="py-8 space-y-6 font-sans text-sm text-gray-600 leading-relaxed">
          <p>
            At <strong>ScriptIQ</strong>, we strive to build tools that help creators generate stellar scripts. Please read our refund parameters below.
          </p>

          <h3 className="font-sans font-bold text-lg text-black pt-4">1. Free Tier Structure</h3>
          <p>
            Since ScriptIQ is a frontend-only platform that is completely free to use with no billing forms, checkout rails, or credit card input fields, <strong>there are no fees, and refunds are not applicable</strong>. You cannot purchase credits or buy plans on this site.
          </p>

          <h3 className="font-sans font-bold text-lg text-black pt-4">2. Future Billing Plans</h3>
          <p>
            In the future, when we integrate payment solutions (such as Stripe) and premium pricing tiers, we will outline clear refunds timelines (e.g., 14-day money-back guarantee for unused credits) inside this document.
          </p>

          <h3 className="font-sans font-bold text-lg text-black pt-4">3. Feedback and Support</h3>
          <p>
            If you have any questions or feedback regarding our platform features, please reach out to us via the <strong>Contact Support</strong> form in the page footer. We are always happy to help improve your experience!
          </p>
        </div>

      </div>
    </div>
  );
}
