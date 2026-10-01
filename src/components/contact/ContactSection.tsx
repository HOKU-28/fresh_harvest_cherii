import React from 'react';
import { MapPin, Clock, MessageCircle, Mail, ArrowRight, ExternalLink } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

export const ContactSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="contact" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-12 bg-[#FAF9F5] border-t border-[#E8E0D6] text-charcoal-900">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="max-w-2xl mb-12 sm:mb-16">
          <span className="text-[11px] sm:text-xs uppercase tracking-[0.24em] font-semibold text-forest-700 block mb-3">
            {t('contact.eyebrow')}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-charcoal-900 leading-tight">
            {t('contact.title')}
          </h2>
          <p className="mt-4 text-charcoal-800/80 text-sm sm:text-base leading-relaxed">
            {t('contact.description')}
          </p>
        </div>

        {/* Two-Column Atelier Dossier & Architectural Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Atelier Information & Direct Contacts */}
          <div className="lg:col-span-6 space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6 sm:p-7 rounded-sm bg-[#FAF8F5] border border-[#E8E0D6] shadow-[0_1px_3px_rgba(31,31,31,0.04)]">
              {/* Address */}
              <div className="sm:col-span-2">
                <div className="flex items-center space-x-2 text-[11px] uppercase tracking-[0.16em] font-semibold text-forest-700 mb-2">
                  <MapPin className="w-3.5 h-3.5 text-forest-700 shrink-0" />
                  <span>{t('contact.addressLabel')}</span>
                </div>
                <p className="text-sm sm:text-base text-charcoal-800 leading-relaxed whitespace-pre-line font-sans">
                  {t('contact.addressValue')}
                </p>
              </div>

              {/* Operating Hours */}
              <div className="sm:col-span-2 pt-4 border-t border-[#E8E0D6]/80">
                <div className="flex items-center space-x-2 text-[11px] uppercase tracking-[0.16em] font-semibold text-forest-700 mb-2">
                  <Clock className="w-3.5 h-3.5 text-forest-700 shrink-0" />
                  <span>{t('contact.hoursLabel')}</span>
                </div>
                <div className="text-sm text-charcoal-800 space-y-1 font-sans">
                  <p>{t('contact.hoursWeekday')}</p>
                  <p>{t('contact.hoursWeekend')}</p>
                </div>
              </div>

              {/* WhatsApp Contact */}
              <div className="pt-4 border-t border-[#E8E0D6]/80">
                <div className="flex items-center space-x-2 text-[11px] uppercase tracking-[0.16em] font-semibold text-forest-700 mb-2">
                  <MessageCircle className="w-3.5 h-3.5 text-forest-700 shrink-0" />
                  <span>{t('contact.whatsappLabel')}</span>
                </div>
                <a
                  href="https://wa.me/6281288997700?text=Halo%20Fresh%20Harvest%2C%20saya%20ingin%20bertanya%20seputar%20koleksi%20biji%20kopi..."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-mono font-medium text-charcoal-900 hover:text-forest-700 transition-colors inline-block"
                >
                  {t('contact.whatsappValue')}
                </a>
              </div>

              {/* Email Contact */}
              <div className="pt-4 border-t border-[#E8E0D6]/80">
                <div className="flex items-center space-x-2 text-[11px] uppercase tracking-[0.16em] font-semibold text-forest-700 mb-2">
                  <Mail className="w-3.5 h-3.5 text-forest-700 shrink-0" />
                  <span>{t('contact.emailLabel')}</span>
                </div>
                <a
                  href="mailto:hello@freshharvestcoffee.com"
                  className="text-sm font-sans text-charcoal-900 hover:text-forest-700 transition-colors inline-block truncate max-w-full"
                >
                  {t('contact.emailValue')}
                </a>
              </div>
            </div>

            {/* Editorial CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <a
                href="#products"
                className="inline-flex items-center space-x-2.5 px-6 sm:px-7 py-3.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide uppercase transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 bg-[#1F1F1F] text-[#F8F8F5] hover:bg-forest-800"
              >
                <span>{t('contact.orderCta')}</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="https://wa.me/6281288997700?text=Halo%20Fresh%20Harvest%2C%20saya%20ingin%20bertanya%20seputar%20koleksi%20biji%20kopi..."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-6 sm:px-7 py-3.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide uppercase transition-all duration-300 bg-white border border-[#E8E0D6] hover:border-forest-700 text-charcoal-900 hover:bg-[#FAF9F5] shadow-2xs hover:-translate-y-0.5"
              >
                <span>{t('contact.chatCta')}</span>
              </a>
            </div>
          </div>

          {/* Right Column: Architectural Map View */}
          <div className="lg:col-span-6">
            <div className="rounded-sm overflow-hidden border border-[#E8E0D6] shadow-[0_4px_24px_rgba(31,31,31,0.06)] bg-[#F3EFE6] relative">
              <div className="relative w-full h-[280px] sm:h-[340px] lg:h-[380px] overflow-hidden">
                <iframe
                  title={t('contact.mapAria')}
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.2736173003023!2d106.8122!3d-6.2368!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f1505c86699b%3A0xb36384a83c65c5d0!2sJl.%20Suryo%20No.32%2C%20Kebayoran%20Baru%2C%20Jakarta%20Selatan!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid"
                  className="w-full h-full border-0 select-none"
                  style={{
                    filter: 'saturate(0.85) sepia(0.08) contrast(0.96)',
                  }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />

                {/* Subtle Roastery Badge Overlay */}
                <div className="absolute bottom-3 left-3 bg-[#FAF9F5]/95 backdrop-blur-md border border-[#E8E0D6] rounded-sm py-1.5 px-3 flex items-center space-x-2 text-[11px] font-medium text-charcoal-900 shadow-sm pointer-events-none">
                  <span className="w-2 h-2 rounded-full bg-forest-700 animate-pulse" />
                  <span>The Fresh Harvest Roastery</span>
                </div>
              </div>

              {/* Bottom Direction Ribbon */}
              <div className="p-3.5 sm:p-4 bg-[#FAF9F5] border-t border-[#E8E0D6] flex items-center justify-between gap-3">
                <span className="text-xs text-charcoal-800/70 font-sans truncate">
                  Jl. Suryo No. 32, Senopati, Kebayoran Baru
                </span>
                <a
                  href="https://maps.google.com/?q=-6.2368,106.8122"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1.5 text-xs font-semibold uppercase tracking-wider text-forest-700 hover:text-forest-900 transition-colors shrink-0 group"
                >
                  <span>{t('contact.mapDirections')}</span>
                  <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
