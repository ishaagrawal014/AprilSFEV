import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { NavLink } from "./NavLink";

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const navLinks = [
        { name: "Home", href: "#hero", isAnchor: true },
        { name: "Vehicles", href: "/vehicles" },
        // Updated URL to fleet-investment
        { name: "Fleet Partner Program", href: "/fleet-investment", special: true },
        { name: "About", href: "/about" },
        { name: "Blog", href: "/blog", isExternal: true },
        { name: "Contact", href: "/contact" },
    ];

    const handleNavClick = (e, link) => {
        if (link.isAnchor) {
            e.preventDefault();
            if (location.pathname !== '/') {
                navigate('/');
                setTimeout(() => {
                    const element = document.querySelector(link.href);
                    if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100);
            } else {
                const element = document.querySelector(link.href);
                if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
            setIsMenuOpen(false);
        } else if (link.isExternal) {
            window.open(link.href, '_blank');
            e.preventDefault();
            setIsMenuOpen(false);
        }
    };

    // Button Styles: Matching "Start Leasing" but with Rupee symbol logic
    const specialBtnClass = "px-5 py-2.5 bg-[#22C55E] text-black font-bold rounded-full hover:bg-[#1eb054] transition-all duration-300 flex items-center gap-2 shadow-sm text-sm whitespace-nowrap";
    const standardLinkClass = "text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-200";

    return (
        <header className= "fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-border" >
        <div className="container mx-auto px-4 md:px-6" >
            <div className="flex items-center justify-between h-20 md:h-24" >

                {/* Logo - Set to Medium Size */ }
                < Link to = "/" className = "flex-shrink-0" >
                    <img
                            src="/images/EV LOGO.png"
    alt = "SpeedForce EV Logo"
    className = "h-12 w-auto md:h-10 object-contain"
        />
        </Link>

    {/* Desktop Navigation */ }
    <nav className="hidden lg:flex items-center gap-5 xl:gap-7" >
    {
        navLinks.map((link) => (
            link.isAnchor || link.isExternal ? (
                <a
                                    key= { link.name }
                                    href = { link.href }
                                    onClick = {(e) => handleNavClick(e, link)}
className = { link.special ? specialBtnClass : standardLinkClass }
    >
    {/* Prominent Rupee Symbol */ }
{ link.special && <span className="text-[#EAB308] text-lg leading-none font-black drop-shadow-sm" >₹</span> }
{ link.name }
</a>
                            ) : (
    <NavLink
                                    key= { link.name }
to = { link.href }
className = { link.special ? specialBtnClass : standardLinkClass }
activeClassName = {!link.special ? "text-primary font-semibold" : ""}
                                >
    { link.special && <span className="text-[#EAB308] text-lg leading-none font-black">₹</span>}
{ link.name }
</NavLink>
                            )
                        ))}
</nav>

{/* Desktop CTA */ }
<div className="hidden lg:flex items-center" >
    <Link to="/contact" >
        <Button className="bg-[#22C55E] hover:bg-[#1eb054] text-black font-bold rounded-full px-6 py-2 h-10 shadow-sm transition-all duration-300" >
            Start Leasing
                </Button>
                </Link>
                </div>

{/* Mobile Menu Button */ }
<button className="lg:hidden p-2 text-primary" onClick = {() => setIsMenuOpen(!isMenuOpen)}>
    { isMenuOpen?<X size = { 28 } /> : <Menu size={ 28 } />}
</button>
    </div>

{/* Mobile Menu */ }
{
    isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-b p-6 flex flex-col gap-4 shadow-xl" >
        {
            navLinks.map((link) => (
                <a
                                key= { link.name }
                                href = { link.href }
                                onClick = {(e) => handleNavClick(e, link)}
    className = { link.special ? `${specialBtnClass} justify-center py-4` : "px-2 py-2 text-base font-medium" }
        >
        { link.special && <span className="text-yellow-500 text-xl font-black">₹</span>
}
{ link.name }
</a>
                        ))}
</div>
                )}
</div>
    </header>
    );
};

export default Header;