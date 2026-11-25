import React from 'react';

const OEMPartners = () => {
    const partners = [
        { name: "Tata Motors", logo: "https://upload.wikimedia.org/wikipedia/commons/8/8e/Tata_logo.svg" },
        { name: "MG Motors", logo: "https://upload.wikimedia.org/wikipedia/commons/e/e9/MG_Cars_logo.svg" },
        { name: "Mahindra", logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Mahindra_Rise_New_Logo.svg" },
        { name: "TVS Motor", logo: "https://upload.wikimedia.org/wikipedia/commons/a/af/TVS_Motor_Logo.svg" },
        { name: "Ather Energy", logo: "https://upload.wikimedia.org/wikipedia/commons/e/e4/Ather_Energy_Logo.svg" },
        { name: "BYD", logo: "https://upload.wikimedia.org/wikipedia/commons/e/e3/BYD_logo_2022.svg" },
        { name: "Citroën", logo: "https://upload.wikimedia.org/wikipedia/commons/d/df/Citroen-Logo.svg" },
        { name: "Bajaj Auto", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/1/14/Bajaj_Auto_logo.svg/1200px-Bajaj_Auto_logo.svg.png" },
        { name: "Piaggio", logo: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Piaggio_Logo.svg" },
        { name: "Euler Motors", logo: "https://logo.clearbit.com/eulermotors.com" },
        { name: "Montra Electric", logo: "https://logo.clearbit.com/montraelectric.com" },
        { name: "Bgauss", logo: "https://logo.clearbit.com/bgauss.com" },
        { name: "Grevol", logo: "https://logo.clearbit.com/grevol.com" },
    ];

    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-6 text-center">
                <h2 className="text-[11px] font-bold text-slate-400 mb-16 uppercase tracking-[0.3em]">
                    Trusted by Leading EV Manufacturers
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 items-center justify-items-center">
                    {partners.map((partner, index) => (
                        <div
                            key={index}
                            className="group relative flex items-center justify-center w-full h-24 transition-all duration-300"
                        >
                            {/* DEFAULT STATE: Professional Text */}
                            <span className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-slate-400 group-hover:opacity-0 transition-opacity duration-300">
                {partner.name}
              </span>

                            {/* HOVER STATE: Official Logo Icon */}
                            <div className="opacity-0 group-hover:opacity-100 transform scale-90 group-hover:scale-100 transition-all duration-300 w-full h-full flex items-center justify-center">
                                <img
                                    src={partner.logo}
                                    alt={partner.name}
                                    className="max-h-12 max-w-[80%] object-contain"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default OEMPartners;