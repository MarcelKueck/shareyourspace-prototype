export default function ProvidersPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">
            Workspace Providers
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
            Join our network of professional workspace providers and maximize your space utilization with ShareYourSpace.
          </p>
          
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Coming Soon
            </h2>
            <p className="text-gray-600 mb-6">
              We&apos;re building an amazing experience for workspace providers. 
              Stay tuned for exciting updates!
            </p>
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              Get Notified
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}