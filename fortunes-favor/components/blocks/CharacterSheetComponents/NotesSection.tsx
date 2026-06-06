"use client";
import PlayerCharacter from "@/utils/PlayerCharacter";
import SlugLinker from "../SlugLinker";
import React from "react";
import Button, { ButtonType } from "../Inputs/Button";
import Markdown from "react-markdown";
import MultilineTextInput from "../Inputs/MulitlineTextInput";

const NotesSecton: React.FC<{ character: PlayerCharacter; updateCharacter: (character: PlayerCharacter) => void }> = ({
  character,
  updateCharacter,
}) => {
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [draftNotes, setDraftNotes] = React.useState(character.notes || "");

    React.useEffect(() => {
      setDraftNotes(character.notes || "");
    }, [character.notes]);

    const saveNotes = React.useCallback(
      (notes: string) => {
        const newCharacter = new PlayerCharacter(undefined, undefined, undefined, character);
        newCharacter.notes = notes;
        updateCharacter(newCharacter);
      },
      [character, updateCharacter]
    );

    React.useEffect(() => {
      if (!isModalOpen) return;

      const timeout = setTimeout(() => saveNotes(draftNotes), 1000);
      return () => clearTimeout(timeout);
    }, [draftNotes, isModalOpen, saveNotes]);

    const handleCancel = () => {
      setDraftNotes(character.notes || "");
      setIsModalOpen(false);
    };

    const handleSave = () => {
      saveNotes(draftNotes);
      setIsModalOpen(false);
    };

  return (
    <div className="w-full m-2 p-2">
      <h2 className="font-thin text-xl mx-auto text-center py-2 tracking-widest">Notes</h2>

      <div className="markdown">
        <Markdown>{character.notes}</Markdown>
      </div>

      <Button
        color="gray"
        buttonType={ButtonType.simple}
        onClick={() => setIsModalOpen(true)}
      >
        Edit
      </Button>

      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
          onClick={handleCancel}
        >
          <div
            className="w-full max-w-5xl h-[calc(100vh-4rem)] bg-white dark:bg-slate-950 rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 px-5 py-4">
              <h3 className="text-2xl font-semibold">Edit Notes</h3>
              <Button
                color="gray"
                buttonType={ButtonType.simple}
                onClick={handleCancel}
              >
                Close
              </Button>
            </div>

            <div className="p-5 h-full flex flex-col">
              <MultilineTextInput
                value={draftNotes}
                onChange={(e) => setDraftNotes(e.target.value)}
                className="h-full min-h-[280px] w-full resize-none rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 focus:border-teal-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
              />

              <div className="mt-4 flex justify-end gap-3">
                <Button color="gray" buttonType={ButtonType.simple} onClick={handleCancel}>
                  Cancel
                </Button>
                <Button color="green" buttonType={ButtonType.simple} onClick={handleSave}>
                  Save
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotesSecton;