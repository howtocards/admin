import { request } from './request';

export type CardData = {
  id: number;
  title: string;
  content: string;
  isAchieved: boolean;
  metaTitle: string;
  metaDescription: string;
};

export const getCardsList = (): Promise<CardData[]> => request('/cards/list');

export const getCard = ({ id }: { id: number }): Promise<CardData> =>
  request('/cards', { id });

export const editCard = (cardData: CardData): Promise<{}> =>
  request(`/cards/edit`, { cardData });

export const deleteCard = (id: number): Promise<{}> =>
  request(`/cards/delete`, { id });

export const achieveCard = (id: number): Promise<{}> =>
  request(`/cards/achieve`, { id });

export const rerenderCard = (id: number | number[]): Promise<{}> =>
  request(`/cards/rerender`, { id });
