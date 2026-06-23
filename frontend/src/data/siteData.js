import {
  ChefHat,
  Sofa,
  Bed,
  Bath,
  UtensilsCrossed,
  Briefcase,
  Baby,
  Shirt,
  ArrowUpDown,
  LayoutPanelLeft,
  DoorOpen,
} from "lucide-react";

export const BRAND = {
  name: "Sahuja Interiors",
  logo: "/assets/new_logo.png",
  tagline: "Transforming Spaces into Experiences",
  email: "rajankumarrolly01@gmail.com",
  phone: "+91 96318 01881",
  address: "Plot 21, Linking Road, Bandra West, Mumbai 400050, Maharashtra, India",
  social: {
    instagram: "https://www.instagram.com/sahuja_interiors",
   
  },
  mapEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241317.11609823277!2d72.74109995!3d19.08219995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000",
};

export const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
  { label: "Workers", href: "#workers" }
];

export const SERVICES = [
  {
    id: "kitchen",
    title: "Modular Kitchen",
    icon: ChefHat,
    description:
      "Custom modular kitchens with premium hardware, smart storage and timeless finishes.",
  },
  {
    id: "living",
    title: "Living Room",
    icon: Sofa,
    description:
      "Considered living spaces balancing social warmth with architectural calm and craft.",
  },
  {
    id: "bedroom",
    title: "Bedroom Design",
    icon: Bed,
    description:
      "Private sanctuaries dressed in calm tones, soft textures and architectural lighting.",
  },
  {
    id: "bathroom",
    title: "Bathroom Design",
    icon: Bath,
    description:
      "Spa-inspired bathrooms in stone, brass and backlit glass — a daily luxury ritual.",
  },
  {
    id: "dining",
    title: "Dining Room",
    icon: UtensilsCrossed,
    description:
      "Hosting-ready dining rooms with sculptural tables, statement lighting and curated art.",
  },
  {
    id: "office",
    title: "Office Design",
    icon: Briefcase,
    description:
      "Workspaces that balance focus, culture and brand — built to grow with ambitious teams.",
  },
  {
    id: "kids",
    title: "Kids Room",
    icon: Baby,
    description:
      "Playful, safe and scalable rooms that evolve with your child from toddler to teen.",
  },
  {
    id: "closet",
    title: "Closet & Wardrobe",
    icon: Shirt,
    description:
      "Walk-in wardrobes and dressing suites engineered around your lifestyle and collection.",
  },
  {
    id: "staircase",
    title: "Staircase Design",
    icon: ArrowUpDown,
    description:
      "Sculptural staircases in wood, stone and steel — the sculptural heart of the home.",
  },
  {
    id: "hall",
    title: "Hall & Passage",
    icon: LayoutPanelLeft,
    description:
      "Halls and corridors treated as galleries — light, art and proportion in quiet dialogue.",
  },
  {
    id: "entry",
    title: "Entry & Foyer",
    icon: DoorOpen,
    description:
      "First impressions designed with intent — bespoke entryways that set the tone.",
  },
];

