"use client";

import Image from "next/image";

export default function MobileSection4() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#391e0a] text-white">

      <div className="mx-auto flex min-h-screen max-w-[500px] flex-col items-center px-6 py-10">

        {/* REACH ME + AT */}
        <div className="relative h-[120px] w-full overflow-visible">

          {/* REACH ME */}
          <div className="absolute left-1/2 top-[-200px] h-[600px] w-[300%] -translate-x-1/2">
            <Image
              src="/images/reach-me.svg"
              alt="Reach Me"
              fill
              className="object-contain"
            />
          </div>

          {/* AT */}
          <div className="absolute left-[52%] top-[-20px] h-[290px] w-[480px] -translate-x-1/2">
            <Image
              src="/images/at.png"
              alt="At"
              fill
              className="object-contain"
            />
          </div>

        </div>

        {/* CONTACTS */}
        <div className="mt-2 flex w-full flex-col gap-0">

          {/* INSTAGRAM */}
          <a
            href="https://instagram.com/goutham_dance_photographer"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center"
          >
            <Image
              src="/images/instagram-icon.svg"
              alt="Instagram"
              width={160}
              height={160}
              className="h-[160px] w-[160px] shrink-0"
            />

            <span className="-ml-16 text-[13px] tracking-[0.08em] whitespace-nowrap">
              : GOUTHAM_DANCE_PHOTOGRAPHER
            </span>
          </a>

          {/* WHATSAPP */}
          <a
            href="https://wa.me/919154899991"
            className="-mt-10 flex items-center justify-center"
          >
            <Image
              src="/images/whatsapp-icon.svg"
              alt="WhatsApp"
              width={160}
              height={160}
              className="h-[160px] w-[160px] shrink-0"
            />

            <span className="-ml-16 text-[15px] tracking-[0.08em] whitespace-nowrap">
              : 9154899991
            </span>
          </a>

        </div>

        {/* LET'S CREATE */}
        <div className="mt-4 text-center tracking-[0.35em] text-lg">
          LET&apos;S CREATE
        </div>

        {/* SOMETHING AMAZING */}
        <div className="relative mt-0 h-[300px] w-[150%]">
          <Image
            src="/images/something-amazing.webp"
            alt="Something Amazing"
            fill
            className="object-contain"
          />
        </div>

        {/* TOGETHER */}
        <div className="-mt-8 text-center tracking-[0.35em] text-lg">
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