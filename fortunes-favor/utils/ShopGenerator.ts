export interface ShopItem {
  name: string;
  description: string;
  cost: number;
  inStock: boolean;
  discounted: boolean;
}

export interface Shop {
  name: string;
  inventory: ShopItem[];
}

export class ItemShop {
  private shop: Shop;

  constructor(encodedString?: string) {
    if (!encodedString) {
      this.shop = defaultShop;
    } else {
      this.shop = this.decodeShop(encodedString);
    }
  }

  private decodeShop(encodedString: string): Shop {
    const decoded = JSON.parse(decodeURI(encodedString));
    return {
      name: decoded.name,
      inventory: decoded.inventory.map((item: any) => ({
        name: item.name,
        description: item.description,
        cost: item.cost,
        inStock: item.inStock,
        discounted: item.discounted,
      })),
    };
  }

  public encodeShop(): string {
    const encoded = encodeURI(JSON.stringify(this.shop));
    return encoded;
  }

  public get availableItems(): ShopItem[] {
    return this.shop.inventory.filter((item) => item.inStock);
  }
  public updateShopContents(variation: number): void {
    // Update the shop contents by randomly adding or removing items
    // variation is a number between 0 and 100 that represents how likely it is for an item to be added or removed.
    // If variation is 0, no changes are made. If variation is 50, half of the items are replaced with different items from the possibleItems at 100, all items are replaces.
    if (variation === 0) return;
    this.shop.inventory.forEach((item) => {
      if (Math.random() * 100 < variation) {
        item.inStock = !item.inStock;
      }
    });
  }
  public get shopName(): string {
    return this.shop.name;
  }
}

const defaultShop = {
  name: "General Store",
  inventory: [
    {
      name: "Supplies (5x)",
      description:
        "5 supplies costs 1 coin and can be used to improve an equipment roll by 1 step.",
      cost: 1,
      inStock: true,
      discounted: false,
    },
    {
      name: "Weapon/Armor Improvement",
      description:
        "2 coin to improve weapons to +1 hit or damage or armor to +1 armor. Can only affect unimproved items.",
      cost: 2,
      inStock: true,
      discounted: false,
    },
    {
      name: "Horse or Trained Pack Animal",
      description:
        "A reliable beast of burden for travel and carrying goods. Requires 1 coin worth of feed and care per month.",
      cost: 1,
      inStock: true,
      discounted: false,
    },
    {
      name: "Cart",
      description:
        "A sturdy wooden cart, ideal for hauling goods and supplies.",
      cost: 1,
      inStock: true,
      discounted: false,
    },
    {
      name: "Smoke Bomb [3x]",
      description:
        "Creates a fast-acting smoke, instantly obscuring a 15ft radius for 1 minute or until cleared by strong wind.",
      cost: 1,
      inStock: true,
      discounted: false,
    },
    {
      name: "Flashfire",
      description:
        "Thrown explosive creating a 10ft burst of flame. Targets test Agility (13/8) or take 4d6 fire damage.",
      cost: 1,
      inStock: true,
      discounted: false,
    },
    {
      name: "Lockbreaker Acid",
      description:
        "A vial of potent acid capable of corroding 2 inches of metal before evaporating.",
      cost: 2,
      inStock: true,
      discounted: false,
    },
    {
      name: "Hexbane Amulet",
      description:
        "Resists a single curse, hex, or malevolent spell before breaking apart.",
      cost: 3,
      inStock: true,
      discounted: false,
    },
    {
      name: "Raven’s Whisper Scroll",
      description:
        "Sends a short message up to a mile away in the voice of a croaking raven.",
      cost: 2,
      inStock: true,
      discounted: false,
    },
    {
      name: "Corpse Stitch Thread",
      description:
        "Magically stabilizes a creature at 0 health, restoring them to 1 health and 1 stamina with severe scarring.",
      cost: 4,
      inStock: true,
      discounted: false,
    },
    {
      name: "Grim Tonic",
      description:
        "For one minute, gain +1d6 to all Tests and damage rolls. Afterwards, Stamina is reduced by half.",
      cost: 2,
      inStock: true,
      discounted: false,
    },
    {
      name: "Bloodbind Gauntlets",
      description:
        "Spend 2 health to gain +5 on the next Test of Mettle in the next minute.",
      cost: 4,
      inStock: true,
      discounted: false,
    },
    {
      name: "Bloodthirst Ring",
      description: "While below half health, increase base damage by 1 step.",
      cost: 10,
      inStock: true,
      discounted: false,
    },
    {
      name: "Whispering Chain",
      description: "3 times per day, grants +3 on a Heart Test to spot danger.",
      cost: 7,
      inStock: true,
      discounted: false,
    },
    {
      name: "Gravewalker Boots",
      description: "Grants +3 on Tests to stealth and move silently.",
      cost: 5,
      inStock: true,
      discounted: false,
    },
    {
      name: "Climbing Claws",
      description: "Grants +3 to climbing-related Tests.",
      cost: 2,
      inStock: true,
      discounted: false,
    },
  ],
};
