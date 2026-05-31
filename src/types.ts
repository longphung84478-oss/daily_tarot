export interface TarotCard {
  id: number;
  name: string;
  nameVi: string;
  keyword: string;
  iconName: string; // Map to Lucide icon name
  descriptionUpright: string;
  descriptionReversed: string;
  element: "Air" | "Fire" | "Water" | "Earth" | "Spirit";
  number: number;
}

export interface SpreadPosition {
  title: string;
  description: string;
}

export interface TarotSpread {
  id: string;
  name: string;
  description: string;
  cardCount: number;
  positions: SpreadPosition[];
}

export interface CardDraw {
  id: string; // Unique draw identifier
  card: TarotCard;
  isReversed: boolean;
  isFlipped: boolean;
  positionTitle: string;
  positionDescription: string;
}

export interface TarotReadingResult {
  introduction: string;
  cardReadings: {
    cardId: number;
    title: string;
    interpretation: string;
  }[];
  advice: string;
  conclusion: string;
}
