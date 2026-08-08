"use client";

import Image from "next/image";

const INSTAGRAM_URL = "https://instagram.com/goutham_dance_photographer";
const WHATSAPP_URL = "https://wa.me/919154899991";

export default function MobileSection4() {
  return (
    <section id="contact-section" className="relative min-h-screen overflow-hidden bg-[#391e0a] text-white">

      <div className="mx-auto flex min-h-screen max-w-[500px] flex-col items-center px-6 py-10">

        {/* REACH ME + AT */}
        <div className="relative h-[120px] w-full overflow-visible">

          {/* REACH ME */}
          <div className="pointer-events-none absolute left-1/2 top-[-200px] h-[600px] w-[300%] -translate-x-1/2">
            <Image
              src="/images/reach-me.svg"
              alt="Reach Me"
              fill
              className="object-contain"
            />
          </div>

          {/* AT */}
          <div className="pointer-events-none absolute left-[52%] top-[-20px] h-[290px] w-[480px] -translate-x-1/2">
            <Image
              src="/images/at.png"
              alt="At"
              fill
              sizes="480px"
              className="object-contain"
            />
          </div>

        </div>

        {/* CONTACTS */}
        <div className="relative z-10 mt-10 flex w-full flex-col gap-3">

          {/* INSTAGRAM */}
          <div className="flex items-center justify-center gap-3">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="block h-9 w-9 shrink-0"
            >
              <Image
                src="/images/instagram-icon.svg"
                alt="Instagram"
                width={36}
                height={36}
                className="h-9 w-9"
              />
            </a>

            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] tracking-[0.08em] whitespace-nowrap"
            >
              : GOUTHAM_DANCE_PHOTOGRAPHER
            </a>
          </div>

          {/* WHATSAPP */}
          <div className="-mt-1 flex items-center justify-center gap-3">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="block h-9 w-9 shrink-0"
            >
              <Image
                src="/images/whatsapp-icon.svg"
                alt="WhatsApp"
                width={36}
                height={36}
                className="h-9 w-9"
              />
            </a>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[15px] tracking-[0.08em] whitespace-nowrap"
            >
              : 9154899991
            </a>
          </div>

        </div>

        {/* LET'S CREATE */}
        <div className="mt-10 text-center tracking-[0.35em] text-xl">
          LET&apos;S CREATE
        </div>

        {/* SOMETHING AMAZING */}
        <div className="relative -mt-16 h-[300px] w-[150%]">
          <Image
            src="/images/something-amazing.webp"
            alt="Something Amazing"
            fill
            quality={90}
            sizes="(max-width: 500px) 150vw, 750px"
            className="object-contain"
          />
        </div>

        {/* TOGETHER */}
        <div className="-mt-12 text-center tracking-[0.35em] text-xl">
          TOGETHER
        </div>

        {/* BACK TO TOP */}
        <button
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            })
          }
          className="
            mt-auto
            pt-10
            text-5xl
            text-white
          "
        >
          ↑
        </button>

      </div>

    </section>
  );
}
