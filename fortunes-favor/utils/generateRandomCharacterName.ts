import randomNames from './randomNames.json';

type RandomNames = {
  cultures: Record<string, string[]>;
  lineages: Record<string, string[]>;
  combinations: Record<string, Record<string, string[]>>;
};

const getRandomItem = <T>(items: T[]): T => {
  return items[Math.floor(Math.random() * items.length)];
};

const generateRandomName = (culture: string, lineage: string): string => {
  const names = randomNames as RandomNames;
  const hasCulture = culture in names.cultures;
  const hasLineage = lineage in names.lineages;

  if (!hasCulture && !hasLineage) {
    throw new Error(`Invalid culture and lineage: ${culture}, ${lineage}`);
  }

  const candidates: Array<{ source: 'culture' | 'lineage' | 'combination'; list: string[] }> = [];

  if (hasCulture) {
    candidates.push({ source: 'culture', list: names.cultures[culture] });
  }

  if (hasLineage) {
    candidates.push({ source: 'lineage', list: names.lineages[lineage] });
  }

  if (hasCulture && hasLineage) {
    const combo = names.combinations[culture]?.[lineage];
    if (Array.isArray(combo) && combo.length > 0) {
      candidates.push({ source: 'combination', list: combo });
    }
  }

  if (candidates.length === 0) {
    throw new Error(`No valid name source available for culture=${culture} lineage=${lineage}`);
  }

  const chosen = getRandomItem(candidates);
  return getRandomItem(chosen.list);
};

export default generateRandomName;