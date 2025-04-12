import { useState, useEffect } from "react";
import { useAdmin } from "../../hooks/use-admin";
import { useLocation } from "wouter";

export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAdmin();
  const [, setLocation] = useLocation();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username || !password) {
      setError("Lütfen kullanıcı adı ve şifre giriniz");
      return;
    }
    
    setIsLoading(true);
    setError("");
    
    try {
      await login(username, password);
      // Yeni admin dashboard sayfasına yönlendir
      setLocation("/admin/dashboard");
    } catch (err) {
      setError("Kullanıcı adı veya şifre hatalı");
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col md:flex-row overflow-hidden">
      {/* Sol taraf - Login formu */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 p-6">
        <div className="max-w-md w-full p-8 bg-white rounded-2xl shadow-2xl border border-blue-100">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
              <img 
                src="/images/logo.png" 
                alt="MyHair Clinic Logo" 
                className="h-24 w-auto"
              />
            </div>
            <h1 className="text-3xl font-bold text-primary">Admin Portal</h1>
            <div className="h-1 w-20 bg-primary mx-auto mt-3 rounded-full"></div>
            <p className="text-gray-600 mt-3">MyHair Clinic Yönetim Paneli</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-r-lg flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">{error}</span>
              </div>
            )}
            
            <div className="space-y-1">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Kullanıcı Adı
              </label>
              <div className="relative mt-1 rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all shadow-sm"
                  placeholder="Kullanıcı adınız"
                  disabled={isLoading}
                />
              </div>
            </div>
            
            <div className="space-y-1">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Şifre
              </label>
              <div className="relative mt-1 rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all shadow-sm"
                  placeholder="Şifreniz"
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="flex items-center justify-between mt-6">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-600">
                  Beni hatırla
                </label>
              </div>
              
              <div className="text-sm">
                <a href="#" className="font-medium text-primary hover:text-blue-700 transition-colors">
                  Şifremi unuttum
                </a>
              </div>
            </div>
            
            <button
              type="submit"
              className="w-full py-3.5 px-4 bg-primary text-white text-base font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors shadow-lg flex items-center justify-center"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Giriş Yapılıyor...
                </>
              ) : (
                <>
                  Yönetim Paneline Giriş Yap
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
                  </svg>
                </>
              )}
            </button>
            
            {/* "Hesap oluştur" butonu kaldırıldı */}
          </form>

          <div className="mt-8 text-center text-xs text-gray-500">
            <p>© {new Date().getFullYear()} MyHair Clinic. Tüm hakları saklıdır.</p>
            <p className="mt-1">Tsotne Dadiani 59, Tbilisi</p>
          </div>
        </div>
      </div>

      {/* Sağ taraf - Hero Banner */}
      <div className="hidden md:block md:w-1/2 bg-gradient-to-br from-blue-600 to-blue-900 p-12 relative overflow-hidden">
        <div className="h-full flex flex-col justify-center z-10 relative">
          <h2 className="text-4xl font-bold text-white mb-6">MyHair Clinic <br />Yönetim Paneli</h2>
          <p className="text-blue-100 text-lg mb-8 max-w-md">
            Klinik hizmetlerinizi, paketlerinizi ve hasta randevularınızı bu panel üzerinden kolayca yönetin.
          </p>
          
          <div className="space-y-4 mb-8">
            <div className="flex items-center">
              <div className="bg-blue-400 bg-opacity-20 p-2 rounded-full mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-white">Blog ve içerik yönetimi</span>
            </div>
            <div className="flex items-center">
              <div className="bg-blue-400 bg-opacity-20 p-2 rounded-full mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-white">Randevu takibi ve yönetimi</span>
            </div>
            <div className="flex items-center">
              <div className="bg-blue-400 bg-opacity-20 p-2 rounded-full mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-white">Ürün ve hizmet düzenlemeleri</span>
            </div>
          </div>
          
          <div className="bg-white bg-opacity-10 p-6 rounded-xl backdrop-filter backdrop-blur-sm border border-white border-opacity-20">
            <p className="text-white font-medium">
              "Profesyonel ve kullanımı kolay yönetim paneliyle kliniğimizin dijital varlığını en iyi şekilde yönetiyoruz."
            </p>
            <div className="flex items-center mt-4">
              <div className="h-10 w-10 rounded-full bg-blue-400 bg-opacity-30 flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <h3 className="text-white font-medium">Dr. Mehmet Yılmaz</h3>
                <p className="text-blue-200 text-sm">Klinik Direktörü</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Dekoratif elemanlar */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-400 rounded-full filter blur-3xl opacity-20 -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-300 rounded-full filter blur-3xl opacity-20 -ml-32 -mb-32"></div>
      </div>
    </div>
  );
}