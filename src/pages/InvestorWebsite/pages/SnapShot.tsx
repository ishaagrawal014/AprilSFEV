import React from "react";

const ImageGrid: React.FC = () => {
  return (
    <section
      className="relative w-full min-h-screen flex items-center justify-center
                 bg-no-repeat bg-bottom bg-cover"
      style={{ backgroundImage: "url('/images/bk.png')" }}
    >
      {/* ================= MOBILE ================= */}
      <div className="grid gap-10 px-6 w-full max-w-md lg:hidden">
        <img
          src="/images/icon_01.png"
          alt="Icon 1"
          className="w-40 mx-auto object-contain"
        />

        <img
          src="/images/icon_02.png"
          alt="Icon 2"
          className="w-40 mx-auto object-contain"
        />

        <img
          src="/images/icon_03.png"
          alt="Icon 3"
          className="w-40 mx-auto object-contain"
        />

        <img
          src="/images/icon_04.png"
          alt="Icon 4"
          className="w-42 mx-auto object-contain"
        />
      </div>

      {/* ================= DESKTOP (UNCHANGED) ================= */}
      <div className="hidden lg:grid grid-cols-10 grid-rows-7 gap-4">

        <div className="col-span-2 row-span-2 col-start-2 row-start-2 flex items-center justify-center">
          <img
            src="/images/icon_01.png"
            alt="Image 1"
            className="w-full h-full object-contain"
          />
        </div>

        <div className="col-span-2 row-span-2 col-start-5 row-start-2 flex items-center justify-center">
          <img
            src="/images/icon_02.png"
            alt="Image 2"
            className="w-full h-full object-contain"
          />
        </div>

        <div className="col-span-2 row-span-2 col-start-8 row-start-2 flex items-center justify-center">
          <img
            src="/images/icon_03.png"
            alt="Image 3"
            className="w-full h-full object-contain"
          />
        </div>

        <div className="col-span-4 row-span-2 col-start-4 row-start-4 flex items-center justify-center">
          <img
            src="/images/icon_04.png"
            alt="Image 4"
            className="w-[75%] h-auto object-contain"
          />
        </div>

      </div>
    </section>
  );
};

export default ImageGrid;
