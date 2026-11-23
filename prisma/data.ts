// Project catalogue for Makers Real Estates.
// Source: imicegypt.com project pages for Fifth Settlement, Mostakbal City,
// New Heliopolis, the New Administrative Capital and the Sixth Settlement.

export type SeedCity = {
  name: string;
  nameAr: string;
  slug: string;
  projectCount: number;
  image: string;
  description: string;
};

export type SeedDeveloper = { name: string; slug: string; description?: string | null; website?: string | null };

export type SeedProject = {
  name: string;
  slug: string;
  city: string;
  developer: string | null;
  category: string;
  unitTypes: string;
  unitArea: string | null;
  priceFrom: number | null;
  pricePerSqm?: number | null;
  downPayment: number | null;
  installmentYears: number | null;
  deliveryDate?: string | null;
  image: string;
  featured: boolean;
  sourceUrl: string;
  description: string;
};

export const cities: SeedCity[] = [
  {
    "name": "Fifth Settlement",
    "nameAr": "التجمع الخامس",
    "slug": "fifth-settlement",
    "image": "/projects/zed-east-new-cairo.webp",
    "description": "New Cairo's most established premium address — the American University, 90th Street retail, international schools and direct Ring Road access.",
    "projectCount": 12
  },
  {
    "name": "Mostakbal City",
    "nameAr": "المستقبل سيتي",
    "slug": "mostakbal-city",
    "image": "/projects/the-valleys-mostakbal-city-compound.webp",
    "description": "A planned city east of New Cairo with wide roads, large green areas and one of the fastest-growing compound belts in Greater Cairo.",
    "projectCount": 4
  },
  {
    "name": "New Heliopolis",
    "nameAr": "هليوبوليس الجديدة",
    "slug": "new-heliopolis-city",
    "image": "/projects/talala-new-heliopolis.webp",
    "description": "A green, low-density suburb on the Cairo–Suez road, minutes from the airport and directly connected to the New Administrative Capital.",
    "projectCount": 2
  },
  {
    "name": "New Administrative Capital",
    "nameAr": "العاصمة الإدارية",
    "slug": "new-administrative-capital",
    "image": "/projects/celia-new-capital.webp",
    "description": "Egypt's new government and business city — the Green River, the financial district and a fast-expanding residential ring.",
    "projectCount": 12
  },
  {
    "name": "Sixth Settlement",
    "nameAr": "التجمع السادس",
    "slug": "sixth-settlement",
    "image": "/projects/hyde-park-central-new-cairo.webp",
    "description": "Leafy, established New Cairo district with strong rental demand, Hyde Park and a mature stock of family compounds.",
    "projectCount": 12
  }
];

