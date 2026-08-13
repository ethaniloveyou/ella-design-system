// Hormonal therapy options + trusted external resources, lifted verbatim
// from the previous HormonalTherapy screen. Options-only, never endorsing.

export function getHormoneContent(lang) {
  const isEs = lang === 'es';
  const options = [
    {
      name: isEs ? 'Estr\u00f3geno sist\u00e9mico' : 'Systemic estrogen',
      kind: isEs ? 'TRH \u00b7 P\u00edldora, parche, gel o spray' : 'HRT \u00b7 Pill, patch, gel, or spray',
      desc: isEs
        ? 'La forma m\u00e1s estudiada de aliviar los sofocos, sudores nocturnos y cambios de humor. Si todav\u00eda tienes \u00fatero, generalmente se combina con progestina.'
        : 'The most-studied option for hot flashes, night sweats, and mood shifts. If you still have a uterus, it\u2019s usually paired with a progestin.',
    },
    {
      name: isEs ? 'Estr\u00f3geno vaginal de dosis baja' : 'Low-dose vaginal estrogen',
      kind: isEs ? 'TRH local \u00b7 Crema, anillo o tableta' : 'Local HRT \u00b7 Cream, ring, or tablet',
      desc: isEs
        ? 'Tratamiento dirigido para sequedad, dolor con relaciones sexuales y s\u00edntomas urinarios. Muy poco entra al torrente sangu\u00edneo.'
        : 'Targeted treatment for vaginal dryness, painful sex, and urinary symptoms. Very little reaches the bloodstream.',
    },
    {
      name: isEs ? 'Progestina sola' : 'Progestin only',
      kind: isEs ? 'No es estr\u00f3geno' : 'Non-estrogen',
      desc: isEs
        ? 'Una opci\u00f3n cuando el estr\u00f3geno no es seguro o no es deseado. Puede ayudar con el sue\u00f1o y algunos s\u00edntomas.'
        : 'An option when estrogen isn\u2019t safe or wanted. Can help with sleep and some symptoms.',
    },
    {
      name: isEs ? 'Medicamentos no hormonales' : 'Non-hormonal medications',
      kind: isEs ? 'ISRS / IRSN, gabapentina, fezolinetant' : 'SSRIs / SNRIs, gabapentin, fezolinetant',
      desc: isEs
        ? 'Para mujeres que no pueden o prefieren no usar hormonas. Fezolinetant es un medicamento nuevo aprobado por la FDA espec\u00edficamente para sofocos.'
        : 'For women who can\u2019t, or prefer not to, use hormones. Fezolinetant is a newer FDA-approved option specifically for hot flashes.',
    },
    {
      name: isEs ? 'TRH bioid\u00e9ntica' : 'Bioidentical HRT',
      kind: isEs ? 'Compuesta vs. aprobada por FDA' : 'Compounded vs. FDA-approved',
      desc: isEs
        ? 'Importante: las versiones aprobadas por la FDA son bioid\u00e9nticas. Las versiones compuestas (mezcladas en farmacias) no est\u00e1n reguladas y los estudios son limitados.'
        : 'Important: FDA-approved hormone therapies are already bioidentical. Compounded versions (custom-mixed at pharmacies) are unregulated and have limited safety data.',
    },
    {
      name: isEs ? 'Sin tratamiento' : 'No treatment',
      kind: isEs ? 'Una opci\u00f3n leg\u00edtima' : 'A legitimate option',
      desc: isEs
        ? 'Algunas mujeres atraviesan la transici\u00f3n con s\u00edntomas leves y eligen no tratar. Tambi\u00e9n es una opci\u00f3n v\u00e1lida.'
        : 'Some women move through this transition with mild symptoms and choose not to treat. That\u2019s also a valid path.',
    },
  ];

  const resources = [
    { label: 'The Pause Life, Dr. Mary Claire Haver', sub: isEs ? 'Educaci\u00f3n y comunidad sobre la menopausia de una OB-GYN reconocida' : 'Menopause education & community from a leading OB-GYN', href: 'https://thepauselife.com/' },
    { label: 'The Menopause Society (formerly NAMS)', sub: isEs ? 'Encuentra un especialista certificado en menopausia (MSCP)' : 'Find a certified menopause specialist (MSCP)', href: 'https://menopause.org/' },
    { label: 'ACOG, Menopause Resources', sub: isEs ? 'Gu\u00edas oficiales del Colegio Americano de Obstetras y Ginec\u00f3logos' : 'Official guidelines from the American College of OB-GYNs', href: 'https://www.acog.org/womens-health/faqs/the-menopause-years' },
    { label: 'Office on Women\u2019s Health', sub: isEs ? 'Recurso oficial del gobierno de EE.UU. \u00b7 disponible en espa\u00f1ol' : 'Official US government resource \u00b7 available in Spanish', href: 'https://www.womenshealth.gov/menopause' },
    { label: 'Mayo Clinic, Hormone Therapy', sub: isEs ? 'Resumen cl\u00ednico de beneficios, riesgos y elegibilidad' : 'Clinical overview of benefits, risks, and eligibility', href: 'https://www.mayoclinic.org/diseases-conditions/menopause/in-depth/hormone-therapy/art-20046372' },
    { label: 'Let\u2019s Talk Menopause', sub: isEs ? 'Sin fines de lucro \u00b7 educaci\u00f3n y defensa' : 'Nonprofit \u00b7 education and advocacy', href: 'https://www.letstalkmenopause.org/' },
  ];

  // Sites written natively in Spanish (not machine-translated).
  const spanishResources = [
    { label: 'MedlinePlus en espa\u00f1ol, Menopausia', sub: 'Biblioteca Nacional de Medicina de EE.UU. \u00b7 escrito en espa\u00f1ol', href: 'https://medlineplus.gov/spanish/menopause.html' },
    { label: 'AEEM, Asociaci\u00f3n Espa\u00f1ola para el Estudio de la Menopausia', sub: 'Sociedad m\u00e9dica espa\u00f1ola \u00b7 informaci\u00f3n para pacientes', href: 'https://aeem.es/' },
    { label: 'CuidatePlus, Menopausia', sub: 'Gu\u00eda de salud en espa\u00f1ol revisada por profesionales', href: 'https://cuidateplus.marca.com/enfermedades/ginecologicas/menopausia.html' },
  ];
  return { options, resources, spanishResources };
}
