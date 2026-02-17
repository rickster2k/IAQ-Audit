import React, { useState } from 'react';
import { ContactInfo } from '@/lib/types';

interface ContactFormProps {
  onSubmit: (info: ContactInfo) => void;
  isAnalyzing?: boolean;
  onShowTerms?: () => void;
  onShowPrivacy?: () => void;
}

const COUNTRIES = [
    "United States",
    "---",
    "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan",
    "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi",
    "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo (Congo-Brazzaville)", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czechia (Czech Republic)",
    "Democratic Republic of the Congo", "Denmark", "Djibouti", "Dominica", "Dominican Republic",
    "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini (fmr. 'Swaziland')", "Ethiopia",
    "Fiji", "Finland", "France",
    "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana",
    "Haiti", "Holy See", "Honduras", "Hungary",
    "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy",
    "Jamaica", "Japan", "Jordan",
    "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan",
    "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg",
    "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar (formerly Burma)",
    "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia", "Norway",
    "Oman",
    "Pakistan", "Palau", "Palestine State", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal",
    "Qatar",
    "Romania", "Russia", "Rwanda",
    "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria",
    "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu",
    "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan",
    "Vanuatu", "Venezuela", "Vietnam",
    "Yemen",
    "Zambia", "Zimbabwe"
];

export default function ContactForm ({ onSubmit, isAnalyzing, onShowTerms, onShowPrivacy }: ContactFormProps)  {
  const [formData, setFormData] = useState<ContactInfo>({
    firstName: '',
    lastName: '',
    email: '',
    zipCode: '',
    country: 'United States'
  });
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [emailError, setEmailError] = useState('');

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError('');

    if (!validateEmail(formData.email)) {
      setEmailError('Please enter a valid email address.');
      const emailInput = document.getElementById('email-input');
      emailInput?.focus();
      return;
    }

    const normalizedFirstName:string = formData.firstName.trim().toLowerCase()
    const normalizedLastName:string = formData.lastName.trim().toLowerCase()
    const normFormData = ({
      ...formData,
      firstName: normalizedFirstName,
      lastName: normalizedLastName,
    })
    setFormData(normFormData);

    if (formData.firstName && formData.lastName && formData.email && formData.zipCode && formData.country !== '---' && agreedToTerms) {
      onSubmit(normFormData);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto fade-in bg-white p-8 rounded-2xl shadow-lg border border-slate-100">
      <h2 className="text-2xl font-bold text-[#1e3a5f] mb-6 text-center">
        Your Audit is Ready!
      </h2>
      <p className="text-slate-600 mb-6 text-center text-sm">
        Please enter your contact details so we can generate your Indoor Air Quality Audit score & report and email a copy of it to you.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-4">
          <div className="w-1/2">
            <label className="block text-sm font-medium text-slate-700 mb-1">First Name</label>
            <input
              type="text"
              required
              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#0d9488] focus:border-transparent outline-none transition-all"
              placeholder="Jane"
              value={formData.firstName}
              onChange={(e) => setFormData({...formData, firstName: e.target.value})}
              disabled={isAnalyzing}
            />
          </div>
          <div className="w-1/2">
            <label className="block text-sm font-medium text-slate-700 mb-1">Last Name</label>
            <input
              type="text"
              required
              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#0d9488] focus:border-transparent outline-none transition-all"
              placeholder="Doe"
              value={formData.lastName}
              onChange={(e) => setFormData({...formData, lastName: e.target.value})}
              disabled={isAnalyzing}
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
          <input
            id="email-input"
            type="email"
            required
            className={`w-full px-4 py-3 rounded-lg border ${emailError ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-300'} focus:ring-2 focus:ring-[#0d9488] focus:border-transparent outline-none transition-all`}
            placeholder="jane.doe@example.com"
            value={formData.email}
            onChange={(e) => {
              setFormData({...formData, email: e.target.value});
              if (emailError) setEmailError('');
            }}
            disabled={isAnalyzing}
          />
          {emailError && (
            <p className="text-red-500 text-xs mt-1 font-medium">{emailError}</p>
          )}
        </div>

        <div className="flex gap-4">
            <div className="w-1/2">
                <label className="block text-sm font-medium text-slate-700 mb-1">Country</label>
                <select
                    required
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#0d9488] focus:border-transparent outline-none transition-all bg-white"
                    value={formData.country}
                    onChange={(e) => setFormData({...formData, country: e.target.value})}
                    disabled={isAnalyzing}
                >
                    {COUNTRIES.map((c, i) => (
                        <option key={i} value={c} disabled={c === '---'}>{c}</option>
                    ))}
                </select>
            </div>
            <div className="w-1/2">
                <label className="block text-sm font-medium text-slate-700 mb-1">Zip Code</label>
                <input
                    type="text"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#0d9488] focus:border-transparent outline-none transition-all"
                    placeholder="12345"
                    value={formData.zipCode}
                    onChange={(e) => setFormData({...formData, zipCode: e.target.value})}
                    disabled={isAnalyzing}
                />
            </div>
        </div>

        <div className="flex items-start gap-3 mt-4">
            <input 
              type="checkbox" 
              id="terms" 
              checked={agreedToTerms} 
              onChange={(e) => setAgreedToTerms(e.target.checked)}
              disabled={isAnalyzing}
              className="mt-1 h-4 w-4 text-[#0d9488] focus:ring-[#0d9488] border-gray-300 rounded cursor-pointer"
            />
            <label htmlFor="terms" className="text-sm text-slate-600 cursor-pointer select-none">
              I have read and understand the <a href="?page=terms" target="_blank" className="text-[#0d9488] hover:underline font-semibold" rel="noopener noreferrer">Terms of Service</a> statement.
            </label>
        </div>

        <button
          type="submit"
          disabled={isAnalyzing || !agreedToTerms}
          className="w-full mt-2 bg-[#0d9488] hover:bg-teal-700 text-white font-bold py-4 rounded-xl shadow-lg transform transition hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {isAnalyzing ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating Report...
            </span>
          ) : (
            "See My Results"
          )}
        </button>
      </form>
      
      <div className="mt-6 text-center text-xs text-slate-500 leading-relaxed px-2">
        This IAQ Audit service is provided by IAQ.network for general educational purposes only, and is not to be taken as a professional evaluation of the specific conditions of the Assessment taker's IAQ. Please also see our <a href="?page=privacy" target="_blank" className="text-[#0d9488] hover:underline" rel="noopener noreferrer">Privacy Policy</a>.
      </div>

      {isAnalyzing && (
        <div className="mt-4 text-center">
            <p className="text-sm text-slate-500 animate-pulse">Analyzing audit data and mold risks...</p>
        </div>
      )}
    </div>
  );
};