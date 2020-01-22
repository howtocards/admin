import {
  createEvent,
  createEffect,
  createStore,
  forward,
  guard,
  sample,
} from 'effector';

import { createForm, createField } from 'lib/forms';

import * as API from 'api/cards';

export const titleField = createField({
  name: 'titleField',
});

export const contentField = createField({
  name: 'contentField',
});

export const editForm = createForm({
  name: 'editForm',
  fields: [titleField, contentField],
});

export const pageMounted = createEvent();
export const submitForm = createEvent<React.MouseEvent>();

export const selectRows = createEvent<{ selectedRows: API.CardData[] }>();

const getCardsList = createEffect<void, API.CardData[]>();

export const deleteCard = createEffect<number, {}>();
export const archiveCard = createEffect<number, {}>();
export const rerenderCard = createEffect<number | number[], {}>();

getCardsList.use(API.getCardsList);
deleteCard.use(API.deleteCard);
archiveCard.use(API.achieveCard);
rerenderCard.use(API.rerenderCard);

export const $cardsLits = createStore<API.CardData[] | null>(null);
export const $selectedIDs = createStore<number[] | null>(null);

$cardsLits.on(getCardsList.done, (_, { result }) => result);

$selectedIDs.on(selectRows, (_, { selectedRows }) =>
  selectedRows.map(row => row.id),
);

forward({ from: pageMounted, to: getCardsList });

const editCard = createEffect<API.CardData, {}>();

editCard.use(API.editCard);

guard({
  source: sample(editForm.$values, submitForm),
  filter: editForm.$isValid,
  target: editCard,
});
