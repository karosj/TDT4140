"use client";

import Image from "next/image";
import { Button, Stack, Title } from "@mantine/core";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import SignUpForm from "@/components/signUp/signUp";

export default function Home() {
  const { data: session } = useSession();
  return (
    <Stack align="center">
      <Button component={Link} href="/demo">
        Go to demo
      </Button>
      {session ? (
        <>
          <Title>Make account</Title>
          <SignUpForm />
        </>
      ) : (
        <></>
      )}
    </Stack>
  );
}
