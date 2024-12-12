"use client";
import { randomUUID } from "crypto";
import { useState } from "react";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const article = [
    {
      id: 1,
      title: "The paragraph for codebyte test",
      date: "10, 12, 2024",
      content:
        "I am developing a search bar application. Using next.js as a framework and Tailwind for styling. The application focuses on providing efficient and dynamic search.",
    },
    {
      id: 2,
      title: "Understanding the difference between grid-template and grid auto",
      date: "Oct 09, 2018",
      content:
        "With all the new properties related to CSS Grid Layout, one of the distinctions that always confused me was the difference between the grid-template and grid-auto properties, specifically the difference between grid-template-rows/columns and grid-auto-rows/columns.",
    },
  ];

  const filterarticle = article.filter(
    (article) =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const countMatches = (text: string, term: string): number => {
    if (!term) return 0;
    const matches = text.match(new RegExp(term, "gi"));
    return matches ? matches.length : 0;
  };

  const totalmatch = article.reduce((acc, articles) => {
    return (
      acc +
      countMatches(articles.title, searchTerm) +
      countMatches(articles.content, searchTerm)
    );
  }, 0);

  const highlightText = (text: string, term: string, articleId: number) => {
    if (!term) return [<>{text}</>];
    const regex = new RegExp(`(${term})`, "gi");
    return text.split(regex).map((part, index) => {
      const key = `${articleId}-${index}-${randomUUID()}`;
      console.log("id", key);
      return regex.test(part) ? (
        <span key={key} className="bg-yellow-300">
          {part}
        </span>
      ) : (
        <span key={`text-${key}`}>{part}</span>
      );
    });
  };

  return (
    <div className="flex flex-col min-h-screen h-full w-full bg-gray-100 p-4 md:p-6 lg:p-10">
      <h1 className="text-2xl md:text-4xl font-bold text-black">Search</h1>
      <div className="md:pt-20 pt-10">
        <input
          type="text"
          placeholder="Search"
          className="w-full text-black p-2 border-2 border-black focus:outline-none focus:ring-2 focus:ring-gray-200"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <p className="text-black">{totalmatch} post were found</p>
      <div className="space-y-4">
        {filterarticle.map((article) => (
          <div
            key={article.id}
            className="p-4 border rounded-lg text-black shadow-sm"
          >
            <h2 className="text-xl font-semibold text-black">
              {highlightText(article.title, searchTerm, article.id)}
            </h2>
            <p className="text-sm text-gray-500 mb-2">{article.date}</p>

            <p className="text-sm text-black mb-2">
              {highlightText(article.content, searchTerm, article.id)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
