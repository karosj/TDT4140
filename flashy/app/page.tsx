"use client";

import { ArticleCardsGrid } from "@/components/articleView/ArticleCardsGrid";
import { ActionIcon, Button, Group, Loader, Select, Stack, TextInput, Title, rem, useMantineTheme } from "@mantine/core";
import { IconArrowRight, IconSearch } from "@tabler/icons-react";
import levenshtein from "fast-levenshtein";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { FlashcardSet } from "./types/flashcard";
import { getAllPublicFlashCardSets } from "./utils/firebase";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState('');
  const { data: session } = useSession();
  const [flashcardSets, setFlashcardSets] = useState<FlashcardSet[]>();
  const theme = useMantineTheme();

  useEffect(() => {
    if (session == null) return;

    async function fetchFlashcardSet() {
      if (session == null) return;
      const flashcardSet = await getAllPublicFlashCardSets(session.user);
      setFlashcardSets(flashcardSet);
    }
    fetchFlashcardSet();
  }, [session]);

  const filteredAndSortedFlashcardSets = useMemo(() => {
    if (!flashcardSets) return [];

    let sortedFlashcards = flashcardSets.filter((flashcardSet) =>
      flashcardSet.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (sortOption === 'mostLiked') {
      // Assuming 'numOfLikes' is a property that exists in your data
      sortedFlashcards.sort((a, b) => b.numOfLikes - a.numOfLikes);
    } else {
      // Fallback or default sorting, e.g., by levenshtein distance to searchQuery
      sortedFlashcards.sort((a, b) => {
        const distanceA = levenshtein.get(a.title.toLowerCase(), searchQuery.toLowerCase());
        const distanceB = levenshtein.get(b.title.toLowerCase(), searchQuery.toLowerCase());
        return distanceA - distanceB;
      });
    }
    return sortedFlashcards;
  }, [flashcardSets, searchQuery, sortOption]);

  return (
    <Stack align="center">
      {session ? (
        !flashcardSets ? (
          <Loader color="blue" size={48} />
        ) : (
          <>
            <Title>Alle Flashies</Title>
            <Group justify="space-between">
              <TextInput
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                radius="xl"
                size="md"
                placeholder="Søk etter flashies etter tittel"
                rightSectionWidth={42}
                width="100%"
                leftSection={<IconSearch style={{ width: rem(18), height: rem(18) }} stroke={1.5} />}
                rightSection={
                  <ActionIcon size={32} radius="xl" color={theme.primaryColor} variant="filled">
                    <IconArrowRight style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
                  </ActionIcon>
                }
              />
              <Button component={Link} href="/createFlashcard">
                Lag nytt sett
              </Button>
            </Group>
            <Select
              label="Dine sorterte flashies"
              placeholder="Sorter etter..."
              value={sortOption}
              data={[
                { value: 'mostLiked', label: 'Flest likte' },
                { value: 'mostFavorited', label: 'Flest favoritter' },
              ]}
            />
            {<ArticleCardsGrid user={session.user} flashcards={filteredAndSortedFlashcardSets ?? []} />}
          </>
        )
      ) : (
        <>
          <Title>Logg inn for å fortsette</Title>
          <Button onClick={() => signIn()}>Logg inn</Button>
        </>
      )}
    </Stack>
  );
}
