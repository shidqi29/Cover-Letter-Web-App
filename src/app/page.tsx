"use client";

import CoverLetterForm from "@/components/CoverLetterForm";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 sm:p-8 lg:p-24">
      <div className="container mx-auto max-w-4xl py-4 sm:py-6 lg:py-8">
        <h1 className="mb-4 text-center text-xl font-bold sm:mb-6 sm:text-2xl lg:text-3xl">
          Cover Letter Generator
        </h1>
        <CoverLetterForm />
      </div>
    </main>
  );
}
