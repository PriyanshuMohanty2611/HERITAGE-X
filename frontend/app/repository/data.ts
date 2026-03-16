import { Landmark, Library, ScrollText } from "lucide-react";

export type HeritageTopic = {
  id: string;
  name: string;
  icon: any;
  category: string;
  desc: string;
  image: string;
  source: string;
};

export type VirtualExhibit = {
  id: string;
  title: string;
  type: string;
  image: string;
  status: string;
  details: string;
  source: string;
};

export type UnsungHero = {
  id: string;
  name: string;
  title: string;
  period: string;
  region: string;
  desc: string;
  image: string;
  tags: string[];
  source: string;
};

export const HERITAGE_TOPICS: HeritageTopic[] = [
  {
    id: "indus-valley",
    name: "Indus Valley Civilization",
    icon: Landmark,
    category: "Ancient Urbanism",
    desc:
      "Grid-planned cities like Mohenjo-daro used covered brick drains linked to nearly every house, showing world-leading sanitation engineering.",
    image: "/assets/Ajanta Caves/ajanta-caves-5-to-8-3071.jpg",
    source: "https://kids.britannica.com/students/article/Indus-valley-civilization/275057",
  },
  {
    id: "ajanta-caves",
    name: "Ajanta Caves",
    icon: Library,
    category: "UNESCO (Cultural)",
    desc:
      "Thirty rock-cut Buddhist caves (2nd c. BCE–6th c. CE) with murals and chaitya halls that shaped South Asian painting traditions.",
    image: "/assets/Ajanta Caves/Sculptures-inside-the-rock-cut-caves-1.jpg",
    source: "https://whc.unesco.org/en/list/242/",
  },
  {
    id: "maurya-empire",
    name: "Mauryan Empire",
    icon: Landmark,
    category: "Classical Era",
    desc:
      "Subcontinent-wide polity under Ashoka promoted dhamma, rock edicts, and road networks that linked trade and pilgrimage routes.",
    image: "/assets/Red Fort/red_fort.png",
    source: "https://en.wikipedia.org/wiki/Maurya_Empire",
  },
  {
    id: "rampa-rebellion",
    name: "Rampa Rebellion (1922–24)",
    icon: ScrollText,
    category: "Freedom Struggles",
    desc:
      "A tribal uprising led by Alluri Sitarama Raju against the Madras Presidency’s forest policies and colonial police posts.",
    image: "/assets/Hampi Ruins/virupaksha-temple-hampi-karnataka-1-attr-nearby.jpg",
    source: "https://en.wikipedia.org/wiki/Rampa_Rebellion_of_1922",
  },
];

export const VIRTUAL_EXHIBITS: VirtualExhibit[] = [
  {
    id: "konark-360",
    title: "Sun Temple, Konark",
    type: "360° Walkthrough",
    image: "/assets/KONARK/konark_hero.png",
    status: "Active Node",
    details: "Neural scan of the 13th-century chariot temple with 24 stone wheels aligned to solar timekeeping.",
    source: "https://whc.unesco.org/en/list/246",
  },
  {
    id: "ajanta-caves",
    title: "Ajanta Caves Matrix",
    type: "Immersive 3D",
    image: "/assets/Ajanta Caves/ajanta-caves-5-to-8-3071.jpg",
    status: "Live Sync",
    details: "High-resolution fresco capture of Jataka tale panels with 5th–6th century Gupta-period pigments.",
    source: "https://whc.unesco.org/en/list/242/",
  },
  {
    id: "qutub-minar",
    title: "Qutub Minar Vertical",
    type: "Lidar Scan",
    image: "/assets/Sanchi Stupa/Qutub Minar/qutub1_042717100950.jpg",
    status: "Verified",
    details: "73 m sandstone victory tower rendered for structural health checks and masonry mapping.",
    source: "https://en.wikipedia.org/wiki/Qutb_Minar",
  },
];

export const UNSUNG_HEROES: UnsungHero[] = [
  {
    id: "pingali-venkayya",
    name: "Pingali Venkayya",
    title: "Designer of the Tricolour",
    period: "1876 – 1963",
    region: "Andhra Pradesh",
    desc:
      "Freedom fighter and vexillologist who drafted the prototypes that evolved into India’s 1947 Tiranga.",
    image: "https://timesofindia.indiatimes.com/photo/126015809.cms",
    tags: ["Vexillology", "Freedom Movement", "Flag Design"],
    source: "https://timesofindia.indiatimes.com/etimes/trending/who-designed-the-tricolour-the-national-flag-of-india/photostory/126015809.cms",
  },
  {
    id: "narinder-kapany",
    name: "Narinder Singh Kapany",
    title: "Father of Fiber Optics",
    period: "1926 – 2020",
    region: "Punjab",
    desc:
      "Coined the term “fiber optics,” demonstrated image transmission through glass fibers, and held 100+ patents.",
    image: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Narinder_Singh_Kapany.jpg",
    tags: ["Photonics", "Innovation", "Sikh Arts Patron"],
    source: "https://en.wikipedia.org/wiki/Narinder_Singh_Kapany",
  },
  {
    id: "rani-gaidinliu",
    name: "Rani Gaidinliu",
    title: "Naga Freedom Leader",
    period: "1915 – 1993",
    region: "Manipur/Nagaland",
    desc:
      "Led the Zeliangrong resistance and Heraka revival; imprisoned at 16 for anti-colonial organizing.",
    image: "https://upload.wikimedia.org/wikipedia/commons/3/3c/Rani_Gaidinliu_on_a_1996_stamp_of_India.jpg",
    tags: ["Indigenous Resistance", "Heraka Movement", "Padma Bhushan"],
    source: "https://en.wikipedia.org/wiki/Rani_Gaidinliu",
  },
  {
    id: "alluri-sitarama-raju",
    name: "Alluri Sitarama Raju",
    title: "Leader of Rampa Rebellion",
    period: "1897 – 1924",
    region: "Andhra Pradesh",
    desc:
      "Organized tribal fighters against British police posts during the 1922–24 Rampa (Manyam) rebellion.",
    image: "https://upload.wikimedia.org/wikipedia/commons/5/5c/Alluri_Sitarama_Raju_001.jpg",
    tags: ["Tribal Uprising", "Guerrilla Strategy", "Manyam"],
    source: "https://en.wikipedia.org/wiki/Alluri_Sitarama_Raju",
  },
  {
    id: "velu-nachiyar",
    name: "Rani Velu Nachiyar",
    title: "Veeramangai of Sivaganga",
    period: "1730 – 1796",
    region: "Tamil Nadu",
    desc:
      "First Indian queen recorded to wage war against the East India Company; reclaimed Sivaganga in 1780.",
    image: "https://upload.wikimedia.org/wikipedia/commons/0/0f/Rani_Velu_Nachiyar_Stamp.jpg",
    tags: ["Anti-EIC", "Women’s Leadership", "Sivaganga"],
    source: "https://en.wikipedia.org/wiki/Velu_Nachiyar",
  },
];

export function getRepositoryEntity(id: string) {
  const topic = HERITAGE_TOPICS.find((t) => t.id === id);
  if (topic) return { type: "topic", data: topic };

  const exhibit = VIRTUAL_EXHIBITS.find((e) => e.id === id);
  if (exhibit) return { type: "exhibit", data: exhibit };

  const hero = UNSUNG_HEROES.find((h) => h.id === id);
  if (hero) return { type: "hero", data: hero };

  return null;
}
