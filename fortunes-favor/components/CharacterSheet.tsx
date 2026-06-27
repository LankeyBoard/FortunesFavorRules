"use client";

import client from "@/utils/graphQLclient";
import { useMutation } from "@apollo/client";
import { useState, useEffect, useRef } from "react";
import { PDFDocument, StandardFonts } from "pdf-lib";
import * as Sentry from "@sentry/react";

import CharacterOtherInfo from "./blocks/CharacterSheetComponents/CharacterOtherInfo";
import CharacterCoreInfo from "./blocks/CharacterSheetComponents/CharacterCoreInfo";
import PlayerCharacter, {
  ArmorType,
  FeatureSource,
  PlayerCharacterFeature,
  ShieldType,
} from "@/utils/PlayerCharacter";
import CharacterClassData from "@/utils/CharacterClass";
import CharacterCulture from "@/utils/CharacterCulture";
import CharacterLineage from "@/utils/CharacterLineage";
import CharacterFeatures from "./blocks/CharacterSheetComponents/CharacterFeatures";
import debounce from "@/utils/debounce";
import TextInput from "./blocks/Inputs/TextInput";
import CharacterClass from "@/utils/CharacterClass";
import {
  findEnumKey,
  findEnumValue,
  Rarity,
  RechargeOn,
  RuleType,
  SizeOptions,
} from "@/utils/enums";
import { GenericCharacterFeatures } from "./blocks/GenericFeaturePicker";
import GET_CHARACTER_INFO, {
  GetCharacterData,
} from "@/utils/graphQLQueries/playerCharacterQueries/PlayerCharacterQuery";
import UPDATE_CHARACTER_MUTATION from "@/utils/graphQLMutations/UpdateCharacterMutation";
import GET_CHARACTER_OPTIONS from "@/utils/graphQLQueries/playerCharacterQueries/PlayerCharacterOptionsQuery";
import CREATE_CHARACTER_MUTATION from "@/utils/graphQLMutations/CreateCharacterMutation";
import Button, { ButtonType } from "./blocks/Inputs/Button";
import CharacterItem from "@/utils/CharacterItem";
import { RuleText } from "@/utils/graphQLtypes";
import { useRouter } from "next/navigation";
import FullPageLoading from "./FullPageLoading";
import Link from "next/link";
import Save from "./icons/Save";
import Edit from "./icons/Edit";
import Print from "./icons/Print";
import convertToChoices from "@/utils/convertToChoices";

const extractPlayerCharacter = (data: GetCharacterData): PlayerCharacter => {
  console.debug("extractPlayerCharacter input data", data);
  const characterClass = new CharacterClassData(data.character.characterClass);
  const culture = new CharacterCulture(data.character.characterCulture);
  const lineage = new CharacterLineage(data.character.characterLineage);
  const character = new PlayerCharacter(
    culture,
    lineage,
    characterClass,
    undefined,
  );
  character.level = data.character.level;
  character.stats = {
    mettle: data.character.mettle,
    agility: data.character.agility,
    intellect: data.character.intellect,
    heart: data.character.heart,
  };
  character.currentHealth = data.character.currentHealth;
  character.currentStamina = data.character.currentStamina;
  character.coin = data.character.coin;
  character.name = data.character.name;
  character.id = data.character.id;
  character.armorName = data.character.armorName as ArmorType;
  character.shieldName = data.character.shieldName as ShieldType;
  character.maxSlots = data.character.maxSlots;
  character.items = data.character.items.map((item) => {
    const itemText: [RuleText] =
      item.text && item.text.length > 0 ? [item.text[0]] : [{ text: "" }];
    return new CharacterItem(
      item.title,
      itemText,
      item.isMagic,
      item.slots,
      Rarity[item.rarity as keyof typeof Rarity],
      item.uses
        ? {
            ...item.uses,
            rechargeOn:
              RechargeOn[item.uses.rechargeOn as keyof typeof RechargeOn],
          }
        : undefined,
      item.id,
      item.effects,
    );
  });
  character.spells = data.character.spells;
  character.notes = data.character.notes;
  character.damageType = data.character.damageType;
  character.noviceFeatures = data.character.noviceFeatures.map(
    (f) =>
      new PlayerCharacterFeature(
        f.title,
        FeatureSource.NOVICE_FEATURE,
        [],
        f.slug,
        f.ruleType as RuleType,
        f.text,
        f.multiSelect,
        convertToChoices(f.choices),
        f.chooseNum,
      ),
  );
  character.form = data.character.form;
  character.beast = data.character.beast;
  character.size = findEnumValue(data.character.size, SizeOptions);
  console.debug("extractPlayerCharacter returned", character);
  return character;
};

