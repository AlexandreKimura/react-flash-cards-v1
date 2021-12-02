import { read, exclude } from "./httpService";

export async function getAllFlashCardsApi() {
  const allFlashCards = await read("/flashcards");
  return allFlashCards;
}

export async function apiDeleteFlashCard(cardId) {
  await exclude(`/flashcards/${cardId}`);
}
