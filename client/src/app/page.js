'use client';

import Link from 'next/link';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { Recycle, Leaf, TrendingUp, Users, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="h-[2px] w-full" style={{ backgroundColor: '#008236' }}></div>

        <section id="hero" className="bg-gradient-to-br from-green-50 to-white py-12 lg:py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-3xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight mb-6">
                AI-Powered Waste & Sustainability Assistant
              </h1>
                <p className="text-base lg:text-lg xl:text-xl text-gray-600 mb-8 leading-relaxed font-regular">
                Transform the way you manage waste. ReGen helps communities classify waste, track carbon footprints,
                and build sustainable habits through AI-powered guidance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/auth/register"
                className="flex items-center justify-center rounded-lg transition text-sm lg:text-lg font-medium px-4 py-3 lg:px-6 lg:py-3"
             style={{
               backgroundColor: '#008236',
               color: '#ffffff',
               fontFamily: 'Rasa, serif',
               minWidth: '120px',
  }}
                >
                    <span>Get Started</span>
                  <ArrowRight className="w-4 h-4 lg:w-5 lg:h-5 ml-2" />
                </Link>
               <Link
  href="/auth/login"
  className="flex items-center justify-center rounded-lg border-2 border-[#008236] text-[#008236] font-medium hover:bg-green-50 transition text-sm lg:text-lg px-4 py-3 lg:px-6 lg:py-3"
  style={{
    width: '81px',             // button width
    height: '40px',            // button height
    fontFamily: 'Rasa, serif', // Figma font
    fontWeight: 500,           // medium
    fontSize: '20px',          // font size
    lineHeight: '24px',        // vertical alignment
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }}
>
  Sign In
</Link>

                 </div>
            </div>
            <div className="relative">
  <div className="rounded-2xl overflow-hidden shadow-md">
    <img
      src="/images/regen-hero.jpeg"
      alt="Waste management illustration"
      className="w-full max-w-md lg:max-w-lg xl:max-w-xl h-auto object-cover"
    />
  </div>
</div>

            
          </div>
        </div>
      </section>
       <section id="services" className="py-12 lg:py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-gray-600 text-base lg:text-lg">
              Everything you need to manage waste smartly and sustainably
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <ServiceCard
              icon={<Recycle className="w-8 h-8 text-green-600" />}
              title="Waste Classification"
              description="AI-powered waste identification with smart recycling suggestions"
            />
              <ServiceCard
              icon={<Leaf className="w-8 h-8 text-green-600" />}
              title="Biogas Solutions"
              description="Convert agricultural waste into renewable energy for cooking"
            />
            <ServiceCard
              icon={<TrendingUp className="w-8 h-8 text-green-600" />}
              title="Impact Tracking"
              description="Monitor your carbon footprint and environmental contributions"
            />
            <ServiceCard
              icon={<Users className="w-8 h-8 text-green-600" />}
              title="Community Action"
              description="Join communities and compete on sustainability leaderboards"
            />
          </div>
        </div>
      </section>
        <section className="py-12 lg:py-20 px-4" style={{ backgroundColor: '#008236' }}>
        <div className="max-w-7xl mx-auto text-center text-white">
          <h2 className="text-2xl lg:text-4xl xl:text-5xl font-bold mb-6">Ready to Make a Difference?</h2>
          <p className="text-base lg:text-xl mb-8 text-green-50">
            Join thousands of users who are building a sustainable future, one action at a time.
          </p>
          <Link
            href="/auth/register"
            className="bg-white text-green-600 px-6 lg:px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition inline-flex items-center space-x-2 text-lg lg:text-xl"
          >
            <span>Start Your Journey</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
       <section id="impact" className="py-12 lg:py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-2xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-4">Community Impact</h2>
            <p className="text-gray-600 text-lg lg:text-xl">Making a real difference together</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center max-w-4xl mx-auto">
            <ImpactCard number="10,000+" label="Waste Items Recycled" />
            <ImpactCard number="5,000kg" label="CO₂ Emissions Reduced" />
            <ImpactCard number="500+" label="Active Community Members" />
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
function ServiceCard({ icon, title, description }) {
  return (
    <div className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-green-600 hover:shadow-lg transition">
      <div className="mb-4">{icon}</div>
      <h3 className="text-lg lg:text-xl xl:text-2xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm lg:text-base">{description}</p>
    </div>
  );
}

function ImpactCard({ number, label }) {
  return (
    <div
      className="bg-white rounded-lg shadow-sm border border-[#D9D9D9] p-6 flex flex-col justify-center items-center min-h-[120px]"
    >
      <div className="text-2xl lg:text-3xl xl:text-4xl font-bold text-green-600 mb-2">{number}</div>
      <div className="text-gray-600 text-sm lg:text-base text-center">{label}</div>
    </div>
  );
}

