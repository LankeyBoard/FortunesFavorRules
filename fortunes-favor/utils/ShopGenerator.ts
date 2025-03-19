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
      this.shop = livingShop;
    } else {
      this.shop = this.decodeShop(encodedString);
    }
    console.log(this.encodeShop());
  }

  private decodeShop(encodedString: string): Shop {
    const [name, encodedInventory] = atob(
      decodeURIComponent(encodedString),
    ).split("/");
    const inventory = allPossibleInventory.map((item, index) => {
      const inStock = encodedInventory[index * 2] === "1";
      const discounted = encodedInventory[index * 2 + 1] === "1";
      return { ...item, inStock, discounted };
    });
    return { name, inventory };
  }

  private applyDiscounts(items: ShopItem[]): ShopItem[] {
    return items.map((item) => {
      if (item.discounted) {
        return { ...item, cost: Math.max(item.cost - 1, 1) };
      }
      return item;
    });
  }

  public encodeShop(): string {
    let encoded = `${this.shop.name}/`;
    this.shop.inventory.forEach((item) => {
      encoded += `${item.inStock ? "1" : "0"}${item.discounted ? "1" : "0"}`;
    });
    console.log(encoded);
    return encodeURIComponent(btoa(encoded));
  }

  public get availableItems(): ShopItem[] {
    return this.applyDiscounts(
      this.shop.inventory.filter((item) => item.inStock),
    );
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
  public set shopName(name: string) {
    this.shop.name = name;
  }
  public set inventory(inventory: ShopItem[]) {
    this.shop.inventory = inventory;
  }
  public get inventory(): ShopItem[] {
    return this.shop.inventory;
  }
}

