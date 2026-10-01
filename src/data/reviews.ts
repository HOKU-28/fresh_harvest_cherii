/**
 * Fictional Customer Reviews Data for The Fresh Harvest
 * 
 * NOTE: Fresh Harvest is a fictional coffee brand. The reviews below are authentic,
 * believable sample testimonials crafted specifically to showcase customer rituals,
 * brew methods, and sensory notes of the fictional single-origin catalog.
 */

export interface LocalizedString {
  id: string;
  en: string;
}

export interface Review {
  id: string;
  name: string;
  location: LocalizedString;
  rating: number; // e.g. 4 or 5
  date: LocalizedString;
  productId: string;
  productName: string;
  brewMethod: LocalizedString;
  headline: LocalizedString;
  comment: LocalizedString;
}

export const SAMPLE_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    name: 'Maya R.',
    location: {
      id: 'Bandung, Indonesia',
      en: 'Bandung, Indonesia',
    },
    rating: 5,
    date: {
      id: 'Maret 2026',
      en: 'March 2026',
    },
    productId: 'p-1',
    productName: 'Huila High Valley Geisha',
    brewMethod: {
      id: 'V60 Pour-over (92°C)',
      en: 'V60 Pour-over (92°C)',
    },
    headline: {
      id: 'Aroma melatinya luar biasa jernih.',
      en: 'The jasmine floral aroma is remarkably clean.',
    },
    comment: {
      id: 'Seduhan V60 pertama langsung memperlihatkan rasa manis peach putih yang lembut. Sangat bersih dan menyegarkan untuk kopi pagi.',
      en: 'The first V60 brew immediately revealed delicate white peach sweetness. Exceptionally clean and refreshing for morning rituals.',
    },
  },
  {
    id: 'rev-2',
    name: 'Daniel K.',
    location: {
      id: 'Jakarta Selatan, Indonesia',
      en: 'South Jakarta, Indonesia',
    },
    rating: 5,
    date: {
      id: 'Februari 2026',
      en: 'February 2026',
    },
    productId: 'p-2',
    productName: 'Sidama Bensa Natural',
    brewMethod: {
      id: 'AeroPress (Inverted)',
      en: 'AeroPress (Inverted)',
    },
    headline: {
      id: 'Manis blueberry liar yang sangat pekat.',
      en: 'Vibrant wild blueberry sweetness in every cup.',
    },
    comment: {
      id: 'Diseduh dengan AeroPress, rasanya seperti selai buah segar berpadu sentuhan cokelat hangat. Fermentasi naturalnya sangat rapi.',
      en: 'Brewed on the AeroPress, it tastes like fresh berry jam balanced with warm cocoa. The natural processing is wonderfully refined.',
    },
  },
  {
    id: 'rev-3',
    name: 'Aris W.',
    location: {
      id: 'Yogyakarta, Indonesia',
      en: 'Yogyakarta, Indonesia',
    },
    rating: 5,
    date: {
      id: 'Februari 2026',
      en: 'February 2026',
    },
    productId: 'p-3',
    productName: 'Antigua Volcanic Reserve',
    brewMethod: {
      id: 'French Press',
      en: 'French Press',
    },
    headline: {
      id: 'Karakter cokelat pekat yang seimbang.',
      en: 'Balanced dark chocolate with caramel warmth.',
    },
    comment: {
      id: 'Pilihan pas untuk seduhan French Press sehari-hari. Rasa manis karamel dan kacang sangrainya nyaman tanpa rasa pahit berlebih.',
      en: 'A dependable choice for everyday French Press brewing. Toasted nut and caramel sweetness come through smoothly without harsh bitterness.',
    },
  },
];