const extractGenericFeatures = (
  data: GetCharacterData,
): {
  noviceFeatures: PlayerCharacterFeature[];
  veteranFeatures: PlayerCharacterFeature[];
} => {
  const noviceFeature: PlayerCharacterFeature[] = [];
  const veteranFeatures: PlayerCharacterFeature[] = [];
  data.noviceFeatures.forEach((feature) => {
    const f = new PlayerCharacterFeature(
      feature.title,
      FeatureSource.NOVICE_FEATURE,
      [],
      feature.slug,
      findEnumValue(feature.ruleType, RuleType),
      feature.text,
      feature.multiSelect,
      convertToChoices(feature.choices),
      feature.chooseNum,
      false,
      feature.shortText,
    );
    noviceFeature.push(f);
  });
  data.veteranFeatures.forEach((feature) => {
    const f = new PlayerCharacterFeature(
      feature.title,
      FeatureSource.VETERAN_FEATURE,
      [],
      feature.slug,
      findEnumValue(feature.ruleType, RuleType),
      feature.text,
      feature.multiSelect,
      convertToChoices(feature.choices),
      feature.chooseNum,
      false,
      feature.shortText,
    );
    veteranFeatures.push(f);
  });
  return { noviceFeatures: noviceFeature, veteranFeatures: veteranFeatures };
};

const convertPlayerCharacterToGraphInput = (character: PlayerCharacter) => {
  console.log("character at start of conversion", character);
  const inputs = {
    name: character.name,
    level: character.level,
    mettle: character.stats.mettle,
    agility: character.stats.agility,
    heart: character.stats.heart,
    intellect: character.stats.intellect,
    coin: character.coin,
    languages: character.languages,
    characterClass: character.characterClass?.slug || "",
    characterLineage: character.lineage?.slug || "",
    characterCulture: character.culture?.slug || "",
    maxHealth: character.maxHealth,
    maxStamina: character.maxStamina,
    currentHealth: character.currentHealth,
    currentStamina: character.currentStamina,
    armorName: character.armorName,
    shieldName: character.shieldName,
    counter: character.counter,
    baseDamage: character.baseDamage?.count || 0,
    rangeMin: character.range?.min || 0,
    rangeMax: character.range?.max || 0,
    notes: character.notes,
    damageType: character.damageType,
    chosen: character.getChosenGraphQLInput(),
    items: character.items.map((item) => {
      return {
        ...item,
        text: item.text.map((text) => {
          return { text: text.text, type: text.type };
        }),
        effects:
          item.effects?.map((effect) => {
            return {
              target: effect.target,
              operation: effect.operation,
              value: effect.value,
              condition: effect.condition,
            };
          }) || [],
        rarity: item.rarity ? findEnumKey(item.rarity, Rarity) : undefined,
        uses: item.uses
          ? {
              used: item.uses.used,
              max: item.uses.max,
              rechargeOn: Object.keys(RechargeOn).find(
                (key) =>
                  RechargeOn[key as keyof typeof RechargeOn] ===
                  item.uses?.rechargeOn,
              ),
            }
          : undefined,
        defaultPrice: item.defaultPrice || 0,
        tags: [],
      };
    }),
  };
  console.log("character sheet inputs converted to graphql Input", inputs);
  return inputs;
};

