'use client';

import Link from 'next/link';
import Navbar from '../components/layout/Navbar';
import { Recycle, Leaf, TrendingUp, Users, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
        <section id="hero" className="bg-gradient-to-br from-green-50 to-white py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold text-gray-900 leading-tight mb-6">
                AI-Powered Waste & Sustainability Assistant
              </h1>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Transform the way you manage waste. ReGen helps communities classify waste, track carbon footprints,
                and build sustainable habits through AI-powered guidance.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/register"
                  className="bg-green-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-green-700 transition inline-flex items-center space-x-2"
                >
                    <span>Get Started</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/login"
                  className="border-2 border-green-600 text-green-600 px-8 py-3 rounded-lg font-medium hover:bg-green-50 transition"
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
      className="w-full h-full object-cover"
    />
  </div>
</div>


            
          </div>
        </div>
      </section>
       <section id="services" className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-gray-600 text-lg">
              Everything you need to manage waste smartly and sustainably
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
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
        <section className="py-20 px-4 bg-green-600">
        <div className="max-w-7xl mx-auto text-center text-white">
          <h2 className="text-4xl font-bold mb-6">Ready to Make a Difference?</h2>
          <p className="text-xl mb-8 text-green-50">
            Join thousands of users who are building a sustainable future, one action at a time.
          </p>
          <Link
            href="/register"
            className="bg-white text-green-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition inline-flex items-center space-x-2"
          >
            <span>Start Your Journey</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
       <section id="impact" className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Community Impact</h2>
            <p className="text-gray-600 text-lg">Making a real difference together</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <ImpactCard number="10,000+" label="Waste Items Recycled" />
            <ImpactCard number="5,000kg" label="CO₂ Emissions Reduced" />
            <ImpactCard number="500+" label="Active Community Members" />
          </div>
        </div>
      </section>
    </div>
  );
}
function ServiceCard({ icon, title, description }) {
  return (
    <div className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-green-600 hover:shadow-lg transition">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
function ImpactCard({ number, label }) {
  return (
    <div className="bg-white rounded-lg p-8 text-center shadow-sm">
      <div className="text-4xl font-bold text-green-600 mb-2">{number}</div>
      <div className="text-gray-600">{label}</div>
    </div>
  );
}