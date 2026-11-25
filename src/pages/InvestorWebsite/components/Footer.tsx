import { Link } from 'react-router-dom';
import { Mail, Phone, Instagram, Facebook,Linkedin,Zap } from 'lucide-react';
import content from '@/pages/InvestorWebsite/data/content.json';
import { smoothScrollTo } from '@/pages/InvestorWebsite/lib/lenis';
import { useState } from 'react';
export default function Footer() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (href: string) => {
    const id = href.replace('#', '');
    smoothScrollTo(id);
    setMobileMenuOpen(false);
  };
  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            
            <div className="flex items-center gap-2 mb-4">
            <a
    href="#home"
    onClick={(e) => { e.preventDefault(); scrollToSection('#home'); }}
    className="flex items-center"
  >
    {/* Logo only */}
    <img
      src="/images/speed-force-ev-dark.png"
      alt="logo"
      className="h-10 w-auto object-contain"
    />
  </a>
  
  
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              {content.footer.tagline}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
  <span className="font-semibold text-foreground">
    SPEED FORCE EV VEHICLES PRIVATE LIMITED
  </span>
  <br />
  4th, 406/5, Signet Hub, Akshar Chowk
  <br />
  Vadodara, Gujarat – 390020
  <br />
  <span className="font-medium text-foreground/80">
    GSTIN:
  </span>{" "}
  24ABHCS2620M1ZA
</p>

<p className="mt-3 text-xs tracking-wide uppercase text-muted-foreground/80">
  Accepting limited partners only
</p>
          </div>
          

          {/* Quick Links */}
         <div>
  <h3 className="font-semibold mb-4">Quick Links</h3>
  <ul className="space-y-2 text-sm">
    <li>
      <a
        href="#opportunity"
        className="text-muted-foreground hover:text-primary transition-colors"
      >
        Opportunity
      </a>
    </li>
    <li>
      <a
        href="#whyev"
        className="text-muted-foreground hover:text-primary transition-colors"
      >
        Why Us
      </a>
    </li>
    <li>
      <a
        href="#partner1"
        className="text-muted-foreground hover:text-primary transition-colors"
      >
        Partners
      </a>
    </li>
    <li>
      <a
        href="#investment"
        className="text-muted-foreground hover:text-primary transition-colors"
      >
        Investment Plans
      </a>
    </li>
  </ul>
</div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/faq" className="text-muted-foreground hover:text-primary transition-colors">FAQ</Link></li>
              <li><Link to="/blogs" className="text-muted-foreground hover:text-primary transition-colors">Blog</Link></li>
              <li><Link to="/dashboard" className="text-muted-foreground hover:text-primary transition-colors">Investor Portal</Link></li>
              <li><Link to="/Tnc" className="text-muted-foreground hover:text-primary transition-colors">Terms & Privacy</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <a href={`mailto:${content.contact.email}`} className="hover:text-primary transition-colors">
                  {content.contact.email}
                </a>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4" />
                <a href={`tel:${content.contact.phone}`} className="hover:text-primary transition-colors">
                  {content.contact.phone}
                </a>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Instagram className="h-4 w-4" />
                <a 
                  href={content.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  @speedforceev
                </a>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Facebook className="h-4 w-4" />
                <a 
                  href={content.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  @speedforceev
                </a>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Linkedin className="h-4 w-4" />
                <a 
                  href={content.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  @speedforceev
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t text-center">
          <p className="text-sm text-muted-foreground">
            {content.footer.copyright} • All Rights Reserved
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            *Returns are indicative and subject to market conditions and operational performance.
          </p>
        </div>
      </div>
    </footer>
  );
}
