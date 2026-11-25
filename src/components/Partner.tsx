
import React from 'react';

const PartnersSection = () => {
  // Manually list your image filenames
  const partnerLogos = [
    'Amazon.png',
    'ampvolts.png',
'Blinkit.png',
    'batterysmart.png',
    'BB.png',
  
    'bluebells.png',
    'ThingsUp.png',
    'Flipkart.png',
    'goodbox.png',
    'zomato.png',
      'zepto.png',
    'jionew.png',

    'joyebike.png',
    'joyerik.png',

    'rebel.png',
    'SBI.png',
    'shipracket.png',
    'smarttech.png',
    'speedforce.png',

    'Swiggy.webp',
    

    // Add all your image filenames here
  ];

  const duplicatedLogos = [...partnerLogos, ...partnerLogos];

  return (
    <section id= "partner1" className = "bg-white py-4" >
      <div className="container mx-auto px-2" >

        <div className="mt-10 overflow-hidden rounded-3xl border border-[#e4e7ec] bg-white py-6" >
          <div className="flex w-max items-center gap-6 animate-marquee-ltr" >
          {
            duplicatedLogos.map((filename, index) => (
              <div
                key= { index }
                className = "flex h-20 w-40 flex-shrink-0 items-center justify-center rounded-2xl border border-gray-700/25"
              >
              <img 
                  src={`images/partners/${filename}`}
  alt = { filename.replace(/\.(png|jpe?g|svg|webp)$/i, '') }
  className = "h-auto w-5/6 object-contain"
    />
    </div>
            ))}
</div>
  </div>
  </div>

  < style jsx > {`
        @keyframes marquee-ltr {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-marquee-ltr {
          animation: marquee-ltr 30s linear infinite;
        }

        .animate-marquee-ltr:hover {
          animation-play-state: paused;
        }
      `}</style>
  </section>
  );
};

export default PartnersSection;