import { Effect } from "./applyConditionalEffects";
import CharacterItem from "./CharacterItem";

function extractEffectsFromItems(items: CharacterItem[]): Effect[] {
  if (!items || items.length === 0) return [];
  return items
    .flatMap((item) => item.effects || [])
    .filter((effect): effect is Effect => effect !== undefined);
}

export default extractEffectsFromItems;
