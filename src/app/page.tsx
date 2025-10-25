import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🐾 Parampis
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Aplikasi Management Pasien Dokter Hewan Home Visit
          </p>
          
          <Link 
            href="/auth/signin"
            className="inline-block bg-indigo-600 text-white py-3 px-8 rounded-lg hover:bg-indigo-700 transition-colors text-lg font-semibold mb-8"
          >
            Sign In with Google
          </Link>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto mt-12">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                📋 Dashboard
              </h2>
              <p className="text-gray-600">
                Dashboard utama aplikasi (Coming Soon)
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                👥 Manajemen Pasien
              </h2>
              <p className="text-gray-600">
                Kelola data pasien dan klien (Coming Soon)
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                📝 Rekam Medis
              </h2>
              <p className="text-gray-600">
                Input dan kelola rekam medis pasien (Coming Soon)
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                📅 Appointment
              </h2>
              <p className="text-gray-600">
                Jadwal kunjungan dan appointment (Coming Soon)
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                💰 Invoice
              </h2>
              <p className="text-gray-600">
                Pembuatan dan kelola invoice (Coming Soon)
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                ⚙️ Settings
              </h2>
              <p className="text-gray-600">
                Pengaturan aplikasi dan master data (Coming Soon)
              </p>
            </div>
          </div>
          
          <div className="mt-12 text-sm text-gray-500">
            <p>Status: Development Mode</p>
            <p>Database: SQLite (Development)</p>
            <p>File Storage: Google Drive</p>
          </div>
        </div>
      </div>
    </div>
  )
}