// High-protein quick reference, lifted verbatim from the previous
// NutritionHub screen.

export function getFoods(lang) {
  const isEs = lang === 'es';
  const foods = isEs ? [
    { name: 'Yogur griego (puro)', amt: '17 g / taza', tag: 'PROTEÍNA' },
    { name: 'Huevos',              amt: '6 g / unidad', tag: 'PROTEÍNA' },
    { name: 'Pechuga de pollo',    amt: '31 g / 100 g', tag: 'PROTEÍNA' },
    { name: 'Lentejas cocidas',    amt: '18 g / taza',  tag: 'PROTEÍNA + FIBRA' },
    { name: 'Requesón',            amt: '25 g / taza',  tag: 'PROTEÍNA' },
    { name: 'Tofu firme',          amt: '20 g / 100 g', tag: 'PROTEÍNA' },
    { name: 'Salmón',              amt: '22 g / 100 g', tag: 'PROTEÍNA + OMEGA-3' },
    { name: 'Edamame',             amt: '17 g / taza',  tag: 'PROTEÍNA + FIBRA' },
    { name: 'Quinoa cocida',       amt: '8 g / taza',   tag: 'PROTEÍNA + FIBRA' },
    { name: 'Almendras',           amt: '6 g / 28 g',   tag: 'PROTEÍNA + GRASA' },
  ] : [
    { name: 'Greek yogurt (plain)', amt: '17 g / cup',  tag: 'PROTEIN' },
    { name: 'Eggs',                 amt: '6 g / each',  tag: 'PROTEIN' },
    { name: 'Chicken breast',       amt: '31 g / 100 g', tag: 'PROTEIN' },
    { name: 'Cooked lentils',       amt: '18 g / cup',  tag: 'PROTEIN + FIBER' },
    { name: 'Cottage cheese',       amt: '25 g / cup',  tag: 'PROTEIN' },
    { name: 'Firm tofu',            amt: '20 g / 100 g', tag: 'PROTEIN' },
    { name: 'Salmon',               amt: '22 g / 100 g', tag: 'PROTEIN + OMEGA-3' },
    { name: 'Edamame',              amt: '17 g / cup',  tag: 'PROTEIN + FIBER' },
    { name: 'Cooked quinoa',        amt: '8 g / cup',   tag: 'PROTEIN + FIBER' },
    { name: 'Almonds',              amt: '6 g / 28 g',  tag: 'PROTEIN + FAT' },
  ];
  return foods;
}
