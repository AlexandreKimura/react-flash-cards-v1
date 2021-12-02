import { read, exclude, create, edit } from "./httpService";
import { getNewId } from "./idService";

export async function getAllFlashCardsApi() {
  const allFlashCards = await read("/flashcards");
  return allFlashCards;
}

export async function apiDeleteFlashCard(cardId) {
  await exclude(`/flashcards/${cardId}`);
}

export async function apiCreateFlashCard(title, description) {
  const newFlashCard = create("/flashcards", {
    id: getNewId(),
    title,
    description,
  });

  return newFlashCard;
}

export async function apiEditFlashCard(cardId, title, description) {
  const updateFlashCard = edit(`/flashcards/${cardId}`, {
    title,
    description,
  });

  return updateFlashCard;
}