export enum CharacterSheetViewMode {
  ViewOnly,
  Owner,
}

export type CharacterOptions = {
  characterClasses: CharacterClass[];
  characterCultures: CharacterCulture[];
  characterLineages: CharacterLineage[];
  genericFeatures: GenericCharacterFeatures;
};

type CampaignInfo = {
  id: string;
  title: string;
};

// If a characterId is provided, the sheet will load that character and edit it. Otherwise a new character will be created.
const CharacterSheet = ({ characterId }: { characterId?: number }) => {
  const [character, setCharacter] = useState<PlayerCharacter | undefined>(
    undefined,
  );
  const [campaignInfo, setCampaignInfo] = useState<CampaignInfo | undefined>(
    undefined,
  );
  const [characterOptions, setCharacterOptions] = useState<
    CharacterOptions | undefined
  >(undefined);
  const [isEditable, setEditable] = useState(characterId === undefined);
  const [viewMode, setViewMode] = useState(
    characterId
      ? CharacterSheetViewMode.ViewOnly
      : CharacterSheetViewMode.Owner,
  );
  const [loadingError, setLoadingError] = useState<any>(null);
  const [updateCharacter] = useMutation(UPDATE_CHARACTER_MUTATION);
  const [createCharacter] = useMutation(CREATE_CHARACTER_MUTATION);

  const router = useRouter();

  const saveCharacter = async (character: PlayerCharacter) => {
    try {
      console.log("saveCharacter character id", character.id);
      if (character.id) {
        const { data } = await updateCharacter({
          variables: {
            id: character.id,
            characterInputs: convertPlayerCharacterToGraphInput(character),
          },
        });
        console.log("character updated", data);
        Sentry.captureMessage("Character updated successfully", {
          level: "info",
          extra: { characterId: character.id },
        });
        return data;
      } else {
        const { data } = await createCharacter({
          variables: {
            characterInputs: convertPlayerCharacterToGraphInput(character),
          },
        });
        console.log("character created", data);
        if (!data.createCharacter.id)
          throw new Error("Error creating character");
        const newCharacter = new PlayerCharacter(
          undefined,
          undefined,
          undefined,
          character,
        );
        newCharacter.id = data.createCharacter.id;
        setCharacter(newCharacter);
        router.replace(`/characters/${data.createCharacter.id}`);
        Sentry.captureMessage("Character created successfully", {
          level: "info",
          extra: { characterId: data.createCharacter.id },
        });
        return data;
      }
    } catch (error) {
      Sentry.captureException(error);
      throw error;
    }
  };

  // load character if there is a characterId otherwise only load character options.
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await client.query({
          query: characterId ? GET_CHARACTER_INFO : GET_CHARACTER_OPTIONS,
          variables: { id: Number(characterId) },
        });
        console.debug("GraphQL Data to build Character", data);
        Sentry.captureMessage("Character data loaded successfully", {
          level: "info",
          extra: { characterId },
        });
        const genericFeatures = extractGenericFeatures(data);
        if (characterId) {
          if (data.me.id === data.character.createdBy.id)
            setViewMode(CharacterSheetViewMode.Owner);
          setCharacter(extractPlayerCharacter(data));
        }
        const charOptions: CharacterOptions = {
          characterClasses: [],
          characterCultures: [],
          characterLineages: [],
          genericFeatures: genericFeatures,
        };
        if (data.cultures) {
          data.cultures.forEach((culture: any) => {
            charOptions.characterCultures.push(new CharacterCulture(culture));
          });
        }
        if (data.lineages) {
          data.lineages.forEach((lineage: any) => {
            charOptions.characterLineages.push(new CharacterLineage(lineage));
          });
        }
        if (data.characterClasses) {
          data.characterClasses.forEach((characterClass: any) => {
            charOptions.characterClasses.push(
              new CharacterClass(characterClass),
            );
          });
        }
        if (data.character?.campaign) {
          setCampaignInfo({
            id: data.character.campaign.id,
            title: data.character.campaign.name,
          });
        }
        setCharacterOptions(charOptions);
        if (!characterId) {
          setCharacter(
            new PlayerCharacter(
              charOptions.characterCultures[0],
              charOptions.characterLineages[0],
              charOptions.characterClasses[0],
            ),
          );
        }
      } catch (error) {
        setLoadingError(error);
        Sentry.captureException(error);
      }
    };
    fetchData();
  }, [characterId]);

  // Add a ref to store the previous character state
  const prevCharacterRef = useRef<PlayerCharacter | undefined>(undefined);

  // save updates to the backend of an existing character.
  useEffect(() => {
    if (character && character.id) {
      // checks if the character has actually changed. prevCharacterRef.current is undefined when the page loads.
      const hasCharacterChanged =
        prevCharacterRef.current != undefined &&
        JSON.stringify(character) !== JSON.stringify(prevCharacterRef.current);

      if (hasCharacterChanged) {
        const debouncedSave = debounce(() => {
          console.info("Saving character to DB", character);
          saveCharacter(character);
        }, 2000);
        debouncedSave();
      }
      prevCharacterRef.current = character; // Update the ref with the current character
    }
  }, [character]);

  const populateAndDownloadPDF = async (character: PlayerCharacter) => {
    console.log("Creating Downloadable Character Sheet", character);
    const url = "/CharacterSheetFillable.pdf";
    const existingPdfBytes = await fetch(url).then((res) => res.arrayBuffer());

    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const form = pdfDoc.getForm();
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const helveticaBoldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    const featureText = character.printFeaturesRules();
    const featureLines = featureText.split("\n");
    const hasMoreFeatureLines = featureLines.length > 25;
    const featurePage1Text = hasMoreFeatureLines
      ? featureLines.slice(0, 25).join("\n")
      : featureText;

    const hasSpells = character.spells && character.spells.length > 0;
    const hasNotes = !!character.notes?.trim();
    const hasShifterForm = !!character.form;
    const hasBeast = !!character.beast;
    const remainingFeaturesText = hasMoreFeatureLines
      ? featureLines.slice(25).join("\n")
      : "";
    const buildExtraText = () => {
      const sections: string[] = [];
      if (hasMoreFeatureLines) {
        sections.push(`Remaining Features:\n${remainingFeaturesText}`);
      }
      if (hasNotes) {
        sections.push(`Notes:\n${character.notes}`);
      }
      return sections.join("\n\n");
    };

    const featureExtraText = buildExtraText();
    const useBeastPage = hasBeast;
    const useShifterPage = hasShifterForm;
    const useGeneratedExtrasPage =
      hasSpells || (!useBeastPage && !useShifterPage && featureExtraText.length > 0);

    // Populate fields with character data
    form.getTextField("CharacterName").setText(character.name);
    form.getTextField("Level").setText(character.level.toString());
    form.getTextField("Class").setText(character.characterClass?.title || "");
    form.getTextField("Culture").setText(character.culture?.title || "");
    form.getTextField("Lineage").setText(character.lineage?.title || "");
    form.getTextField("Mettle").setText(character.stats.mettle.toString());
    form.getTextField("Agility").setText(character.stats.agility.toString());
    form
      .getTextField("Intellect")
      .setText(character.stats.intellect.toString());
    form.getTextField("Heart").setText(character.stats.heart.toString());

    form.getTextField("MaxHealth").setText(character.maxHealth.toString());

    form.getTextField("MaxStamina").setText(character.maxStamina.toString());
    form.getTextField("Coin").setText(character.coin?.toString() || "0");
    form
      .getTextField("CurrentSlots")
      .setText(character.slotsUsed.toString());
    form.getTextField("MaxSlots").setText(character.maxSlots.toString());
    form.getTextField("Languages").setText(character.languages?.join(", "));
    form.getTextField("Size").setText(character.size?.toLowerCase() || "");
    form.getTextField("Speed").setText(character.speeds.map((s) => s.speed).join(", ") || "");

    // Populate combat info
    form.getTextField("Attack").setText(character.attack.toString() || "");
    form.getTextField("Damage").setText(character.baseDamage.toString());
    form
      .getTextField("Range")
      .setText(
        character.range ? `${character.range.min}-${character.range.max}` : "",
      );
    form.getTextField("Armor").setText(character.armor.toString() || "");
    form.getTextField("Counter").setText(character.counter?.toString() || "");
    form.getTextField("Deflect").setText(character.deflect?.toString() || "");

    // Populate features and items
    form.getTextField("Actions").setText(character.actions.toString());
    form.getTextField("Counters").setText(character.counters.toString());
    form.getTextField("Features").setText(featurePage1Text);
    form
      .getTextField("Items")
      .setText(
        character.items
          .map((item) => `${item.title} (${item.slots} slots)\n${item.text.map((t) => t.text).join("\n")}`)
          .join("\n"),
      );

    const originalPageCount = pdfDoc.getPageCount();
    const pageTwo = originalPageCount > 1 ? pdfDoc.getPage(1) : undefined;
    const pageThree = originalPageCount > 2 ? pdfDoc.getPage(2) : undefined;

    if (useBeastPage && pageTwo && character.beast) {
      const beast = character.beast;
      form.getTextField("BeastType").setText(beast.title);

      const beastMaxHealth = beast.health
        ? beast.health.base + beast.health.perLevel * character.level
        : 0;
      form.getTextField("BeastMaxHealth").setText(beastMaxHealth.toString());

      form.getTextField("BeastAttack").setText(
        beast.damage?.stat?.map((stat) => stat.toLowerCase()).join(", ") || "",
      );
      form.getTextField("BeastDamage").setText(
        beast.damage ? `${beast.damage.count}d${beast.damage.dice} ${beast.damage?.type?.join(", ") || ""}` : "",
      );
      form.getTextField("BeastRange").setText(
        "melee",
      );
      form.getTextField("BeastArmor").setText(
        beast.armor !== undefined ? beast.armor.toString() : "",
      );
      form.getTextField("BeastCounter").setText((beast.armor-5).toString());
      form.getTextField("BeastSpeed").setText(
        beast.speed?.map((speed) => `${speed.speed} ${speed.type}`).join(", ") || "",
      );
      form.getTextField("BeastMettle").setText(
        beast.stats?.mettle?.toString() || "",
      );
      form.getTextField("BeastAgility").setText(
        beast.stats?.agility?.toString() || "",
      );
      form.getTextField("BeastIntellect").setText(
        beast.stats?.intellect?.toString() || "",
      );
      form.getTextField("BeastHeart").setText(
        beast.stats?.heart?.toString() || "",
      );

      const beastSections: string[] = [];
      if (beast.health) {
        beastSections.push(
          `Health: ${beast.health.base} + ${beast.health.perLevel} per level`,
        );
      }
      if (beast.armor !== undefined) {
        beastSections.push(`Armor: ${beast.armor}`);
      }
      if (beast.speed?.length) {
        beastSections.push(
          `Speed: ${beast.speed
            .map((speed) => `${speed.speed} ${speed.type}`)
            .join(", ")}`,
        );
      }
      if (beast.stats) {
        beastSections.push(
          `Stats: Agility: ${beast.stats.agility}, Heart: ${beast.stats.heart}, Intellect: ${beast.stats.intellect}, Mettle: ${beast.stats.mettle}`,
        );
      }
      if (beast.damage) {
        beastSections.push(
          `Damage: ${beast.damage.count}d${beast.damage.dice} ${beast.damage.stat
            .map((stat) => stat.toLowerCase())
            .join(", ")} ${beast.damage.type.join(", ")}`,
        );
      }
      if (beast.abilities?.length) {
        beastSections.push(
          "Abilities:\n" +
            beast.abilities
              .map((ability) => `${ability.title}: ${ability.text}`)
              .join("\n"),
        );
      }
      if (featureExtraText.length) {
        beastSections.push(featureExtraText);
      }
      form.getTextField("BeastFeatures").setText(beastSections.join("\n\n"));
    }

    if (useShifterPage && pageThree && character.form) {
      form.getTextField("FormAttack").setText(
        character.form.attackStat.toLowerCase(),
      );
      const formDamageText = character.form.damage
        .map((damage) => {
          const statText = damage.stat?.length
            ? ` + ${damage.stat.map((stat) => stat.toLowerCase()).join(", ")}`
            : "";
          return `${damage.count}d${damage.dice}${statText}`;
        })
        .join(" + ");
      form.getTextField("FormDamage").setText(formDamageText);
      form.getTextField("FormRange").setText("");
      form.getTextField("FormArmor").setText(
        character.form.armor.stat
          ? `${character.form.armor.baseArmor} + ${character.form.armor.stat.toLowerCase()}`
          : `${character.form.armor.baseArmor}`,
      );
      form.getTextField("FormCounter").setText("");
      form.getTextField("FormSpeed").setText(
        character.form.size.toLocaleLowerCase(),
      );
      form.getTextField("FormFeatures").setText(
        character.form.features
          .map((feature) =>
            feature.title
              ? `${feature.title}: ${feature.text}`
              : feature.text,
          )
          .join("\n"),
      );
      form.getTextField("ExtraFeatures").setText(
        featureExtraText,
      );
    }

    
    const shouldGeneratePage = useGeneratedExtrasPage;
    if (shouldGeneratePage) {
      const pageSize = pdfDoc.getPage(0).getSize();
      const page = pdfDoc.addPage([pageSize.width, pageSize.height]);
      const margin = 48;
      const contentWidth = pageSize.width - margin * 2;
      const fontSize = 10;
      const headingSize = 14;
      const lineHeight = fontSize * 1.4;
      let cursorY = pageSize.height - margin;

      const drawWrappedText = (
        text: string,
        font: any,
        size: number,
        x: number,
        y: number,
      ) => {
        let currentY = y;
        const lines = text.split("\n");
        lines.forEach((line) => {
          let remainingLine = line;
          while (remainingLine.length > 0) {
            let fit = remainingLine;
            while (fit.length > 0 && font.widthOfTextAtSize(fit, size) > contentWidth) {
              fit = fit.slice(0, -1);
            }
            if (fit.length === 0) {
              break;
            }
            let drawLine = fit;
            if (fit.length < remainingLine.length) {
              const lastSpace = fit.lastIndexOf(" ");
              if (lastSpace > 0) {
                drawLine = fit.slice(0, lastSpace);
              }
            }
            page.drawText(drawLine, {
              x,
              y: currentY,
              size,
              font,
            });
            currentY -= lineHeight;
            remainingLine = remainingLine.slice(drawLine.length).trimStart();
          }
          currentY -= lineHeight * 0.25;
        });
        return currentY;
      };

      const drawSection = (title: string, text: string) => {
        page.drawText(title, {
          x: margin,
          y: cursorY,
          size: headingSize,
          font: helveticaBoldFont,
        });
        cursorY -= headingSize + 6;
        cursorY = drawWrappedText(text, helveticaFont, fontSize, margin, cursorY);
        cursorY -= lineHeight;
      };

      if (hasSpells) {
        const spellsText = character.spells
          .map((spell) => `${spell.name} (Lvl ${spell.level})${spell.description ? `: ${spell.description}` : ""}`)
          .join("\n");
        drawSection("Spells:", spellsText);
      }

      if (!useBeastPage && !useShifterPage && featureExtraText.length) {
        drawSection("Remaining Features:", remainingFeaturesText);
        if (hasNotes) {
          drawSection("Notes:", character.notes || "");
        }
      }
    }

    if (!useShifterPage && originalPageCount > 2) {
      pdfDoc.removePage(2);
    }
    if (!useBeastPage && originalPageCount > 1) {
      pdfDoc.removePage(1);
    }

    // Save the PDF
    const pdfBytes = await pdfDoc.save();
    
    // Trigger download
    const blob = new Blob([new Uint8Array(pdfBytes)], {
      type: "application/pdf",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${character.name}_character_sheet.pdf`;
    link.click();
  };

  if (loadingError) {
    console.error(loadingError);
    return <div>Error loading character data.</div>;
  }

  if (!character || !character.characterClass || !characterOptions) {
    return <FullPageLoading />;
  }

  const updateName = (newName: string) => {
    const newCharacter = new PlayerCharacter(
      undefined,
      undefined,
      undefined,
      character,
    );
    newCharacter.name = newName;
    setCharacter(newCharacter);
  };

  return (
    <div className="pb-20">
      {isEditable ? (
        <h2 className="font-thin text-xl mx-auto text-center p-4 dark:bg-teal-900 bg-teal-100">
          <TextInput
            placeholder="Character Name"
            defaultValue={character.name}
            required
            pattern="\S+"
            onChange={(e) => {
              updateName(e.target.value);
            }}
          />
        </h2>
      ) : (
        <h2 className="font-thin text-xl mx-auto text-center p-4 dark:bg-teal-900 bg-teal-100">
          {character.name}
        </h2>
      )}
      <div className="bg-slate-200 dark:bg-slate-950 rounded-lg shadow-md flex flex-col md:grid lg:grid-cols-3 md:grid-cols-2 md:gap-2">
        <div className="bg-slate-50 dark:bg-slate-900 order-2 md:order-1">
          <CharacterOtherInfo
            character={character}
            setCharacter={setCharacter}
            isEditable={isEditable}
            viewMode={viewMode}
          />
        </div>
        <div className="pb-4 bg-slate-50 dark:bg-slate-900 order-1 md:order-2">
          <CharacterCoreInfo
            character={character}
            setCharacter={setCharacter}
            isEditable={isEditable}
            characterOptions={characterOptions}
            viewMode={viewMode}
          />
        </div>
        <div className="pt-6 md:pt-0 bg-slate-50 dark:bg-slate-900 order-3 md:col-span-2 lg:col-span-1">
          <CharacterFeatures
            character={character}
            setCharacter={setCharacter}
            features={character.actions}
            isEditable={isEditable}
            viewMode={viewMode}
            label="Actions"
          />

          <CharacterFeatures
            character={character}
            setCharacter={setCharacter}
            features={character.counters}
            isEditable={isEditable}
            viewMode={viewMode}
            label="Counters"
          />

          <CharacterFeatures
            character={character}
            setCharacter={setCharacter}
            features={character.features}
            isEditable={isEditable}
            viewMode={viewMode}
            label="Features"
            characterOptions={characterOptions}
          />
        </div>
      </div>
      <div>
        {campaignInfo && (
          <div className="font-light">
            <span className="text-center w-full inline-block">Campaign</span>
            <div className="w-full">
              <Button
                buttonType={ButtonType.simple}
                color="blue"
                className="mx-auto"
              >
                <Link href={`/campaign/${campaignInfo?.id}`}>
                  {campaignInfo?.title}
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
      <div className="mx-auto w-fit fixed bottom-4 right-4 flex flex-row">
        {viewMode === CharacterSheetViewMode.Owner && (
          <>
            {isEditable ? (
              <Button
                buttonType={ButtonType.default}
                color="amber"
                onClick={() => {
                  saveCharacter(character);
                  setEditable(false);
                }}
                className="flex flex-row"
              >
                <span className="pr-2">Save</span>
                <Save className="w-6" />
              </Button>
            ) : (
              <Button
                buttonType={ButtonType.default}
                color="amber"
                onClick={() => setEditable(true)}
                className="flex flex-row"
              >
                <span className="pr-2">Edit</span>
                <Edit className="w-6" />
              </Button>
            )}
            <Button
              buttonType={ButtonType.default}
              color="blue"
              onClick={() => populateAndDownloadPDF(character)}
              className="flex flex-row ml-4"
            >
              <span className="pr-2">Print</span>
              <Print />
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default CharacterSheet;
