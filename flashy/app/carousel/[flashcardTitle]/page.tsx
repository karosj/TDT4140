"use client";

import { FlashcardSet } from "@/app/types/flashcard";
import { getFlashcardSet } from "@/app/utils/firebase";
import { LikeButton } from "@/components/carousel/LikeButton";
import { SettingsButton } from "@/components/carousel/SettingsButton";
import CarouselCard from "@/components/carousel/carousel";
import { Button, Code, Group, Loader, Stack, Text, Title } from "@mantine/core";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

type FlashcardsType = {
  params: { flashcardTitle: string };
};

export default function Flashcards({ params }: FlashcardsType) {
  const [flashcardSet, setFlashcardSet] = useState<FlashcardSet | null>();
  const [failedToFetch, setFailedToFetch] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    if (session == null) return;

    async function fetchFlashcardSet() {
      if (session == null) return;
      try {
        const decodedTitle = decodeURIComponent(params.flashcardTitle);
        const flashcardSet = await getFlashcardSet(decodedTitle, session.user.id);
        setFlashcardSet(flashcardSet);
      } catch (error) {
        setFailedToFetch(true);
      }
    }
    fetchFlashcardSet();
  }, [session, params.flashcardTitle]);

  if (failedToFetch) {
    return (
      <Stack>
        <Title>Fant ikke flashcard settet</Title>
        <Button component={Link} href="/">
          Gå til hjemmesiden
        </Button>
      </Stack>
    );
  }

  if (!session || !flashcardSet) {
    return <Loader color="blue" size={48} />;
  }

  return (
    <Stack align="center">
      <Title>{flashcardSet.title}</Title>
      <Text>
        by: <Code>{flashcardSet.creator ? flashcardSet.creator.name : "Slettet bruker"}</Code>
      </Text>
      <CarouselCard views={flashcardSet.views ?? []} />

      {session?.user.role === "admin" || flashcardSet.creator?.id === session?.user.id ? (
        <Group px="md" justify="space-between" w={"100%"}>
          <SettingsButton user={session.user} flashcard={flashcardSet} />
          <LikeButton user={session.user} flashcard={flashcardSet} />
        </Group>
      ) : null}
    </Stack>
  );
}
