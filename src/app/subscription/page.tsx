'use client';

import { Check } from 'lucide-react';

export default function SubscriptionPage() {
  const plans = [
    {
      id: 'free-trial',
      title: 'Free Trial',
      price: '$0',
      period: '/Month',
      features: [
        { text: 'Streaming in high quality', included: true },
        { text: 'With the best audio quality', included: true },
        { text: 'Stream on multiple devices', included: false },
        { text: 'Ad-free viewing experience', included: false },
        { text: 'Download to watch later', included: false },
      ],
      buttonText: 'Get Started',
      buttonStyle: 'border border-red-600 text-red-600 hover:bg-red-600 hover:text-white',
      cardStyle: 'bg-gray-800',
    },
    {
      id: 'monthly',
      title: 'Monthly Subscription',
      price: '$4.99',
      period: '/Month',
      features: [
        { text: 'Streaming in high quality', included: true },
        { text: 'With the best audio quality', included: true },
        { text: 'Stream on multiple devices', included: true },
        { text: 'Ad-free viewing experience', included: true },
        { text: 'Download to watch later', included: true },
      ],
      buttonText: 'Get Started',
      buttonStyle: 'bg-red-600 text-white hover:bg-red-700',
      cardStyle: 'bg-red-600',
      highlighted: true,
    },
    {
      id: 'yearly',
      title: 'Yearly Subscription',
      price: '$49.99',
      period: '/Month',
      features: [
        { text: 'Streaming in high quality', included: true },
        { text: 'With the best audio quality', included: true },
        { text: 'Stream on multiple devices', included: true },
        { text: 'Ad-free viewing experience', included: true },
        { text: 'Download to watch later', included: true },
      ],
      buttonText: 'Get Started',
      buttonStyle: 'border border-red-600 text-red-600 hover:bg-red-600 hover:text-white',
      cardStyle: 'bg-gray-800',
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="flex justify-center pt-8 pb-4">
        <h1 className="text-4xl font-bold text-white">FILMAX</h1>
      </div>

      {/* Premium Access Badge */}
      <div className="flex justify-center mb-6">
        <div className="bg-yellow-400 text-black px-4 py-2 rounded-full text-sm font-semibold">
          Access Premium
        </div>
      </div>

      {/* Main Title */}
      <div className="text-center mb-4">
        <h2 className="text-4xl font-bold text-white mb-4">
          It&apos;s easy to get started
        </h2>
        <p className="text-gray-300 text-lg">
          Choose the best plan to enjoy the best movies and series
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-6xl mx-auto px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`${plan.cardStyle} rounded-lg p-8 relative ${
                plan.highlighted ? 'ring-2 ring-red-500' : ''
              }`}
            >
              {/* Plan Title */}
              <h3 className="text-2xl font-bold text-white mb-4">
                {plan.title}
              </h3>

              {/* Price */}
              <div className="mb-8">
                <span className="text-4xl font-bold text-white">
                  {plan.price}
                </span>
                <span className="text-gray-300 text-lg ml-1">
                  {plan.period}
                </span>
              </div>

              {/* Features */}
              <div className="space-y-4 mb-8">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <Check
                      size={20}
                      className={
                        feature.included
                          ? 'text-green-500'
                          : 'text-gray-500'
                      }
                    />
                    <span
                      className={
                        feature.included
                          ? 'text-white'
                          : 'text-gray-500'
                      }
                    >
                      {feature.text}
                    </span>
                  </div>
                ))}
              </div>

              {/* Button */}
              <button
                className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${plan.buttonStyle}`}
              >
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
