// 'use client';

// import Link from 'next/link';
// import { Leaf, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

// export default function Footer() {
//   const currentYear = new Date().getFullYear();

//   return (
//     <footer className="bg-gray-900 text-gray-300 mt-20">
//       <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
//         <div className="grid md:grid-cols-2 gap-12 text-center md:text-left">
          
//           {/* Brand Section */}
//           <div>
//             <div className="flex flex-col items-center md:items-start mb-4">
//               <img
//                 src="/images/regen-logo.jpeg"
//                 alt="ReGen Logo"
//                 className="h-16 w-auto rounded-lg mb-3"
//               />
//               <h2 className="text-2xl font-semibold text-white">ReGen</h2>
//             </div>
//             <p className="text-gray-400 leading-relaxed mb-6 max-w-xs mx-auto md:mx-0">
//               AI-powered waste management and sustainability platform helping communities build a greener future.
//             </p>
//             <div className="flex justify-center md:justify-start space-x-5">
//               <a href="#" className="hover:text-green-500 transition">
//                 <Facebook className="w-5 h-5" />
//               </a>
//               <a href="#" className="hover:text-green-500 transition">
//                 <Twitter className="w-5 h-5" />
//               </a>
//               <a href="#" className="hover:text-green-500 transition">
//                 <Instagram className="w-5 h-5" />
//               </a>
//               <a href="#" className="hover:text-green-500 transition">
//                 <Linkedin className="w-5 h-5" />
//               </a>
//             </div>
//           </div>

//           {/* Quick Links */}
//           <div>
//             <h3 className="text-white text-lg font-semibold mb-5">Quick Links</h3>
//             <ul className="space-y-3">
//               <li><Link href="/" className="hover:text-green-500 transition">Home</Link></li>
//               <li><Link href="/login" className="hover:text-green-500 transition">Sign In</Link></li>
//               <li><Link href="/register" className="hover:text-green-500 transition">Sign Up</Link></li>
//               <li><Link href="/dashboard" className="hover:text-green-500 transition">Dashboard
//                 </Link>
//               </li>
//             </ul>
//           </div>
//           {/* Services */}
//           </div>
//           </div>
//     </footer>
//     );
// }