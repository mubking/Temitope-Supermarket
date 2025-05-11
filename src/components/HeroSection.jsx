"use client";
import Link from "next/link";
import { useState } from "react";

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: "Fresh Groceries Delivered to Your Door",
      description:
        "Shop for fresh fruits, vegetables, dairy, and everyday essentials from the comfort of your home. We deliver quality products right to your doorstep.",
      image: "/temitope.jpg",
      buttonText: "Shop Now",
      buttonLink: "/products",
    },
    {
      id: 2,
      title: "Buy Now, Pay Later with Temitope Credit",
      description:
        "Apply for our convenient credit option and get up to a week to pay for your groceries. Perfect for managing your household budget.",
      image: "/appl (5).jpg",
      buttonText: "Apply for Credit",
      buttonLink: "/credit-application",
    },
   
  ];

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative bg-gradient-to-r from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="relative overflow-hidden" style={{ minHeight: "400px" }}>
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`transition-opacity duration-500 absolute inset-0 ${
                currentSlide === index ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="order-2 md:order-1">
                  <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                    {slide.title}
                  </h1>
                  <p className="text-lg text-gray-600 mb-8">{slide.description}</p>
                  <div className="flex flex-col sm:flex-row gap-4 ">
                    <Link
                      href={slide.buttonLink}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-center font-medium"
                    >
                      {slide.buttonText}
                    </Link>
                    <Link
                      href="/categories"
                      className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg inline-flex items-center justify-center gap-2 font-medium"
                    >
                      Browse Categories
                    </Link>
                  </div>
                </div>
                <div className="order-1 md:order-2 flex justify-center">
                  <img
                    src ={slide.image}
                    alt={slide.title}
                    className="rounded-lg shadow-lg max-h-96 w-full object-cover"
                  />
                </div>
              </div>
            </div>
          ))}

          {/* Navigation arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-20 bg-white/70 hover:bg-white p-2 rounded-full shadow-md ml-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-20 bg-white/70 hover:bg-white p-2 rounded-full shadow-md mr-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Dot indicators */}
          <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full ${currentSlide === index ? "bg-blue-600" : "bg-gray-400"}`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Feature Badges */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          {[
            { title: "Fresh Products", icon: "M5 13l4 4L19 7" },
            { title: "Fast Delivery", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
            { title: "Secure Payments", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955..." },
            { title: "Buy Now Pay Later", icon: "M3 10h18M7 15h1m4 0h1m-7 4h12..." },
          ].map((feature, i) => (
            <div key={i} className="bg-white p-4 rounded-lg shadow-sm">
              <div className="bg-blue-100 w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-blue-600">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={feature.icon} />
                </svg>
              </div>
              <h3 className="font-medium">{feature.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