// Portfolio categories — single card per category on homepage; click opens dedicated gallery page
export const CATEGORIES = [
  {
    slug: "kitchen",
    name: "Kitchen",
    tagline: "Modular kitchens crafted around daily rituals.",
    cover:
      "https://images.pexels.com/photos/35189708/pexels-photo-35189708.jpeg?auto=compress&cs=tinysrgb&w=1400",
    gallery: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZxmX4rhIUBe2L6z5D8rUmWcUj3wxHT3N6dQ&s",
      "https://cms.interiorcompany.com/wp-content/uploads/2022/04/small-kitchen-reno-ideas-opt-straight-or-l-shaped-formats.webp",
      "https://www.greenply.com:5001/originalfile1768992527236-95.jpg",
      "https://george-project.com/wp-content/uploads/2025/06/Black-kitchens.webp",
      "https://cms.interiorcompany.com/wp-content/uploads/2024/05/appliance-size-and-placement-guidance-for-small-kitchen.png",
      "https://i.pinimg.com/736x/84/07/d3/8407d309f1522819b5bfadf8954b248d.jpg",
      "https://cdn.shopify.com/s/files/1/0634/9271/8835/files/small-simple-kitchen-design-with-island_600x600.jpg?v=1714928529",
      "https://goodhomes.wwmindia.com/content/2022/apr/simple-l-kitchen-design-by-zxp-design.jpg",
      "https://cdn.shopify.com/s/files/1/0558/5557/9327/files/127_480x480.jpg?v=1686336886",
      "https://imagecdn.99acres.com//microsite/wp-content/blogs.dir/6161/files/2023/07/Small-simple-kitchen-design.jpg",
      "https://images.squarespace-cdn.com/content/v1/65d325ddd662de7fdcb2411f/9f3314e7-9eea-4b1c-9993-f3b4aba22f03/Kitchen+-+Daastan+%E2%80%A2+One+Brick+At+A+Time.jpg",
      "https://www.woodsala.com/cdn/shop/articles/small_kitchen_design_ideas.jpg?v=1640697517&width=2048",
      "https://images.squarespace-cdn.com/content/v1/65d325ddd662de7fdcb2411f/9f3314e7-9eea-4b1c-9993-f3b4aba22f03/Kitchen+-+Daastan+%E2%80%A2+One+Brick+At+A+Time.jpg",
      "https://homzinterio.in/wp-content/uploads/2025/07/Parallal-Modular-Kitchen-Design.webp",
      "https://www.j7interior.com/wp-content/uploads/2022/02/middle-class-3-bhk-flat-interior-design-2.jpg"

    ],
  },
  {
    slug: "living-room",
    name: "Living Room",
    tagline: "Living spaces balancing social warmth with architectural calm.",
    cover:
      "https://images.pexels.com/photos/34538288/pexels-photo-34538288.jpeg?auto=compress&cs=tinysrgb&w=1400",
    gallery: [
      "https://hips.hearstapps.com/hmg-prod/images/small-living-rooms-living-room-angled-shot-1608655140.jpg?crop=0.449xw:1.00xh;0.158xw,0",
      "https://st.hzcdn.com/simgs/dff14fe90ba793cc_14-6962/_.jpg",
      "https://www.thespruce.com/thmb/2CBR1-OnbLcLjjHHWElt6n2kIIQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/SFinteriors-27-6320e29cf1144173871f3e0166b6e644.jpg",
      "https://cozyliving.com.au/cdn/shop/articles/living-room-designs-for-small-spaces.jpg?v=1716451365&width=1100",
      "https://images.livspace-cdn.com/w:3840/plain/https://d3gq2merok8n5r.cloudfront.net/abhinav/ond-1634120396-Obfdc/di-2026-1769081758-Ayx2Q/jfm-1769081772-NQyUm/li-1769098863-3uRws/42-1772707579-sGE5Y.jpg",
      "https://cdn.mos.cms.futurecdn.net/4FjhYND2dt3AgBXtwsN4G9.jpg",
      "https://www.wedezinestudio.com/blogs/wp-content/uploads/2025/12/499970223_1024603409785215_9063333717215654368_n-1024x768.webp",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCfaUgjBdR35FhsBjG_UrfZod8vGdZlxiQ9A&s",
      "https://hips.hearstapps.com/hmg-prod/images/small-living-room-ideas-2020-10-28-readmckendree-katierosenfeld-0161-v1-1673368435.jpg?crop=0.996316758747698xw:1xh;center,top",
      "https://cdn.mos.cms.futurecdn.net/Mmx7yPX3qgynkN7bGhAw9V.jpg",
      "https://media.architecturaldigest.com/photos/62f3c04c5489dd66d1d538b9/master/w_1600%2Cc_limit/_Hall_St_0256_v2.jpeg",
      "https://i.pinimg.com/564x/75/1a/5c/751a5cdb41aebb3f110f32a064cd0dea.jpg",
      "https://media.designcafe.com/wp-content/uploads/2023/07/02222144/living-room-decor-with-plants.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJB8YJV-YNEEm9IOPL_dgETqnKlyhJA0vHxA&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-DJjNYhgUGMRJFEuKfMxwdjw6pi1Y3DE6jg&s",
      "https://media.designcafe.com/wp-content/uploads/2025/12/07110613/living-room-trends%E2%80%8B-2026.jpg"
    ],
  },
  {
    slug: "bedroom",
    name: "Bedroom",
    tagline: "Private sanctuaries in calm tones and soft textures.",
    cover:
      "https://images.pexels.com/photos/6782578/pexels-photo-6782578.jpeg?auto=compress&cs=tinysrgb&w=1400",
    gallery: [
      "https://images.pexels.com/photos/6782578/pexels-photo-6782578.jpeg?auto=compress&cs=tinysrgb&w=1400",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2-hIGYbJ0RHWFJT9Kh-gNWRN3lWfEte91Mf5l1ikUYvTu499kHhNku74&s=10",
      "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1400&q=80",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdkhz-OEM7W7xg65SwGla34u8vnYNTZDjzOJ_RHZryisO23fonMylStbw&s=10",
      "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=1400&q=80",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoCXHO4HsT6bGEUwIJrJNVsSBmZwPLztKe2rhwyxYFPozOF-a69PHjR3b3&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdH-ykKp7Df8hSn1lhPNRbnBZkdkzf1ihfzgxGVALrdRKmQI5sf9PPSNwq&s=10",
      "https://images.unsplash.com/photo-1598928636135-d146006ff4be?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1400&q=80",
      "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgT-ae0xQgXv2-J_z8bdwW6buBbguk0R-VfzqIcfKnLervufcxbPNGQ_Ycxdqwa-RvxO4AH27VArv9RJghatvMUiji6O5rHq9XRser-hQualZVMZZQDFE4CLBVuB_nC__rWESOjwCfK4of3JjnbU26XP4iO_QMbStmzT_pDoSANr4nyGXHA5Y1RRgur_DQ/s1350/primary-bedroom-decor-ideas-09.jpg",
      "https://media.designcafe.com/wp-content/uploads/2021/04/28110847/middle-class-indian-bedroom-design.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROMfY8ADPYavGuw0LiYTVnJVCRYm9Hun4IPIVCvMPqQGEbzGlQQC9j-Ak&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXkgUb6T-IdQAVt7fW7cPp4F9wDJVFvUFbxmkloYiaw5pMCdtJGIUSBSI&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIn3yYg1hFM3u5_8fVrKwSpEJRRhh7K4ECVfdEZ7uRrj7uPYYlKJGnQoQ&s=10",
      "https://images.homify.com/v1502278897/p/photo/image/2170646/01.jpg",
      "https://i.pinimg.com/736x/63/d0/59/63d0595273f6ff2221563e48717c662d.jpg",
      "https://i.pinimg.com/736x/4a/dc/13/4adc13935c4266448b35d8426ed002dd.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAK7efTZoyyjN5vtOGeD1MKHlD_iZ9ZMr9y-rGHF_H9XjvHVxnCwLJnb4&s=10"
    ],
  },
  {
    slug: "bathroom",
    name: "Bathroom",
    tagline: "Spa-inspired bathrooms in stone, brass and backlit glass.",
    cover:
      "https://images.pexels.com/photos/33599113/pexels-photo-33599113.jpeg?auto=compress&cs=tinysrgb&w=1400",
    gallery: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSa-TVQBMrr-Af4ViL_2wvb7DKlxOBjXMXnNkCHZM677l8C3M-jQfG1sBQ&s=10",
      "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1400&q=80",
      "https://i.pinimg.com/736x/0d/8d/45/0d8d451ef2f2eecf040b38049febdf27.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAr0uhjrj9P9g8p4jljNaTMO_VS4A52ajFRXuhFdAry_9q-iXJ9hyoXT6I&s=10",
      "https://media.houseandgarden.co.uk/photos/67e3de2d976ef149db31d443/master/w_1600%2Cc_limit/Shot-22-671_RT.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0kaScOW3pEy7_8gtevX02oCoRLeJm5vD3ObCodIoktef9BB9LqwgAfAiN&s=10",
      "https://media.designcafe.com/wp-content/uploads/2021/12/02152231/7-bathroom-design-hacks-for-small-spaces.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToTNksSEy-dPhxckg0lLQ0iD8nR3Yz5CmnB0hqvQ4Nw7q2wybHI8bykBQF&s=10",
      "https://simpolo-web.s3.ap-south-1.amazonaws.com/uploads/media/blog/Slimline-Back-to-Wall-WC-with-Dual-Flush.jpg",
      "https://img.staticmb.com/mbimages/interiorDesignerCMS/decorPartner/357/projectImage/Unique%20bathroom%20design%20Delhi%2013.jpg.webp",
      "https://www.asenseinterior.com/assets/mediafile/pflo_gal__DSC00398-HDR7.webp",
      "https://i.pinimg.com/736x/69/47/2a/69472aa13bed4f583cd73759f2c2a53f.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrnih0gO12bjq_mM6g60VyXPWBAxvLdQATuDlftX9O0vVjthzWd8eP_7vK&s=10",
      "https://s3-blog.homelane.com/design-ideas-pre/wp-content/uploads/2022/09/bathroom-tub-design.jpg",
      "https://img.staticmb.com/mbimages/interiorDesignerCMS/decorPartner/95/projectImage/low-budget-bathroom-design3.jpg.webp",
      "https://smartscalehousedesign.com/wp-content/uploads/2025/05/15_5_11zon.jpg"
    ],
  },
  {
    slug: "dining",
    name: "Dining",
    tagline: "Hosting-ready dining rooms with sculptural presence.",
    cover:
      "https://images.unsplash.com/photo-1615874959474-d609969a20ed?auto=format&fit=crop&w=1400&q=80",
    gallery: [
      "https://www.greenply.com:5001/originalfile1769087921462-7166.jpg",
      "https://d3gq2merok8n5r.cloudfront.net/abhinav/ond-1634120396-Obfdc/jfm-2024-1704560007-SGQ6F/dining-1705599441-VQG3B/dr-11-1707297630-kTCCH.jpg",
      "https://www.greenply.com:5001/originalfile1768993285849-287.jpg",
      "https://images.bergerpaints.com/s3fs-public/inline-images/Sky%20Blue%20And%20Off%20White%20Dining%20Room.png?VersionId=.7RjSxm04.T4XG_Ljn.WJ2SaPgQsQcQ4&format=webp&width=1920&quality=75",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcST_6fzBrrfYzWkG4kJDiDDFhYhNRwwUspGxy2N2bKffG8Z6T4k0rwClXm8&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8H-CEEcHrKvmu-YhQPGV2MQQ1C33sCaX_xmnEW-wkB-VKGY_rvK87qkM&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSe_OuK-3dPoS48uoXubKIbX5gAeW3vlGRdRSn2Qz8iYXGWSjt5ILX3hB0&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRL7hp5dOiQSfw9tYw_LI9wSEv2Rirh3L1BL6cVQZYUk20TLWtuGwF8TKsb&s=10",
      "https://m.media-amazon.com/images/I/81kO5sqzrAL._AC_UF894,1000_QL80_.jpg",
      "https://thetimberguy.com/cdn/shop/products/Solid-Sheesham-Wood-Designer-Dining-table-with-Cushioned-Chair-Bench-furniture-set-CHOOSE-YOUR-COMBINATION-7_4054436f_1200x.jpg?v=1764266926",
      "https://5.imimg.com/data5/SELLER/Default/2022/2/FV/YQ/QB/145514617/wooden-dining-table-set-500x500.jpg",
      "https://cdn.shopify.com/s/files/1/0671/6506/1172/files/dining-table-trends-2026.webp?v=1767481457",
      "https://5.imimg.com/data5/ANDROID/Default/2023/1/NQ/TL/JF/184122996/product-jpeg-500x500.jpg",
      "https://casagold.in/cdn/shop/files/dinning-table-Glass_Top_Wooden_Frame_Luxury_Dining_Table.webp?v=1735819307&width=2048",
      "https://assets.architecturaldigest.in/photos/660190c12fab87310db04993/master/w_1600%2Cc_limit/5-Dining%25202.jpg",
      "https://media.designcafe.com/wp-content/uploads/2022/05/08180746/small-dining-table-design-for-a-quick-brekkie.jpg",
      "https://jumanji.livspace-cdn.com/magazine/wp-content/uploads/sites/2/2022/03/06181125/Cover-01-3.png",
      "https://jumanji.livspace-cdn.com/magazine/wp-content/uploads/sites/2/2021/02/10184329/BLR_Rajat-Malhotra_25.jpg",
    ],
  },
  {
    slug: "office",
    name: "Office",
    tagline: "Workspaces built for focus, culture and ambition.",
    cover:
      "https://images.pexels.com/photos/35058546/pexels-photo-35058546.jpeg?auto=compress&cs=tinysrgb&w=1400",
    gallery: [
      "https://images.pexels.com/photos/35058546/pexels-photo-35058546.jpeg?auto=compress&cs=tinysrgb&w=1400",
      "https://www.greenply.com:5001/originalfile1769069303799-704.jpg",
      "https://deftdecor.com/wp-content/uploads/elementor/thumbs/simple-best-office-interior-design-1-rb09g1dxy8bgwoq46sqhdgnyqby5bzec4quaahl4d4.webp",
      "https://www.greenply.com:5001/originalfile1769069303799-704.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSi8Ux2j-USRdPKeZdpGVgg_0BOZqFNywtHkXS2zIFlHz0hZAp22WJ0aakE&s=10",
      "https://royaletouche.gumlet.io/wp-content/uploads/2024/10/11181113/NM-BL-8010.png?compress=true&quality=80&w=1500&dpr=2.6",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTm3Zugglj4KWHJV3LcRg5jvSz8E-O4nWrV7RMXuur7zi8LJEr35XxW_2E&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXs1djepGtXcA7qCKyqylnB4mHhTqo6NwlKhe2TqDYV3j1ZKdQYcSiyyk&s=10",
      "https://sec-group.co.uk/wp-content/uploads/2023/10/Feautured-in-text-image-1.jpg",
      "https://media.designcafe.com/wp-content/uploads/2025/09/10193407/small-office-design-at-home-essential-tips.jpg",
      "https://i.pinimg.com/236x/de/b3/d5/deb3d546edbb5757062909d29d378c2f.jpg",
      "https://i.pinimg.com/236x/43/45/df/4345df6817cf5a8636be47cfe03b2f39.jpg",
      "https://i.pinimg.com/236x/de/f6/bd/def6bde065d9bd0e9a6a6047f3b14d37.jpg",
      "https://media.architecturaldigest.com/photos/56b524de4ac3d842677b9ac0/master/w_1024%2Cc_limit/home-office-01.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6jWale5i2BvLEZzknCxDVUBIjtd0bXgAhKm1pSABVy4VttwtdspqiyBfJ&s=10",
      "https://st.hzcdn.com/simgs/07d1c6bc0bdca312_14-5491/home-design.jpg",
      "https://skvindia.com/wp-content/uploads/2024/09/Types-of-modern-office-interior-design-banner.webp",
    ],
  },
  {
    slug: "kids-room",
    name: "Kids Room",
    tagline: "Playful rooms that evolve with your child.",
    cover:
      "https://images.pexels.com/photos/11664582/pexels-photo-11664582.jpeg?auto=compress&cs=tinysrgb&w=1400",
    gallery: [
      "https://hips.hearstapps.com/hmg-prod/images/edc030122davis-002-1644012951.jpg",
      "https://cdn.shopify.com/s/files/1/0085/5513/5039/files/3_1024x1024.jpg?v=1614194230",
      "https://cdn.shopify.com/s/files/1/0085/5513/5039/files/244393996_2409658912499141_9149578511716969265_n_1024x1024.jpg?v=1633777852",
      "https://media.designcafe.com/wp-content/uploads/2020/11/17163659/kids-bedroom-design-for-boys-and-girls.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfx2xxf1ZgmJqaQsDFo4__EVSyt3762mSxpRyYk1MVu8Tpj0RJUViOcGlB&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfw0-u2MmESsoiJdt7I9mWwHnoS5UfQCbhoyoOusMAI2l917Mpwy9bSEQ&s=10",
      "https://i.pinimg.com/236x/20/5d/e1/205de1eb97a7d85644ffbfd05518e37f.jpg?nii=t",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXMyqURBZ7EOUwVcH7yXZ6iJ2f5HbX2wEc_waH_tX14hKRJoymy8L2F_Ec&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrVKN4lvenZSscjkKD0OrpTrMvVnSBuCGpoCqFZQ5tZuhOQTZcLTcII6Y&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQInXltpVysSSfrSLQ4cUMlroQB6J4BnpisEI4IibOAE9P5yChZI8C2XD2U&s=10",
      "https://i.pinimg.com/236x/40/ef/1d/40ef1dfc9e57628f4f2eddc54a0877ae.jpg",
      "https://i.pinimg.com/736x/71/69/98/7169982922b46ebd3d0946cbebc0e5b7.jpg",
      "https://media.designcafe.com/wp-content/uploads/2020/05/13153548/kids-playroom-corner-design.jpg",
      "https://i.pinimg.com/736x/10/32/9e/10329ed499b0b15e865827a7ba4946a1.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeMlo1No0VlTqNw0RMEUdL0gO4gUOKq67bnC_9cEbHGOzSiArmfNQRBzU&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-LLYMcFEszRy_afbAuEXUa-xc9yTNwiVLv--_h5lxJcEug-MFwSOmqv8&s=10",
      "https://d3gq2merok8n5r.cloudfront.net/abhinav/designs-sg-1633500163-pPxOT/1-amj-2023-1678256902-aJXfn/collections-1678256918-1W0dL/kids-bedroom-1678461282-3mKth/image-6483441-23-1684139818-Pfi57.JPG",

    ],
  },
  {
    slug: "closet",
    name: "Closet",
    tagline: "Walk-in wardrobes engineered around your collection.",
    cover:
      "https://images.unsplash.com/photo-1558997519-83ea9252edf8?auto=format&fit=crop&w=1400&q=80",
    gallery: [
     "https://www.asenseinterior.com/assets/mediafile/wardrobe___________.webp",
     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWEJvDcJvGvdXzktKFK59Bm0RLPQXJLZakKqaEN4Xj8s-li8RkMbbTjXRe&s=10",
     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvn7R7HpC3hJp0wBeOSH8DSesvk2ftKkqgBK1ekCD3C2Pu7sd0duoxJFA&s=10",
     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLSheBT28e8DUV_b-zXTYOhGqFiOk7njOh7AwOMIeZKs4hmAiZV6LyhdY&s=10",
     "https://i.pinimg.com/236x/f6/61/ea/f661ea16ac675f53f5a54457d584da42.jpg",
     "https://media.designcafe.com/wp-content/uploads/2022/04/01164258/elegant-white-wardrobe-designs-for-bedroom.jpg",
     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3uRpOJLoGqhEQzHFGVs_RZI0fw7DTWWR34ALVgUkclQ-khpgDsl7jJsk&s=10",
     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9GIn5_xhMzCkq5uatpuD2YO0VLKWkq66Ng_BqiS4WInntOclVCD7ZUK4f&s=10",
     "https://www.ikea.com/ext/ingkadam/m/6a8be49e66efbd0c/original/PH179867-crop001.jpg?f=s",
     "https://st.hzcdn.com/simgs/db3172e403cfb2d4_14-2345/home-design.jpg",
     "https://m.media-amazon.com/images/I/71us1uAO28L.jpg",
     "https://i.pinimg.com/736x/ec/d2/c9/ecd2c9b9f202c22d163e4a302f3f8e80.jpg"
    ],
  },
  {
    slug: "staircase",
    name: "Staircase",
    tagline: "Sculptural staircases — the heart of the home.",
    cover:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqogZqbaWx5LQ66O0ZQJmfHA8ld_UyV3N4Ug&s",
    gallery: [
      "https://i.ytimg.com/vi/8CCuLR5-wiQ/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCYPzFmG7klBH9ay9NtUGx7ZonmVA",
      "https://image.made-in-china.com/2f0j00iuUMPwynGJkB/Stair-Railing-Designs-Modern-Steel-Stairs-Residential-Staircases.webp",
      "https://www.decorilla.com/online-decorating/wp-content/uploads/2022/02/easy-staircase-decorating-ideas-the-spruce.jpeg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGJPtWvlPsqFK4AtJc9u6btmaU12a9QlZUYw&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-ZL9_omgG-EdhVtPdtiHbc-1UmGsBM6gW8g&s",
      "https://i.pinimg.com/736x/0a/f6/58/0af658a4f0bdbd87bdcb690d613cd168.jpg",
      "https://www.marthastewart.com/thmb/1uHXAwZYh750WlxetCG4BzzHql8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/AH_Warner_04-4b39f1b40ad346178959cc588cb29ec2.JPG",
      "https://www.decorpot.com/images/189180808410-modern-staircase-designs-2024-for-indian-homes.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRT0fiICNUbNPDDotyOYjZk2hH19YLVvvT0RA&s",
      "https://media.designcafe.com/wp-content/uploads/2019/11/17055840/spiral-staircase-design-for-indian-homes-1024x1024.jpg",
      "https://st.hzcdn.com/simgs/4f210aa103ecbf8e_14-2846/_.jpg",
      "https://i.pinimg.com/564x/00/75/39/0075392f81fdec4fffc630cf675b20bf.jpg",
      

    ],
  },
  
  {
    slug: "entry",
    name: "Entry",
    tagline: "First impressions designed with intent.",
    cover:
      "https://media.designcafe.com/wp-content/uploads/2025/06/13170808/latest-wooden-main-door-design.jpg",
    gallery: [
      "https://www.beautifulhomes.asianpaints.com/content/dam/asianpaintsbeautifulhomes/gallery/door-design/classic-moulded-panel-main-door-in-warm-walnut/classic-wooden-entrance-with-warm-lighting.jpg.transform/bh-gallery-listing/image.webp",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbj-Uph0yjpJWXlsAqL24k0Loa7D7yXjjg_g&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSKlPlftSed2XeCj0Usn-iHMPWnyfr1Vtc3g&s",
      "https://i.pinimg.com/236x/7f/e0/1c/7fe01c1240fb0605a9e275ddd850566a.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSvtAPmWOijx6gY54w3QM_MeUa774z-jx91A&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0YJM5F6I6dKZ-BG6l4opO8YTGH1yS6d461g&s",
      "https://fancyhouse-design.com/wp-content/uploads/2024/08/The-current-wooden-portal-showcases-clean-lines-and-understated-elegance.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7QOl48YTSlsCOh78qs1oy8ACJ9j_T3jC0og&s",
      "https://thumbs.dreamstime.com/b/grand-entrance-luxurious-modern-home-grand-entrance-luxurious-modern-home-featuring-tall-arched-facade-expansive-378952885.jpg",
      "https://i.pinimg.com/originals/46/5e/9d/465e9d68a3ee1e1e71e97b658fc9ee7b.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRadSI-7V2yR3aqmMvWLOSHK6TKxn6yv7TVg&s",
      "https://fabdiz.com/wp-content/uploads/2025/06/Jalli-Door-Panel-Deisgn-1024x683.webp",
      "https://i.ytimg.com/vi/n-qJm9w65zY/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBVIV5ieq0-idOEKz6vC2y-YsFf5g",
      "https://www.beautifulhomes.asianpaints.com/content/dam/asianpaintsbeautifulhomes/gallery/door-design/contemporary-beige-door-with-linear-jali-panel/minimalist-entrance-with-illuminated-door.jpg.transform/bh-gallery-listing/image.webp",
    ],
  },
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: "Priya Nair",
    role: "Homeowner, Mumbai",
    quote:
      "Sahuja Interiors reimagined our apartment with such restraint and taste — every corner feels considered yet effortless.",
    rating: 5,
  },
  {
    id: 2,
    name: "Arjun Mehta",
    role: "Founder, Northline Ventures",
    quote:
      "They delivered our 12,000 sq ft office on time, on budget and twice as beautiful as we'd imagined.",
    rating: 5,
  },
  {
    id: 3,
    name: "Rhea Kapoor",
    role: "Restaurateur",
    quote:
      "The space they designed became the story of our brand. Guests photograph the interiors before the food.",
    rating: 5,
  },
  {
    id: 4,
    name: "Kabir & Ananya",
    role: "Villa Owners, Lonavala",
    quote:
      "Detailed, patient and genuinely creative. The kind of studio you recommend without hesitation.",
    rating: 5,
  },
];

