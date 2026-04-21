import { useState } from "react";
import { testimonials } from "@/mocks/clinicData";

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const t = testimonials[active];

  return (
    <section dir="rtl" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-14">
          <span className="inline-block bg-brand-forest-100 text-brand-forest text-xs font-semibold px-4 py-1.5 rounded-full mb-4">تجارب مرضانا</span>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900">ماذا يقول من اختاروا الفهم الحقيقي؟</h2>
          <p className="text-gray-500 text-sm mt-3 max-w-xl mx-auto">
            مرضى لم تمنحهم الزيارات السريعة صورة واضحة — حتى جاؤوا إلى ذا مديكال أفينيو
          </p>
        </div>
        <div className="max-w-3xl mx-auto bg-brand-cream-50 rounded-3xl p-8 md:p-12 border border-brand-cream-200">
          <div className="flex gap-1 mb-6">
            {[1,2,3,4,5].map(s => <i key={s} className="ri-star-fill text-amber-400 text-lg"></i>)}
          </div>
          <p className="text-gray-700 text-lg md:text-xl leading-relaxed mb-8 font-medium">
            «{t.text}»
          </p>
          <div className="flex items-center gap-4">
            <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full object-cover object-top" />
            <div>
              <p className="font-bold text-gray-900 text-sm">{t.name}</p>
              <p className="text-brand-forest text-xs">{t.specialty}</p>
            </div>
          </div>
          <div className="flex gap-2 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${i === active ? "bg-brand-forest w-8" : "bg-brand-cream-300 w-2"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
