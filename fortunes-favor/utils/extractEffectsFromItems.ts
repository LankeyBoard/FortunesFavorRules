import { Effect } from "./applyConditionalEffects";
import Item from "./Item";

function extractEffectsFromItems(items: Item[]): Effect[] {
  if (!items || items.length === 0) return [];
  return items
    .flatMap((item) => item.effects || [])
    .filter((effect): effect is Effect => effect !== undefined);
}

export default extractEffectsFromItems;
