"use client"
import { useState, useEffect } from 'react';
import { useToast } from '../contexts/ToastContext';
import { useSession } from 'next-auth/react';


const CreditApplicationForm = () => {
  const { showToast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isIDVerified, setIsIDVerified] = useState(false);
const [verifying, setVerifying] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    employmentStatus: '',
    monthlyIncome: '',
    idType: '',
    idNumber: '',
    agreeToTerms: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

const { data: session } = useSession() || {};

useEffect(() => {
  if (session?.user?.email) {
    setFormData((prev) => ({ ...prev, email: session.user.email }));
  }
}, [session]);



useEffect(() => {
  const verifyID = async () => {
    setVerifying(true);
    setIsIDVerified(false);

    try {
      const res = await fetch("/api/mock-verify-id", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          idType: formData.idType,
          idNumber: formData.idNumber,
        }),
      });

      const data = await res.json();

      if (data.verified) {
        showToast("✅ ID verified successfully!", "success");
        setFormData((prev) => ({
          ...prev,
          firstName: data.data.firstName,
          lastName: data.data.lastName,
        }));
        setIsIDVerified(true);
      } else {
        setIsIDVerified(false);
      }
    } catch (err) {
      console.error("Verification error:", err);
      setIsIDVerified(false);
    } finally {
      setVerifying(false);
    }
  };

  if (formData.idNumber.length >= 10 && formData.idType) {
    verifyID();
  } else {
    setIsIDVerified(false);
  }
}, [formData.idNumber, formData.idType]);


const handleSubmit = async (e) => {
  e.preventDefault();

  if (!formData.agreeToTerms) {
    showToast('Please agree to the terms and conditions', 'error');
    return;
  }

  setIsSubmitting(true);

  try {
    const res = await fetch("/api/credit-application", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
showToast("🎉 Application submitted successfully! Your request is under review...", "success");

// Optional: remove toast after 60 seconds
setTimeout(() => {
  showToast("⏳ Please wait while our team reviews your application...", "info");
}, 60000);

      // Reset form after successful submission
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        employmentStatus: '',
        monthlyIncome: '',
        idType: '',
        idNumber: '',
        agreeToTerms: false,
      });
    } else {
      const errorMsg = await res.text();
      showToast(`Failed to submit application: ${errorMsg}`, "error");
    }
  } catch (error) {
    console.error("Unexpected error:", error);
    showToast("Something went wrong. Please try again later.", "error");
  } finally {
    setIsSubmitting(false);
  }
};



  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-center mb-6">Credit Application</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>
        </div>
        
        {/* Contact Information */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>
        </div>
        
        {/* Address */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Address</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                Street Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                  State
                </label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                  ZIP Code
                </label>
                <input
                  type="text"
                  id="zipCode"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Financial Information */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Financial Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="employmentStatus" className="block text-sm font-medium text-gray-700 mb-1">
                Employment Status
              </label>
              <select
                id="employmentStatus"
                name="employmentStatus"
                value={formData.employmentStatus}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Status</option>
                <option value="employed">Employed</option>
                <option value="self-employed">Self-Employed</option>
                <option value="unemployed">Unemployed</option>
                <option value="retired">Retired</option>
                <option value="student">Student</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="monthlyIncome" className="block text-sm font-medium text-gray-700 mb-1">
                Monthly Income
              </label>
              <input
                type="number"
                id="monthlyIncome"
                name="monthlyIncome"
                value={formData.monthlyIncome}
                onChange={handleChange}
                placeholder="$"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>
        </div>
        
        {/* Identification */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Identification</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="idType" className="block text-sm font-medium text-gray-700 mb-1">
                ID Type
              </label>
              <select
                id="idType"
                name="idType"
                value={formData.idType}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select ID Type</option>
                <option value="drivers-license">Driver's License</option>
                <option value="passport">Passport</option>
                <option value="national-id">National ID</option>
                <option value="state-id">State ID</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="idNumber" className="block text-sm font-medium text-gray-700 mb-1">
                ID Number
              </label>
              <input
                type="text"
                id="idNumber"
                name="idNumber"
                value={formData.idNumber}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
           {verifying && <p className="text-yellow-500 text-sm">Verifying ID...</p>}

{isIDVerified && (
  <p className="text-green-600 text-sm">
    Verified: {formData.firstName} {formData.lastName}
  </p>
)}

{!verifying && !isIDVerified && formData.idNumber.length >= 10 && (
  <p className="text-red-600 text-sm">Unable to verify ID</p>
)}

          </div>
        </div>
        
        {/* Terms and Conditions */}
        <div className="flex items-start space-x-2">
          <input
            type="checkbox"
            id="agreeToTerms"
            name="agreeToTerms"
            checked={formData.agreeToTerms}
            onChange={handleChange}
            className="mt-1"
            required
          />
          <label htmlFor="agreeToTerms" className="text-sm text-gray-700">
            I agree to the <a href="/terms" className="text-blue-600 hover:underline">Terms and Conditions</a> and consent to a credit check as part of this application.
          </label>
        </div>
        
      <button
  type="submit"
  disabled={isSubmitting || !isIDVerified}
  className={`w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-md ${
    isSubmitting || !isIDVerified ? 'opacity-70 cursor-not-allowed' : ''
  }`}
>
  {isSubmitting ? 'Submitting Application...' : 'Submit Application'}
</button>

      </form>
    </div>
  );
};

export default CreditApplicationForm;