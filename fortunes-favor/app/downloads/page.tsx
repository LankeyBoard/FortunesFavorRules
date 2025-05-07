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
    </div>
  );
};

export default DownloadsPage;