export const PROCESS_STEPS = [
  {
    number: "01",
    title: "Consultation",
    description:
      "We begin with a conversation — understanding how you live, work and what moves you visually.",
  },
  {
    number: "02",
    title: "Design Planning",
    description:
      "Concept boards, space planning, material palettes and 3D visualisations refined to your taste.",
  },
  {
    number: "03",
    title: "Execution",
    description:
      "Our in-house team and trusted craftsmen bring the design to life with uncompromising detail.",
  },
  {
    number: "04",
    title: "Delivery",
    description:
      "A styled handover — furniture, art and finishing touches installed, ready for you to move in.",
  },
];

export const ABOUT = {
  overline: "About the Studio",
  heading: "Interiors designed with intention, crafted with care.",
  body: "Sahuja Interiors is a full-service design studio creating residential, commercial and hospitality spaces across India. With more than a decade of craft, 200+ completed projects and a quiet obsession with material and light, we design interiors that feel as good as they look.",
  stats: [
    { value: "12+", label: "Years of Craft" },
    { value: "200+", label: "Projects Delivered" },
    { value: "40+", label: "Cities Served" },
    { value: "98%", label: "Client Retention" },
  ],
  image:
    "https://images.pexels.com/photos/37178230/pexels-photo-37178230.jpeg?auto=compress&cs=tinysrgb&w=1200",
};

export const HERO_IMAGE =
  "https://images.pexels.com/photos/34277650/pexels-photo-34277650.jpeg?auto=compress&cs=tinysrgb&w=1920";
