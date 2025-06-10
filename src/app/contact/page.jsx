
"use client"
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactForm from '@/components/ContactForm';

const Contact = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center mb-10">Contact Us</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <ContactForm />
            
            <div>
              <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h2 className="text-xl font-bold mb-4">Our Location</h2>
                <div className="h-64 mb-4 rounded overflow-hidden shadow">
  <a
    href="https://www.openstreetmap.org/?mlat=8.4861&mlon=4.5502#map=16/8.4861/4.5502"
    target="_blank"
    rel="noopener noreferrer"
    className="block w-full h-full"
  >
    <iframe
      title="Taiwo Isale Map"
      src="https://www.openstreetmap.org/export/embed.html?bbox=4.5402%2C8.4811%2C4.5602%2C8.4911&layer=mapnik&marker=8.4861%2C4.5502"
      width="100%"
      height="100%"
      style={{ border: 0, pointerEvents: 'none' }}
      loading="lazy"
    ></iframe>
  </a>
</div>

                <address className="not-italic">
                  <p className="mb-2"><strong>Temitope Supermarket</strong></p>
                  <p className="mb-1">Ibrahim taiwo Isale Road </p>
                  <p className="mb-1">Kwara State.Ilorin </p>
                  <p className="mb-1">Nigeria</p>
                </address>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-4">Contact Information</h2>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-600 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <div>
                      <p className="font-medium">Phone</p>
                      <p className="text-gray-600">(905) 611-6119</p>
                    </div>
                  </li>
                  
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-600 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-gray-600">Adeshinamubarak6@gmail.com</p>
                    </div>
                  </li>
                  
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-600 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <p className="font-medium">Business Hours</p>
                      <p className="text-gray-600">Monday - Friday: 8:00 AM - 10:00 PM</p>
                      <p className="text-gray-600">Saturday - Sunday: 9:00 AM - 9:00 PM</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;
