"use client";

import { ArticleCardsGrid } from "@/components/articleView/ArticleCardsGrid";
import { ActionIcon, Button, Group, Loader, MultiSelect, Stack, TextInput, Title, rem, useMantineTheme } from "@mantine/core";
import { IconArrowRight, IconSearch } from "@tabler/icons-react";
import levenshtein from "fast-levenshtein";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { FlashcardSet } from "./types/flashcard";
import { getAllPublicFlashCardSets } from "./utils/firebase";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: session } = useSession();
  const [flashcardSets, setFlashcardSets] = useState<FlashcardSet[]>();
  const [selectedFilters, setSelectedFilters] = useState<FlashcardSet[]>([]);
  const theme = useMantineTheme();

  useEffect(() => {
    if (session == null) return;

    async function fetchFlashcardSet() {
      if (session == null) return;
      const flashcardSet = await getAllPublicFlashCardSets();
      setFlashcardSets(flashcardSet);
    }
    fetchFlashcardSet();
  }, [session]);

  const filteredFlashcardSets = useMemo(() => {
    if (!flashcardSets) return [];
    return flashcardSets
      .filter((flashcardSet: FlashcardSet) => flashcardSet.title.toLowerCase().includes(searchQuery.toLowerCase()))
      .filter((flashcardSet: FlashcardSet) => selectedFilters.length === 0 || selectedFilters.some((filter) => filter.id === flashcardSet.id))
      .sort((a: FlashcardSet, b: FlashcardSet) => {
        const distanceA = levenshtein.get(a.title.toLowerCase(), searchQuery.toLowerCase());
        const distanceB = levenshtein.get(b.title.toLowerCase(), searchQuery.toLowerCase());
        return distanceA - distanceB; // Sort in ascending order of distance
      });
  },
    [flashcardSets, searchQuery, selectedFilters]);


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
            <MultiSelect
              label="Dine filterte flashies"
              placeholder="Sorter etter"
              data={flashcardSets.map(flashcardSet => ({
                value: flashcardSet.id, // Assuming each flashcardSet has a unique 'id'
                label: flashcardSet.title // And a 'title' that you want to display to users
              }))}
              value={selectedFilters.map(flashcardSet => flashcardSet.id)}
              onChange={(values) => {
                setSelectedFilters(flashcardSets.filter(flashcardSet => values.includes(flashcardSet.id)));
              }}
            />

            {<ArticleCardsGrid flashcards={filteredFlashcardSets ?? []} />}
          </>
        )
      ) : (
        <>
          <Title>Sign in to continue</Title>
          <Button onClick={() => signIn()}>Sign in</Button>
        </>
      )}
    </Stack>
  );
}
