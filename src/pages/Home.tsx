import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircleIcon, FileTextIcon, UserIcon, ClipboardCheckIcon, Users2Icon, HeartHandshakeIcon } from 'lucide-react';
const Home: React.FC = () => {
  return <div className="w-full">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-800 to-green-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Delta State Certificate of Origin Portal
              </h1>
              <p className="text-xl mb-8">
                Apply for your Local Government and State of Origin Certificates
                online with ease.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/register" className="bg-white text-green-800 px-6 py-3 rounded-lg font-semibold hover:bg-green-100 text-center">
                  Register Now
                </Link>
                <Link to="/login" className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 text-center">
                  Login
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Delta_State_Logo.png/640px-Delta_State_Logo.png" alt="Delta State Logo" className="mx-auto w-2/3 max-w-md" />
            </div>
          </div>
        </div>
      </section>
      {/* Steps Section (Fixed) */}
      <section className="py-16 bg-gradient-to-br from-white to-green-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">How It Works</h2>
          <div className="flex flex-col md:flex-row gap-8 justify-center items-stretch">
            {[
              {
                icon: <UserIcon size={36} className="text-green-700" />,
                title: 'Create Account',
                desc: 'Register with your details to start your application.',
                color: 'from-green-100 to-green-50'
              },
              {
                icon: <FileTextIcon size={36} className="text-blue-700" />,
                title: 'Fill Application',
                desc: 'Complete the online application form and upload documents.',
                color: 'from-blue-100 to-blue-50'
              },
              {
                icon: <ClipboardCheckIcon size={36} className="text-yellow-700" />,
                title: 'Verification',
                desc: 'Your application and documents are reviewed by officials.',
                color: 'from-yellow-100 to-yellow-50'
              },
              {
                icon: <CheckCircleIcon size={36} className="text-purple-700" />,
                title: 'Get Certificate',
                desc: 'Receive your digital certificate after verification.',
                color: 'from-purple-100 to-purple-50'
              }
            ].map((step, idx) => (
              <div key={idx} className={`relative z-10 flex-1 flex flex-col items-center text-center group animate-fadeInUp`} style={{animationDelay: `${idx * 0.1 + 0.1}s`}}>
                {/* Step card with gradient background and more effects */}
                <div tabIndex={0} className={`step-card-effect w-40 h-56 bg-gradient-to-b ${step.color} rounded-3xl shadow-lg flex flex-col items-center justify-center mb-4 border-2 border-white group-hover:scale-105 transition-transform duration-300 focus:ring-2 focus:ring-green-400`}>
                  <div className="flex items-center justify-center mb-2">
                    <div className="bg-white text-green-700 w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold shadow border-2 border-green-200">
                      {idx + 1}
                    </div>
                  </div>
                  <div className="w-14 h-14 flex items-center justify-center mx-auto mb-2">
                    {step.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-1">{step.title}</h3>
                  <p className="text-gray-600 text-sm px-2">{step.desc}</p>
                </div>
                {/* Arrow connector for desktop */}
                {idx < 3 && (
                  <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                    <svg width="48" height="24" viewBox="0 0 48 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2 12C10 12 38 12 46 12M46 12L40 6M46 12L40 18" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Minor Application Section (Super Enhanced) */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-white relative overflow-hidden">
        <style>{`
          @keyframes fadeInUp {
            0% { opacity: 0; transform: translateY(40px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeInUp {
            animation: fadeInUp 0.7s cubic-bezier(0.23, 1, 0.32, 1) both;
          }
          .floating-card {
            box-shadow: 0 8px 32px 0 rgba(34,197,94,0.18), 0 3px 16px 0 rgba(34,197,94,0.18);
            transition: transform 0.3s, box-shadow 0.3s;
          }
          .floating-card:hover {
            transform: translateY(-8px) scale(1.03) rotate(-1deg);
            box-shadow: 0 16px 48px 0 rgba(34,197,94,0.22), 0 6px 24px 0 rgba(34,197,94,0.22);
          }
          .timeline {
            position: relative;
            margin-left: 1.5rem;
          }
          .timeline:before {
            content: '';
            position: absolute;
            left: 16px;
            top: 0;
            bottom: 0;
            width: 4px;
            background: linear-gradient(to bottom, #22c55e 0%, #bef264 100%);
            border-radius: 2px;
            opacity: 0.2;
          }
        `}</style>
        <div className="absolute top-0 left-0 w-40 h-40 bg-green-100 rounded-full opacity-30 blur-2xl -z-10" style={{top: '-60px', left: '-60px'}}></div>
        <div className="absolute bottom-0 right-0 w-60 h-60 bg-green-200 rounded-full opacity-20 blur-2xl -z-10" style={{bottom: '-80px', right: '-80px'}}></div>
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-12 items-center">
            {/* Info Card with floating effect */}
            <div className="md:w-1/2 w-full animate-fadeInUp floating-card bg-white/90 rounded-3xl shadow-2xl p-10 relative z-10">
              <div className="flex items-center mb-4">
                <div className="bg-green-100 p-3 inline-block rounded-full mr-3 animate-bounce">
                  <Users2Icon size={36} className="text-green-600" />
                </div>
                <span className="bg-yellow-200 text-yellow-800 text-xs font-semibold px-3 py-1 rounded-full ml-2 animate-pulse shadow">No NIN Required</span>
              </div>
              <h2 className="text-3xl font-bold mb-4 text-green-900">
                Certificate Applications for Minors
              </h2>
              <p className="text-gray-700 mb-8 text-base">
                Now, parents or legal guardians can easily apply for certificates on behalf of minors (under 18 years) without the need for a NIN. The process is simple, secure, and designed for families.
              </p>
              {/* Timeline Stepper */}
              <div className="timeline space-y-8">
                <div className="flex items-start animate-fadeInUp" style={{animationDelay: '0.1s'}}>
                  <div className="bg-green-100 p-2 rounded-full mr-4 mt-1 shadow animate-pulse">
                    <HeartHandshakeIcon size={24} className="text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Guardian Authorization</h4>
                    <p className="text-gray-600 text-sm">Parents or legal guardians can provide authorization documents instead of NIN.</p>
                  </div>
                </div>
                <div className="flex items-start animate-fadeInUp" style={{animationDelay: '0.2s'}}>
                  <div className="bg-blue-100 p-2 rounded-full mr-4 mt-1 shadow animate-bounce">
                    <ClipboardCheckIcon size={24} className="text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Required Documents</h4>
                    <p className="text-gray-600 text-sm">Birth certificate, guardian's ID, and authorization letter (if guardian is not a parent).</p>
                  </div>
                </div>
                <div className="flex items-start animate-fadeInUp" style={{animationDelay: '0.3s'}}>
                  <div className="bg-purple-100 p-2 rounded-full mr-4 mt-1 shadow animate-bounce">
                    <CheckCircleIcon size={24} className="text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Simple Process</h4>
                    <p className="text-gray-600 text-sm">Our streamlined application process makes it easy for guardians to apply on behalf of minors.</p>
                  </div>
                </div>
                <div className="flex items-start animate-fadeInUp" style={{animationDelay: '0.4s'}}>
                  <div className="bg-yellow-100 p-2 rounded-full mr-4 mt-1 shadow animate-bounce">
                    <CheckCircleIcon size={24} className="text-yellow-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Family Friendly</h4>
                    <p className="text-gray-600 text-sm">No NIN required for minors. Designed for ease and peace of mind for families.</p>
                  </div>
                </div>
              </div>
              <div className="mt-10">
                <Link to="/apply" className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 shadow-lg transition-all duration-200 text-lg animate-fadeInUp" style={{animationDelay: '0.5s'}}>
                  Apply for a Minor
                </Link>
              </div>
            </div>
            {/* Image Card with floating effect and full cover */}
            <div className="md:w-1/2 w-full animate-fadeInUp floating-card flex items-center justify-center min-h-[320px] md:min-h-[420px]" style={{animationDelay: '0.2s'}}>
              <div className="relative w-full h-72 md:h-96 flex items-center justify-center">
                <img
                  src="https://img.freepik.com/free-photo/african-american-parents-with-daughter-home_23-2148466387.jpg"
                  alt="Family with child"
                  className="rounded-3xl shadow-2xl w-full h-full object-cover object-center border-4 border-green-100 transition-transform duration-300 hover:scale-105"
                  style={{maxHeight: '100%', maxWidth: '100%'}}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* LGAs Section (Enhanced) */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-green-50">
        <style>{`
          @keyframes fadeInUp {
            0% { opacity: 0; transform: translateY(40px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeInUp {
            animation: fadeInUp 0.7s cubic-bezier(0.23, 1, 0.32, 1) both;
          }
        `}</style>
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">
            Supported Local Government Areas
          </h2>
          <p className="text-center text-gray-600 mb-10">
            Our portal currently supports the following LGAs in Delta State. Use the search bar to quickly find your LGA.
          </p>
          {/* LGA Search Bar */}
          <div className="flex justify-center mb-8">
            <input type="text" placeholder="Search LGA..." className="w-full max-w-md px-5 py-3 rounded-lg border border-green-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 text-lg" onChange={e => {
              const val = e.target.value.toLowerCase();
              document.querySelectorAll('.lga-card').forEach(card => {
                const name = card.getAttribute('data-name')?.toLowerCase() || '';
                card.classList.toggle('hidden', !name.includes(val));
              });
            }} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {[{
              name: 'Ughelli North',
              headquarters: 'Ughelli',
              icon: 'https://cdn.jsdelivr.net/gh/edent/SuperTinyIcons/images/svg/map.svg',
              color: 'from-green-200 to-green-100'
            }, {
              name: 'Ughelli South',
              headquarters: 'Otujeremi',
              icon: 'https://cdn.jsdelivr.net/gh/edent/SuperTinyIcons/images/svg/map.svg',
              color: 'from-blue-100 to-blue-50'
            }, {
              name: 'Kwale (Ndokwa West)',
              headquarters: 'Kwale',
              icon: 'https://cdn.jsdelivr.net/gh/edent/SuperTinyIcons/images/svg/map.svg',
              color: 'from-yellow-100 to-yellow-50'
            }, {
              name: 'Sapele',
              headquarters: 'Sapele',
              icon: 'https://cdn.jsdelivr.net/gh/edent/SuperTinyIcons/images/svg/map.svg',
              color: 'from-purple-100 to-purple-50'
            }, {
              name: 'Udu',
              headquarters: 'Otor-Udu',
              icon: 'https://cdn.jsdelivr.net/gh/edent/SuperTinyIcons/images/svg/map.svg',
              color: 'from-pink-100 to-pink-50'
            }, {
              name: 'Patani',
              headquarters: 'Patani',
              icon: 'https://cdn.jsdelivr.net/gh/edent/SuperTinyIcons/images/svg/map.svg',
              color: 'from-emerald-100 to-emerald-50'
            }].map((lga, index) => (
              <div key={index} className={`lga-card bg-gradient-to-b ${lga.color} border border-green-100 rounded-2xl p-7 shadow-lg hover:shadow-2xl transition-shadow duration-200 flex flex-col items-center text-center animate-fadeInUp`} data-name={lga.name} style={{animationDelay: `${index * 0.08 + 0.1}s`}}>
                <img src={lga.icon} alt="LGA Icon" className="w-14 h-14 mb-4" />
                <h3 className="text-xl font-bold mb-2 text-green-900">{lga.name}</h3>
                <p className="text-gray-700 mb-1"><span className="font-semibold">Headquarters:</span> {lga.headquarters}</p>
                <span className="mt-2 inline-block bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">Delta State</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Why Choose Us Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-green-50 p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
              <CheckCircleIcon size={36} className="text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Fast & Secure</h3>
              <p className="text-gray-600">Your data is protected and certificates are processed quickly and efficiently.</p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
              <Users2Icon size={36} className="text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">User Friendly</h3>
              <p className="text-gray-600">Simple, intuitive portal for all ages and backgrounds.</p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
              <HeartHandshakeIcon size={36} className="text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Trusted by Thousands</h3>
              <p className="text-gray-600">Thousands of successful applications processed for Delta State citizens.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold text-center mb-10">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-semibold text-lg mb-2">How long does it take to get my certificate?</h3>
              <p className="text-gray-600">Most certificates are processed within 3-5 business days after successful application and document verification.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-semibold text-lg mb-2">Is my information safe?</h3>
              <p className="text-gray-600">Yes, we use industry-standard security practices to keep your data safe and confidential.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-semibold text-lg mb-2">Can I apply for someone else?</h3>
              <p className="text-gray-600">Yes, parents or legal guardians can apply for minors under 18 years of age.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-semibold text-lg mb-2">What documents do I need?</h3>
              <p className="text-gray-600">You will need a valid ID, proof of origin, and for minors, a birth certificate and guardian's ID.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-green-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Apply?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Get your Local Government and State of Origin Certificate from the
            comfort of your home.
          </p>
          <Link to="/register" className="bg-white text-green-800 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-green-100 inline-block">
            Start Application Now
          </Link>
        </div>
      </section>
    </div>;
};
export default Home;