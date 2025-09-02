'use client';

import { useState } from 'react';
import { User, Mail, Calendar, Settings, Bell, Shield, CreditCard, Download, LogOut, Edit3, Camera } from 'lucide-react';
import Link from 'next/link';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'billing', label: 'Billing', icon: CreditCard },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy', icon: Shield },
  ];

  const mockUser = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    joinDate: 'January 2024',
    subscription: 'Monthly Subscription',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
  };

  const renderProfileTab = () => (
    <div className="space-y-8">
      {/* Profile Header */}
      <div className="flex items-center space-x-6">
        <div className="relative">
          <img
            src={mockUser.avatar}
            alt={mockUser.name}
            className="w-24 h-24 rounded-full object-cover"
          />
          <button className="absolute bottom-0 right-0 w-8 h-8 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors">
            <Camera size={16} className="text-white" />
          </button>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">{mockUser.name}</h2>
          <p className="text-gray-400">{mockUser.email}</p>
          <p className="text-gray-500 text-sm">Member since {mockUser.joinDate}</p>
        </div>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="ml-auto flex items-center gap-2 bg-gray-700 text-white px-4 py-2 btn-rounded hover:bg-gray-600 transition-colors"
        >
          <Edit3 size={16} />
          {isEditing ? 'Cancel' : 'Edit Profile'}
        </button>
      </div>

      {/* Profile Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-300 text-sm font-medium mb-2">
            Full Name
          </label>
          <input
            type="text"
            defaultValue={mockUser.name}
            disabled={!isEditing}
            className="w-full bg-gray-800 text-white py-3 px-4 rounded-lg border border-gray-700 focus:border-red-600 focus:outline-none transition-colors disabled:opacity-50"
          />
        </div>
        <div>
          <label className="block text-gray-300 text-sm font-medium mb-2">
            Email Address
          </label>
          <input
            type="email"
            defaultValue={mockUser.email}
            disabled={!isEditing}
            className="w-full bg-gray-800 text-white py-3 px-4 rounded-lg border border-gray-700 focus:border-red-600 focus:outline-none transition-colors disabled:opacity-50"
          />
        </div>
        <div>
          <label className="block text-gray-300 text-sm font-medium mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            placeholder="+1 (555) 123-4567"
            disabled={!isEditing}
            className="w-full bg-gray-800 text-white py-3 px-4 rounded-lg border border-gray-700 focus:border-red-600 focus:outline-none transition-colors disabled:opacity-50"
          />
        </div>
        <div>
          <label className="block text-gray-300 text-sm font-medium mb-2">
            Date of Birth
          </label>
          <input
            type="date"
            disabled={!isEditing}
            className="w-full bg-gray-800 text-white py-3 px-4 rounded-lg border border-gray-700 focus:border-red-600 focus:outline-none transition-colors disabled:opacity-50"
          />
        </div>
      </div>

      {isEditing && (
        <div className="flex gap-4">
          <button className="bg-red-600 text-white px-6 py-3 btn-rounded font-semibold hover:bg-red-700 transition-colors">
            Save Changes
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="bg-gray-600 text-white px-6 py-3 btn-rounded font-semibold hover:bg-gray-700 transition-colors"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );

  const renderSettingsTab = () => (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-white mb-6">Account Settings</h2>
      
      {/* Subscription Info */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Subscription</h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white font-medium">{mockUser.subscription}</p>
            <p className="text-gray-400 text-sm">Next billing: February 15, 2024</p>
          </div>
          <Link href="/subscription" className="text-red-600 hover:text-red-500 transition-colors">
            Manage Subscription
          </Link>
        </div>
      </div>

      {/* Preferences */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-white">Preferences</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-medium">Auto-play trailers</p>
              <p className="text-gray-400 text-sm">Automatically play movie trailers on hover</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-medium">Continue watching</p>
              <p className="text-gray-400 text-sm">Show continue watching section on homepage</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-medium">Parental controls</p>
              <p className="text-gray-400 text-sm">Restrict content based on age rating</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const renderBillingTab = () => (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-white mb-6">Billing & Payment</h2>
      
      {/* Current Plan */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Current Plan</h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white font-medium">Monthly Subscription</p>
            <p className="text-gray-400 text-sm">$4.99/month</p>
          </div>
          <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm">Active</span>
        </div>
      </div>

      {/* Payment Method */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Payment Method</h3>
        <div className="flex items-center space-x-4">
          <div className="w-12 h-8 bg-blue-600 rounded flex items-center justify-center">
            <span className="text-white text-xs font-bold">VISA</span>
          </div>
          <div>
            <p className="text-white font-medium">•••• •••• •••• 4242</p>
            <p className="text-gray-400 text-sm">Expires 12/25</p>
          </div>
          <button className="ml-auto text-red-600 hover:text-red-500 transition-colors">
            Update
          </button>
        </div>
      </div>

      {/* Billing History */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Billing History</h3>
        <div className="space-y-3">
          {[1, 2, 3].map((item) => (
            <div key={item} className="flex items-center justify-between bg-gray-800 rounded-lg p-4">
              <div>
                <p className="text-white font-medium">Monthly Subscription</p>
                <p className="text-gray-400 text-sm">January 15, 2024</p>
              </div>
              <div className="text-right">
                <p className="text-white font-medium">$4.99</p>
                <p className="text-green-400 text-sm">Paid</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderNotificationsTab = () => (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-white mb-6">Notification Settings</h2>
      
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white font-medium">Email notifications</p>
            <p className="text-gray-400 text-sm">Receive updates about new releases and recommendations</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" defaultChecked />
            <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
          </label>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-white font-medium">Push notifications</p>
            <p className="text-gray-400 text-sm">Get notified about new content and updates</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" defaultChecked />
            <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
          </label>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-white font-medium">Marketing emails</p>
            <p className="text-gray-400 text-sm">Receive promotional content and special offers</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
          </label>
        </div>
      </div>
    </div>
  );

  const renderPrivacyTab = () => (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-white mb-6">Privacy & Security</h2>
      
      <div className="space-y-6">
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Account Security</h3>
          <div className="space-y-4">
            <button className="w-full bg-gray-700 text-white py-3 px-4 btn-rounded hover:bg-gray-600 transition-colors text-left">
              Change Password
            </button>
            <button className="w-full bg-gray-700 text-white py-3 px-4 btn-rounded hover:bg-gray-600 transition-colors text-left">
              Enable Two-Factor Authentication
            </button>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Data & Privacy</h3>
          <div className="space-y-4">
            <button className="w-full bg-gray-700 text-white py-3 px-4 btn-rounded hover:bg-gray-600 transition-colors text-left">
              Download My Data
            </button>
            <button className="w-full bg-gray-700 text-white py-3 px-4 btn-rounded hover:bg-gray-600 transition-colors text-left">
              Delete Account
            </button>
          </div>
        </div>

        <div className="bg-red-900/20 border border-red-600 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-red-400 mb-4">Danger Zone</h3>
          <p className="text-gray-300 mb-4">Once you delete your account, there is no going back. Please be certain.</p>
          <button className="bg-red-600 text-white px-6 py-3 btn-rounded font-semibold hover:bg-red-700 transition-colors">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return renderProfileTab();
      case 'settings':
        return renderSettingsTab();
      case 'billing':
        return renderBillingTab();
      case 'notifications':
        return renderNotificationsTab();
      case 'privacy':
        return renderPrivacyTab();
      default:
        return renderProfileTab();
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-gray-900 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">Account</h1>
              <p className="text-gray-400 mt-1">Manage your account settings and preferences</p>
            </div>
            <Link href="/" className="text-gray-400 hover:text-white transition-colors">
              Back to Home
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 py-3 px-4 btn-rounded transition-colors ${
                      activeTab === tab.id
                        ? 'bg-red-600 text-white'
                        : 'text-gray-300 hover:text-white hover:bg-gray-800'
                    }`}
                  >
                    <Icon size={20} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
}
