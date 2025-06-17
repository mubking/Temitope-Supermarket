import Link from 'next/link';

const CreditSection = () => {
  return (
    <section className="py-12 bg-gradient-to-r from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Shop Now, Pay Later with Temitope Supermarket Credit
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Apply for our convenient credit option and get up to a week to pay for your groceries.
            Perfect for managing your household budget between paychecks.
          </p>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 ">
              <div className="text-center p-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-blue-600 font-bold text-xl">1</span>
                </div>
                <h3 className="font-medium mb-2">Apply Online</h3>
                <p className="text-sm text-gray-500">Complete our simple application form</p>
              </div>
              
              <div className="text-center p-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-blue-600 font-bold text-xl">2</span>
                </div>
                <h3 className="font-medium mb-2">Get Approved</h3>
                <p className="text-sm text-gray-500">Submit required documents for verification</p>
              </div>
              
              <div className="text-center p-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-blue-600 font-bold text-xl">3</span>
                </div>
                <h3 className="font-medium mb-2">Shop & Pay Later</h3>
                <p className="text-sm text-gray-500">Enjoy shopping with up to 7 days to pay</p>
              </div>
            </div>
            
            <Link href="/credit-application" className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-md">
              Apply Now
            </Link>
          </div>
          
          <p className="text-sm text-gray-500 mt-4">
            Terms and conditions apply. Credit approval subject to eligibility.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CreditSection;
