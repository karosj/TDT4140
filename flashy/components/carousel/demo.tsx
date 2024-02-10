import { Carousel } from "@mantine/carousel";
import { Container } from "@mantine/core";

const flashcards = [
  {
    id: 1,
    frontTxt: "What is the capital of France?",
    backTxt: "Paris",
  },
  {
    id: 2,
    frontTxt: "What is the largest planet in our solar system?",
    backTxt: "Jupiter",
  },
  {
    id: 3,
    frontTxt: "What element does 'O' represent on the periodic table?",
    backTxt: "Oxygen",
  },
  {
    id: 4,
    frontTxt: "Who wrote 'To Kill a Mockingbird'?",
    backTxt: "Harper Lee",
  },
  {
    id: 5,
    frontTxt: "What year did the Titanic sink?",
    backTxt: "1912",
  },
  {
    id: 6,
    frontTxt: "What is the chemical formula for water?",
    backTxt: "H2O",
  },
  {
    id: 7,
    frontTxt: "Who painted the Mona Lisa?",
    backTxt: "Leonardo da Vinci",
  },
  {
    id: 8,
    frontTxt: "What is the capital of Japan?",
    backTxt: "Tokyo",
  },
  {
    id: 9,
    frontTxt: "What is the hardest natural substance on Earth?",
    backTxt: "Diamond",
  },
  {
    id: 10,
    frontTxt: "Who is known as the father of computers?",
    backTxt: "Charles Babbage",
  },
  {
    id: 11,
    frontTxt: "What is the speed of light?",
    backTxt: "299,792 kilometers per second",
  },
  {
    id: 12,
    frontTxt: "What planet is known as the Red Planet?",
    backTxt: "Mars",
  },
  {
    id: 13,
    frontTxt: "Who wrote the play 'Romeo and Juliet'?",
    backTxt: "William Shakespeare",
  },
  {
    id: 14,
    frontTxt: "What is the largest ocean on Earth?",
    backTxt: "Pacific Ocean",
  },
  {
    id: 15,
    frontTxt: "What is the currency of the United Kingdom?",
    backTxt: "Pound Sterling",
  },
  {
    id: 16,
    frontTxt:
      "What gas do plants breathe in that humans and animals breathe out?",
    backTxt: "Carbon Dioxide",
  },
  {
    id: 17,
    frontTxt: "What is the tallest mountain in the world?",
    backTxt: "Mount Everest",
  },
  {
    id: 18,
    frontTxt: "Who invented the telephone?",
    backTxt: "Alexander Graham Bell",
  },
  {
    id: 19,
    frontTxt: "What is the smallest prime number?",
    backTxt: "2",
  },
  {
    id: 20,
    frontTxt: "What is the capital of Italy?",
    backTxt: "Rome",
  },
];

export default function Demo() {
  return (
    <Carousel withIndicators height={200}>
      {flashcards.map((flashcard) => (
        <Carousel.Slide key={flashcard.id}>
          <Container>{flashcard.frontTxt}</Container>
          <Container>{flashcard.backTxt}</Container>
        </Carousel.Slide>
      ))}
    </Carousel>
  );
}
