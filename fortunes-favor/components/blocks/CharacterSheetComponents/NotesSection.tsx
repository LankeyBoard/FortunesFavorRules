"use client";
import PlayerCharacter from "@/utils/PlayerCharacter";
import React from "react";
import Button, { ButtonType } from "../Inputs/Button";
import Markdown from "react-markdown";
import MultilineTextInput from "../Inputs/MulitlineTextInput";

const NotesSecton: React.FC<{ character: PlayerCharacter; updateCharacter: (character: PlayerCharacter) => void }> = ({
  character,
  updateCharacter,
}) => {
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [isEditing, setIsEditing] = React.useState(false);
    const [draftNotes, setDraftNotes] = React.useState(character.notes || "");

    const textareaRef = React.useRef<HTMLTextAreaElement | null>(null);

    const saveNotes = React.useCallback(
      (notes: string) => {
        if (notes === character.notes) {
          return;
        }
        const newCharacter = new PlayerCharacter(undefined, undefined, undefined, character);
        newCharacter.notes = notes;
        updateCharacter(newCharacter);
      },
      [character, updateCharacter]
    );

    React.useEffect(() => {
      if (!isModalOpen || draftNotes === character.notes) return;

      const timeout = setTimeout(() => saveNotes(draftNotes), 1000);
      return () => clearTimeout(timeout);
    }, [draftNotes, character.notes, isModalOpen, saveNotes]);

    React.useEffect(() => {
      if (!isEditing || !textareaRef.current) return;

      const textarea = textareaRef.current;
      const selectionEnd = textarea.selectionEnd;
      const beforeSelection = textarea.value.slice(0, selectionEnd);
      const lineNumber = beforeSelection.split("\n").length - 1;
      const computedStyle = getComputedStyle(textarea);
      const lineHeight =
        parseFloat(computedStyle.lineHeight) ||
        parseFloat(computedStyle.fontSize) * 1.2 ||
        20;
      const caretTop = lineNumber * lineHeight;

      if (caretTop < textarea.scrollTop) {
        textarea.scrollTop = caretTop;
      } else if (caretTop > textarea.scrollTop + textarea.clientHeight - lineHeight) {
        textarea.scrollTop = caretTop - textarea.clientHeight + lineHeight;
      }
    }, [draftNotes, isEditing]);

    const handleCancel = () => {
      setDraftNotes(character.notes || "");
      setIsModalOpen(false);
    };

    const handleSave = () => {
      saveNotes(draftNotes);
    };

  return (
    <div className="w-full m-2 p-2 mr-4">
      <h2 className="font-thin text-xl mx-auto text-center py-2 tracking-widest">Notes</h2>
      <div className="markdown max-h-40 overflow-y-auto overflow-x-clip mr-2 scrollbar-thin">
        <Markdown>{character.notes}</Markdown>
      </div>
    <div className="grid grid-cols-2 gap-2">
      <Button
        color="amber"
        buttonType={ButtonType.simple}
        onClick={() => {
          setDraftNotes(character.notes || "");
          setIsEditing(false);
          setIsModalOpen(true);
        }}
      >
        Edit
      </Button>
      <Button
        color="teal"
        buttonType={ButtonType.simple}
        onClick={() => {
          setDraftNotes(character.notes || "");
          setIsEditing(true);
          setIsModalOpen(true);
        }}
      >
        Expand
      </Button></div>
      

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-5xl h-[calc(100vh-4rem)] bg-white dark:bg-slate-950 rounded-xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800">
            <div className=" mx-auto  p-4 dark:bg-teal-900 bg-teal-100">
              <h3 className="font-thin text-xl text-center">Notes</h3>
            </div>

            <div className="p-5 h-full flex flex-col">
              {isEditing ? (
                <MultilineTextInput
                  ref={textareaRef}
                  autoFocus
                  value={draftNotes}
                  onChange={(e) => setDraftNotes(e.target.value)}
                  className="h-9/10 min-h-[280px] w-full resize-none rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 focus:border-teal-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                />
              ) : (
                <div className=" markdown h-9/10 min-h-[280px] w-full overflow-y-auto rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100">
                  <Markdown>{draftNotes}</Markdown>
                </div>
              )}
              <div className="w-full h-16 mb-2">
                <div className="flex flex-row">
                  <Button color="gray" buttonType={ButtonType.simple} onClick={handleCancel}>
                    Close
                  </Button>
                  {isEditing ? (
                    <Button
                      color="teal"
                      buttonType={ButtonType.default}
                      onClick={() => {
                        setIsEditing(false);
                        handleSave();
                      }}
                    >
                      Save
                    </Button>
                  ) : (
                    <Button color="amber" buttonType={ButtonType.default} onClick={() => setIsEditing(true)}>
                      Edit
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotesSecton;