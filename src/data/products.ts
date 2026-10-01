import { ProductBadgeType } from '../components/shop/ProductCard';

export interface Product {
  id: string;
  name: string;
  category: string;
  region: string;
  altitude: string;
  process: string;
  harvestYear?: string;
  notes: string[];
  price: string;
  originalPrice?: string;
  roast: 'Light' | 'Medium' | 'Medium-Dark';
  roastDescription?: string;
  description: string;
  badge?: ProductBadgeType;
  bagColor: string;
}

export const SAMPLE_PRODUCTS: Product[] = [
  {
    id: 'p-1',
    name: 'Huila High Valley Geisha',
    category: 'Single Origin',
    region: 'Huila, Colombia',
    altitude: '1,950m',
    process: 'Washed Extended',
    harvestYear: '2026',
    price: '$28.00',
    roast: 'Light',
    roastDescription: 'Roasted lightly with rapid cooling to spotlight delicate jasmine florals and bergamot sweetness without masking the cup’s natural tea-like clarity.',
    description: 'Grown on steep volcanic ridges in southern Huila where cool Andean drafts slow cherry development. This Geisha lot reveals exquisite honeysuckle aromatics, silky stone-fruit brightness, and an elegant floral finish.',
    notes: ['Jasmine Floral', 'Bergamot', 'White Peach'],
    badge: 'BEST SELLER',
    bagColor: '#2E5D32',
  },
  {
    id: 'p-2',
    name: 'Sidama Bensa Natural',
    category: 'Specialty Reserve',
    region: 'Sidama, Ethiopia',
    altitude: '2,100m',
    process: 'Natural Sun-Dried',
    harvestYear: '2026',
    price: '$26.00',
    roast: 'Light',
    roastDescription: 'A careful Scandinavian-inspired profile that highlights the wild fruit fermentation and preserves bright berry acidity and natural honey sweetness.',
    description: 'Sun-dried on raised African beds for 21 days by high-altitude smallholders in Bensa. Yields a deeply aromatic cup with intense blackberry jam sweetness, Meyer lemon balance, and a syrupy dark cocoa body.',
    notes: ['Wild Blueberry', 'Honeyed Meyer Lemon', 'Dark Cacao'],
    badge: 'RECOMMENDED',
    bagColor: '#8E2818',
  },
  {
    id: 'p-3',
    name: 'Antigua Volcanic Reserve',
    category: 'Volcanic Terroir',
    region: 'Antigua, Guatemala',
    altitude: '1,800m',
    process: 'Fully Washed',
    harvestYear: '2025',
    price: '$24.00',
    roast: 'Medium',
    roastDescription: 'Medium roast developed to caramelize natural brown sugars while preserving juicy blood orange acidity and toasted pecan sweetness.',
    description: 'Cultivated in mineral-dense volcanic soils between the peaks of Agua, Acatenango, and Fuego. Known for velvety chocolate weight, roasted nut complexity, and a long, warming brown sugar finish.',
    notes: ['Toasted Pecan', 'Blood Orange', 'Dark Brown Sugar'],
    badge: undefined, // Intentionally badge-free to maintain clean editorial hierarchy
    bagColor: '#3D404A',
  },
  {
    id: 'p-4',
    name: 'Nyeri Hill Peaberry',
    category: 'Limited Micro-Lot',
    region: 'Nyeri, Kenya',
    altitude: '2,050m',
    process: 'Double Washed (SL28)',
    harvestYear: '2026',
    price: '$29.00',
    roast: 'Light',
    roastDescription: 'Precisely roasted to caramelize dense peaberry sugars, creating a sparkling phosphoric juiciness and intense currant finish.',
    description: 'Dense, naturally rounded single-seed peaberries hand-selected from smallholder plots flanking Mount Kenya. Delivers an electric cup layered with blackcurrant vibrancy, grapefruit zest, and raw turbinado sugar.',
    notes: ['Blackcurrant', 'Pink Grapefruit', 'Brown Sugar'],
    badge: 'LIMITED EDITION',
    bagColor: '#D28368',
  },
  {
    id: 'p-5',
    name: 'Yirgacheffe Misty Valley',
    category: 'Single Origin',
    region: 'Yirgacheffe, Ethiopia',
    altitude: '2,000m',
    process: 'Slow Fermentation Washed',
    harvestYear: '2026',
    price: '$25.00',
    roast: 'Light',
    roastDescription: 'Gentle heat application to protect crystalline lemongrass brightness and clean floral aromatics without grassy astringency.',
    description: 'Sourced from the misty terraces of Yirgacheffe. A pristine washed lot characterized by delicate lemongrass aromatics, ripe apricot stone-fruit juiciness, and a clean wild honey linger.',
    notes: ['Lemongrass', 'Apricot', 'Wild Honey'],
    badge: 'NEW',
    bagColor: '#8FA187',
  },
  {
    id: 'p-6',
    name: 'Sumatra Gayo Highland Reserve',
    category: 'Single Origin',
    region: 'Aceh Gayo, Indonesia',
    altitude: '1,750m',
    process: 'Wet-Hulled Extended',
    harvestYear: '2025',
    price: '$23.00',
    roast: 'Medium-Dark',
    roastDescription: 'Deep roast development unlocking rich dark molasses sweetness, cedar aromatics, and full syrupy body without acrid char.',
    description: 'Grown under shade canopy in the volcanic highlands around Lake Laut Tawar in Aceh. Delivers a heavy syrupy mouthfeel, sweet cedar tones, and comforting baker’s chocolate richness.',
    notes: ['Dark Molasses', 'Sweet Tobacco', 'Cedar Wood'],
    badge: undefined, // Intentionally badge-free to maintain clean editorial hierarchy
    bagColor: '#1F4223',
  },
];
