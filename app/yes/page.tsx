"use client";
import Image from "next/image";
import { faker } from "@faker-js/faker";
import { useState, useEffect, useRef } from "react";
import { useGesture } from "@use-gesture/react";

interface User {
  username: any;
  avatar: any;
}

export default function Home() {
  const [suggestions, setSuggestions] = useState<User[]>([]);
  const [move, setMove] = useState({ x: 0 });
  const refim = useRef<any>();

  useGesture(
    {
      onDrag: ({ offset: [dx] }) => {
        setMove({ x: dx });
        console.log(move);
      },
    },
    {
      target: refim.current,
    }
  );

  useEffect(() => {
    const newSuggestion = [...Array(20)].map((_, i) => ({
      username: faker.internet.userName(),
      avatar: faker.image.avatar(),
    }));
    setSuggestions(newSuggestion);
  }, []);
  return (
    <div
      ref={refim}
      className="flex overflow-x-auto space-x-7 max-w-2xl h-32 mx-auto px-2 py-5 border-gray-100 border-b-2 scrollbar-none"
    >
      {suggestions.map((user, index) => (
        <div
          style={{ transform: `translateX(${move.x}px)` }}
          className="h-14 w-14 space-y-2 cursor-pointer items-center"
          key={index}
        >
          <div className="border-red-600 border-2 p-[2px] hover:scale-110 ease-out duration-100 rounded-full">
            <img className="rounded-full " src={user.avatar} alt="Avatar" />
          </div>
          <p className="w-14 text-xs truncate cursor-pointer">
            {user.username}
          </p>
        </div>
      ))}
    </div>
  );
}