export const developers: SeedDeveloper[] = [
  {
    "name": "Al Ahly Sabbour",
    "slug": "al-ahly-sabbour",
    "description": "Al Ahly Sabbour is a prominent name in the field of real estate development in Egypt, with over thirty years of experience in combining modern knowledge with architectural innovation. Founded by renowned engineer Hussein Sabbour, who has a proven track record of achievements, he has set high standards for implementing innovative real estate projects."
  },
  {
    "name": "Al Aliaa Development",
    "slug": "al-aliaa-development",
    "description": "Al Aliaa Development is a real estate company that began with a clear and ambitious investment vision, resulting from an Arab partnership that brings together the expertise and investment perspectives of Saudi, Yemeni, and Libyan partners. This collaboration has provided the company with a diverse knowledge base and planning experience that enables it to offer development ideas that keep pace with changes in the sector."
  },
  {
    "name": "Al Qamzi Developments",
    "slug": "al-qamzi-developments",
    "description": "Founded in the UAE in 1997, Al Qamzi Developments has accumulated over 25 years of extensive experience in contracting, construction, real estate development, and infrastructure before entering the Egyptian market in 2010. The company leveraged the growth potential and vast opportunities in the Egyptian real estate sector to deliver distinguished projects combining quality, modern design, and real value."
  },
  {
    "name": "Artal Development",
    "slug": "artal-development",
    "description": "Artal New Capital was founded in 1997 as a result of a partnership that combined Egyptian expertise with Saudi expertise within the Saudi BeBadr Group. The company began its journey in the Heliopolis neighborhood with upscale residential projects, then gradually expanded into New Cairo, specifically along 90th Street, strengthening the presence of Artal New Capital in the Egyptian real estate market."
  },
  {
    "name": "Astra Rise Developments",
    "slug": "astra-rise-developments",
    "description": "Astra Rise Developments is one of the promising and leading entities that has successfully entered the real estate development field with innovative investment concepts. The company introduced a entirely different strategic vision based on providing unconventional real estate solutions and applying the highest international quality standards across all its projects."
  },
  {
    "name": "Better Home Developments",
    "slug": "better-home-developments",
    "description": "Better Home Development is one of the leading real estate companies in Egypt, founded in 2003. With over 20 years of experience, the company has proven itself by delivering high-quality residential and commercial projects with modern designs, making it a preferred choice for customers."
  },
  {
    "name": "City Edge Developments",
    "slug": "city-edge-developments",
    "description": "City Edge Real Estate Development is one of Egypt's leading developers of integrated residential and commercial projects, known for high global engineering and design standards, diverse unit sizes and flexible payment plans. Its portfolio includes Lush Valley New Cairo and Jade Park New Capital, combining modern infrastructure with sustainable, serviced communities."
  },
  {
    "name": "Cred Developments",
    "slug": "cred-developments",
    "description": "Cred Developments was established in 1982 and has a rich history in the real estate sector. Its journey began in Jeddah, Saudi Arabia, as a result of a collaboration between Castle Developments and the Egyptian Exchange and Clearing Company. Over the years, Cred has successfully delivered world-class residential communities, earning it a prestigious reputation in the market."
  },
  {
    "name": "Dar Al Alamia Developments",
    "slug": "dar-al-alamia-developments",
    "description": "Dar Al Alamia Developments is one of the most prominent entities in the Egyptian real estate market, distinguished by its investments exceeding billions of dollars. The company includes a team of distinguished engineers and consultants, giving it extensive experience in implementing major residential and commercial projects."
  },
  {
    "name": "Hassan Allam Developments",
    "slug": "hassan-allam-developments",
    "description": "Hassan Allam Developments is the developer behind The Valleys Compound, bringing more than 50 years of experience in the Egyptian real estate market. Founded by Engineer Hassan Allam in 1936, the company has built a strong and trusted reputation across both the Egyptian and Arab real estate sectors."
  },
  {
    "name": "HDP Developments",
    "slug": "hdp-developments",
    "description": "HDP Housing and Development Properties is one of the most prominent real estate companies in Egypt with over 21 years of experience in property development since its establishment in 2006 and it has successfully delivered a range of luxurious residential and commercial projects."
  },
  {
    "name": "Home Town Developments",
    "slug": "home-town-developments",
    "description": "Home Town Developments is an Egyptian developer whose portfolio includes Home Residence New Cairo, a modern residential community with multiple apartment layouts, landscaped surroundings and long instalment options."
  },
  {
    "name": "Hyde Park Developments",
    "slug": "hyde-park-developments",
    "description": "Hyde Park Developments is the developer behind Hyde Park New Cairo, with a presence in Egypt's real estate market dating back to 2007. The company has developed projects across residential, commercial, and recreational sectors, focusing on large-scale communities and destinations rather than individual residential buildings."
  },
  {
    "name": "IL Cazar Developments",
    "slug": "il-cazar-developments",
    "description": "IL Cazar Developments represents the modern iteration of the Khozam Group, a real estate development company founded in 1960, building upon over 60 years of experience in the Egyptian market. The company is led by Eng. Nader Khozam, Chairman and CEO."
  },
  {
    "name": "Jadeer Group Developments",
    "slug": "jadeer-group-developments",
    "description": "Founded in 2006, Jadeer Group Developments has successfully established its name over two decades as a trusted brand that merges innovative architectural thinking with a strict commitment to delivery timelines."
  },
  {
    "name": "Kleek Developments",
    "slug": "kleek-developments",
    "description": "Kleek Developments entered the Sixth Settlement with Noll as a flagship residential project. The company's management draws on long experience in real estate and works with specialized consultants and contractors to deliver the project according to modern development standards."
  },
  {
    "name": "La Vista Developments",
    "slug": "la-vista-developments",
    "description": "La Vista Developments is one of the leading real estate companies in the Egyptian market. Since its establishment in 1991, the company has built a strong reputation as a trusted partner in the real estate sector. La Vista ensures high-quality standards in all its projects, enhancing client and investor confidence, making it one of the most respected and recognized real estate developers in the country."
  },
  {
    "name": "Madinat Masr",
    "slug": "madinat-masr",
    "description": "Madinet Masr is one of the oldest real estate development companies in Egypt, having begun its journey in 1959 under the name Nasr City for Housing and Development. In 2023, the company launched its new identity, Madinat Masr to reflect its renewed vision for expansion across the country."
  },
  {
    "name": "Madinet Masr",
    "slug": "madinet-masr",
    "description": "Madinet Masr is a leading Egyptian real estate development company established in 1959, with more than 60 years of achievements that have transformed the country's urban landscape. The company combines quality, innovation and sustainability, working with global and local partners on projects such as Taj City and Shark Tank Business Park."
  },
  {
    "name": "Matter Makers Developments",
    "slug": "matter-makers-developments",
    "description": "Matter Makers Developments belongs to the new generation of ambitious developers who have made a significant impact on the Egyptian real estate market with a Libyan vision and extensive regional experience."
  },
  {
    "name": "Modon Developments",
    "slug": "modon-developments",
    "description": "Modon Developments is one of the leading real estate developers in Egypt, with over 30 years of extensive experience Over the years, the company has successfully delivered major projects, earning the respect and trust of a large client base."
  },
  {
    "name": "Mountain View Developments",
    "slug": "mountain-view-developments",
    "description": "Mountain View Developments is one of the well-established real estate companies in the Egyptian market, founded in 2005. The company has delivered a series of projects distinguished by quality, innovation, and diversity. It relies on specialized engineering and design teams to develop modern residential communities that meet the needs of different buyer segments."
  },
  {
    "name": "Nawasy Developments",
    "slug": "nawasy-developments",
    "description": "Nawassy Developments is one of the leading real estate development companies in Egypt. The company is distinguished by its innovative vision and its commitment to providing high-quality real estate projects that meet the growing needs of the Egyptian market."
  },
  {
    "name": "New Event Developments",
    "slug": "new-event-developments",
    "description": "Behind Layal New Capital Project stands one of the most influential real estate entities in the Arab region, New Event Developments. The company began its journey more than 12 years ago in the United Arab Emirates, specifically in Abu Dhabi, where it built its expertise by delivering projects characterized by engineering precision and architectural luxury."
  },
  {
    "name": "Novara Developments",
    "slug": "novara-developments",
    "description": "Novara Developments is spearheading the Giza Downtown Towers project, having recently emerged as a notable player in the Egyptian real estate market. The company operates based on an investment vision rooted in an Egyptian-Saudi partnership, aiming to deliver real estate projects that combine high-quality execution with prime locations offering promising investment potential."
  },
  {
    "name": "ORA Developers",
    "slug": "ora-developers",
    "description": "Ora Developers is one of the leading real estate companies in Egypt and abroad, led by businessman Naguib Sawiris. The company is known for high-quality residential units, elegant designs and collaboration with leading engineering consultants, including on Zed East New Cairo."
  },
  {
    "name": "Palm Hills Developments",
    "slug": "palm-hills-developments",
    "description": "Palm Hills New Capital, the developer and owner of Village de la Capitale New Capital, is one of the leading real estate companies in the Egyptian market since its establishment in 1997. The company has successfully built a development model focused on creating integrated communities that go beyond traditional housing, offering a balanced lifestyle based on smart planning and high-quality execution."
  },
  {
    "name": "Paragon Developments",
    "slug": "paragon-developments",
    "description": "Paragon Developments is the developer behind Sumou Boulevard Compound, and it is considered one of the leading real estate companies with more than 20 years of experience in the industry. The company began its journey in Saudi Arabia, where it delivered exceptional projects before expanding into the Egyptian market."
  },
  {
    "name": "SODIC Developments",
    "slug": "sodic-developments",
    "description": "SODIC is one of Egypt's most prominent real estate developers, with a long history and extensive experience in the sector. The company is known for integrating recreational and service amenities alongside essential services within the communities it develops, extending beyond housing alone."
  },
  {
    "name": "Squares Developments",
    "slug": "squares-developments",
    "description": "Squares Developments is considered one of the emerging real estate developers in the Egyptian market, rapidly gaining momentum due to the strong expertise of its founders in development, construction, and project management. This has enabled the company to deliver high-standard developments within the New Administrative Capital."
  },
  {
    "name": "Style Home Development",
    "slug": "style-home-development",
    "description": "Style Home owns a portfolio of real estate projects in various locations across Egypt, helping it strengthen its market position and attract clients and investors with its clear distinction. The company was founded in 2002 as a real estate developer specializing in residential and commercial projects."
  },
  {
    "name": "Talaat Moustafa Group",
    "slug": "talaat-moustafa-group",
    "description": "Talaat Moustafa Group Developments founded in 2007 by Engineer Hisham Talaat Moustafa, the company has developed over the years into one of the largest and most prestigious investment companies in the Middle East. As an Egyptian joint-stock company, it has successfully overseen the development of numerous major projects."
  },
  {
    "name": "Tameer Developments",
    "slug": "tameer-developments",
    "description": "Tameer Developments is one of the most prominent real estate entities in Egypt. Founded in 1954 under the name Tameer Engineering Consulting Company, the company has proven its high efficiency in delivering residential and commercial projects that have impressed many clients and investors."
  },
  {
    "name": "Tharaa Developments",
    "slug": "tharaa-developments",
    "description": "Tharaa Real Estate Development is one of Egypt’s leading real estate companies, established in 2019 with the goal of transforming the concept of modern residential communities."
  },
  {
    "name": "Waterway Developments",
    "slug": "waterway-developments",
    "description": "Behind W55 Waterway Mall stands a major real estate powerhouse, Waterway Developments. Since its strong launch in 2018, the company has successfully redefined the concept of luxury real estate in Egypt, transforming the Waterway Developments name into a symbol of premium quality, refined execution, and international standards."
  },
  {
    "name": "Winvestor Developments",
    "slug": "winvestor-developments",
    "description": "Behind Aurevia Winvestor stands a strong economic alliance and a strategic cross-border partnership. Winvestor Developments was established as a result of a major integration of expertise between the Egyptian and Saudi real estate markets."
  }
];