const allPossibleInventory = [
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
    description: "A sturdy wooden cart, ideal for hauling goods and supplies.",
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
  {
    name: "Hunting Trap",
    description:
      "A mechanical trap with jagged teeth. When hidden properly, it clamps onto anything that steps into it. Test Agility (13/8) to avoid. On failure, takes 2d6 damage and is immobilized until freed.",
    cost: 1,
    inStock: true,
    discounted: false,
  },
  {
    name: "Tanglewire Net",
    description:
      "A reinforced net lined with barbed wire. Can be thrown (10ft range). A caught target must Test Mettle (13/8) to break free, breaking free on a Success or a Mixed, and taking 1d6 Slashing Damage on a Mixed or a Fail.",
    cost: 2,
    inStock: true,
    discounted: false,
  },
  {
    name: "Verminbane Powder (3 uses)",
    description:
      "A pungent alchemical powder that repels small creatures like rats, insects, and spiders within a 30ft radius for 10 minutes.",
    cost: 1,
    inStock: true,
    discounted: false,
  },
  {
    name: "Ironwood Stakes (3x)",
    description:
      "Sturdy, rune-carved stakes useful for disabling undead or anchoring magical barriers. Can be driven into soft surfaces or bodies.",
    cost: 1,
    inStock: true,
    discounted: false,
  },
  {
    name: "Thunderstick",
    description:
      "A single-use alchemical rod that, when cracked, emits a deafening boom and bright flash. All creatures within 15ft must Test Mettle (13/8) or be stunned for one round.",
    cost: 2,
    inStock: true,
    discounted: false,
  },
  {
    name: "Lantern of False Flame",
    description:
      "An oil lantern that produces cold, illusory fire. Provides light, but does not burn objects or flesh.",
    cost: 2,
    inStock: true,
    discounted: false,
  },
  {
    name: "Whisperglass Earring",
    description:
      "A small earring that allows the wearer to hear faint whispers of creatures nearby, even through walls (up to 30ft).",
    cost: 3,
    inStock: true,
    discounted: false,
  },
  {
    name: "Echoing Dagger",
    description:
      "A thin-bladed dagger that, when thrown, reappears in the wielder’s hand after 6 seconds.",
    cost: 2,
    inStock: true,
    discounted: false,
  },
  {
    name: "Soulbrand Cuffs",
    description:
      "Iron shackles enchanted to prevent spellcasting and resist being broken. Requires a Mettle Test (22) to break.",
    cost: 4,
    inStock: true,
    discounted: false,
  },
  {
    name: "Leeching Bandages",
    description:
      "Bloodstained bandages that accelerate healing but feed on the user’s vitality. Use when catching your breath, Heals 1d8 Health but reduces Stamina by 2.",
    cost: 2,
    inStock: true,
    discounted: false,
  },
  {
    name: "Flametongue Oil",
    description:
      "A thick, highly flammable oil that can coat a weapon for 10 minutes. The weapon deals an extra 1d6 fire damage on hit.",
    cost: 3,
    inStock: true,
    discounted: false,
  },
  {
    name: "Gravedigger’s Spade",
    description:
      "A heavy spade that grants Fortune’s Favor on digging-related Tests and ignores difficult terrain when moving through loose earth.",
    cost: 3,
    inStock: true,
    discounted: false,
  },
  {
    name: "Called Coin",
    description:
      "A coin that, when flipped, lands on heads or tails based on the user's true intent.",
    cost: 5,
    inStock: true,
    discounted: false,
  },
  {
    name: "Sablefang Cloak",
    description:
      "A fur-lined cloak that dulls the wearer’s scent, making them harder to track by scent-based creatures. +3 on Stealth Tests vs. beasts and others that rely on scent to track.",
    cost: 2,
    inStock: true,
    discounted: false,
  },
  {
    name: "Eclipsed Lens",
    description:
      "A small monocle that, when looked through, reveals hidden doors and secret markings within 10ft.",
    cost: 6,
    inStock: true,
    discounted: false,
  },
  {
    name: "Nightmare Tonic",
    description:
      "Drinking this dark brew lets the user stay awake for 24 hours without fatigue, but they suffer horrific hallucinations for the following week.",
    cost: 3,
    inStock: true,
    discounted: false,
  },
  {
    name: "Shadewoven Gloves",
    description:
      "Enchanted gloves that muffle sounds made by the wearer's hands. +3 on Stealth Tests involving manual actions.",
    cost: 5,
    inStock: true,
    discounted: false,
  },
  {
    name: "Gravebond Gauntlet",
    description:
      "When you make an attack, you may activate the gauntlet. If you do so, you regain Health equal to the damage done by the attack. You cannot use this effect again until the gauntlet spends a Night’s Rest covered in blood.",
    cost: 0,
    inStock: true,
    discounted: false,
  },
  {
    name: "Wraithwoven Cloak",
    description:
      "Three times per R&R, the wearer can phase through a solid object up to 5 ft. thick, traveling in a straight line and emerging on the other side. If the object is more than 5 ft. thick, the user reemerges where they started and takes 2d6 damage.",
    cost: 0,
    inStock: true,
    discounted: false,
  },
  {
    name: "Memento Mori Ring",
    description:
      "The wearer cannot be raised as undead unwillingly and has resistance to Rot damage.",
    cost: 0,
    inStock: true,
    discounted: false,
  },
  {
    name: "Ghoul’s Grasp Bracers",
    description:
      "The bracers have 3 charges. As an Action, spend a charge to cause skeletal hands to grasp at a point within 30 ft., restraining creatures in a 10 ft. radius. Recharges overnight in a graveyard.",
    cost: 0,
    inStock: true,
    discounted: false,
  },
  {
    name: "Spectral Gambit Dagger",
    description:
      "When an attack critically fails, the dagger lets the wielder reroll, but doing so reduces their Health.",
    cost: 0,
    inStock: true,
    discounted: false,
  },
  {
    name: "The Stockbroker’s Stiletto",
    description:
      "A stiletto dagger made from reforged coins. Deals an extra 3d2 damage if the target has at least 10x the wealth of the holder.",
    cost: 0,
    inStock: true,
    discounted: false,
  },
  {
    name: "The Skeleton Key (Literal)",
    description:
      "Unlocks any non-magically locked door once but leaves behind a confused, friendly skeleton who just wants to chat.",
    cost: 0,
    inStock: true,
    discounted: false,
  },
  {
    name: "The Price is Fright",
    description:
      "A coupon redeemable once for one free resurrection, but the user returns as a skeletal version of themselves. The coupon must be on your person at the time of death and must be redeemed within 10 days to be valid.",
    cost: 0,
    inStock: true,
    discounted: false,
  },
  {
    name: "Credit Score Shield",
    description:
      "A medium shield etched with arcane credit math. As an Action, expend a charge to reduce the next damage taken by the amount of Coin currently on your person. Holds seven charges, recharges after five business days in a bank.",
    cost: 0,
    inStock: true,
    discounted: false,
  },
  {
    name: "The Laughing Chalice",
    description:
      "Transforms any liquid poured into it into expensive wine. However, it giggles ominously every time it’s used.",
    cost: 0,
    inStock: true,
    discounted: false,
  },
  {
    name: "Soulbound Knucklebones",
    description:
      "A set of dice made from an unknown creature’s bones. Once per R&R, reroll any Test, but if you roll double ones, you lose half your remaining Health.",
    cost: 0,
    inStock: true,
    discounted: false,
  },
  {
    name: "Gilded Fang",
    description:
      "A golden-capped tooth that, when pressed with the tongue, lets the wearer understand all spoken languages for 10 minutes.",
    cost: 0,
    inStock: true,
    discounted: false,
  },
  {
    name: "Blood-Letter’s Quill",
    description:
      "Writing someone’s name in their own blood on a contract binds them to the terms, magically enforcing the agreed deal.",
    cost: 0,
    inStock: true,
    discounted: false,
  },
  {
    name: "The Black Market Bell",
    description:
      "When rung in total darkness, it summons a spectral vendor offering one random stolen item for sale.",
    cost: 0,
    inStock: true,
    discounted: false,
  },
  {
    name: "Puppeteer’s Strings",
    description:
      "Can control a medium or smaller fresh corpse like a marionette for 10 minutes. The corpse has 10 Health and moves at 20 ft. speed, performing only basic actions.",
    cost: 0,
    inStock: true,
    discounted: false,
  },
  {
    name: "Haunted Monocle",
    description:
      "When worn, grants +4 on Tests to determine deception, but sometimes gasps dramatically when a lie is told.",
    cost: 0,
    inStock: true,
    discounted: false,
  },
  {
    name: "The Gold Standard",
    description:
      "A single gold bar worth 3 Coin. If spent in front of a crowd, onlookers believe the buyer is far wealthier than they actually are for one hour.",
    cost: 0,
    inStock: true,
    discounted: false,
  },
  {
    name: "The Door to Nowhere",
    description:
      "A small, portable wooden trap door that, when placed on a solid flat surface, creates a random exit (but not necessarily a safe one).",
    cost: 0,
    inStock: true,
    discounted: false,
  },
  {
    name: "The Skeleton Butler Bell",
    description:
      "Ringing it summons a polite skeleton who will serve the user for one hour, but it vanishes if asked to fight.",
    cost: 0,
    inStock: true,
    discounted: false,
  },
  {
    name: "The Insatiable Coin",
    description:
      "A cursed coin that, if spent, teleports back to the spender’s pocket, whispering 'You owe me' each time.",
    cost: 0,
    inStock: true,
    discounted: false,
  },
];

