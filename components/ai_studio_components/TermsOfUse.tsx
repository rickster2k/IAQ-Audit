
'use client'
import Link from 'next/link';



export default function TermsOfUse () {
  return (
    <div className="w-full max-w-4xl mx-auto fade-in p-8 bg-white rounded-3xl shadow-lg border border-slate-100 my-8 text-slate-700">
      <div className="mb-8 flex justify-between items-center border-b border-slate-100 pb-6">
        <h1 className="text-3xl font-bold text-[#1e3a5f]">Terms of Service</h1>
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
          <h2 className="text-xl font-bold text-[#1e3a5f] mb-2">TERMS OF SERVICE</h2>
          <p className="font-bold mb-2">Last Updated: [1/1/2026]</p>
          <p>
            Welcome to IAQ Network and IAQaudit.com (“we,” “us,” our,” or the “Company”). By accessing or using our website (the “IAQaudit.com” site and its applications therein), you agree to be bound by these Terms of Service (“Terms”). If you do not agree to these Terms, please do not use the Site.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-[#1e3a5f] mb-3">1. Use of Our Website & Applications</h3>
          <p className="mb-2">You agree to use this Site only for lawful purposes and in a way that does not infringe on the rights of others or restrict anyone else’s use of the Site.</p>
          <p className="mb-2">You may not:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Attempt to access secured portions of the Site without authorization</li>
            <li>Upload malicious software</li>
            <li>Interfere with the function or security of the Site</li>
            <li>Use the Site to engage in fraudulent or misleading behavior</li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-bold text-[#1e3a5f] mb-3">2. Intellectual Property</h3>
          <p>
            All content on this Site—including text, graphics, logos, images, designs, videos, and downloadable materials—is the property of IAQ Network or its licensors and is protected by copyright and trademark laws. You may not reproduce, distribute, modify, or sell any content without our written permission.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-[#1e3a5f] mb-3">3. Website Content & Accuracy</h3>
          <p>
            We strive to ensure the information on this Site is accurate and up to date. However, we do not guarantee the completeness, accuracy, or reliability of any content. The information on this Site is provided for general informational purposes only and should not be considered professional, legal, health, or environmental advice.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-[#1e3a5f] mb-3">4. Third-Party Links</h3>
          <p>
            Our Site may contain links to external websites. We are not responsible for the content, accuracy, or privacy practices of third-party websites.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-[#1e3a5f] mb-3">5. Limitation of Liability</h3>
          <p className="mb-2">To the fullest extent allowed by law:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>IAQ Network is not liable for any damages arising out of your use of the Site.</li>
            <li>This includes indirect, incidental, consequential, or punitive damages.</li>
          </ul>
          <p className="mt-2">Your use of the Site is at your own risk.</p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-[#1e3a5f] mb-3">6. Disclaimer of Warranties</h3>
          <p className="mb-2">The Site is provided “as is” and “as available,” without any warranties of any kind, express or implied. We do not guarantee:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>uninterrupted access</li>
            <li>error-free operation</li>
            <li>virus-free files or transmissions</li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-bold text-[#1e3a5f] mb-3">7. Indemnification</h3>
          <p className="mb-2">You agree to indemnify and hold IAQ Network harmless from any claims, damages, or losses arising from:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>your use of the Site</li>
            <li>your violation of these Terms</li>
            <li>your violation of rights of a third party</li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-bold text-[#1e3a5f] mb-3">8. Changes to These Terms</h3>
          <p>
            We may update these Terms at any time. The updated version will be posted on this page with a new “Last Updated” date. Continued use of the Site after changes means you accept the new Terms.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-[#1e3a5f] mb-3">9. Governing Law</h3>
          <p>
            These Terms are governed by the laws of the Commonwealth of Pennsylvania, without regard to conflict-of-law principles. Any disputes will be resolved in the appropriate courts located in Pennsylvania.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-[#1e3a5f] mb-3">10. How We Use Your Information</h3>
          <p className="mb-2">
            We DO NOT supply, sell, or otherwise make available your submitted IAQ Audit questionnaire information or contact information to third parties for any reason.
          </p>
          <p className="mb-2">We may use your information to:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Respond to inquiries</li>
            <li>Provide requested IAQ Audit Scores & Reports.</li>
            <li>Improve site functionality</li>
            <li>Communicate with you directly from our company via email regarding our latest services, special offers, and to distribute our periodic industry newsletters, until you request to opt out.</li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-bold text-[#1e3a5f] mb-3">11. Contact Information</h3>
          <p>For questions, comments, or requests regarding these Terms, contact us at:</p>
          <p className="font-bold mt-2">IAQ Network</p>
          <p><a href="mailto:support@iaqaudit.com" className="text-[#0d9488] hover:underline">support@iaqaudit.com</a></p>
          <p className="mt-4 text-sm text-slate-500">
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