export const projects: SeedProject[] = [
  {
    "name": "Azad New Cairo",
    "slug": "azad-new-cairo",
    "city": "fifth-settlement",
    "developer": "tameer-developments",
    "category": "Residential",
    "unitTypes": "Apartments, villas",
    "unitArea": "140 square meters",
    "priceFrom": 11000000,
    "downPayment": 5,
    "installmentYears": 10,
    "image": "/projects/azad-new-cairo.webp",
    "featured": true,
    "sourceUrl": "https://imicegypt.com/en/projects/azad-compound-new-cairo/",
    "description": "Azad New Cairo is a residential development by Tameer Developments in Fifth Settlement, offering apartments, villas with unit areas from 140 square meters. Prices start from EGP 11,000,000, with a 5% down payment and instalments over up to 10 years."
  },
  {
    "name": "Compound 97 Hills New Cairo",
    "slug": "compound-97-hills-new-cairo",
    "city": "fifth-settlement",
    "developer": "palm-hills-developments",
    "category": "Residential",
    "unitTypes": "Apartments, Townhouses, Twin Houses, Standalone Villas",
    "unitArea": "From approx. 155 sqm up to villas exceeding 500 sqm",
    "priceFrom": 19000000,
    "downPayment": null,
    "installmentYears": 10,
    "image": "/projects/compound-97-hills-new-cairo.webp",
    "featured": false,
    "sourceUrl": "https://imicegypt.com/en/projects/compound-97-hills-new-cairo/",
    "description": "Discover Compound 97 Hills New Cairo by Palm Hills with luxury units, prime location, flexible payments, and strong investment potential in Egypt.\n\nCompound 97 Hills New Cairo is a residential development by Palm Hills Developments in Fifth Settlement, offering apartments, townhouses, twin houses, standalone villas with unit areas from From approx. 155 sqm up to villas exceeding 500 sqm. Prices start from EGP 19,000,000 and instalments over up to 10 years."
  },
  {
    "name": "Giza Downtown Towers",
    "slug": "giza-downtown-towers",
    "city": "fifth-settlement",
    "developer": "novara-developments",
    "category": "Mixed Use",
    "unitTypes": "Hotel rooms",
    "unitArea": "35 square meters",
    "priceFrom": 8500000,
    "downPayment": 5,
    "installmentYears": 7,
    "image": "/projects/giza-downtown-towers.webp",
    "featured": false,
    "sourceUrl": "https://imicegypt.com/en/projects/giza-downtown-towers/",
    "description": "Explore Giza Downtown Towers by Novara. Discover hotel apartments & commercial units on the Nile Corniche with payment plans up to 7 years. Invest today!\n\nGiza Downtown Towers is a mixed use development by Novara Developments in Fifth Settlement, offering hotel rooms with unit areas from 35 square meters. Prices start from EGP 8,500,000, with a 5% down payment and instalments over up to 7 years."
  },
  {
    "name": "Hyde Park New Cairo",
    "slug": "hyde-park-new-cairo",
    "city": "fifth-settlement",
    "developer": "hyde-park-developments",
    "category": "Residential",
    "unitTypes": "Apartments, Duplexes, Townhouses, Villas",
    "unitArea": "Starts from 75 m² up to 686+ m²",
    "priceFrom": 9400000,
    "downPayment": 5,
    "installmentYears": 8,
    "image": "/projects/hyde-park-new-cairo.webp",
    "featured": true,
    "sourceUrl": "https://imicegypt.com/en/projects/hyde-park-new-cairo/",
    "description": "Discover Hyde Park New Cairo prices for 2026. Explore prime location details on 90th Street, unit types, areas, and flexible payment plans starting from a 5% down payment.\n\nHyde Park New Cairo is a residential development by Hyde Park Developments in Fifth Settlement, offering apartments, duplexes, townhouses, villas with unit areas from Starts from 75 m² up to 686+ m². Prices start from EGP 9,400,000, with a 5% down payment and instalments over up to 8 years."
  },
  {
    "name": "Icon Residence Compound",
    "slug": "icon-residence-compound",
    "city": "fifth-settlement",
    "developer": "style-home-development",
    "category": "Residential",
    "unitTypes": "Apartments, townhouses, villas",
    "unitArea": "Starting from 50 m²",
    "priceFrom": 3650000,
    "downPayment": 5,
    "installmentYears": null,
    "image": "/projects/icon-residence-compound.jpg",
    "featured": false,
    "sourceUrl": "https://imicegypt.com/en/projects/icon-residence-compound/",
    "description": "The Icon Residence Compound, New Cairo – The Icon Residence is one of the newly developed residential projects in the Fifth Settlement area...\n\nIcon Residence Compound is a residential development by Style Home Development in Fifth Settlement, offering apartments, townhouses, villas with unit areas from Starting from 50 m². Prices start from EGP 3,650,000, with a 5% down payment."
  },
  {
    "name": "Lush Valley New Cairo",
    "slug": "lush-valley-new-cairo",
    "city": "fifth-settlement",
    "developer": "city-edge-developments",
    "category": "Residential",
    "unitTypes": "Apartments and duplexes",
    "unitArea": "56 square meters",
    "priceFrom": null,
    "pricePerSqm": 120000,
    "downPayment": 5,
    "installmentYears": 10,
    "image": "/projects/lush-valley-new-cairo.webp",
    "featured": false,
    "sourceUrl": "https://imicegypt.com/en/projects/lush-valley-new-cairo/",
    "description": "Discover CompoundLush Valley New Cairo and enjoy luxury units with only a 5% down payment and flexible installment plans...\n\nLush Valley New Cairo is a residential development by City Edge Developments in Fifth Settlement, offering apartments and duplexes with unit areas from 56 square meters. Start with a 5% down payment and instalments over up to 10 years."
  },
  {
    "name": "Mountain View Hyde Park",
    "slug": "mountain-view-hyde-park",
    "city": "fifth-settlement",
    "developer": "mountain-view-developments",
    "category": "Residential",
    "unitTypes": "Apartments, Townhouses, Villas",
    "unitArea": "Starts from approximately 82 sqm",
    "priceFrom": 13600000,
    "downPayment": 5,
    "installmentYears": 10,
    "image": "/projects/mountain-view-hyde-park.webp",
    "featured": false,
    "sourceUrl": "https://imicegypt.com/en/projects/mountain-view-hyde-park/",
    "description": "Mountain View Hyde Park | Details & Prices of luxury living in New Cairo, premium location, modern design, and flexible payment plans available....\n\nMountain View Hyde Park is a residential development by Mountain View Developments in Fifth Settlement, offering apartments, townhouses, villas with unit areas from Starts from approximately 82 sqm. Prices start from EGP 13,600,000, with a 5% down payment and instalments over up to 10 years."
  },
  {
    "name": "Nest New Cairo",
    "slug": "nest-new-cairo",
    "city": "fifth-settlement",
    "developer": "nawasy-developments",
    "category": "Residential",
    "unitTypes": "Apartments, Duplexes, Villas",
    "unitArea": "95 – 350 m²",
    "priceFrom": 6900000,
    "downPayment": 5,
    "installmentYears": 8,
    "image": "/projects/nest-new-cairo.webp",
    "featured": false,
    "sourceUrl": "https://imicegypt.com/en/projects/nest-new-cairo-nawassy/",
    "description": "Nest New Cairo is a residential development by Nawasy Developments in Fifth Settlement, offering apartments, duplexes, villas with unit areas from 95 – 350 m². Prices start from EGP 6,900,000, with a 5% down payment and instalments over up to 8 years."
  },
  {
    "name": "Shark Tank Business Park, Taj City",
    "slug": "shark-tank-business-park-taj-city",
    "city": "fifth-settlement",
    "developer": "madinet-masr",
    "category": "Commercial",
    "unitTypes": "Administrative, Commercial, Medical",
    "unitArea": null,
    "priceFrom": 14840000,
    "downPayment": 5,
    "installmentYears": 10,
    "image": "/projects/shark-tank-business-park-taj-city.webp",
    "featured": false,
    "sourceUrl": "https://imicegypt.com/en/projects/shark-tank-business-park/",
    "description": "Shark Tank Business Park, Taj City is a commercial development by Madinet Masr in Fifth Settlement, offering administrative, commercial, medical. Prices start from EGP 14,840,000, with a 5% down payment and instalments over up to 10 years."
  },
  {
    "name": "W55 Waterway Mall New Cairo",
    "slug": "w55-waterway-mall-new-cairo",
    "city": "fifth-settlement",
    "developer": "waterway-developments",
    "category": "Commercial",
    "unitTypes": "Administrative offices, Commercial units",
    "unitArea": null,
    "priceFrom": null,
    "pricePerSqm": 175000,
    "downPayment": 10,
    "installmentYears": 8,
    "deliveryDate": "2030",
    "image": "/projects/w55-waterway-mall-new-cairo.webp",
    "featured": false,
    "sourceUrl": "https://imicegypt.com/en/projects/w55-waterway-mall-new-cairo/",
    "description": "Discover W55 Waterway Mall New Cairo prices, flexible plans, and investment details offering high ROI in a prime location with premium facilities...\n\nW55 Waterway Mall New Cairo is a commercial development by Waterway Developments in Fifth Settlement, offering administrative offices, commercial units. Start with a 10% down payment and instalments over up to 8 years."
  },
  {
    "name": "WUUD Residence New Cairo",
    "slug": "wuud-residence-new-cairo",
    "city": "fifth-settlement",
    "developer": "tharaa-developments",
    "category": "Residential",
    "unitTypes": "Apartments only",
    "unitArea": "One-bedroom 60 sqm",
    "priceFrom": 2450000,
    "downPayment": 5,
    "installmentYears": 12,
    "image": "/projects/wuud-residence-new-cairo.webp",
    "featured": false,
    "sourceUrl": "https://imicegypt.com/en/projects/wuud-residence-new-cairo/",
    "description": "Discover WUUD Residence New Cairo Compound with premium apartments, luxurious amenities, and competitive prices in 2026...\n\nWUUD Residence New Cairo is a residential development by Tharaa Developments in Fifth Settlement, offering apartments only with unit areas from One-bedroom 60 sqm. Prices start from EGP 2,450,000, with a 5% down payment and instalments over up to 12 years."
  },
  {
    "name": "Zed East New Cairo",
    "slug": "zed-east-new-cairo",
    "city": "fifth-settlement",
    "developer": "ora-developers",
    "category": "Residential",
    "unitTypes": "Apartments, Twin Houses, Villas",
    "unitArea": "From 85 m²",
    "priceFrom": 25500000,
    "downPayment": 5,
    "installmentYears": 8,
    "image": "/projects/zed-east-new-cairo.webp",
    "featured": true,
    "sourceUrl": "https://imicegypt.com/en/projects/zed-east-ora/",
    "description": "Get an apartment in Zed East New Cairo with 5% down payment and flexible installments up to 8 years, offering luxury living at competitive prices.\n\nZed East New Cairo is a residential development by ORA Developers in Fifth Settlement, offering apartments, twin houses, villas with unit areas from From 85 m². Prices start from EGP 25,500,000, with a 5% down payment and instalments over up to 8 years."
  },
  {
    "name": "Cityzen Mostakbal City",
    "slug": "cityzen-mostakbal-city",
    "city": "mostakbal-city",
    "developer": "al-qamzi-developments",
    "category": "Residential",
    "unitTypes": "Apartments, Villas",
    "unitArea": "Starting from 65 m²",
    "priceFrom": 3700000,
    "downPayment": 5,
    "installmentYears": 10,
    "image": "/projects/cityzen-mostakbal-city.webp",
    "featured": false,
    "sourceUrl": "https://imicegypt.com/en/projects/cityzen-mostakbal-city/",
    "description": "Explore CITYZEN Mostakbal City Prices & Details 2026! Flexible payment plans, modern units, and prime investment opportunities in East Cairo...\n\nCityzen Mostakbal City is a residential development by Al Qamzi Developments in Mostakbal City, offering apartments, villas with unit areas from Starting from 65 m². Prices start from EGP 3,700,000, with a 5% down payment and instalments over up to 10 years."
  },
  {
    "name": "Rare Compound Sabbour",
    "slug": "rare-compound-sabbour",
    "city": "mostakbal-city",
    "developer": "al-ahly-sabbour",
    "category": "Residential",
    "unitTypes": "Townhouses, twin houses, and standalone villas",
    "unitArea": "start from 166 m",
    "priceFrom": 8900000,
    "downPayment": 5,
    "installmentYears": 7,
    "image": "/projects/rare-compound-sabbour.webp",
    "featured": true,
    "sourceUrl": "https://imicegypt.com/en/projects/rare-compound-sabbour/",
    "description": "Rare Compound Sabbour is a residential development by Al Ahly Sabbour in Mostakbal City, offering townhouses, twin houses, and standalone villas with unit areas from start from 166 m. Prices start from EGP 8,900,000, with a 5% down payment and instalments over up to 7 years."
  },
  {
    "name": "Sumou Boulevard Mostakbal City",
    "slug": "sumou-boulevard-mostakbal-city",
    "city": "mostakbal-city",
    "developer": "paragon-developments",
    "category": "Residential",
    "unitTypes": "Apartments, Townhouses, Villas",
    "unitArea": "Starting from 30 sqm (apartments) up to 220 sqm (villas)",
    "priceFrom": 5000000,
    "downPayment": 5,
    "installmentYears": 12,
    "deliveryDate": "2030",
    "image": "/projects/sumou-boulevard-mostakbal-city.webp",
    "featured": false,
    "sourceUrl": "https://imicegypt.com/en/projects/sumou-boulevard-compound/",
    "description": "Sumou Boulevard Mostakbal City is a residential development by Paragon Developments in Mostakbal City, offering apartments, townhouses, villas with unit areas from Starting from 30 sqm (apartments) up to 220 sqm (villas). Prices start from EGP 5,000,000, with a 5% down payment and instalments over up to 12 years."
  },
  {
    "name": "The Valleys Mostakbal City Compound",
    "slug": "the-valleys-mostakbal-city-compound",
    "city": "mostakbal-city",
    "developer": "hassan-allam-developments",
    "category": "Residential",
    "unitTypes": "Standalone Villas, Townhouses, Twin Houses",
    "unitArea": "Starting from 195 sqm",
    "priceFrom": 35000000,
    "downPayment": 5,
    "installmentYears": 6,
    "deliveryDate": "2029",
    "image": "/projects/the-valleys-mostakbal-city-compound.webp",
    "featured": true,
    "sourceUrl": "https://imicegypt.com/en/projects/the-valleys-mostakbal-city/",
    "description": "Explore The Valleys Mostakbal City by Hassan Allam, with prices from EGP 23.6M, a 5% down payment, and flexible installments of up to 10 years.\n\nThe Valleys Mostakbal City Compound is a residential development by Hassan Allam Developments in Mostakbal City, offering standalone villas, townhouses, twin houses with unit areas from Starting from 195 sqm. Prices start from EGP 35,000,000, with a 5% down payment and instalments over up to 6 years."
  },
  {
    "name": "Talala New Heliopolis",
    "slug": "talala-new-heliopolis",
    "city": "new-heliopolis-city",
    "developer": "madinat-masr",
    "category": "Residential",
    "unitTypes": "Apartments, Townhouses, Duplexes",
    "unitArea": "Starting from a one-bedroom unit, 90 square meters",
    "priceFrom": 3000000,
    "downPayment": 5,
    "installmentYears": 10,
    "image": "/projects/talala-new-heliopolis.jpg",
    "featured": true,
    "sourceUrl": "https://imicegypt.com/en/projects/talala-new-heliopolis/",
    "description": "Talala New Heliopolis by Madinet Masr Real Estate in the heart of New Heliopolis, with prices starting from 7.8 million EGP, with a 5% down payment.\n\nTalala New Heliopolis is a residential development by Madinat Masr in New Heliopolis, offering apartments, townhouses, duplexes with unit areas from Starting from a one-bedroom unit, 90 square meters. Prices start from EGP 3,000,000, with a 5% down payment and instalments over up to 10 years."
  },
  {
    "name": "Sodic East New Heliopolis",
    "slug": "sodic-east-new-heliopolis",
    "city": "new-heliopolis-city",
    "developer": "sodic-developments",
    "category": "Residential",
    "unitTypes": "Apartments, townhouses and villas",
    "unitArea": null,
    "priceFrom": 8600000,
    "downPayment": null,
    "installmentYears": 10,
    "image": "/projects/sodic-east-new-heliopolis.webp",
    "featured": false,
    "sourceUrl": "https://imicegypt.com/en/projects/sodic-east-new-heliopolis/",
    "description": "امتلك وحدتك في كمبوند سوديك ايست هليوبوليس الجديدة بموقع استراتيجي بين طريق السويس والإسماعيلية. شقق وفيلات بمقدم يبدأ من 1.5% وتقسيط يصل إلى 10 سنوات.\n\nSodic East New Heliopolis is a residential development by SODIC Developments in New Heliopolis, offering apartments, townhouses and villas. Prices start from EGP 8,600,000 and instalments over up to 10 years."
  },
  {
    "name": "Ai Tower New Capital",
    "slug": "ai-tower-new-capital",
    "city": "new-administrative-capital",
    "developer": "al-aliaa-development",
    "category": "Commercial",
    "unitTypes": "Commercial, medical, and administrative units",
    "unitArea": "25 square meters",
    "priceFrom": null,
    "pricePerSqm": 120000,
    "downPayment": 5,
    "installmentYears": 12,
    "image": "/projects/ai-tower-new-capital.webp",
    "featured": false,
    "sourceUrl": "https://imicegypt.com/en/projects/ai-tower-new-capital/",
    "description": "Explore premium commercial, medical, and administrative units at Ai Tower New Capital by Al Aliaa. Invest in the CBD with a 5% down payment and up to 12-year installments.\n\nAi Tower New Capital is a commercial development by Al Aliaa Development in the New Administrative Capital, offering commercial, medical, and administrative units with unit areas from 25 square meters. Start with a 5% down payment and instalments over up to 12 years."
  },
  {
    "name": "Celia New Capital",
    "slug": "celia-new-capital",
    "city": "new-administrative-capital",
    "developer": "talaat-moustafa-group",
    "category": "Residential",
    "unitTypes": "Apartments, townhouses, villas",
    "unitArea": "start from 77 m",
    "priceFrom": 5200000,
    "downPayment": 10,
    "installmentYears": 7,
    "image": "/projects/celia-new-capital.webp",
    "featured": true,
    "sourceUrl": "https://imicegypt.com/en/projects/celia-new-capital/",
    "description": "Celia New Capital is a residential development by Talaat Moustafa Group in the New Administrative Capital, offering apartments, townhouses, villas with unit areas from start from 77 m. Prices start from EGP 5,200,000, with a 10% down payment and instalments over up to 7 years."
  },
  {
    "name": "Chapters New Capital",
    "slug": "chapters-new-capital",
    "city": "new-administrative-capital",
    "developer": "jadeer-group-developments",
    "category": "Residential",
    "unitTypes": "Luxury apartments, duplexes, and penthouses",
    "unitArea": "71 to 316 sqm",
    "priceFrom": 4116000,
    "downPayment": 5,
    "installmentYears": 12,
    "image": "/projects/chapters-new-capital.webp",
    "featured": false,
    "sourceUrl": "https://imicegypt.com/en/projects/chapters-new-capital/",
    "description": "Chapters New Capital is a residential development by Jadeer Group Developments in the New Administrative Capital, offering luxury apartments, duplexes, and penthouses with unit areas from 71 to 316 sqm. Prices start from EGP 4,116,000, with a 5% down payment and instalments over up to 12 years."
  },
  {
    "name": "Gloria Inn Remeny New Capital",
    "slug": "gloria-inn-remeny-new-capital",
    "city": "new-administrative-capital",
    "developer": "squares-developments",
    "category": "Commercial",
    "unitTypes": "Commercial, administrative, medical,",
    "unitArea": "Starting from 25 sqm",
    "priceFrom": 3995000,
    "downPayment": null,
    "installmentYears": 10,
    "image": "/projects/gloria-inn-remeny-new-capital.jpg",
    "featured": false,
    "sourceUrl": "https://imicegypt.com/en/projects/gloria-inn-remeny-new-capital/",
    "description": "Gloria Inn Remeny New Capital is a premium mixed-use project offering commercial, administrative, and hotel units in a prime strategic location....\n\nGloria Inn Remeny New Capital is a commercial development by Squares Developments in the New Administrative Capital, offering commercial, administrative, medical, with unit areas from Starting from 25 sqm. Prices start from EGP 3,995,000 and instalments over up to 10 years."
  },
  {
    "name": "Jade Park New Capital",
    "slug": "jade-park-new-capital",
    "city": "new-administrative-capital",
    "developer": "city-edge-developments",
    "category": "Residential",
    "unitTypes": "Apartments",
    "unitArea": "Starting from 69 m²",
    "priceFrom": 6819000,
    "downPayment": 5,
    "installmentYears": 7,
    "deliveryDate": "2028",
    "image": "/projects/jade-park-new-capital.webp",
    "featured": false,
    "sourceUrl": "https://imicegypt.com/en/projects/jade-park-new-capital/",
    "description": "Jade Park New Capital is a residential development by City Edge Developments in the New Administrative Capital, offering apartments with unit areas from Starting from 69 m². Prices start from EGP 6,819,000, with a 5% down payment and instalments over up to 7 years."
  },
  {
    "name": "Lavista El Patio Jade New Capital",
    "slug": "lavista-el-patio-jade-new-capital",
    "city": "new-administrative-capital",
    "developer": "la-vista-developments",
    "category": "Residential",
    "unitTypes": "Townhouses, Twin Houses, Standalone Villas, Family Houses",
    "unitArea": "Townhouses: 185–200 m²",
    "priceFrom": null,
    "pricePerSqm": 110000,
    "downPayment": 5,
    "installmentYears": 10,
    "image": "/projects/lavista-el-patio-jade-new-capital.webp",
    "featured": false,
    "sourceUrl": "https://imicegypt.com/en/projects/lavista-el-patio-jade-new-capital/",
    "description": "La Vista Developments presents its new project, Lavista El Patio Jade New Capital, a residential compound focusing exclusively on villas.\n\nLavista El Patio Jade New Capital is a residential development by La Vista Developments in the New Administrative Capital, offering townhouses, twin houses, standalone villas, family houses with unit areas from Townhouses: 185–200 m². Start with a 5% down payment and instalments over up to 10 years."
  },
  {
    "name": "Layal New Capital Compound",
    "slug": "layal-new-capital-compound",
    "city": "new-administrative-capital",
    "developer": "new-event-developments",
    "category": "Residential",
    "unitTypes": "Apartments, Townhouse, Twin House",
    "unitArea": "115–169 sqm (apartments), from 225 sqm (villas)",
    "priceFrom": null,
    "pricePerSqm": 25900,
    "downPayment": 5,
    "installmentYears": null,
    "image": "/projects/layal-new-capital-compound.webp",
    "featured": false,
    "sourceUrl": "https://imicegypt.com/en/projects/layal-new-capital/",
    "description": "Layal New Capital Compound is a residential development by New Event Developments in the New Administrative Capital, offering apartments, townhouse, twin house with unit areas from 115–169 sqm (apartments), from 225 sqm (villas). Prices start from EGP 259,009,900,000, with a 5% down payment."
  },
  {
    "name": "Mall PMC Tower New Capital",
    "slug": "mall-pmc-tower-new-capital",
    "city": "new-administrative-capital",
    "developer": "matter-makers-developments",
    "category": "Commercial",
    "unitTypes": "Commercial, Administrative, Medical",
    "unitArea": null,
    "priceFrom": null,
    "pricePerSqm": 70000,
    "downPayment": 25,
    "installmentYears": 5,
    "image": "/projects/mall-pmc-tower-new-capital.webp",
    "featured": false,
    "sourceUrl": "https://imicegypt.com/en/projects/mall-pmc-tower-new-capital/",
    "description": "Mall PMC Tower New Capital presents competitive prices starting from 70,000 EGP per square meter for administrative and medical units.\n\nMall PMC Tower New Capital is a commercial development by Matter Makers Developments in the New Administrative Capital, offering commercial, administrative, medical. Start with a 25% down payment and instalments over up to 5 years."
  },
  {
    "name": "Park Sight New Capital",
    "slug": "park-sight-new-capital",
    "city": "new-administrative-capital",
    "developer": "il-cazar-developments",
    "category": "Residential",
    "unitTypes": "Apartments and villas",
    "unitArea": "110 square meters",
    "priceFrom": null,
    "pricePerSqm": 55000,
    "downPayment": 5,
    "installmentYears": 10,
    "image": "/projects/park-sight-new-capital.webp",
    "featured": false,
    "sourceUrl": "https://imicegypt.com/en/projects/park-side-new-capital/",
    "description": "Discover Park Sight New Capital by IL Cazar. Premium apartments in the R4 district on Bin Zayed Axis. Book with a 5% down payment and 10-year installments.\n\nPark Sight New Capital is a residential development by IL Cazar Developments in the New Administrative Capital, offering apartments and villas with unit areas from 110 square meters. Start with a 5% down payment and instalments over up to 10 years."
  },
  {
    "name": "Plato New Capital Compound",
    "slug": "plato-new-capital-compound",
    "city": "new-administrative-capital",
    "developer": "artal-development",
    "category": "Residential",
    "unitTypes": "Apartments, Duplex, Townhouses",
    "unitArea": "From 60 sqm",
    "priceFrom": 2275000,
    "downPayment": 5,
    "installmentYears": 10,
    "image": "/projects/plato-new-capital-compound.webp",
    "featured": false,
    "sourceUrl": "https://imicegypt.com/en/projects/plato-new-capital-compound/",
    "description": "Discover Plato New Capital Compound with 5% down payment, luxury units, prime R8 location, and flexible installment plans in the New Capital...\n\nPlato New Capital Compound is a residential development by Artal Development in the New Administrative Capital, offering apartments, duplex, townhouses with unit areas from From 60 sqm. Prices start from EGP 2,275,000, with a 5% down payment and instalments over up to 10 years."
  },
  {
    "name": "Rayhaan New Capital",
    "slug": "rayhaan-new-capital",
    "city": "new-administrative-capital",
    "developer": "astra-rise-developments",
    "category": "Mixed Use",
    "unitTypes": "Hotel Rooms & Serviced Hotel Apartments",
    "unitArea": "Starting from 64 sqm",
    "priceFrom": null,
    "pricePerSqm": 150000,
    "downPayment": 5,
    "installmentYears": null,
    "image": "/projects/rayhaan-new-capital.webp",
    "featured": false,
    "sourceUrl": "https://imicegypt.com/en/projects/rayhaan-new-capital/",
    "description": "Invest in Rayhaan New Capital by Astra Rise Developments, a premium hotel project in the New Administrative Capital's CBD with flexible payment..\n\nRayhaan New Capital is a mixed use development by Astra Rise Developments in the New Administrative Capital, offering hotel rooms & serviced hotel apartments with unit areas from Starting from 64 sqm. Start with a 5% down payment."
  },
  {
    "name": "Village de la Capitale New Capital",
    "slug": "village-de-la-capitale-new-capital",
    "city": "new-administrative-capital",
    "developer": "palm-hills-developments",
    "category": "Residential",
    "unitTypes": "Apartments, Townhouses, Standalone Villas",
    "unitArea": null,
    "priceFrom": null,
    "downPayment": 5,
    "installmentYears": 12,
    "image": "/projects/village-de-la-capitale-new-capital.webp",
    "featured": false,
    "sourceUrl": "https://imicegypt.com/en/projects/village-de-la-capitale-new-capital/",
    "description": "Village de la Capitale New Capital marks a significant shift in the Egyptian real estate market, not only as a new residential project but also...\n\nVillage de la Capitale New Capital is a residential development by Palm Hills Developments in the New Administrative Capital, offering apartments, townhouses, standalone villas. Start with a 5% down payment and instalments over up to 12 years."
  },
  {
    "name": "Acasa Alma New Cairo",
    "slug": "acasa-alma-new-cairo",
    "city": "sixth-settlement",
    "developer": "dar-al-alamia-developments",
    "category": "Residential",
    "unitTypes": "Apartments, Duplexes, Townhouses",
    "unitArea": "from 130 m²",
    "priceFrom": 7500000,
    "downPayment": 5,
    "installmentYears": 10,
    "deliveryDate": "2029",
    "image": "/projects/acasa-alma-new-cairo.webp",
    "featured": false,
    "sourceUrl": "https://imicegypt.com/en/projects/acasa-alma-new-cairo/",
    "description": "Enjoy a variety of residential units in Acasa Alma New Cairo by Dar Al Alamia, with prices starting from EGP 7.5 million.\n\nAcasa Alma New Cairo is a residential development by Dar Al Alamia Developments in Sixth Settlement, offering apartments, duplexes, townhouses with unit areas from from 130 m². Prices start from EGP 7,500,000, with a 5% down payment and instalments over up to 10 years."
  },
  {
    "name": "Aurevia Community New Cairo",
    "slug": "aurevia-community-new-cairo",
    "city": "sixth-settlement",
    "developer": "winvestor-developments",
    "category": "Residential",
    "unitTypes": "Apartments, Penthouse, Duplex",
    "unitArea": "Starting from 50 sqm up to 205 sqm",
    "priceFrom": null,
    "pricePerSqm": 42000,
    "downPayment": 5,
    "installmentYears": 10,
    "deliveryDate": "2030",
    "image": "/projects/aurevia-community-new-cairo.webp",
    "featured": false,
    "sourceUrl": "https://imicegypt.com/en/projects/aurevia-community-new-cairo/",
    "description": "Aurevia Community New Cairo is a modern residential compound offering elegant design, prime location, diverse units, and flexible long-term...\n\nAurevia Community New Cairo is a residential development by Winvestor Developments in Sixth Settlement, offering apartments, penthouse, duplex with unit areas from Starting from 50 sqm up to 205 sqm. Prices start from EGP 290,000,042,000, with a 5% down payment and instalments over up to 10 years."
  },
  {
    "name": "El Patio Town New Cairo",
    "slug": "el-patio-town-new-cairo",
    "city": "sixth-settlement",
    "developer": "la-vista-developments",
    "category": "Residential",
    "unitTypes": "Villas & Townhouses",
    "unitArea": "221–340+ m²",
    "priceFrom": 22500000,
    "downPayment": 5,
    "installmentYears": 7,
    "image": "/projects/el-patio-town-new-cairo.webp",
    "featured": false,
    "sourceUrl": "https://imicegypt.com/en/projects/el-patio-town-new-cairo/",
    "description": "El Patio Town New Cairo is a residential development by La Vista Developments in Sixth Settlement, offering villas & townhouses with unit areas from 221–340+ m². Prices start from EGP 22,500,000, with a 5% down payment and instalments over up to 7 years."
  },
  {
    "name": "Ever New Cairo",
    "slug": "ever-new-cairo",
    "city": "sixth-settlement",
    "developer": "cred-developments",
    "category": "Residential",
    "unitTypes": "Townhouses, twin houses, and standalone villas",
    "unitArea": "start from 130 m",
    "priceFrom": 19500000,
    "downPayment": 5,
    "installmentYears": 8,
    "image": "/projects/ever-new-cairo.webp",
    "featured": false,
    "sourceUrl": "https://imicegypt.com/en/projects/ever-new-cairo-compound/",
    "description": "Ever New Cairo is a residential development by Cred Developments in Sixth Settlement, offering townhouses, twin houses, and standalone villas with unit areas from start from 130 m. Prices start from EGP 19,500,000, with a 5% down payment and instalments over up to 8 years."
  },
  {
    "name": "Glen New Cairo",
    "slug": "glen-new-cairo",
    "city": "sixth-settlement",
    "developer": "il-cazar-developments",
    "category": "Residential",
    "unitTypes": "Apartments, Townhouses, Standalone Villas, Penthouses",
    "unitArea": "120 m²",
    "priceFrom": 8400000,
    "downPayment": 5,
    "installmentYears": 7,
    "image": "/projects/glen-new-cairo.webp",
    "featured": false,
    "sourceUrl": "https://imicegypt.com/en/projects/glen-new-cairo/",
    "description": "Glen New Cairo is a residential development by IL Cazar Developments in Sixth Settlement, offering apartments, townhouses, standalone villas, penthouses with unit areas from 120 m². Prices start from EGP 8,400,000, with a 5% down payment and instalments over up to 7 years."
  },
  {
    "name": "Modon Golf Town New Cairo",
    "slug": "modon-golf-town-new-cairo",
    "city": "sixth-settlement",
    "developer": "modon-developments",
    "category": "Residential",
    "unitTypes": "Apartments, Villas",
    "unitArea": "from 60 m²",
    "priceFrom": 5000000,
    "downPayment": 10,
    "installmentYears": 10,
    "image": "/projects/modon-golf-town-new-cairo.webp",
    "featured": true,
    "sourceUrl": "https://imicegypt.com/en/projects/golf-town-new-cairo/",
    "description": "Explore Golf Town New Cairo – Units from EGP 5M with 10-Year Installments. Discover luxury apartments and villas, flexible payment plans...\n\nModon Golf Town New Cairo is a residential development by Modon Developments in Sixth Settlement, offering apartments, villas with unit areas from from 60 m². Prices start from EGP 5,000,000, with a 10% down payment and instalments over up to 10 years."
  },
  {
    "name": "Grand Lane New Cairo",
    "slug": "grand-lane-new-cairo",
    "city": "sixth-settlement",
    "developer": "hdp-developments",
    "category": "Residential",
    "unitTypes": "Apartments, Townhouses, Villas",
    "unitArea": "68 m² to 251 m²",
    "priceFrom": 3550000,
    "downPayment": 5,
    "installmentYears": 10,
    "image": "/projects/grand-lane-new-cairo.webp",
    "featured": false,
    "sourceUrl": "https://imicegypt.com/en/projects/grand-lane-new-cairo/",
    "description": "Discover Grand Lane New Cairo by HDP Developers with full details on unit types prices and investment opportunities for 2026 in a prime location...\n\nGrand Lane New Cairo is a residential development by HDP Developments in Sixth Settlement, offering apartments, townhouses, villas with unit areas from 68 m² to 251 m². Prices start from EGP 3,550,000, with a 5% down payment and instalments over up to 10 years."
  },
  {
    "name": "Home Residence New Cairo",
    "slug": "home-residence-new-cairo",
    "city": "sixth-settlement",
    "developer": "home-town-developments",
    "category": "Residential",
    "unitTypes": "Bedroom apartments, duplex units",
    "unitArea": "From 39 m²",
    "priceFrom": 3639044,
    "downPayment": 5,
    "installmentYears": 10,
    "image": "/projects/home-residence-new-cairo.webp",
    "featured": false,
    "sourceUrl": "https://imicegypt.com/en/projects/home-residence-new-cairo/",
    "description": "Home Residence New Cairo offers apartments from 39 m² with 5% down payment and flexible installments up to 12 years by Home Town Real..\n\nHome Residence New Cairo is a residential development by Home Town Developments in Sixth Settlement, offering bedroom apartments, duplex units with unit areas from From 39 m². Prices start from EGP 3,639,044, with a 5% down payment and instalments over up to 10 years."
  },
  {
    "name": "Hyde Park Central New Cairo",
    "slug": "hyde-park-central-new-cairo",
    "city": "sixth-settlement",
    "developer": "hyde-park-developments",
    "category": "Residential",
    "unitTypes": "Apartments, townhouses, villas",
    "unitArea": "start at 212m",
    "priceFrom": 10000000,
    "downPayment": 5,
    "installmentYears": 10,
    "image": "/projects/hyde-park-central-new-cairo.webp",
    "featured": false,
    "sourceUrl": "https://imicegypt.com/en/projects/hyde-park-central-new-cairo/",
    "description": "Hyde Park Central New Cairo is a residential development by Hyde Park Developments in Sixth Settlement, offering apartments, townhouses, villas with unit areas from start at 212m. Prices start from EGP 10,000,000, with a 5% down payment and instalments over up to 10 years."
  },
  {
    "name": "Midtown East New Cairo Compound",
    "slug": "midtown-east-new-cairo-compound",
    "city": "sixth-settlement",
    "developer": "better-home-developments",
    "category": "Residential",
    "unitTypes": "Townhouses, villas",
    "unitArea": "start at 285m",
    "priceFrom": 18500000,
    "downPayment": 10,
    "installmentYears": 8,
    "image": "/projects/midtown-east-new-cairo-compound.webp",
    "featured": false,
    "sourceUrl": "https://imicegypt.com/en/projects/midtown-new-cairo-compound/",
    "description": "Midtown East New Cairo Compound is a residential development by Better Home Developments in Sixth Settlement, offering townhouses, villas with unit areas from start at 285m. Prices start from EGP 18,500,000, with a 10% down payment and instalments over up to 8 years."
  },
  {
    "name": "Noll New Cairo",
    "slug": "noll-new-cairo",
    "city": "sixth-settlement",
    "developer": "kleek-developments",
    "category": "Residential",
    "unitTypes": "Apartments, Duplexes, Penthouses",
    "unitArea": "Unit Sizes Start From 70 m²",
    "priceFrom": 6500000,
    "downPayment": 5,
    "installmentYears": 12,
    "image": "/projects/noll-new-cairo.webp",
    "featured": false,
    "sourceUrl": "https://imicegypt.com/en/projects/noll-new-cairo/",
    "description": "Noll New Cairo is a residential development by Kleek Developments in Sixth Settlement, offering apartments, duplexes, penthouses with unit areas from Unit Sizes Start From 70 m². Prices start from EGP 6,500,000, with a 5% down payment and instalments over up to 12 years."
  },
  {
    "name": "Vea New Cairo",
    "slug": "vea-new-cairo",
    "city": "sixth-settlement",
    "developer": "il-cazar-developments",
    "category": "Residential",
    "unitTypes": "Villas",
    "unitArea": "Starting from 180 m²",
    "priceFrom": null,
    "pricePerSqm": 100000,
    "downPayment": 10,
    "installmentYears": 10,
    "deliveryDate": "2028",
    "image": "/projects/vea-new-cairo.webp",
    "featured": false,
    "sourceUrl": "https://imicegypt.com/en/projects/vea-new-cairo/",
    "description": "Discover Vea New Cairo Il Cazar Compound with full price details 2026 and explore luxury villas, flexible payment plans, and prime Sixth Settlement.\n\nVea New Cairo is a residential development by IL Cazar Developments in Sixth Settlement, offering villas with unit areas from Starting from 180 m². Start with a 10% down payment and instalments over up to 10 years."
  }
];
