import Link from 'next/link';
import { FaFacebookF, FaInstagram, FaXTwitter, FaWhatsapp } from "react-icons/fa6";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const socialLinks = [
  { href: "https://facebook.com", icon: <FaFacebookF /> },
  { href: "https://instagram.com", icon: <FaInstagram /> },
  { href: "https://x.com", icon: <FaXTwitter /> },
  { href: "https://wa.me/2349056116119", icon: <FaWhatsapp /> },
];

  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4">
        {/* Newsletter Section */}
        <div className="py-8 border-b border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-xl font-bold mb-2">Download Our Mobile App</h3>
              <p className="text-gray-300 mb-4">
                Shop smarter soon! Our mobile app is launching soon for a faster, easier shopping experience.
              </p>
              <div className="flex space-x-4">
                {/* <a href="#" className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  Download App
                </a> */}
                <span className="inline-block bg-yellow-500 text-white text-sm font-medium px-4 py-2 rounded-md">
                  🚧 Coming Soon
                </span>
              </div>
            </div>
           {/* Social Links */}
<div className="flex justify-center md:justify-end space-x-4">
 {socialLinks.map((item) => (
  <a key={item.href} href={item.href} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
    <div className="h-6 w-6">{item.icon}</div>
  </a>
))}

            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="py-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* About */}
            <div>
              <h3 className="text-xl font-bold mb-4">Temitope Supermarket</h3>
              <p className="text-gray-300">
                Your one-stop supermarket for fresh groceries, household essentials, and more.
                We provide quality products at affordable prices with the convenience of credit options.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link href="/" className="text-gray-300 hover:text-white">Home</Link></li>
                <li><Link href="/products" className="text-gray-300 hover:text-white">Shop All</Link></li>
                <li><Link href="/categories" className="text-gray-300 hover:text-white">Categories</Link></li>
                <li><Link href="/about" className="text-gray-300 hover:text-white">About Us</Link></li>
                <li><Link href="/credit-application" className="text-gray-300 hover:text-white">Credit Application</Link></li>
                <li><Link href="/contact" className="text-gray-300 hover:text-white">Contact</Link></li>
              </ul>
            </div>

            {/* Customer Service */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
              <ul className="space-y-2">
                <li><Link href="/faq" className="text-gray-300 hover:text-white">FAQ</Link></li>
                <li><Link href="/shipping" className="text-gray-300 hover:text-white">Shipping & Returns</Link></li>
                <li><Link href="/terms" className="text-gray-300 hover:text-white">Terms & Conditions</Link></li>
                <li><Link href="/privacy" className="text-gray-300 hover:text-white">Privacy Policy</Link></li>
                <li><Link href="/track-order" className="text-gray-300 hover:text-white">Track Your Order</Link></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
              <address className="not-italic text-gray-300 space-y-2">
                <p className="flex items-center">
                  📍 No.10 Taiwo Isale Road,Ilorin, Kwara State
                </p>
                <p className="flex items-center">
                  📧                             temitopesupermarket@gmail.com

                </p>
                <p className="flex items-center">
                  📞 (234) 905-5611-6119
                </p>
                <div className="flex items-center">
                  ⏰
                  <div className="ml-2">
                    <p>Mon-Fri: 8AM - 9PM</p>
                    <p>Sat-Sun: 9AM - 6PM</p>
                  </div>
                </div>
              </address>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-6 pb-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 mb-4 md:mb-0">&copy; {currentYear} Temitope Supermarket. All rights reserved.
              Design & Code by{" "}
              <a
                href="https://my-portfolio-sable-kappa.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                MubaraqCodes
              </a>
            </p>
            <div className="flex space-x-3">
              {/* Payment icons could be placed here */}
              <span className="bg-white px-2 py-1 rounded">💳</span>
            </div>
          </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
