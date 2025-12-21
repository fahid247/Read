import React from "react";
import {
  Truck,
  BookOpen,
  MapPin,
  Clock,
  ShieldCheck,
  Headphones
} from "lucide-react";
import { useNavigate } from "react-router";

const features = [
  {
    icon: <Truck className="w-10 h-10 text-primary" />,
    title: "Doorstep Delivery",
    description:
      "Get your favorite books delivered straight to your home, no matter where you are in Bangladesh."
  },
  {
    icon: <MapPin className="w-10 h-10 text-primary" />,
    title: "Nationwide Coverage",
    description:
      "Available in all 64 districts with reliable local service centers ensuring fast delivery."
  },
  {
    icon: <Clock className="w-10 h-10 text-primary" />,
    title: "Fast & Reliable",
    description:
      "Our optimized delivery routes ensure timely and dependable book delivery every time."
  },
  {
    icon: <BookOpen className="w-10 h-10 text-primary" />,
    title: "Curated Book Selection",
    description:
      "Choose from a wide range of books added by trusted librarians and sellers."
  },
  {
    icon: <ShieldCheck className="w-10 h-10 text-primary" />,
    title: "Secure Payments",
    description:
      "Multiple safe payment options with full transaction protection and order tracking."
  },
  {
    icon: <Headphones className="w-10 h-10 text-primary" />,
    title: "Dedicated Support",
    description:
      "Our friendly support team is always ready to help you with orders and delivery."
  }
];

const WhyChoose = () => {
    const navigate = useNavigate();
  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      {/* Header */}
      <div className="text-center mb-14">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-800">
          Why Choose <span className="text-primary">ReadOnRoute</span>?
        </h2>
        <p className="mt-4 text-gray-600 max-w-3xl mx-auto">
          ReadOnRoute connects readers, librarians, and sellers with a fast,
          reliable, and nationwide book delivery experience.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition duration-300"
          >
            <div className="mb-4 flex items-center justify-center w-16 h-16 rounded-full bg-primary/10">
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-16 text-center">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">
          Start Your Reading Journey Today
        </h3>
        <p className="text-gray-600 mb-6">
          Join thousands of readers who trust ReadOnRoute for their book deliveries.
        </p>
        <button onClick={()=>{navigate('/allbooks')}} className="btn btn-primary px-8">
          Explore Books
        </button>
      </div>
    </section>
  );
};

export default WhyChoose;
