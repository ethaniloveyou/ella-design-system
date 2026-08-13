// Screening schedule, reproductive cancers, and links — lifted verbatim from
// the previous ReproductiveHealth screen.

export function getReproductiveContent(lang) {
  const isEs = lang === 'es';
  const screenings = [
    {
      name: isEs ? 'Citolog\u00eda / Papanicolaou' : 'Pap smear',
      every: isEs ? 'Cada 3 a\u00f1os \u00b7 21\u201365' : 'Every 3 years \u00b7 ages 21\u201365',
      desc: isEs
        ? 'Detecta cambios celulares en el cuello uterino. La perimenopausia no te exime, sigue siendo importante.'
        : 'Catches cervical cell changes early. Perimenopause doesn\u2019t exempt you, keep going.',
    },
    {
      name: isEs ? 'Prueba de VPH' : 'HPV test',
      every: isEs ? 'Cada 5 a\u00f1os \u00b7 30\u201365' : 'Every 5 years \u00b7 ages 30\u201365',
      desc: isEs
        ? 'Detecta los tipos de VPH que causan c\u00e1ncer. Se puede hacer junto con el Papanicolaou (co-prueba).'
        : 'Detects the cancer-causing strains of HPV. Often done with the Pap smear (co-testing).',
    },
    {
      name: isEs ? 'Mamograf\u00eda' : 'Mammogram',
      every: isEs ? 'Cada 1\u20132 a\u00f1os \u00b7 40+' : 'Every 1\u20132 years \u00b7 ages 40+',
      desc: isEs
        ? 'Detecci\u00f3n temprana del c\u00e1ncer de mama. Habla con tu m\u00e9dico sobre tu riesgo personal.'
        : 'Early detection for breast cancer. Talk to your doctor about your personal risk.',
    },
    {
      name: isEs ? 'Examen p\u00e9lvico' : 'Pelvic exam',
      every: isEs ? 'Anual o seg\u00fan recomendaci\u00f3n' : 'Yearly or as recommended',
      desc: isEs
        ? 'Detecta cambios en ovarios y \u00fatero. Reporta cualquier sangrado posmenop\u00e1usico de inmediato.'
        : 'Catches ovarian and uterine changes. Report any post-menopausal bleeding right away.',
    },
  ];

  const cancers = [
    {
      name: isEs ? 'C\u00e1ncer cervical' : 'Cervical cancer',
      cause: isEs ? 'Casi siempre causado por VPH' : 'Almost always caused by HPV',
      detail: isEs
        ? 'Altamente prevenible con detecci\u00f3n regular. Si te has saltado pruebas, es momento de retomarlas.'
        : 'Highly preventable with regular screening. If you\u2019ve missed Paps, now is the time to get back on schedule.',
    },
    {
      name: isEs ? 'C\u00e1ncer de ovario' : 'Ovarian cancer',
      cause: isEs ? 'A menudo silencioso' : 'Often silent in early stages',
      detail: isEs
        ? 'Vigila s\u00edntomas persistentes: hinchaz\u00f3n, dolor p\u00e9lvico, sensaci\u00f3n de llenura r\u00e1pida. Si duran m\u00e1s de 2\u20133 semanas, ve al m\u00e9dico.'
        : 'Watch for persistent symptoms: bloating, pelvic pain, feeling full quickly. Lasting more than 2\u20133 weeks? See your doctor.',
    },
    {
      name: isEs ? 'C\u00e1ncer uterino / endometrial' : 'Uterine / endometrial cancer',
      cause: isEs ? 'M\u00e1s com\u00fan despu\u00e9s de los 50' : 'Most common after age 50',
      detail: isEs
        ? 'Cualquier sangrado despu\u00e9s de la menopausia debe evaluarse. No esperes, esto es importante.'
        : 'Any bleeding after menopause needs to be checked. Don\u2019t wait, this one matters.',
    },
    {
      name: isEs ? 'C\u00e1ncer de mama' : 'Breast cancer',
      cause: isEs ? 'El riesgo aumenta con la edad' : 'Risk rises with age',
      detail: isEs
        ? 'Conoce tus senos. Reporta cualquier bulto, cambio en la piel o secreci\u00f3n del pez\u00f3n.'
        : 'Know your breasts. Report any lump, skin change, or nipple discharge.',
    },
    {
      name: isEs ? 'C\u00e1ncer vaginal y vulvar' : 'Vaginal & vulvar cancer',
      cause: isEs ? 'Frecuentemente relacionado con VPH' : 'Frequently HPV-linked',
      detail: isEs
        ? 'Raro pero real. Picaz\u00f3n persistente, bultos o cambios en la piel deben revisarse.'
        : 'Rare but real. Persistent itching, lumps, or skin changes should be looked at.',
    },
  ];

  const links = [
    { label: isEs ? 'CDC, VPH y c\u00e1ncer' : 'CDC, HPV and cancer', sub: isEs ? 'Hechos en lenguaje claro \u00b7 espa\u00f1ol disponible' : 'Plain-language facts \u00b7 available in Spanish', href: 'https://www.cdc.gov/hpv/' },
    { label: 'American Cancer Society', sub: isEs ? 'Gu\u00edas de detecci\u00f3n y vista general por tipo de c\u00e1ncer' : 'Screening guidelines and overviews by cancer type', href: 'https://www.cancer.org/' },
    { label: isEs ? 'Instituto Nacional del C\u00e1ncer' : 'National Cancer Institute', sub: isEs ? 'Investigaci\u00f3n y recursos del gobierno de EE.UU.' : 'US government research and resources', href: 'https://www.cancer.gov/' },
    { label: isEs ? 'Encuentra detecci\u00f3n gratuita o de bajo costo' : 'Find free or low-cost screening', sub: isEs ? 'Programa NBCCEDP de los CDC' : 'CDC\u2019s NBCCEDP program', href: 'https://www.cdc.gov/cancer/nbccedp/' },
  ];
  return { screenings, cancers, links };
}
