"use client";

import Image from "next/image";

export default function MobileSection4() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#4a2208] text-white">

      <div className="mx-auto flex min-h-screen max-w-[500px] flex-col items-center px-6 py-10">

        {/* REACH ME + AT */}
        <div className="relative h-[240px] w-full">

          <div className="absolute inset-x-0 top-0 h-[220px]">
            <Image
              src="/images/reach-me.webp"
              alt="Reach Me"
              fill
              className="object-contain"
            />
          </div>

          <div className="absolute left-1/2 top-[120px] h-[70px] w-[180px] -translate-x-1/2">
            <Image
              src="/images/at.png"
              alt="At"
              fill
              className="object-contain"
            />
          </div>

        </div>

        {/* CONTACTS */}
        <div className="mt-2 flex w-full flex-col gap-6">

          {/* INSTAGRAM */}
          <a
            href="https://instagram.com/goutham_dance_photographer"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3"
          >
            <Image
              src="/images/instagram-icon.png"
              alt="Instagram"
              width={52}
              height={52}
            />

            <span className="text-center text-[13px] tracking-[0.08em]">
              : GOUTHAM_DANCE_PHOTOGRAPHER
            </span>
          </a>

          {/* WHATSAPP */}
          <a
            href="https://wa.me/919154899991"
            className="flex items-center justify-center gap-3"
          >
            <Image
              src="/images/whatsapp-icon.png"
              alt="WhatsApp"
              width={52}
              height={52}
            />

            <span className="text-[15px] tracking-[0.12em]">
              : 9154899991
            </span>
          </a>

        </div>

        {/* LET'S CREATE */}
        <div className="mt-10 text-center tracking-[0.35em] text-lg">
          LET&apos;S CREATE
        </div>

        {/* SOMETHING AMAZING */}
        <div className="relative mt-2 h-[300px] w-full">
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