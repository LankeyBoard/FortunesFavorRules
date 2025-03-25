"use client";

import useAlert from "../hooks/useAlert";

const AlertPopup = () => {
  const { text, type } = useAlert();
  if (text && type) {
    return (
      <div className="z-50 fixed bottom-3 inset-x-0 flex flex-row justify-center items-center ">
        {/* <div className='px-3 py-1 rounded-md backdrop-blur-sm backdrop-invert backdrop-hue-rotate-180'>
                    <p className='text-black'>{text}</p>
                </div>                 */}
        <div className="rounded-md bg-amber-300 dark:bg-amber-700 bg-opacity-50 dark:bg-opacity-50 border-2 border-amber-500">
          <p className="backdrop-blur-md dark:backdrop-blur-md px-4 py-2 rounded-md">
            {text}
          </p>
        </div>
      </div>
    );
  } else return <></>;
};

export default AlertPopup;
