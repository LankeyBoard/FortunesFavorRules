const fs = require("fs");
const { PDFDocument } = require("pdf-lib");

const addFormFieldsToPDF = async () => {
  // Load the existing PDF
  const pdfPath = "public/CharacterSheetv02D.pdf";
  const pdfBytes = fs.readFileSync(pdfPath);
  const pdfDoc = await PDFDocument.load(pdfBytes);
  const pages = pdfDoc.getPages();
  const pageOne = pages[0];
  const pageTwo = pages[1];
  const pageThree = pages[2];
  const form = pdfDoc.getForm();

  const addFieldToPage = (field: { addToPage: (arg0: any, arg1: any) => void; setBorderWidth?: (arg0: number) => void; }, page: any, options: { x: number; y: number; width: number; height: number; borderWidth?: number; borderColor?: any; }) => {
    if (page) {
      field.addToPage(page, { ...options, borderWidth: 0 });
    }
  };

  // ********** Page 1 fields ***********************
  const levelField = form.createTextField("Level");
  levelField.setText("");
  addFieldToPage(levelField, pageOne, {
    x: 39,
    y: 755,
    width: 20,
    height: 20,
  });

  const characterNameField = form.createTextField("CharacterName");
  characterNameField.setText("");
  addFieldToPage(characterNameField, pageOne, {
    x: 110,
    y: 762,
    width: 120,
    height: 16,
  });

  const classField = form.createTextField("Class");
  classField.setText("");
  addFieldToPage(classField, pageOne, {
    x: 110,
    y: 738,
    width: 100,
    height: 16,
  });

  const cultureField = form.createTextField("Culture");
  cultureField.setText("");
  addFieldToPage(cultureField, pageOne, {
    x: 448,
    y: 762,
    width: 120,
    height: 16,
  });

  const lineageField = form.createTextField("Lineage");
  lineageField.setText("");
  addFieldToPage(lineageField, pageOne, {
    x: 448,
    y: 738,
    width: 120,
    height: 16,
  });

  const mettleField = form.createTextField("Mettle");
  mettleField.setText("");
  addFieldToPage(mettleField, pageOne, {
    x: 238,
    y: 733,
    width: 30,
    height: 25,
  });

  const agilityField = form.createTextField("Agility");
  agilityField.setText("");
  addFieldToPage(agilityField, pageOne, {
    x: 338,
    y: 733,
    width: 30,
    height: 25,
  });

  const intellectField = form.createTextField("Intellect");
  intellectField.setText("");
  addFieldToPage(intellectField, pageOne, {
    x: 238,
    y: 663,
    width: 30,
    height: 25,
  });

  const heartField = form.createTextField("Heart");
  heartField.setText("");
  addFieldToPage(heartField, pageOne, {
    x: 338,
    y: 663,
    width: 30,
    height: 25,
  });

  const currentStaminaField = form.createTextField("CurrentStamina");
  currentStaminaField.setText("");
  addFieldToPage(currentStaminaField, pageOne, {
    x: 39,
    y: 660,
    width: 50,
    height: 20,
  });

  const maxStaminaField = form.createTextField("MaxStamina");
  maxStaminaField.setText("");
  addFieldToPage(maxStaminaField, pageOne, {
    x: 139,
    y: 660,
    width: 50,
    height: 25,
  });

  const currentHealthField = form.createTextField("CurrentHealth");
  currentHealthField.setText("");
  addFieldToPage(currentHealthField, pageOne, {
    x: 509,
    y: 660,
    width: 50,
    height: 20,
  });

  const maxHealthField = form.createTextField("MaxHealth");
  maxHealthField.setText("");
  addFieldToPage(maxHealthField, pageOne, {
    x: 429,
    y: 660,
    width: 30,
    height: 25,
  });

  const attackField = form.createTextField("Attack");
  attackField.setText("");
  addFieldToPage(attackField, pageOne, {
    x: 23,
    y: 565,
    width: 67,
    height: 18,
  });

  const damageField = form.createTextField("Damage");
  damageField.setText("");
  damageField.enableMultiline();
  addFieldToPage(damageField, pageOne, {
    x: 100,
    y: 565,
    width: 67,
    height: 32,
  });
  damageField.setFontSize(11);

  const rangeField = form.createTextField("Range");
  rangeField.setText("");
  addFieldToPage(rangeField, pageOne, {
    x: 177,
    y: 565,
    width: 67,
    height: 18,
  });

  const armorField = form.createTextField("Armor");
  armorField.setText("");
  addFieldToPage(armorField, pageOne, {
    x: 23,
    y: 520,
    width: 67,
    height: 18,
  });

  const counterField = form.createTextField("Counter");
  counterField.setText("");
  addFieldToPage(counterField, pageOne, {
    x: 100,
    y: 520,
    width: 67,
    height: 18,
  });

  const deflectField = form.createTextField("Deflect");
  deflectField.setText("");
  addFieldToPage(deflectField, pageOne, {
    x: 177,
    y: 520,
    width: 67,
    height: 18,
  });

  const trainingField = form.createTextField("Training");
  trainingField.enableMultiline();
  trainingField.setText("");
  addFieldToPage(trainingField, pageOne, {
    x: 30,
    y: 350,
    width: 140,
    height: 120,
  });
  trainingField.setFontSize(11);

  const speedField = form.createTextField("Speed");
  speedField.enableMultiline();
  speedField.setText("");
  addFieldToPage(speedField, pageOne, {
    x: 180,
    y: 420,
    width: 65,
    height: 50,
  });
  speedField.setFontSize(9);

  const sizeField = form.createTextField("Size");
  sizeField.enableMultiline();
  sizeField.setText("");
  addFieldToPage(sizeField, pageOne, {
    x: 180,
    y: 348,
    width: 65,
    height: 50,
  });
  sizeField.setFontSize(9);

  const itemsField = form.createTextField("Items");
  itemsField.enableMultiline();
  itemsField.setText("");
  addFieldToPage(itemsField, pageOne, {
    x: 30,
    y: 90,
    width: 220,
    height: 235,
  });
  itemsField.setFontSize(11);

  const coinField = form.createTextField("Coin");
  coinField.setText("");
  addFieldToPage(coinField, pageOne, {
    x: 28,
    y: 48,
    width: 47,
    height: 16,
  });

  const currentSlotsField = form.createTextField("CurrentSlots");
  currentSlotsField.setText("");
  addFieldToPage(currentSlotsField, pageOne, {
    x: 190,
    y: 40,
    width: 22,
    height: 18,
  });

  const maxSlotsField = form.createTextField("MaxSlots");
  maxSlotsField.setText("");
  addFieldToPage(maxSlotsField, pageOne, {
    x: 230,
    y: 40,
    width: 22,
    height: 18,
  });

  const actionsField = form.createTextField("Actions");
  actionsField.enableMultiline();
  actionsField.setText("");
  addFieldToPage(actionsField, pageOne, {
    x: 273,
    y: 428,
    width: 152,
    height: 157,
  });
  actionsField.setFontSize(9);

  const countersField = form.createTextField("Counters");
  countersField.enableMultiline();
  countersField.setText("");
  addFieldToPage(countersField, pageOne, {
    x: 440,
    y: 428,
    width: 152,
    height: 157,
  });
  countersField.setFontSize(9);

  const featuresField = form.createTextField("Features");
  featuresField.enableMultiline();
  featuresField.setText("");
  addFieldToPage(featuresField, pageOne, {
    x: 273,
    y: 38,
    width: 310,
    height: 357,
  });
  featuresField.setFontSize(9);

  const languagesField = form.createTextField("Languages");
  languagesField.setText("");
  addFieldToPage(languagesField, pageOne, {
    x: 322,
    y: 18,
    width: 262,
    height: 16,
  });
  languagesField.setFontSize(11);

  // ********** Page 2 fields ***********************
  const beastNameField = form.createTextField("BeastName");
  beastNameField.setText("");
  addFieldToPage(beastNameField, pageTwo, {
    x: 430,
    y: 760,
    width: 150,
    height: 18,
  });

  const beastTypeField = form.createTextField("BeastType");
  beastTypeField.setText("");
  addFieldToPage(beastTypeField, pageTwo, {
    x: 460,
    y: 736,
    width: 120,
    height: 18,
  });

  const beastMaxHealthField = form.createTextField("BeastMaxHealth");
  beastMaxHealthField.setText("");
  addFieldToPage(beastMaxHealthField, pageTwo, {
    x: 420,
    y: 670,
    width: 50,
    height: 18,
  });

  const beastCurrentHealthField = form.createTextField("BeastCurrentHealth");
  beastCurrentHealthField.setText("");
  addFieldToPage(beastCurrentHealthField, pageTwo, {
    x: 500,
    y: 670,
    width: 50,
    height: 18,
  });
  beastCurrentHealthField.setFontSize(9);

  const beastAttackField = form.createTextField("BeastAttack");
  beastAttackField.setText("");
  addFieldToPage(beastAttackField, pageTwo, {
    x: 18,
    y: 715,
    width: 56,
    height: 35,
  });
    beastAttackField.setFontSize(9);


  const beastDamageField = form.createTextField("BeastDamage");
  beastDamageField.setText("");
  addFieldToPage(beastDamageField, pageTwo, {
    x: 84,
    y: 715,
    width: 70,
    height: 35,
  });
  beastDamageField.setFontSize(9);

  const beastRangeField = form.createTextField("BeastRange");
  beastRangeField.setText("");
  addFieldToPage(beastRangeField, pageTwo, {
    x: 160,
    y: 715,
    width: 56,
    height: 35,
  });
  beastRangeField.setFontSize(9);

  const beastArmorField = form.createTextField("BeastArmor");
  beastArmorField.setText("");
  addFieldToPage(beastArmorField, pageTwo, {
    x: 18,
    y: 667,
    width: 56,
    height: 35,
  });
  beastArmorField.setFontSize(9);

  const beastCounterField = form.createTextField("BeastCounter");
  beastCounterField.setText("");
  addFieldToPage(beastCounterField, pageTwo, {
    x: 84,
    y: 667,
    width: 70,
    height: 35,
  });
  beastCounterField.setFontSize(9);

  const beastSpeedField = form.createTextField("BeastSpeed");
  beastSpeedField.setText("");
  addFieldToPage(beastSpeedField, pageTwo, {
    x: 160,
    y: 667,
    width: 56,
    height: 35,
  });
  beastSpeedField.setFontSize(9);

  const beastMettleField = form.createTextField("BeastMettle");
  beastMettleField.setText("");
  addFieldToPage(beastMettleField, pageTwo, {
    x: 238,
    y: 733,
    width: 30,
    height: 25,
  });

  const beastAgilityField = form.createTextField("BeastAgility");
  beastAgilityField.setText("");
  addFieldToPage(beastAgilityField, pageTwo, {
    x: 338,
    y: 733,
    width: 30,
    height: 25,
  });

  const beastIntellectField = form.createTextField("BeastIntellect");
  beastIntellectField.setText("");
  addFieldToPage(beastIntellectField, pageTwo, {
    x: 238,
    y: 663,
    width: 30,
    height: 25,
  });

  const beastHeartField = form.createTextField("BeastHeart");
  beastHeartField.setText("");
  addFieldToPage(beastHeartField, pageTwo, {
    x: 338,
    y: 663,
    width: 30,
    height: 25,
  });

  const beastFeaturesField = form.createTextField("BeastFeatures");
  beastFeaturesField.enableMultiline();
  beastFeaturesField.setText("");
  addFieldToPage(beastFeaturesField, pageTwo, {
    x: 15,
    y: 25,
    width: 285,
    height: 600,
  });
  const beastFeaturesField2 = form.createTextField("BeastFeatures2");
  beastFeaturesField2.enableMultiline();
  beastFeaturesField2.setText("");
  addFieldToPage(beastFeaturesField2, pageTwo, {
    x: 310,
    y: 25,
    width: 285,
    height: 600,
  });
  beastFeaturesField.setFontSize(9);
  beastFeaturesField2.setFontSize(9);

  // ********** Page 3 fields ***********************
  const formAttackField = form.createTextField("FormAttack");
  formAttackField.setText("");
  addFieldToPage(formAttackField, pageThree, {
    x: 18,
    y: 715,
    width: 56,
    height: 35,
  });
  formAttackField.setFontSize(9);

  const formDamageField = form.createTextField("FormDamage");
  formDamageField.setText("");
  addFieldToPage(formDamageField, pageThree, {
    x: 84,
    y: 715,
    width: 70,
    height: 35,
  });
  formDamageField.setFontSize(9);

  const formRangeField = form.createTextField("FormRange");
  formRangeField.setText("");
  addFieldToPage(formRangeField, pageThree, {
    x: 160,
    y: 715,
    width: 60,
    height: 35,
  });
  formRangeField.setFontSize(9);

  const formArmorField = form.createTextField("FormArmor");
  formArmorField.setText("");
  addFieldToPage(formArmorField, pageThree, {
    x: 18,
    y: 660,
    width: 56,
    height: 35,
  });
  formArmorField.setFontSize(9);

  const formCounterField = form.createTextField("FormCounter");
  formCounterField.setText("");
  addFieldToPage(formCounterField, pageThree, {
    x: 84,
    y: 660,
    width: 70,
    height: 35,
  });
  formCounterField.setFontSize(9);

  const formSpeedField = form.createTextField("FormSpeed");
  formSpeedField.setText("");
  addFieldToPage(formSpeedField, pageThree, {
    x: 160,
    y: 660,
    width: 60,
    height: 35,
  });
  formSpeedField.setFontSize(9);

  const formTypeField = form.createTextField("FormType");
  formTypeField.enableMultiline();
  formTypeField.setText("");
  addFieldToPage(formTypeField, pageThree, {
    x: 240,
    y: 667,
    width: 90,
    height: 80,
  });
  formTypeField.setFontSize(9);

  const extraFeaturesField = form.createTextField("ExtraFeatures");
  extraFeaturesField.enableMultiline();
  extraFeaturesField.setText("");
  addFieldToPage(extraFeaturesField, pageThree, {
    x: 15,
    y: 25 ,
    width: 330,
    height: 600,
  });

  const formFeaturesField = form.createTextField("FormFeatures");
  formFeaturesField.enableMultiline();
  formFeaturesField.setText("");
  addFieldToPage(formFeaturesField, pageThree, {
    x: 360,
    y: 25,
    width: 230,
    height: 730,
  });
  formFeaturesField.setFontSize(9);

  // Save the updated PDF
  const updatedPdfBytes = await pdfDoc.save();
  fs.writeFileSync("public/CharacterSheetFillable.pdf", updatedPdfBytes);
  console.log("PDF with form fields saved as CharacterSheetFillable.pdf");
};

addFormFieldsToPDF();
