import { Component } from "react";
import { TextInput, Checkbox, Button, Group, Box } from "@mantine/core";
import { useForm } from "@mantine/form";

export default function SignUpForm() {
  const form = useForm({
    initialValues: {
      username: "",
    },

    validate: {
      username: (value: string) => {
        if (!value) {
          return "Username is required";
        } else {
          return null;
        }
      }
        
    },
  });

  return (
    <>
      <form onSubmit={form.onSubmit((values: string) => console.log(values))}>
        <TextInput
          label="Username"
          withAsterisk
          placeholder="Write in username"
        />

        <Button type="submit">Submit</Button>
      </form>
    </>
  );
}
