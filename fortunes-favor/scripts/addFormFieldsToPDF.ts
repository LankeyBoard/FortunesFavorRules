const fs = require("fs");
const { PDFDocument } = require("pdf-lib");

const addFormFieldsToPDF = async () => {
  // Load the existing PDF
  const pdfPath = "public/CharacterSheetv02D.pdf";
  const pdfBytes = fs.readFileSync(pdfPath);
  const pdfDoc = await PDFDocument.load(pdfBytes);
  const pageOne = pdfDoc.getPages()[0];
  // Get the form
  const form = pdfDoc.getForm();

  console.log(pageOne.getHeight(), pageOne.getWidth());
  // Add form fields

  // ********** Basic Info ***********************
  const levelField = form.createTextField("Level");
  levelField.setText("");
  levelField.addToPage(pageOne, {
    x: 39,
    y: 755,
    width: 20,
    height: 20,
  });

  const characterNameField = form.createTextField("CharacterName");
  characterNameField.setText("");
  characterNameField.addToPage(pageOne, {
    x: 110,
    y: 772,
    width: 120,
    height: 16,
  });

  const classField = form.createTextField("Class");
  classField.setText("");
  classField.addToPage(pageOne, {
    x: 110,
    y: 742,
    width: 120,
    height: 16,
  });

  const cultureField = form.createTextField("Culture");
  cultureField.setText("");
  cultureField.addToPage(pageOne, {
    x: 448,
    y: 772,
    width: 120,
    height: 16,
  });

  const lineageField = form.createTextField("Lineage");
  lineageField.setText("");
  lineageField.addToPage(pageOne, {
    x: 448,
    y: 742,
    width: 120,
    height: 16,
  });

  const mettleField = form.createTextField("Mettle");
  mettleField.setText("");
  mettleField.addToPage(pageOne, {
    x: 238,
    y: 733,
    width: 30,
    height: 25,
  });

  const agilityField = form.createTextField("Agility");
  agilityField.setText("");
  agilityField.addToPage(pageOne, {
    x: 338,
    y: 733,
    width: 30,
    height: 25,
  });

  const intellectField = form.createTextField("Intellect");
  intellectField.setText("");
  intellectField.addToPage(pageOne, {
    x: 238,
    y: 663,
    width: 30,
    height: 25,
  });

  const heartField = form.createTextField("Heart");
  heartField.setText("");
  heartField.addToPage(pageOne, {
    x: 338,
    y: 663,
    width: 30,
    height: 25,
  });

  const currentStaminaField = form.createTextField("CurrentStamina");
  currentStaminaField.setText("");
  currentStaminaField.addToPage(pageOne, {
    x: 39,
    y: 660,
    width: 50,
    height: 20,
  });

  const maxStaminaField = form.createTextField("MaxStamina");
  maxStaminaField.setText("");
  maxStaminaField.addToPage(pageOne, {
    x: 139,
    y: 660,
    width: 50,
    height: 25,
  });

  const currentHealthField = form.createTextField("CurrentHealth");
  currentHealthField.setText("");
  currentHealthField.addToPage(pageOne, {
    x: 509,
    y: 660,
    width: 50,
    height: 20,
  });

  const maxHealthField = form.createTextField("MaxHealth");
  maxHealthField.setText("");
  maxHealthField.addToPage(pageOne, {
    x: 429,
    y: 660,
    width: 30,
    height: 25,
  });

  // ********** Combat Info ***********************

  const attackField = form.createTextField("Attack");
  attackField.setText("");
  attackField.addToPage(pageOne, {
    x: 33,
    y: 565,
    width: 50,
    height: 18,
  });

  const damageField = form.createTextField("Damage");
  damageField.setText("");
  damageField.addToPage(pageOne, {
    x: 110,
    y: 565,
    width: 50,
    height: 18,
  });

  const rangeField = form.createTextField("Range");
  rangeField.setText("");
  rangeField.addToPage(pageOne, {
    x: 187,
    y: 565,
    width: 50,
    height: 18,
  });

  const armorField = form.createTextField("Armor");
  armorField.setText("");
  armorField.addToPage(pageOne, {
    x: 33,
    y: 520,
    width: 50,
    height: 18,
  });

  const counterField = form.createTextField("Counter");
  counterField.setText("");
  counterField.addToPage(pageOne, {
    x: 110,
    y: 520,
    width: 50,
    height: 18,
  });

  const deflectField = form.createTextField("Deflect");
  deflectField.setText("");
  deflectField.addToPage(pageOne, {
    x: 187,
    y: 520,
    width: 50,
    height: 18,
  });

  // ********** Other Basic Character Info ***********************

  const trainingField = form.createTextField("Training");
  trainingField.enableMultiline();
  trainingField.setText("");
  trainingField.addToPage(pageOne, {
    x: 30,
    y: 350,
    width: 140,
    height: 120,
  });
  trainingField.setFontSize(11);

  const speedField = form.createTextField("Speed");
  speedField.enableMultiline();
  speedField.setText("");
  speedField.addToPage(pageOne, {
    x: 180,
    y: 420,
    width: 65,
    height: 50,
  });
  speedField.setFontSize(9);

  const sizeField = form.createTextField("Size");
  sizeField.enableMultiline();
  sizeField.setText("");
  sizeField.addToPage(pageOne, {
    x: 180,
    y: 348,
    width: 65,
    height: 50,
  });
  sizeField.setFontSize(9);

  // ********** Equipment ***********************

  const itemsField = form.createTextField("Items");
  itemsField.enableMultiline();
  itemsField.setText("");
  itemsField.addToPage(pageOne, {
    x: 30,
    y: 90,
    width: 220,
    height: 235,
  });
  itemsField.setFontSize(11);

  const coinField = form.createTextField("Coin");
  coinField.setText("");
  coinField.addToPage(pageOne, {
    x: 28,
    y: 48,
    width: 47,
    height: 16,
  });

  const currentSlotsField = form.createTextField("CurrentSlots");
  currentSlotsField.setText("");
  currentSlotsField.addToPage(pageOne, {
    x: 190,
    y: 40,
    width: 22,
    height: 18,
  });

  const maxSlotsField = form.createTextField("MaxSlots");
  maxSlotsField.setText("");
  maxSlotsField.addToPage(pageOne, {
    x: 230,
    y: 40,
    width: 22,
    height: 18,
  });

  // ********** Features ***********************

  const actionsField = form.createTextField("Actions");
  actionsField.enableMultiline();
  actionsField.setText("");
  actionsField.addToPage(pageOne, {
    x: 273,
    y: 428,
    width: 152,
    height: 157,
  });
  actionsField.setFontSize(9);

  const countersField = form.createTextField("Counters");
  countersField.enableMultiline();
  countersField.setText("");
  countersField.addToPage(pageOne, {
    x: 440,
    y: 428,
    width: 152,
    height: 157,
  });
  countersField.setFontSize(9);

  const featuresField = form.createTextField("Features");
  featuresField.enableMultiline();
  featuresField.setText("");
  featuresField.addToPage(pageOne, {
    x: 273,
    y: 38,
    width: 310,
    height: 357,
  });
  featuresField.setFontSize(9);

  // ********** Msc Fields ***********************

  const languagesField = form.createTextField("Languages");
  languagesField.setText("");
  languagesField.addToPage(pageOne, {
    x: 322,
    y: 18,
    width: 262,
    height: 16,
  });
  languagesField.setFontSize(11);

  // Save the updated PDF
  const updatedPdfBytes = await pdfDoc.save();
  fs.writeFileSync("public/CharacterSheetFillable.pdf", updatedPdfBytes);
  console.log("PDF with form fields saved as CharacterSheetFillable.pdf");
};

addFormFieldsToPDF();
