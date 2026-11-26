type StringDict<T> = { [K in keyof T]: string };

function pair<T extends Record<string, string>>(en: T, ar: StringDict<T>) {
  return { en, ar };
}

export const about = pair(
  {
    eyebrow: "Makers Real Estates",
    heroAlt: "Egyptian compound",
    title: "A consultancy built around five districts we know street by street.",
    body: "Makers Real Estates began in New Cairo and grew into a full-service advisory covering the Fifth Settlement, Mostakbal City, New Heliopolis and the Sixth Settlement, with a dedicated desk for the New Administrative Capital.",
    vision: "Our vision",
    visionTitle:
      "To be the leading destination for real estate consulting in the region.",
    visionP1:
      "We are committed to translating that vision into tangible reality through effective communication, unwavering commitment and exceptional client care.",
    visionP2:
      "Every recommendation starts with the numbers: price per square metre, delivery track record, resale liquidity and the real cost of the payment plan. Only then do we talk about the view.",
    book: "Book a consultation",
    howWeWork: "How we work",
    step1Title: "Discovery",
    step1Body: "Budget, financing, timeline and the non-negotiables.",
    step2Title: "Shortlist",
    step2Body: "Three to five projects scored on price, delivery and liquidity.",
    step3Title: "Site visits",
    step3Body:
      "We accompany you, compare units and check the developer record.",
    step4Title: "Close",
    step4Body:
      "Negotiation, contract review, installments and handover follow-up.",
    liveProjects: "Live projects",
    developerPartners: "Developer partners",
    districtsCovered: "Districts covered",
  },
  {
    eyebrow: "ميكرز للعقارات",
    heroAlt: "كمبوند مصري",
    title: "استشارات عقارية مبنية على خمس مناطق بنعرفها شارع شارع.",
    body: "ميكرز للعقارات بدأت في القاهرة الجديدة وكبرت لشركة استشارات متكاملة بتغطي التجمع الخامس، مستقبل سيتي، هليوبوليس الجديدة والسادس من أكتوبر، مع مكتب مخصص للعاصمة الإدارية الجديدة.",
    vision: "رؤيتنا",
    visionTitle: "إننا نبقى الوجهة الأولى للاستشارات العقارية في المنطقة.",
    visionP1:
      "ملتزمين إننا نحول الرؤية دي لواقع ملموس من خلال تواصل فعّال والتزام واضح وخدمة عملاء استثنائية.",
    visionP2:
      "أي ترشيح بيبدأ بالأرقام: سعر المتر، سجل التسليم، سهولة إعادة البيع والتكلفة الحقيقية لخطة السداد. بعد كده بس بنتكلم عن المنظر.",
    book: "احجز استشارة",
    howWeWork: "بنشتغل إزاي",
    step1Title: "الاستكشاف",
    step1Body: "الميزانية، التمويل، الجدول الزمني والأولويات اللي مش قابلة للتنازل.",
    step2Title: "الترشيحات",
    step2Body: "من ٣ لـ ٥ مشاريع متقيّمة على السعر والتسليم وسهولة البيع.",
    step3Title: "زيارات الموقع",
    step3Body: "بنروح معاك، نقارن الوحدات ونتأكد من سجل المطور.",
    step4Title: "التعاقد",
    step4Body: "تفاوض، مراجعة العقد، الأقساط ومتابعة التسليم.",
    liveProjects: "مشروع متاح",
    developerPartners: "مطور شريك",
    districtsCovered: "منطقة بنغطيها",
  },
);

export const contact = pair(
  {
    eyebrow: "Contact us",
    title: "Get a consultation from top real estate experts.",
    body: "Whether you are buying your first home or adding to a portfolio, our consultants will give you a straight answer.",
    phone: "Phone",
    whatsapp: "WhatsApp",
    email: "Email",
    headOffice: "Head office",
    address:
      "Makers Real Estates, Fifth Settlement, New Cairo, Cairo Governorate, Egypt.",
    hours: "Saturday – Thursday, 10:00 – 19:00.",
    formTitle: "Tell us what you need",
    formSub: "We reply within one business day.",
    success: "Thank you — your inquiry is now with our consultants.",
    errMissing: "Please add your name and phone number.",
    errGeneric: "We could not submit your request. Please call us instead.",
  },
  {
    eyebrow: "تواصل معنا",
    title: "استشارة من خبراء عقاريين متخصصين.",
    body: "لو بتشتري بيتك الأول أو بتضيف لأصولك، استشاريينا هيدّوك إجابة صريحة.",
    phone: "تليفون",
    whatsapp: "واتساب",
    email: "الإيميل",
    headOffice: "المكتب الرئيسي",
    address: "ميكرز للعقارات، التجمع الخامس، القاهرة الجديدة، محافظة القاهرة، مصر.",
    hours: "من السبت للخميس، ١٠:٠٠ ص – ٧:٠٠ م.",
    formTitle: "قولنا محتاج إيه",
    formSub: "بنرد في خلال يوم عمل.",
    success: "شكرًا ليك — طلبك وصل لاستشاريينا.",
    errMissing: "من فضلك اكتب اسمك ورقم تليفونك.",
    errGeneric: "مقدرناش نستلم طلبك. كلمنا على التليفون.",
  },
);

