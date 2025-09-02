'use client';

import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    password: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login data:', formData);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Movie Poster */}
      <div className="w-1/2 relative bg-gradient-to-br from-blue-400 via-blue-500 to-orange-400">
        {/* Top Gun Maverick Background */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://image.tmdb.org/t/p/original/62HCnUTziyWcpDaBO2i1DX17ljH.jpg')`,
          }}
        >
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        {/* Movie Title Overlay */}
        <div className="relative z-10 flex flex-col justify-center items-center h-full text-white">
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4">TOM CRUISE</h2>
            <div className="text-6xl font-bold mb-2">
              TOP GUN
            </div>
            <div className="text-4xl font-bold mb-4">
              MAVERICK
            </div>
            <div className="text-2xl">★</div>
          </div>
        </div>


      </div>

      {/* Right Side - Login Form */}
      <div className="w-1/2 bg-black flex flex-col justify-center px-16">
        {/* Brand */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white">FILMAX</h1>
        </div>

        {/* Welcome Message */}
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-white mb-2">
            Hey there, welcome back
          </h2>
        </div>

        {/* Social Login Buttons */}
        <div className="space-y-4 mb-8">
          <button className="w-full bg-gray-800 text-white py-4 px-6 rounded-lg flex items-center justify-center space-x-3 hover:bg-gray-700 transition-colors">
            <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
              <span className="text-black font-bold text-sm">G</span>
            </div>
            <span>Login with Google</span>
          </button>
          
          <button className="w-full bg-gray-800 text-white py-4 px-6 rounded-lg flex items-center justify-center space-x-3 hover:bg-gray-700 transition-colors">
            <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">f</span>
            </div>
            <span>Login with Facebook</span>
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center mb-8">
          <div className="flex-1 h-px bg-gray-600"></div>
          <span className="px-4 text-gray-400 text-sm">Or login with</span>
          <div className="flex-1 h-px bg-gray-600"></div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name */}
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="Enter your name"
              className="w-full bg-gray-800 text-white py-4 px-4 rounded-lg border border-gray-700 focus:border-red-600 focus:outline-none transition-colors"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                className="w-full bg-gray-800 text-white py-4 px-4 pr-12 rounded-lg border border-gray-700 focus:border-red-600 focus:outline-none transition-colors"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Forgot Password */}
          <div className="text-right">
            <Link href="#" className="text-red-600 hover:text-red-500 transition-colors text-sm">
              Forgot Password
            </Link>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-red-700 transition-colors"
          >
            Login
          </button>
        </form>

        {/* Register Link */}
        <div className="mt-8 text-center">
          <span className="text-gray-400">Don't have an account? </span>
          <Link href="/register" className="text-red-600 hover:text-red-500 transition-colors">
            Register
          </Link>
        </div>


      </div>
    </div>
  );
}
