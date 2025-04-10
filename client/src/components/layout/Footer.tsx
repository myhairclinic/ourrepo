import { Link } from "wouter";
import { useLanguage } from "@/hooks/use-language";
import { Language } from "@/lib/languages";
import { PUBLIC_PATHS, CLINIC_EMAIL, CLINIC_PHONE, SOCIAL_MEDIA } from "@/lib/constants";

export default function Footer() {
  const { language, addPrefix } = useLanguage();
  
  const copyrightYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and About */}
          <div className="col-span-1 md:col-span-1">
            <Link href={addPrefix(PUBLIC_PATHS.HOME)}>
              <a className="text-2xl font-bold text-white">MyHair Clinic</a>
            </Link>
            <p className="mt-2 text-gray-400 text-sm">
              {language === Language.Turkish 
                ? "Saç ekimi ve estetik tedaviler konusunda uzmanlaşmış, Tiflis'te bulunan profesyonel saç kliniği."
                : language === Language.English
                ? "Professional hair clinic in Tbilisi specializing in hair transplantation and aesthetic treatments."
                : language === Language.Russian
                ? "Профессиональная клиника в Тбилиси, специализирующаяся на трансплантации волос и эстетических процедурах."
                : "პროფესიონალური თმის კლინიკა თბილისში, სპეციალიზირებული თმის გადანერგვისა და ესთეტიკური პროცედურების სფეროში."}
            </p>
          </div>
          
          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">
              {language === Language.Turkish ? "Hızlı Linkler" :
               language === Language.English ? "Quick Links" :
               language === Language.Russian ? "Быстрые ссылки" :
               "სწრაფი ბმულები"}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href={addPrefix(PUBLIC_PATHS.HOME)}>
                  <a className="text-gray-400 hover:text-white transition">
                    {language === Language.Turkish ? "Ana Sayfa" : 
                     language === Language.English ? "Home" : 
                     language === Language.Russian ? "Главная" : "მთავარი"}
                  </a>
                </Link>
              </li>
              <li>
                <Link href={addPrefix(PUBLIC_PATHS.SERVICES)}>
                  <a className="text-gray-400 hover:text-white transition">
                    {language === Language.Turkish ? "Hizmetler" : 
                     language === Language.English ? "Services" : 
                     language === Language.Russian ? "Услуги" : "სერვისები"}
                  </a>
                </Link>
              </li>
              <li>
                <Link href={addPrefix(PUBLIC_PATHS.GALLERY)}>
                  <a className="text-gray-400 hover:text-white transition">
                    {language === Language.Turkish ? "Galeri" : 
                     language === Language.English ? "Gallery" : 
                     language === Language.Russian ? "Галерея" : "გალერეა"}
                  </a>
                </Link>
              </li>
              <li>
                <Link href={addPrefix(PUBLIC_PATHS.PACKAGES)}>
                  <a className="text-gray-400 hover:text-white transition">
                    {language === Language.Turkish ? "Paketler" : 
                     language === Language.English ? "Packages" : 
                     language === Language.Russian ? "Пакеты" : "პაკეტები"}
                  </a>
                </Link>
              </li>
              <li>
                <Link href={addPrefix(PUBLIC_PATHS.BLOG)}>
                  <a className="text-gray-400 hover:text-white transition">
                    {language === Language.Turkish ? "Blog" : 
                     language === Language.English ? "Blog" : 
                     language === Language.Russian ? "Блог" : "ბლოგი"}
                  </a>
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Services */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">
              {language === Language.Turkish ? "Hizmetlerimiz" :
               language === Language.English ? "Our Services" :
               language === Language.Russian ? "Наши услуги" :
               "ჩვენი სერვისები"}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href={addPrefix(`${PUBLIC_PATHS.SERVICES}/fue-hair-transplant`)}>
                  <a className="text-gray-400 hover:text-white transition">FUE</a>
                </Link>
              </li>
              <li>
                <Link href={addPrefix(`${PUBLIC_PATHS.SERVICES}/dhi-hair-transplant`)}>
                  <a className="text-gray-400 hover:text-white transition">DHI</a>
                </Link>
              </li>
              <li>
                <Link href={addPrefix(`${PUBLIC_PATHS.SERVICES}/beard-transplant`)}>
                  <a className="text-gray-400 hover:text-white transition">
                    {language === Language.Turkish ? "Sakal Ekimi" : 
                     language === Language.English ? "Beard Transplant" : 
                     language === Language.Russian ? "Пересадка бороды" : 
                     "წვერის ტრანსპლანტაცია"}
                  </a>
                </Link>
              </li>
              <li>
                <Link href={addPrefix(`${PUBLIC_PATHS.SERVICES}/eyebrow-transplant`)}>
                  <a className="text-gray-400 hover:text-white transition">
                    {language === Language.Turkish ? "Kaş Ekimi" : 
                     language === Language.English ? "Eyebrow Transplant" : 
                     language === Language.Russian ? "Пересадка бровей" : 
                     "წარბების ტრანსპლანტაცია"}
                  </a>
                </Link>
              </li>
              <li>
                <Link href={addPrefix(`${PUBLIC_PATHS.SERVICES}/prp-treatment`)}>
                  <a className="text-gray-400 hover:text-white transition">PRP</a>
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">
              {language === Language.Turkish ? "İletişim" :
               language === Language.English ? "Contact" :
               language === Language.Russian ? "Контакты" :
               "კონტაქტი"}
            </h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <svg className="h-5 w-5 text-primary mt-0.5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href={`tel:${CLINIC_PHONE}`} className="text-gray-400 hover:text-white transition">
                  {CLINIC_PHONE}
                </a>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-primary mt-0.5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href={`mailto:${CLINIC_EMAIL}`} className="text-gray-400 hover:text-white transition">
                  {CLINIC_EMAIL}
                </a>
              </li>
              <li className="mt-4">
                <Link href={addPrefix(PUBLIC_PATHS.APPOINTMENT)}>
                  <a className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary focus:ring-offset-gray-900">
                    {language === Language.Turkish ? "Randevu Al" : 
                     language === Language.English ? "Book Appointment" : 
                     language === Language.Russian ? "Записаться" : "დაჯავშნა"}
                  </a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Social Media and Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <div className="flex space-x-4">
            <a href={SOCIAL_MEDIA.INSTAGRAM} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition">
              <span className="sr-only">Instagram</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
              </svg>
            </a>
            <a href={SOCIAL_MEDIA.FACEBOOK} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition">
              <span className="sr-only">Facebook</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
              </svg>
            </a>
            <a href={SOCIAL_MEDIA.YOUTUBE} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition">
              <span className="sr-only">YouTube</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
              </svg>
            </a>
            <a href={SOCIAL_MEDIA.TIKTOK} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition">
              <span className="sr-only">TikTok</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
              </svg>
            </a>
          </div>
          <p className="text-gray-400 text-sm mt-4 md:mt-0">
            &copy; {copyrightYear} MyHair Clinic. 
            {language === Language.Turkish ? " Tüm hakları saklıdır." : 
             language === Language.English ? " All rights reserved." : 
             language === Language.Russian ? " Все права защищены." : 
             " ყველა უფლება დაცულია."}
          </p>
        </div>
      </div>
    </footer>
  );
}