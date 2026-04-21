import { Link } from "react-router-dom";
import { packages } from "@/mocks/clinicData";

export default function FeaturedPackages() {
  return (
    <section dir="rtl" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-14">
          <span className="inline-block bg-brand-forest-100 text-brand-forest text-xs font-semibold px-4 py-1.5 rounded-full mb-4">
            مستويات الرعاية
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">اختر مستوى التقييم المناسب</h2>
          <p className="text-gray-500 text-base max-w-xl mx-auto leading-relaxed">
            من التقييم العميق الشامل إلى الرعاية الدولية المتكاملة — كل مستوى مصمم لحالة مختلفة
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {packages.map((pkg, i) => (
            <div
              key={pkg.id}
              className={`relative rounded-2xl border-2 border-brand-cream-200 bg-white p-6 flex flex-col transition-transform duration-300 hover:-translate-y-1 ${i === 1 ? "ring-2 ring-brand-forest ring-offset-2" : ""}`}
            >
              {pkg.badge && (
                <span className="absolute -top-3 right-6 bg-brand-forest text-white text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">
                  {pkg.badge}
                </span>
              )}
              <div className="mb-5">
                <div className="w-10 h-10 flex items-center justify-center bg-brand-forest-100 rounded-xl mb-3">
                  <i className={`${pkg.icon} text-brand-forest text-lg`}></i>
                </div>
                <h3 className="font-black text-gray-900 text-lg mb-1">{pkg.name}</h3>
                <p className="text-gray-400 text-xs mb-3">{pkg.tagline}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-black text-brand-forest">{pkg.price}</span>
                  <span className="text-gray-500 text-sm">{pkg.currency}</span>
                  {pkg.originalPrice && (
                    <span className="text-gray-400 text-xs line-through mr-1">{pkg.originalPrice}</span>
                  )}
                </div>
              </div>
              <ul className="space-y-2.5 flex-1 mb-6">
                {pkg.features.map((f, fi) => (
                  <li key={fi} className="flex items-center gap-2.5 text-sm text-gray-600">
                    <div className={`w-5 h-5 flex items-center justify-center rounded-full flex-shrink-0 ${f.included ? "bg-brand-forest-100" : "bg-gray-100"}`}>
                      <i className={`text-xs ${f.included ? "ri-check-line text-brand-forest" : "ri-close-line text-gray-400"}`}></i>
                    </div>
                    <span className={f.included ? "" : "text-gray-400 line-through"}>{f.text}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/booking"
                className="w-full text-center py-3 rounded-xl font-bold text-sm text-white bg-brand-forest hover:bg-brand-forest-700 transition-colors duration-200 whitespace-nowrap cursor-pointer"
              >
                احجز الآن
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/packages"
            className="inline-flex items-center gap-2 border-2 border-brand-forest text-brand-forest hover:bg-brand-forest hover:text-white font-semibold px-8 py-3 rounded-full transition-all duration-200 whitespace-nowrap cursor-pointer"
          >
            عرض جميع الباقات
            <i className="ri-arrow-left-line"></i>
          </Link>
        </div>
      </div>
    </section>
  );
}
