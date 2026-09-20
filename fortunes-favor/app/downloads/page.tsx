import React from "react";

const DownloadsPage = () => {
  return (
    <div className="max-w-2xl mx-auto pb-8 pt-8">
      <h1 className="text-3xl tracking-wider font-extralight py-4 px-3 bg-purple-300 dark:bg-purple-800">
        Downloads
      </h1>
      <div className="mx-4">
        <h2 className="font-thin text-lg pb-0 tracking-widest pt-6">
          Character Sheets
        </h2>
        <div className="mx-4">
          <a
            href="https://drive.google.com/file/d/1vFeswq_OIrhHdF2WNfe-ErR9bygaBsgt/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="text-teal-800 underline hover:text-teal-500 dark:text-teal-200"
          >
            Standard Sheet
          </a>
        </div>
      </div>
      <div className="mx-4">
        <h2 className="font-thin text-lg pb-0 tracking-widest pt-6">Extras</h2>
        <div className="mx-4">
          <a
            href="https://drive.google.com/file/d/1JsFz9iAW-Jet_F4f8hfi72kbnk35QQD5/view?usp=drive_link"
            target="_blank"
            rel="noopener noreferrer"
            className="text-teal-800 underline hover:text-teal-500 dark:text-teal-200"
          >
            Cheat Sheet
          </a>
        </div>
      </div>
      <div className="mx-4">
        <h2 className="font-thin text-lg pb-0 tracking-widest pt-6">
          Example Characters
        </h2>
        <div className="mx-4">
          <a
            href="/example_characters/Nella%20Moonflower_character_sheet.pdf"
            download
            className="text-teal-800 underline hover:text-teal-500 dark:text-teal-200 block"
          >
            Elementalist - Nella Moonflower
          </a>
          <a
            href="/example_characters/Nira%20Trailfang_character_sheet.pdf"
            download
            className="text-teal-800 underline hover:text-teal-500 dark:text-teal-200 block"
          >
            Fulminare - Nira Trailfang
          </a>
          <a
            href="/example_characters/Adrian%20Merrow_character_sheet.pdf"
            download
            className="text-teal-800 underline hover:text-teal-500 dark:text-teal-200 block"
          >
            Knight - Adrian Merrow
          </a>
          <a
            href="/example_characters/Torin%20Shipwright_character_sheet.pdf"
            download
            className="text-teal-800 underline hover:text-teal-500 dark:text-teal-200 block"
          >
            Maverick - Torin Shipwright
          </a>
          <a
            href="/example_characters/Thalendir%20Grovewhisper_character_sheet.pdf"
            download
            className="text-teal-800 underline hover:text-teal-500 dark:text-teal-200 block"
          >
            Ranger - Thalendir Grovewhisper
          </a>
        </div>
      </div>
    </div>
  );
};

export default DownloadsPage;
