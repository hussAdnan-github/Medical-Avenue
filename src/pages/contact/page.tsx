import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Navbar from "@/components/feature/Navbar";
import Footer from "@/components/feature/Footer";
import { clinicInfo } from "@/mocks/clinicData";
import { StarShape, SunShape, SwanShape, LotusShape } from "@/components/base/BrandShapes";
import TypewriterText from "@/components/base/TypewriterText";

type SubmitStatus = "idle" | "loading" | "success" | "error";

export default function Contact() {
  const { t, i18n } = useTranslation();
  const isAr = !i18n.language?.startsWith("en");

  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");
  const [charCount, setCharCount] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);

  const heroWords = t("contact.hero.words").split("|");

  const contactMethods = [
    { icon: "ri-phone-fill", title: isAr ? "اتصل بنا" : "Call Us", value: clinicInfo.phone, sub: isAr ? "السبت - الخميس، 8ص - 10م" : "Sat–Thu, 8AM–10PM", href: `tel:${clinicInfo.phone}`, color: "bg-brand-cream-100 text-brand-forest-600", hoverBorder: "hover:border-brand-cream-400" },
    { icon: "ri-whatsapp-line", title: "WhatsApp", value: clinicInfo.phone, sub: isAr ? "رد سريع خلال دقائق" : "Quick reply within minutes", href: "https://wa.me/966112345678", color: "bg-green-100 text-green-600", hoverBorder: "hover:border-green-200" },
    { icon: "ri-mail-fill", title: isAr ? "البريد الإلكتروني" : "Email", value: clinicInfo.email, sub: isAr ? "نرد خلال 24 ساعة" : "We reply within 24 hours", href: `mailto:${clinicInfo.email}`, color: "bg-amber-100 text-amber-600", hoverBorder: "hover:border-amber-200" },
    { icon: "ri-map-pin-fill", title: isAr ? "العنوان" : "Address", value: clinicInfo.address, sub: isAr ? "انقر لفتح الخريطة" : "Click to open map", href: "https://maps.google.com/?q=الرياض+حي+العليا", color: "bg-rose-100 text-rose-600", hoverBorder: "hover:border-rose-200" },
  ];

  const subjects = isAr
    ? ["استفسار عام", "حجز موعد", "الباقات والعروض", "التأمين الطبي", "الرأي الطبي الدولي (Second Opinion)", "تحليل DNA والطب الدقيق", "شكوى أو اقتراح", "الانضمام للفريق الطبي"]
    : ["General Inquiry", "Book Appointment", "Packages & Offers", "Medical Insurance", "International Second Opinion", "DNA Analysis & Precision Medicine", "Complaint or Suggestion", "Join the Medical Team"];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitStatus("loading");
    const form = e.currentTarget;
    const data = new URLSearchParams();
    new FormData(form).forEach((val, key) => data.append(key, val.toString()));
    try {
      const res = await fetch("https://readdy.ai/api/form/d7delhckpdh0a4ae006g", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: data.toString(),
      });
      if (res.ok) { setSubmitStatus("success"); form.reset(); setCharCount(0); }
      else setSubmitStatus("error");
    } catch { setSubmitStatus("error"); }
  };

  return (
    <div className="min-h-screen bg-brand-cream-50" dir={isAr ? "rtl" : "ltr"}>
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-16 bg-gradient-to-br from-brand-forest-700 to-brand-forest-900 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src="https://readdy.ai/api/search-image?query=abstract%20medical%20pattern%20healthcare%20symbols%20minimal%20white%20lines%20on%20dark%20forest%20green%20background%20geometric%20pattern%20precision%20medicine&width=1440&height=400&seq=contact-hero-v2&orientation=landscape" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="absolute top-12 right-8 pointer-events-none" style={{ opacity: 0.12 }}><StarShape size={100} color="white" /></div>
        <div className="absolute bottom-6 left-10 pointer-events-none" style={{ opacity: 0.10 }}><LotusShape size={90} color="white" /></div>
        <div className="absolute top-20 left-1/3 pointer-events-none" style={{ opacity: 0.05 }}><SwanShape size={70} color="white" /></div>
        <div className="absolute bottom-14 right-1/4 pointer-events-none" style={{ opacity: 0.06 }}><SunShape size={65} color="white" /></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 text-center">
          <span className="inline-flex items-center gap-2 bg-white/20 text-white text-xs font-semibold px-4 py-1.5 rounded-full mb-5 border border-white/30">
            <SwanShape size={12} color="white" />
            {t("contact.hero.badge")}
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 min-h-[1.3em]">
            <TypewriterText words={heroWords} typeSpeed={68} deleteSpeed={40} pauseAfter={2500} startDelay={600} cursorChar="▌" cursorClassName="text-brand-cream-400/60 text-4xl md:text-5xl" />
          </h1>
          <p className="text-brand-cream-200 text-base md:text-lg max-w-xl mx-auto leading-relaxed">{t("contact.hero.desc")}</p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {contactMethods.map((method, i) => (
              <a key={i} href={method.href} target={method.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
                className={`group bg-white rounded-2xl border border-brand-cream-200 p-5 hover:-translate-y-1 transition-all duration-300 cursor-pointer ${method.hoverBorder}`}>
                <div className={`w-12 h-12 flex items-center justify-center rounded-xl mb-4 ${method.color}`}><i className={`${method.icon} text-xl`}></i></div>
                <p className="font-bold text-gray-900 text-sm mb-1">{method.title}</p>
                <p className="text-gray-700 text-sm font-medium mb-1 group-hover:text-brand-forest-600 transition-colors">{method.value}</p>
                <p className="text-gray-400 text-xs">{method.sub}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

            {/* Form */}
            <div className="lg:col-span-3">
              <div className="mb-7">
                <span className="inline-flex items-center gap-2 bg-brand-cream-200 text-brand-forest-700 text-xs font-semibold px-4 py-1.5 rounded-full mb-3">
                  <StarShape size={12} color="#4a6741" />
                  {isAr ? "أرسل رسالة" : "Send a Message"}
                </span>
                <h2 className="text-2xl md:text-3xl font-black text-gray-900">{isAr ? "كيف يمكننا مساعدتك؟" : "How Can We Help You?"}</h2>
                <p className="text-gray-500 text-sm mt-2">{isAr ? "نرد على جميع الرسائل خلال 24 ساعة في أيام العمل" : "We reply to all messages within 24 hours on working days"}</p>
              </div>

              {submitStatus === "success" ? (
                <div className="bg-brand-cream-50 border border-brand-cream-300 rounded-3xl p-10 text-center">
                  <div className="w-16 h-16 flex items-center justify-center bg-brand-cream-200 rounded-full mx-auto mb-4"><LotusShape size={32} color="#4a6741" /></div>
                  <h3 className="text-xl font-black text-gray-900 mb-2">{t("contact.form.success")}</h3>
                  <p className="text-gray-500 text-sm mb-6">{isAr ? "سيتواصل معك فريقنا في أقرب وقت ممكن، عادةً خلال 24 ساعة." : "Our team will contact you as soon as possible, usually within 24 hours."}</p>
                  <button onClick={() => setSubmitStatus("idle")} className="inline-flex items-center gap-2 bg-brand-forest-600 text-white font-bold px-6 py-3 rounded-full hover:bg-brand-forest-700 transition-colors whitespace-nowrap cursor-pointer">
                    <i className="ri-refresh-line"></i>
                    {isAr ? "إرسال رسالة أخرى" : "Send Another Message"}
                  </button>
                </div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} data-readdy-form className="space-y-4 bg-white rounded-2xl border border-brand-cream-200 p-6 md:p-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">{t("contact.form.name")} <span className="text-red-500">*</span></label>
                      <input type="text" name="fullName" required placeholder={isAr ? "أدخل اسمك الكامل" : "Enter your full name"} className="w-full border border-brand-cream-200 rounded-xl px-4 py-3 text-sm text-gray-800 outline-none focus:border-brand-forest-400 transition-all placeholder-gray-300" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">{t("contact.form.phone")} <span className="text-red-500">*</span></label>
                      <input type="tel" name="phone" required placeholder="05xxxxxxxx" className="w-full border border-brand-cream-200 rounded-xl px-4 py-3 text-sm text-gray-800 outline-none focus:border-brand-forest-400 transition-all placeholder-gray-300" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">{t("contact.form.email")}</label>
                    <input type="email" name="email" placeholder="example@email.com" className="w-full border border-brand-cream-200 rounded-xl px-4 py-3 text-sm text-gray-800 outline-none focus:border-brand-forest-400 transition-all placeholder-gray-300" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">{t("contact.form.subject")} <span className="text-red-500">*</span></label>
                    <select name="subject" required className="w-full border border-brand-cream-200 rounded-xl px-4 py-3 text-sm text-gray-800 outline-none focus:border-brand-forest-400 transition-all bg-white">
                      <option value="">{isAr ? "اختر موضوع الرسالة..." : "Select subject..."}</option>
                      {subjects.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">{t("contact.form.message")} <span className="text-red-500">*</span></label>
                    <textarea name="message" required rows={5} maxLength={500} placeholder={isAr ? "اكتب رسالتك هنا..." : "Write your message here..."} onChange={(e) => setCharCount(e.target.value.length)} className="w-full border border-brand-cream-200 rounded-xl px-4 py-3 text-sm text-gray-800 outline-none focus:border-brand-forest-400 transition-all resize-none placeholder-gray-300" />
                    <div className="flex justify-between mt-1">
                      <p className="text-xs text-gray-400">{isAr ? "الحد الأقصى 500 حرف" : "Max 500 characters"}</p>
                      <p className={`text-xs ${charCount > 450 ? "text-red-400" : "text-gray-400"}`}>{charCount}/500</p>
                    </div>
                  </div>
                  {submitStatus === "error" && (
                    <div className="flex items-center gap-2 bg-red-50 border border-red-100 text-red-600 text-sm px-4 py-3 rounded-xl">
                      <i className="ri-error-warning-line"></i>
                      {isAr ? "حدث خطأ أثناء الإرسال. يرجى المحاولة مرة أخرى." : "An error occurred. Please try again."}
                    </div>
                  )}
                  <button type="submit" disabled={submitStatus === "loading"} className="w-full inline-flex items-center justify-center gap-2 bg-brand-forest-600 hover:bg-brand-forest-700 text-white font-bold py-4 rounded-full transition-all whitespace-nowrap cursor-pointer disabled:opacity-70">
                    {submitStatus === "loading" ? (
                      <><i className="ri-loader-4-line animate-spin"></i>{isAr ? "جاري الإرسال..." : "Sending..."}</>
                    ) : (
                      <><i className="ri-send-plane-line"></i>{t("contact.form.submit")}</>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-2 space-y-5">
              <div className="bg-white rounded-2xl border border-brand-cream-200 p-5">
                <h3 className="text-base font-black text-gray-900 mb-3 flex items-center gap-2">
                  <div className="w-7 h-7 flex items-center justify-center bg-rose-100 rounded-lg"><i className="ri-map-pin-line text-rose-600 text-sm"></i></div>
                  {isAr ? "موقعنا على الخريطة" : "Our Location"}
                </h3>
                <div className="rounded-xl overflow-hidden border border-brand-cream-100" style={{ height: "240px" }}>
                  <iframe title="The Medical Avenue" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3624.6744!2d46.6752!3d24.6877!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2f03890d489399%3A0xba974d1c98e79fd5!2z2K_ZitKp2YrYqSDYp9mE2LnZhNmK2KfYjA!5e0!3m2!1sar!2ssa!4v1680000000000!5m2!1sar!2ssa" width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                </div>
                <a href="https://maps.google.com/?q=الرياض+حي+العليا+شارع+الملك+فهد" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-brand-forest-600 text-sm font-semibold mt-3 hover:underline cursor-pointer">
                  <i className="ri-external-link-line"></i>
                  {isAr ? "فتح في خرائط جوجل" : "Open in Google Maps"}
                </a>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-brand-cream-200">
                <h3 className="font-black text-gray-900 mb-4 flex items-center gap-2">
                  <div className="w-8 h-8 flex items-center justify-center bg-brand-cream-100 rounded-lg"><i className="ri-time-line text-brand-forest-600 text-base"></i></div>
                  {t("contact.info.hours")}
                </h3>
                <div className="space-y-2.5">
                  {(isAr
                    ? [{ day: "السبت - الأربعاء", time: "8:00 ص - 10:00 م", active: true }, { day: "الخميس", time: "8:00 ص - 8:00 م", active: true }, { day: "الجمعة", time: "مغلق", active: false }]
                    : [{ day: "Sat – Wed", time: "8:00 AM – 10:00 PM", active: true }, { day: "Thursday", time: "8:00 AM – 8:00 PM", active: true }, { day: "Friday", time: "Closed", active: false }]
                  ).map((item, i) => (
                    <div key={i} className="flex items-center justify-between py-2.5 border-b border-brand-cream-100 last:border-0">
                      <span className="text-sm text-gray-600 font-medium">{item.day}</span>
                      <span className={`text-sm font-bold ${item.active ? "text-brand-forest-600" : "text-red-400"}`}>{item.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-brand-cream-200">
                <h3 className="font-black text-gray-900 mb-4 flex items-center gap-2">
                  <div className="w-8 h-8 flex items-center justify-center bg-brand-cream-100 rounded-lg"><i className="ri-share-line text-brand-forest-600 text-base"></i></div>
                  {isAr ? "تابعنا على" : "Follow Us"}
                </h3>
                <div className="flex gap-3">
                  {[{ icon: "ri-twitter-x-line", label: "Twitter" }, { icon: "ri-instagram-line", label: "Instagram" }, { icon: "ri-snapchat-line", label: "Snapchat" }, { icon: "ri-youtube-line", label: "YouTube" }].map((social) => (
                    <a key={social.label} href="#" title={social.label} className="w-10 h-10 flex items-center justify-center bg-brand-cream-50 border border-brand-cream-200 rounded-xl text-gray-600 hover:bg-brand-forest-600 hover:text-white hover:border-brand-forest-600 transition-all duration-200 cursor-pointer">
                      <i className={`${social.icon} text-base`}></i>
                    </a>
                  ))}
                </div>
              </div>

              <div className="bg-brand-forest-800 rounded-2xl p-5 text-center relative overflow-hidden">
                <div className="absolute top-2 left-2 pointer-events-none" style={{ opacity: 0.12 }}><LotusShape size={50} color="white" /></div>
                <div className="relative">
                  <div className="w-12 h-12 flex items-center justify-center bg-white/15 rounded-xl mx-auto mb-3"><StarShape size={24} color="white" /></div>
                  <h3 className="font-black text-white mb-1.5">{isAr ? "هل تريد حجز جلسة تقييم؟" : "Want to Book an Assessment?"}</h3>
                  <p className="text-brand-cream-300 text-xs mb-4 leading-relaxed">{isAr ? "احجز مباشرة مع أحد استشاريي الطب الدقيق لدينا" : "Book directly with one of our precision medicine consultants"}</p>
                  <Link to="/booking" className="inline-flex items-center gap-2 bg-brand-cream-300 text-brand-forest-900 font-bold px-5 py-2.5 rounded-full hover:bg-brand-cream-200 transition-colors whitespace-nowrap cursor-pointer text-sm">
                    {t("btn.book_now")}
                    <i className="ri-arrow-left-line"></i>
                  </Link>
                </div>
              </div>

              <div className="bg-brand-cream-100 rounded-2xl p-5 border border-brand-cream-300">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 flex items-center justify-center bg-brand-cream-200 rounded-xl flex-shrink-0"><i className="ri-dna-line text-brand-forest-600 text-base"></i></div>
                  <div>
                    <h4 className="font-bold text-brand-forest-800 text-sm mb-1">{isAr ? "الطب الدقيق والـ DNA" : "Precision Medicine & DNA"}</h4>
                    <p className="text-brand-forest-700 text-xs leading-relaxed">{isAr ? "للاستفسار عن تحليل DNA Risk Score أو تقييم العمر البيولوجي أو الرأي الطبي الدولي، يُرجى ذكر ذلك في موضوع رسالتك." : "For inquiries about DNA Risk Score analysis, biological age assessment, or international second opinion, please mention it in your message subject."}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Philosophy Strip */}
      <section className="py-10 bg-brand-forest-900 relative overflow-hidden">
        <div className="relative max-w-4xl mx-auto px-4 md:px-8">
          <p className="text-center text-brand-cream-400 text-xs font-semibold uppercase tracking-widest mb-6">
            {isAr ? "هويتنا البصرية" : "Our Visual Identity"}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {[
              { Shape: StarShape, label: isAr ? "النجمة" : "Star", desc: isAr ? "الخبرة والتوجيه" : "Expertise & Guidance" },
              { Shape: SunShape, label: isAr ? "الشمس" : "Sun", desc: isAr ? "الحيوية والطاقة" : "Vitality & Energy" },
              { Shape: SwanShape, label: isAr ? "البجعة" : "Swan", desc: isAr ? "التوازن والانسجام" : "Balance & Harmony" },
              { Shape: LotusShape, label: isAr ? "اللوتس" : "Lotus", desc: isAr ? "التجدد والصحة" : "Renewal & Health" },
            ].map(({ Shape, label, desc }, i) => (
              <div key={i} className="flex flex-col items-center text-center group">
                <div className="w-14 h-14 flex items-center justify-center bg-brand-forest-700 rounded-full mb-3 group-hover:bg-brand-forest-600 transition-colors duration-300">
                  <Shape size={28} color="#d4c5a9" />
                </div>
                <p className="text-white font-black text-sm mb-0.5">{label}</p>
                <p className="text-brand-cream-400 text-xs">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Teaser */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-brand-cream-50 rounded-2xl border border-brand-cream-200 p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 flex items-center justify-center bg-brand-cream-200 rounded-xl flex-shrink-0">
                <i className="ri-question-answer-line text-brand-forest-600 text-xl"></i>
              </div>
              <div>
                <h3 className="font-black text-gray-900">{isAr ? "هل لديك أسئلة؟" : "Have Questions?"}</h3>
                <p className="text-gray-400 text-sm">{isAr ? "تصفح قسم الأسئلة الشائعة للحصول على إجابات سريعة حول خدماتنا" : "Browse our FAQ section for quick answers about our services"}</p>
              </div>
            </div>
            <Link to="/faq" className="inline-flex items-center gap-2 border-2 border-brand-forest-600 text-brand-forest-600 hover:bg-brand-forest-600 hover:text-white font-semibold px-6 py-2.5 rounded-full transition-all whitespace-nowrap cursor-pointer text-sm">
              {t("nav.faq")}
              <i className="ri-arrow-left-line"></i>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
