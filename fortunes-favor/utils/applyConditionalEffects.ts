import extractEffectsFromItems from "./extractEffectsFromItems";
import PlayerCharacter from "./PlayerCharacter";

export type Effect = {
  target: string;
  operation: string;
  value: number;
  condition?: string;
};

function applyEffects(fieldValue: number, effects: Effect[]): number {
  effects.forEach((effect) => {
    const { target, operation, value } = effect;

    switch (operation) {
      case "add":
        fieldValue += value;
        break;
      case "subtract":
        fieldValue -= value;
        break;
      case "multiply":
        fieldValue *= value;
        break;
      case "divide":
        fieldValue /= value;
        break;
      case "set":
        fieldValue = value;
        break;
      default:
        throw new Error(`Unknown operation: ${operation}`);
    }
  });
  return fieldValue;
}

// For a given field name, apply effects to that field if the condition is met and return the modified field results
function applyConditionalEffects(
  fieldName: string,
  fieldValue: number,
  character: PlayerCharacter,
): number {
  const effects = extractEffectsFromItems(character.items);
  if (typeof fieldValue === "number") {
    effects.forEach((effect) => {
      if (effect.target === fieldName) {
        if (
          !effect.condition ||
          eval(effect.condition.replace(/(\w+)/g, "character.$1"))
        ) {
          fieldValue = applyEffects(fieldValue as number, [effect]);
        }
      }
    });
  }
  return fieldValue;
}
export default applyConditionalEffects;
