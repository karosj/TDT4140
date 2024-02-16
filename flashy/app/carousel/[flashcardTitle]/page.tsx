"use client";

import { getFlashcardSet } from "@/app/utils/firebase";
import CarouselCard from "@/components/carousel/carousel";
import { Code, Loader, Stack, Text, Title } from "@mantine/core";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

type FlashcardsType = {
  params: { flashcardTitle: string };
};

export default function Flashcards({ params }: FlashcardsType) {
  const [flashcardSet, setFlashcardSet] = useState<FlashcardSet>();
  const { data: session } = useSession();

  useEffect(() => {
    if (session == null) return;

    async function fetchFlashcardSet() {
      if (session == null) return;
      const flashcardSet = await getFlashcardSet("dummyFlashcardSet", session.user.id);
      setFlashcardSet(flashcardSet);
    }
    fetchFlashcardSet();
  }, [session]);

  if (!flashcardSet) {
    return <Loader color="blue" size={48} />;
  }

  console.log(flashcardSet);

  return (
    <Stack align="center">
      <Title>{flashcardSet.title}</Title>
      <Text>
        by: <Code>{flashcardSet.creator.name}</Code>
      </Text>
      <CarouselCard views={flashcardSet.views} />
    </Stack>
  );
}