export const projectsPage = pair(
  {
    eyebrow: "Portfolio",
    titleAll: "Explore every project",
    titleCity: "Projects in {city}",
    bodyDefault:
      "Residential compounds, coastal resorts, malls and administrative towers across Egypt — with verified payment plans and delivery dates.",
    searchPlaceholder: "Search project, developer or area",
    allCities: "All cities",
    allTypes: "All types",
    filter: "Filter",
    activeFilters: "Active filters:",
    clear: "Clear",
    count: "{count} projects",
    emptyTitle: "No projects match those filters.",
    emptyBody:
      "Try a different city or type, or ask a consultant for off-market options.",
    askConsultant: "Ask a consultant",
  },
  {
    eyebrow: "المشاريع",
    titleAll: "اتفرج على كل المشاريع",
    titleCity: "مشاريع في {city}",
    bodyDefault:
      "كمبوندات سكنية، منتجعات ساحلية، مولات وأبراج إدارية في كل أنحاء مصر — بخطط سداد ومواعيد تسليم مؤكدة.",
    searchPlaceholder: "ابحث عن مشروع أو مطور أو منطقة",
    allCities: "كل المناطق",
    allTypes: "كل الأنواع",
    filter: "فلتر",
    activeFilters: "الفلاتر المفعّلة:",
    clear: "مسح",
    count: "{count} مشروع",
    emptyTitle: "مفيش مشاريع مطابقة للفلاتر دي.",
    emptyBody: "جرّب منطقة أو نوع تاني، أو اسأل استشاري عن فرص خارج الإعلانات.",
    askConsultant: "اسأل استشاري",
  },
);

export const projectDetail = pair(
  {
    factsStart: "Starting price",
    pricePerSqm: "Price per m²",
    downPayment: "Down payment",
    installments: "Installments",
    delivery: "Delivery",
    area: "Unit area",
    onRequest: "On request",
    years: "{count} years",
    aboutProject: "About the project",
    unitTypes: "Unit types",
    unitArea: "Unit area:",
    location: "Location",
    whatsappMessage: "I would like to know more about {project}",
    whatsappCta: "WhatsApp about this project",
    callCta: "Call +20 111 620 4890",
    brochure: "Request the full brochure",
    speak: "Speak to a Makers consultant",
    sideBody:
      "Payment plans, unit availability and negotiation handled for you.",
    thanks: "Thank you — your request is with our team. We will call you shortly.",
    moreIn: "More in {city}",
    viewAll: "View all",
    videoUnsupported: "Your browser does not support the video tag.",
  },
  {
    factsStart: "سعر البداية",
    pricePerSqm: "سعر المتر",
    downPayment: "المقدم",
    installments: "التقسيط",
    delivery: "التسليم",
    area: "مساحة الوحدة",
    onRequest: "عند الطلب",
    years: "{count} سنة",
    aboutProject: "عن المشروع",
    unitTypes: "أنواع الوحدات",
    unitArea: "مساحة الوحدة:",
    location: "الموقع",
    whatsappMessage: "عايز أعرف تفاصيل أكتر عن {project}",
    whatsappCta: "استفسر على واتساب",
    callCta: "اتصل +20 111 620 4890",
    brochure: "اطلب البروشور الكامل",
    speak: "كلم استشاري من ميكرز",
    sideBody: "خطط السداد، توافر الوحدات والتفاوض — إحنا نتولى كل ده عنك.",
    thanks: "شكرًا ليك — طلبك وصل لفريقنا وهنكلمك قريب.",
    moreIn: "مشاريع تانية في {city}",
    viewAll: "شوف الكل",
    videoUnsupported: "متصفحك لا يدعم تشغيل الفيديو.",
  },
);

export const developers = pair(
  {
    eyebrow: "Partners",
    title: "Top developers",
    body: "We work directly with Egypt most credible developers, so you get verified inventory, real delivery records and negotiated payment plans.",
    listedProjects: "{count} listed projects",
    video: "Video",
    view: "View",
    fallback: "A trusted Makers partner with delivered projects across Egypt.",
  },
  {
    eyebrow: "شركاؤنا",
    title: "أكبر المطورين",
    body: "بنشتغل مباشرة مع أكتر المطورين مصداقية في مصر، عشان تحصل على وحدات موثقة وسجلات تسليم حقيقية وخطط سداد متفاوض عليها.",
    listedProjects: "{count} مشروع",
    video: "فيديو",
    view: "شوف",
    fallback: "شريك موثوق لميكرز بمشاريع تم تسليمها في أنحاء مصر.",
  },
);

export const login = pair(
  {
    back: "← Back to website",
    title: "Sign in to your dashboard",
    subtitle: "Use your team account to access the CRM.",
    email: "Email",
    password: "Password",
    signIn: "Sign in",
    invalid: "Incorrect email or password.",
    crmEyebrow: "Makers CRM",
    heroTitle: "Every lead, project and payment plan in one place.",
    heroBody:
      "Manage inquiries from the website, track your pipeline and keep the sales team aligned.",
    heroAlt: "Makers Real Estates",
    copyright: "© {year} Makers Real Estates",
  },
  {
    back: "→ رجوع للموقع",
    title: "سجّل دخول للوحة التحكم",
    subtitle: "استخدم حساب فريقك للدخول على الـ CRM.",
    email: "الإيميل",
    password: "كلمة السر",
    signIn: "تسجيل الدخول",
    invalid: "الإيميل أو كلمة السر غلط.",
    crmEyebrow: "ميكرز CRM",
    heroTitle: "كل عميل محتمل ومشروع وخطة سداد في مكان واحد.",
    heroBody:
      "إدارة الاستفسارات الجاية من الموقع، متابعة خط البيع وخلي فريق المبيعات متزامن.",
    heroAlt: "ميكرز للعقارات",
    copyright: "© {year} ميكرز للعقارات",
  },
);
