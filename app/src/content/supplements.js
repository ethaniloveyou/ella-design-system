// Supplement data lifted verbatim from the previous SupplementsHub screen.
// Copy is preserved exactly; only the presentation is rebuilt.

export function getSupplements(lang) {
  const isEs = lang === 'es';
  const items = [
    {
      name: 'Creatine',
      tag: isEs ? 'M\u00daSCULO \u00b7 FUERZA' : 'MUSCLE \u00b7 STRENGTH',
      desc: isEs ? 'Apoya la masa muscular y la fuerza, junto con el entrenamiento de fuerza.' : 'Supports muscle mass and strength, alongside strength training.',
      tone: 'rose',
      why: isEs
        ? ['La p\u00e9rdida de m\u00fasculo se acelera despu\u00e9s de la menopausia. La creatina, combinada con entrenamiento de fuerza, ayuda a mantener m\u00fasculo y fuerza.',
           'Investigaciones recientes sugieren beneficios adicionales para la energ\u00eda y la funci\u00f3n cognitiva en mujeres de mediana edad.']
        : ['Muscle loss speeds up after menopause. Creatine, combined with strength training, helps maintain muscle and strength.',
           'Newer research suggests added benefits for energy and cognitive function in midlife women.'],
      dose: isEs ? '~3\u20135 g al d\u00eda de monohidrato de creatina.' : '~3\u20135 g a day of creatine monohydrate.',
      research: isEs ? 'Resumen basado en evidencia de los Institutos Nacionales de Salud (NIH).' : 'Evidence summary from the U.S. National Institutes of Health (NIH).',
      source: { label: 'NIH Office of Dietary Supplements', href: 'https://ods.od.nih.gov/factsheets/' },
    },
    {
      name: 'Omega-3',
      tag: isEs ? 'CORAZ\u00d3N \u00b7 CEREBRO' : 'HEART \u00b7 BRAIN',
      desc: isEs ? 'Antiinflamatorio. Apoya el coraz\u00f3n, el cerebro y el estado de \u00e1nimo.' : 'Anti-inflammatory. Supports heart, brain, and mood.',
      tone: 'sage',
      why: isEs
        ? ['El estr\u00f3geno protege el coraz\u00f3n, al bajar, el riesgo cardiovascular sube. Los omega-3 (EPA/DHA) ayudan a mantener los triglic\u00e9ridos y la inflamaci\u00f3n bajo control.',
           'El DHA es un componente estructural del cerebro y puede apoyar la memoria y el estado de \u00e1nimo durante la transici\u00f3n.',
           'Tambi\u00e9n pueden aliviar la rigidez articular que muchas mujeres notan en la perimenopausia.']
        : ['Estrogen protects the heart, as it drops, cardiovascular risk rises. Omega-3s (EPA/DHA) help keep triglycerides and inflammation in check.',
           'DHA is a structural building block of the brain and may support memory and mood through the transition.',
           'They can also ease the joint stiffness many women notice in perimenopause.'],
      dose: isEs ? 'Busca ~1\u20132 g combinados de EPA + DHA al d\u00eda, con comida.' : 'Aim for ~1\u20132 g combined EPA + DHA per day, with food.',
      research: isEs
        ? 'Resumen basado en evidencia de los Institutos Nacionales de Salud (NIH).'
        : 'Evidence summary from the U.S. National Institutes of Health (NIH).',
      source: { label: 'NIH Office of Dietary Supplements', href: 'https://ods.od.nih.gov/factsheets/Omega3FattyAcids-Consumer/' },
    },
    {
      name: 'Vitamin D3',
      tag: isEs ? 'HUESOS \u00b7 INMUNIDAD' : 'BONES \u00b7 IMMUNITY',
      desc: isEs ? 'La mayor\u00eda de mujeres 45+ tienen deficiencia. P\u00eddele a tu m\u00e9dico que te la mida.' : 'Most women 45+ are deficient. Ask your doctor to test your levels first.',
      tone: 'sage',
      why: isEs
        ? ['La p\u00e9rdida \u00f3sea se acelera tras la menopausia. La vitamina D es necesaria para absorber el calcio y proteger los huesos.',
           'Niveles bajos se asocian con fatiga, dolor muscular y bajo estado de \u00e1nimo, s\u00edntomas f\u00e1ciles de confundir con la menopausia.',
           'La deficiencia es muy com\u00fan en mujeres mayores de 45 a\u00f1os, sobre todo en climas con poco sol.']
        : ['Bone loss speeds up after menopause. Vitamin D is required to absorb calcium and protect your bones.',
           'Low levels are linked to fatigue, muscle aches, and low mood, symptoms easy to mistake for menopause itself.',
           'Deficiency is very common in women over 45, especially in low-sunlight climates.'],
      dose: isEs ? 'Pide un an\u00e1lisis de sangre primero. Muchos m\u00e9dicos sugieren 1000\u20132000 UI/d\u00eda seg\u00fan el resultado.' : 'Get a blood test first. Many providers suggest 1000\u20132000 IU/day depending on your result.',
      research: isEs ? 'Hoja informativa basada en evidencia del NIH.' : 'Evidence-based fact sheet from the NIH.',
      source: { label: 'NIH Office of Dietary Supplements', href: 'https://ods.od.nih.gov/factsheets/VitaminD-Consumer/' },
    },
    {
      name: 'Vitamin K2',
      tag: isEs ? 'HUESOS' : 'BONES',
      desc: isEs ? 'Funciona en pareja con la Vit D para llevar el calcio donde tiene que ir.' : 'Pairs with Vit D to get calcium where it belongs.',
      tone: 'plum',
      why: isEs
        ? ['La vitamina K ayuda a dirigir el calcio hacia los huesos y a mantenerlo fuera de las arterias.',
           'Trabaja en conjunto con la vitamina D, tomarlas juntas tiene m\u00e1s sentido que por separado.']
        : ['Vitamin K helps direct calcium into your bones and keep it out of your arteries.',
           'It works hand-in-hand with vitamin D, taking them together makes more sense than either alone.'],
      dose: isEs ? 'A menudo se combina con la vitamina D en un solo suplemento (forma K2/MK-7).' : 'Often combined with vitamin D in a single supplement (K2/MK-7 form).',
      research: isEs ? 'Hoja informativa basada en evidencia del NIH.' : 'Evidence-based fact sheet from the NIH.',
      source: { label: 'NIH Office of Dietary Supplements', href: 'https://ods.od.nih.gov/factsheets/VitaminK-Consumer/' },
    },
    {
      name: 'Magnesium L-Threonate',
      tag: isEs ? 'SUE\u00d1O \u00b7 ESTR\u00c9S' : 'SLEEP \u00b7 STRESS',
      desc: isEs ? 'Cruza mejor al cerebro. Apoya el sue\u00f1o, la calma y la memoria.' : 'Crosses into the brain better. Supports sleep, calm, and memory.',
      tone: 'plum',
      why: isEs
        ? ['El magnesio ayuda a regular el sistema nervioso, la relajaci\u00f3n muscular y el sue\u00f1o, tres cosas que la menopausia suele alterar.',
           'La forma L-treonato cruza la barrera hematoencef\u00e1lica mejor que otras formas, por lo que se asocia m\u00e1s con beneficios cognitivos y de memoria.',
           'Tambi\u00e9n participa en la salud \u00f3sea y en la regulaci\u00f3n del az\u00facar en sangre.']
        : ['Magnesium helps regulate the nervous system, muscle relaxation, and sleep, three things menopause tends to disrupt.',
           'The L-threonate form crosses the blood-brain barrier better than other forms, so it\u2019s more associated with cognitive and memory benefits.',
           'It also plays a role in bone health and blood-sugar regulation.'],
      dose: isEs ? 'Sigue la dosis del producto, suele ser ~1\u20132 g al d\u00eda de magnesio L-treonato.' : 'Follow the product dosing, typically ~1\u20132 g a day of magnesium L-threonate.',
      research: isEs ? 'Hoja informativa basada en evidencia del NIH.' : 'Evidence-based fact sheet from the NIH.',
      source: { label: 'NIH Office of Dietary Supplements', href: 'https://ods.od.nih.gov/factsheets/Magnesium-Consumer/' },
    },
    {
      name: 'Turmeric',
      tag: isEs ? 'INFLAMACI\u00d3N \u00b7 ARTICULACIONES' : 'INFLAMMATION \u00b7 JOINTS',
      desc: isEs ? 'Antiinflamatorio natural. Ayuda con el dolor articular y la hinchaz\u00f3n.' : 'Natural anti-inflammatory. Helps with joint pain and swelling.',
      tone: 'sage',
      why: isEs
        ? ['La curcumina, el compuesto activo de la c\u00farcuma, tiene propiedades antiinflamatorias que pueden ayudar con el dolor articular com\u00fan en la perimenopausia.',
           'Algunos estudios sugieren beneficios adicionales para el estado de \u00e1nimo y la salud cardiovascular.']
        : ['Curcumin, turmeric\u2019s active compound, has anti-inflammatory properties that may help with the joint pain common in perimenopause.',
           'Some studies suggest added benefits for mood and cardiovascular health.'],
      dose: isEs ? 'Busca curcumina con piperina o una forma biodisponible, ~500\u20131000 mg al d\u00eda.' : 'Look for curcumin with piperine or a bioavailable form, ~500\u20131000 mg a day.',
      research: isEs ? 'La evidencia es prometedora pero a\u00fan limitada; habla con tu m\u00e9dico.' : 'Evidence is promising but still limited; talk to your doctor.',
      source: null,
    },
    {
      name: 'Fiber',
      tag: isEs ? 'DIGESTI\u00d3N \u00b7 HORMONAS' : 'GUT \u00b7 HORMONES',
      desc: isEs ? 'Apunta a 25 g al d\u00eda. Ayuda al estr\u00f3geno a salir del cuerpo correctamente.' : 'Aim for 25 g a day. Helps estrogen leave the body the way it should.',
      tone: 'sage',
      why: isEs
        ? ['La fibra alimenta a las bacterias intestinales que ayudan a metabolizar y eliminar el estr\u00f3geno de forma equilibrada.',
           'Estabiliza el az\u00facar en sangre y la saciedad, \u00fatil cuando el metabolismo cambia en la menopausia.',
           'Apoya la salud del coraz\u00f3n al ayudar a controlar el colesterol.']
        : ['Fiber feeds the gut bacteria that help metabolize and clear estrogen in a balanced way.',
           'It steadies blood sugar and fullness, helpful when metabolism shifts in menopause.',
           'It supports heart health by helping manage cholesterol.'],
      dose: isEs ? 'Apunta a ~25 g al d\u00eda, idealmente de alimentos; un suplemento puede llenar el vac\u00edo.' : 'Aim for ~25 g a day, ideally from food; a supplement can fill the gap.',
      research: isEs ? 'Recomendaci\u00f3n general de salud p\u00fablica.' : 'General public-health guidance.',
      source: null,
    },
    {
      name: 'Probiotics',
      tag: isEs ? 'DIGESTI\u00d3N \u00b7 INMUNIDAD' : 'GUT \u00b7 IMMUNITY',
      desc: isEs ? 'Apoya la salud intestinal, que influye en hormonas, inmunidad y estado de \u00e1nimo.' : 'Supports gut health, which influences hormones, immunity, and mood.',
      tone: 'plum',
      why: isEs
        ? ['El microbioma intestinal ayuda a metabolizar el estr\u00f3geno y puede influir en c\u00f3mo se siente el cuerpo durante la transici\u00f3n.',
           'Un intestino equilibrado tambi\u00e9n se relaciona con mejor inmunidad y menor inflamaci\u00f3n.']
        : ['The gut microbiome helps metabolize estrogen and can influence how the body feels through the transition.',
           'A balanced gut is also linked to better immunity and lower inflammation.'],
      dose: isEs ? 'Busca una cepa con investigaci\u00f3n respaldada, sigue la dosis del producto.' : 'Look for a well-researched strain, follow the product\u2019s dosing.',
      research: isEs ? 'La evidencia var\u00eda seg\u00fan la cepa; habla con tu m\u00e9dico.' : 'Evidence varies by strain; talk to your doctor.',
      source: null,
    },
  ];
  return items;
}
