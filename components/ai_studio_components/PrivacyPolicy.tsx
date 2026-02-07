
import Link from 'next/link';
import React from 'react';


export default function PrivacyPolicy() {
  return (
    <div className="w-full max-w-4xl mx-auto fade-in p-8 bg-white rounded-3xl shadow-lg border border-slate-100 my-8 text-slate-700">
      <div className="mb-8 flex justify-between items-center border-b border-slate-100 pb-6">
        <h1 className="text-3xl font-bold text-[#1e3a5f]">Privacy Policy</h1>
        <Link href="/"
          className="text-slate-500 hover:text-[#1e3a5f] flex items-center gap-2 font-medium px-4 py-2 rounded-lg hover:bg-slate-50 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back
        </Link>
      </div>

      <div className="space-y-8 leading-relaxed">
        <div>
          <h2 className="text-xl font-bold text-[#1e3a5f] mb-2">Privacy Policy</h2>
          <p className="font-bold mb-2">Last Updated: 1/01/2026</p>
          <p>
            IAQ Network and IAQaudit.com (“we,” “us,” or “our”) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard the information you provide when you visit our website or submit information through our contact form.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-[#1e3a5f] mb-3">1. Information We Collect</h3>
          <p className="mb-2">We may collect the following information when you use our website:</p>
          
          <p className="font-semibold mt-4 mb-1">Information You Provide Directly</p>
          <ul className="list-disc pl-6 space-y-1 mb-4">
            <li>Name</li>
            <li>Email address</li>
            <li>Phone number</li>
            <li>Any message or details you voluntarily submit through our contact form</li>
          </ul>

          <p className="font-semibold mt-4 mb-1">Automatically Collected Information</p>
          <p>Our website may automatically collect basic technical information (such as IP address, browser type, and usage data) to help us improve site performance. This information does not identify you personally.</p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-[#1e3a5f] mb-3">2. How We Use Your Information</h3>
          <p className="mb-2">We may use the information you provide to:</p>
          <ul className="list-disc pl-6 space-y-1 mb-4">
            <li>To Create and Deliver your IAQ Audit Report</li>
            <li>Respond to your inquiries</li>
            <li>Provide customer support</li>
            <li>Send requested information about our services</li>
            <li>Promotional emails and newsletters from our Company</li>
            <li>Improve our website and user experience</li>
          </ul>
          <p>We do not use your submitted contact information for marketing without your consent.</p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-[#1e3a5f] mb-3">3. Information Sharing and Disclosure</h3>
          <p className="mb-4">We do not sell, rent, or share your personal information with any third parties.</p>
          <p className="mb-4">Any contact information submitted through our website’s contact form remains private and confidential. It is used solely for the purpose of communicating with you regarding your request and promotional offers we deliver directly to your inbox from our company.</p>
          <p>We may disclose information only if required to do so by law or to protect our legal rights.</p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-[#1e3a5f] mb-3">4. Data Security</h3>
          <p>
            We implement reasonable administrative, technical, and physical safeguards to protect the information you submit. However, no internet-based service can guarantee absolute security.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-[#1e3a5f] mb-3">5. Third-Party Links</h3>
          <p>
            Our website and email promotions may contain links to external websites and offers. We are not responsible for the privacy practices or content of those third-party sites.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-[#1e3a5f] mb-3">6. Children’s Privacy</h3>
          <p>
            Our website is not intended for children under 13, and we do not knowingly collect personal information from children.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-[#1e3a5f] mb-3">7. Your Rights and Choices</h3>
          <p className="mb-2">You may request that we:</p>
          <ul className="list-disc pl-6 space-y-1 mb-4">
            <li>Update your information</li>
            <li>Delete your information</li>
            <li>Stop contacting you</li>
          </ul>
          <p>To make a request, contact us using the information provided below, or the opt-out links included in our email messages.</p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-[#1e3a5f] mb-3">8. Changes to This Policy</h3>
          <p>
            We may update this Privacy Policy from time to time. Any changes will be posted on this page with the updated revision date.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-[#1e3a5f] mb-3">9. Contact Us</h3>
          <p>If you have questions about this Privacy Policy or would like to request changes to your information, you may contact us at:</p>
          <p className="mt-4"><a href="mailto:support@iaqaudit.com" className="text-[#0d9488] hover:underline font-bold">support@iaqaudit.com</a></p>
          <p className="mt-2 text-slate-500">
            IAQ Network LLC, 205 Applegate Road, Suite 100, Stroudsburg, PA 18360
          </p>
        </div>
      </div>
      
      <div className="mt-12 pt-8 border-t border-slate-100 flex justify-center">
        <Link
          href="/"
          className="bg-[#1e3a5f] hover:bg-[#2d5485] text-white font-bold py-3 px-8 rounded-xl shadow-md transition-all transform hover:-translate-y-1"
        >
          Back
        </Link>
      </div>
    </div>
  );
};
