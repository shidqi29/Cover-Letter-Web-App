"use client";

import CoverLetterForm from "@/components/CoverLetterForm";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="container mx-auto py-8">
        <h1 className="mb-6 text-center text-2xl font-bold">
          Cover Letter Generator
        </h1>
        <CoverLetterForm />
      </div>
    </main>
  );
}
