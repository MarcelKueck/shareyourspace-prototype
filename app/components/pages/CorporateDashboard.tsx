'use client';

import { useState } from 'react';
import { BarChart3, Users, CreditCard, TrendingUp, MapPin, Calendar, Download, Settings } from 'lucide-react';
import { companies, corporateMetrics, employeeBookings, corporateUsers } from '../../lib/dummy-data';

interface CorporateDashboardProps {
  companyId: string;
}

export default function CorporateDashboard({ companyId }: CorporateDashboardProps) {
  const [selectedPeriod, setSelectedPeriod] = useState('thisMonth');
  
  const company = companies.find(c => c.id === companyId);
  const metrics = corporateMetrics.find(m => m.companyId === companyId);
  const companyBookings = employeeBookings.filter(b => b.companyId === companyId);

  if (!company || !metrics) {
    return <div>Company not found</div>;
  }

  const creditUtilization = (company.usedCredits / company.monthlyCredits) * 100;

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">WorkFlex Dashboard</h1>
          <p className="text-gray-600">{company.name} • {company.subscriptionPlan} Plan</p>
        </div>
        <div className="flex gap-3">
          <select 
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="thisMonth">This Month</option>
            <option value="lastMonth">Last Month</option>
            <option value="last3Months">Last 3 Months</option>
            <option value="thisYear">This Year</option>
          </select>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </button>
          <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Active Employees</p>
                <p className="text-2xl font-bold text-gray-900">{metrics.activeEmployees}</p>
              </div>
            </div>
            <span className="text-sm text-green-600 font-medium">+12%</span>
          </div>
          <p className="text-xs text-gray-500">of {company.employeeCount} total employees</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                <CreditCard className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Credits Used</p>
                <p className="text-2xl font-bold text-gray-900">{company.usedCredits.toLocaleString()}</p>
              </div>
            </div>
            <span className="text-sm text-blue-600 font-medium">{creditUtilization.toFixed(1)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${Math.min(creditUtilization, 100)}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                <TrendingUp className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Cost Savings</p>
                <p className="text-2xl font-bold text-gray-900">${metrics.costSavings.toLocaleString()}</p>
              </div>
            </div>
            <span className="text-sm text-green-600 font-medium">+24%</span>
          </div>
          <p className="text-xs text-gray-500">vs traditional office costs</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center mr-3">
                <BarChart3 className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Satisfaction</p>
                <p className="text-2xl font-bold text-gray-900">{metrics.employeeSatisfaction}</p>
              </div>
            </div>
            <span className="text-sm text-green-600 font-medium">+0.3</span>
          </div>
          <p className="text-xs text-gray-500">average rating out of 5</p>
        </div>
      </div>

      {/* Charts and Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Usage Trends */}
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <h3 className="text-lg font-semibold mb-6">Usage Trends</h3>
          <div className="h-64 flex items-center justify-center text-gray-500">
            <div className="text-center">
              <BarChart3 className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>Chart visualization would show:</p>
              <ul className="text-sm mt-2 space-y-1">
                <li>• Daily booking patterns</li>
                <li>• Popular workspace types</li>
                <li>• Peak usage times</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Popular Locations */}
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <h3 className="text-lg font-semibold mb-6">Top Locations</h3>
          <div className="space-y-4">
            {metrics.popularLocations.map((location, index) => (
              <div key={location} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <MapPin className="w-4 h-4 text-blue-600" />
                  </div>
                  <span className="font-medium">{location}</span>
                </div>
                <div className="flex items-center">
                  <div className="w-20 bg-gray-200 rounded-full h-2 mr-3">
                    <div 
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${Math.max(80 - (index * 20), 20)}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600">{Math.max(45 - (index * 10), 15)} bookings</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity & Employee Management */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Bookings */}
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <h3 className="text-lg font-semibold mb-6">Recent Bookings</h3>
          <div className="space-y-4">
            {companyBookings.slice(0, 5).map((booking) => {
              const employee = corporateUsers.find(u => u.id === booking.employeeId);
              return (
                <div key={booking.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-sm font-medium text-blue-600">
                        {employee?.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-sm">{employee?.name}</p>
                      <p className="text-xs text-gray-600">{booking.bookingType}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{booking.creditsUsed} credits</p>
                    <p className="text-xs text-gray-600">{booking.startDate}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <button className="w-full mt-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
            View All Bookings
          </button>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <h3 className="text-lg font-semibold mb-6">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Users className="w-6 h-6 text-blue-600 mb-2" />
              <p className="text-sm font-medium">Invite Employees</p>
            </button>
            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Calendar className="w-6 h-6 text-green-600 mb-2" />
              <p className="text-sm font-medium">Bulk Booking</p>
            </button>
            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <CreditCard className="w-6 h-6 text-purple-600 mb-2" />
              <p className="text-sm font-medium">Add Credits</p>
            </button>
            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Settings className="w-6 h-6 text-gray-600 mb-2" />
              <p className="text-sm font-medium">Manage Plan</p>
            </button>
          </div>

          {/* Credit Usage Alert */}
          {creditUtilization > 80 && (
            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                <p className="text-sm font-medium text-yellow-800">Credit Usage Alert</p>
              </div>
              <p className="text-sm text-yellow-700 mt-1">
                You&rsquo;ve used {creditUtilization.toFixed(1)}% of monthly credits. 
                Consider adding more credits or upgrading your plan.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
