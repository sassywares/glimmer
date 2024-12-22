import { getLocaleTranslations } from "@/i18n/utils";
import Image from "next/image";

function Button({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      rel="noopener noreferrer"
      href={href}
      target="_blank"
      className="inline-flex items-center gap-2 border-2 border-white px-4 py-2 font-semibold text-white shadow-lg outline-none transition-all duration-300 hover:bg-white hover:text-[#DB2777] hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#DB2777] focus:ring-offset-2 active:scale-95"
    >
      {children}
    </a>
  );
}

export default async function LocalePage() {
  const t = await getLocaleTranslations();

  const titleId = "title";
  const descriptionId = "description";

  return (
    <main className="grid min-h-svh grid-rows-[1fr_auto] bg-[linear-gradient(0deg,_#DB2777_0%,_#FBBF24_100%)] p-6 md:p-10">
      <section className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <Button href="https://github.com/sassywares/glimmer?tab=readme-ov-file#-glimmer">
            <svg
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M12 5l0 14" />
              <path d="M5 12l14 0" />
            </svg>
            Get Started
          </Button>
          <Button href="https://github.com/sassywares/glimmer">
            <svg
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5" />
            </svg>
            Github
          </Button>
        </div>
        <div>
          <a
            href="https://sassywares.com/"
            title="By Sassywares"
            className="text-white"
          >
            <Image
              alt="Sassywares"
              src="/sassywares.png"
              width={200}
              height={200}
              className="w-20 max-w-40 md:w-[7.5vw]"
            />
          </a>
        </div>
      </section>
      <section aria-labelledby={titleId} aria-describedby={descriptionId}>
        <h1
          id={titleId}
          className="text-[16vw] font-bold leading-[0.85] tracking-tighter text-white"
        >
          {t("metadata.title")} ✨
        </h1>
        <p id={descriptionId} className="mt-8 text-lg text-white md:text-[2vw]">
          {t("metadata.description")}
        </p>
      </section>
    </main>
  );
}
