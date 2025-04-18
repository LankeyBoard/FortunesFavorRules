import React, { Dispatch, SetStateAction } from "react";
import FormDisplay, { Form } from "../FormDisplay";
import PlayerCharacter from "@/utils/PlayerCharacter";
import Button, { ButtonType } from "../Inputs/Button";

interface EditableShifterFormDisplayProps {
  character: PlayerCharacter;
  setCharacter: Dispatch<SetStateAction<PlayerCharacter | undefined>>;
  isEditable: boolean;
}

const EditableShifterFormDisplay: React.FC<EditableShifterFormDisplayProps> = ({
  character,
  setCharacter,
  isEditable,
}) => {
  if (!character?.characterClass?.extra?.forms) return <></>;
  let forms: JSX.Element | undefined = undefined;
  if (character.form) {
    forms = (
      <div>
        <FormDisplay key={character.form.slug} form={character.form} />
        {isEditable && (
          <Button
            buttonType={ButtonType.simple}
            color="amber"
            onClick={() => {
              const newCharacter = new PlayerCharacter(
                undefined,
                undefined,
                undefined,
                character,
              );
              newCharacter.clearForm();
              setCharacter(newCharacter);
            }}
          >
            Remove Form
          </Button>
        )}
      </div>
    );
  } else if (!isEditable) {
    forms = (
      <div>
        <span>Form not selected, edit your character to add one.</span>
      </div>
    );
  } else {
    forms = (
      <>
        {character.characterClass.extra.forms.map((form: Form) => {
          return (
            <div
              key={form.slug}
              onClick={() => {
                const newCharacter = new PlayerCharacter(
                  undefined,
                  undefined,
                  undefined,
                  character,
                );
                if (newCharacter.form?.slug === form.slug) {
                  newCharacter.clearForm();
                } else newCharacter.setFormSlug(form.slug);

                setCharacter(newCharacter);
              }}
              className={
                character.form?.slug === form.slug
                  ? "border-2 border-amber-500 cursor-pointer"
                  : "cursor-pointer"
              }
            >
              <FormDisplay form={form} />
            </div>
          );
        })}
      </>
    );
  }
  return (
    <div className="mb-2">
      <h2 className="font-thin text-xl mx-auto text-center pb-0 tracking-widest md:pt-6">
        Form
      </h2>
      {forms}
      {!isEditable && (
        <div className="w-full">
          <div className="w-fit mx-auto">
            <Button
              buttonType={ButtonType.default}
              color="green"
              onClick={() => {
                const newCharacter = new PlayerCharacter(
                  undefined,
                  undefined,
                  undefined,
                  character,
                );
                newCharacter.isInForm = !newCharacter.isInForm;
                setCharacter(newCharacter);
              }}
            >
              {character.isInForm ? "Leave Form" : "Enter Form"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditableShifterFormDisplay;