const livingShop = {
  name: "Westgate General Store",
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
      name: "Weapon or Armor Enhancement",
      description:
        "2 coin to improve weapons to +1 hit or damage, or armor to +1 armor. Can only affect unimproved items.",
      cost: 2,
      inStock: true,
      discounted: false,
    },
    {
      name: "Hunting Trap",
      description:
        "A mechanical trap with jagged teeth. When hidden properly, it clamps onto anything that steps into it. Test Agility (13/8) to avoid. On failure, takes 2d6 damage and is immobilized until freed.",
      cost: 1,
      inStock: true,
      discounted: true, // Discounted
    },
    {
      name: "Tanglewire Net",
      description:
        "A reinforced net lined with barbed wire. Can be thrown (10ft range). A caught target must Test Mettle (13/8) to break free, taking 1d6 damage on a fail.",
      cost: 2,
      inStock: true,
      discounted: false,
    },
    {
      name: "Verminbane Powder (3 uses)",
      description:
        "A pungent alchemical powder that repels small creatures like rats, insects, and spiders within a 10ft radius for 10 minutes.",
      cost: 1,
      inStock: false, // Out of stock
      discounted: false,
    },
    {
      name: "Ironwood Stakes (3x)",
      description:
        "Sturdy, rune-carved stakes useful for disabling undead or anchoring magical barriers. Can be driven into soft surfaces or bodies.",
      cost: 1,
      inStock: true,
      discounted: false,
    },
    {
      name: "Thunderstick",
      description:
        "A single-use alchemical rod that, when cracked, emits a deafening boom and bright flash. All creatures within 15ft must Test Heart (13/8) or be stunned for one round.",
      cost: 2,
      inStock: false, // Out of stock
      discounted: false,
    },
    {
      name: "Lantern of False Flame",
      description:
        "An oil lantern that produces cold, illusory fire. Provides light, but does not burn objects or flesh.",
      cost: 2,
      inStock: true,
      discounted: false,
    },
    {
      name: "Whisperglass Earring",
      description:
        "A small earring that allows the wearer to hear faint whispers of creatures nearby, even through walls (up to 30ft).",
      cost: 3,
      inStock: true,
      discounted: true, // Discounted
    },
    {
      name: "Echoing Dagger",
      description:
        "A thin-bladed dagger that, when thrown, reappears in the wielder’s hand after 6 seconds.",
      cost: 3,
      inStock: true,
      discounted: false,
    },
    {
      name: "Soulbrand Cuffs",
      description:
        "Iron shackles enchanted to prevent spellcasting and resist being broken. Requires a Mettle Test (15/10) to break.",
      cost: 4,
      inStock: true,
      discounted: false,
    },
    {
      name: "Leeching Bandages",
      description:
        "Bloodstained bandages that accelerate healing but feed on the user’s vitality. Heals 1d8 Health but reduces Stamina by 2.",
      cost: 2,
      inStock: true,
      discounted: false,
    },
    {
      name: "Flametongue Oil",
      description:
        "A thick, highly flammable oil that can coat a weapon for 10 minutes. The weapon deals an extra 1d6 fire damage on hit.",
      cost: 3,
      inStock: true,
      discounted: false,
    },
    {
      name: "Gravedigger’s Spade",
      description:
        "A heavy spade that grants Fortune’s Favor on digging-related Tests and ignores difficult terrain when moving through loose earth.",
      cost: 3,
      inStock: false, // Out of stock
      discounted: false,
    },
    {
      name: "Pactbound Coin",
      description:
        "A coin that, when flipped, lands on heads or tails based on the user's true intent. Useful for making binding agreements.",
      cost: 5,
      inStock: true,
      discounted: false,
    },
    {
      name: "Sablefang Cloak",
      description:
        "A fur-lined cloak that dulls the wearer’s scent, making them harder to track by scent-based creatures. +3 on Stealth Tests vs. beasts.",
      cost: 4,
      inStock: true,
      discounted: false,
    },
    {
      name: "Eclipsed Lens",
      description:
        "A small monocle that, when looked through, reveals hidden doors and secret markings within 10ft.",
      cost: 6,
      inStock: false, // Out of stock
      discounted: false,
    },
    {
      name: "Nightmare Tonic",
      description:
        "Drinking this dark brew lets the user stay awake for 24 hours without fatigue, but they suffer horrific hallucinations whenever they try to sleep again.",
      cost: 3,
      inStock: true,
      discounted: true,
    },
    {
      name: "Shadewoven Gloves",
      description:
        "Enchanted gloves that muffle sounds made by the wearer's hands. +3 on Stealth Tests involving manual actions.",
      cost: 5,
      inStock: true,
      discounted: false,
    },
  ],
};
const defaultShop = {
  name: "General Store",
  inventory: allPossibleInventory,
};
