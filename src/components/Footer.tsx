import React from 'react';
import { Mail, Phone, Instagram, Facebook, Linkedin } from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        /* Added border-t-4 and border-emerald-600 for a strong upper border */
        <footer className="bg-white text-slate-700 pt-16 pb-8 px-6 border-t-2 border-emerald-600">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

                {/* Brand & Address Section */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <a href="#hero">
                            <img
                                src="/images/EV LOGO.png"
                                alt="SpeedForce EV"
                                className="h-10 w-auto"
                            />
                        </a>
                    </div>
                    <p className="text-emerald-700 font-medium text-sm">Driving India's Green Logistics Revolution</p>

                    <div className="pt-2 space-y-2">
                        <h5 className="font-bold text-sm text-slate-900 uppercase">Speed Force EV Vehicles Private Limited</h5>
                        <p className="text-xs leading-relaxed text-slate-500">
                            Shed No. C-222, GIDC, Makarpura <br />
                            Industrial Estate, Vadodara, Gujarat – 390020
                        </p>
                        <p className="text-xs font-semibold text-slate-600">GSTIN: 24ABHCS2620M1ZA</p>
                        <p className="text-[10px] text-emerald-600 font-bold tracking-wider">ACCEPTING LIMITED PARTNERS ONLY</p>
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h4 className="text-slate-900 font-bold mb-6">Quick Links</h4>
                    <ul className="space-y-3 text-sm">
                        <li><a href="/blog" className="hover:text-emerald-600 transition-colors">Blog</a></li>
                        <li><a href="/vehicles" className="hover:text-emerald-600 transition-colors">Vehicles</a></li>
                        <li><a href="/about" className="hover:text-emerald-600 transition-colors">About Us</a></li>
                        <li><a href="/fleet-investment" className="hover:text-emerald-600 transition-colors">Partners</a></li>

                    </ul>
                </div>

                {/* Resources */}
                <div>
                    <h4 className="text-slate-900 font-bold mb-6">Resources</h4>
                    <ul className="space-y-3 text-sm">

                        <li><a href="/career" className="hover:text-emerald-600 transition-colors">Career</a></li>

                        <li><a href="TC" className="hover:text-emerald-600 transition-colors">Terms & Condition</a></li>
                        <li><a href="PP" className="hover:text-emerald-600 transition-colors">Privacy Policy </a></li>
                        <li><a href="Disclaimer" className="hover:text-emerald-600 transition-colors">Desclaimer  </a></li>


                    </ul>
                </div>

                {/* Contact Us */}
                <div>
                    <h4 className="text-slate-900 font-bold mb-6">Contact Us</h4>
                    <ul className="space-y-4">
                        <li className="flex items-center gap-3 group">
                            <Mail className="w-4 h-4 text-emerald-600" />
                            <a href="mailto:support@speedforceev.in" className="text-sm hover:text-emerald-600 transition-colors">
                                support@speedforceev.in
                            </a>
                        </li>
                        <li className="flex items-center gap-3 group">
                            <Phone className="w-4 h-4 text-emerald-600" />
                            <a href="tel:+918866812888" className="text-sm hover:text-emerald-600 transition-colors">
                                +91 8866812888
                            </a>
                        </li>
                        <li className="flex items-center gap-3">
                            <Instagram className="w-4 h-4 text-emerald-600" />
                            <span className="text-sm text-slate-600">@speedforceev</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <Facebook className="w-4 h-4 text-emerald-600" />
                            <span className="text-sm text-slate-600">@speedforceev</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <Linkedin className="w-4 h-4 text-emerald-600" />
                            <span className="text-sm text-slate-600">@speedforceev</span>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-slate-200 text-center">
                <p className="text-xs text-slate-500 mb-2">
                    2021-{currentYear} © Speed Force EV • All Rights Reserved
                </p>
                <p className="text-[10px] text-slate-400 italic">
                    *Terms and conditions applied.
                </p>
            </div>
        </footer>
    );
};

export default Footer;