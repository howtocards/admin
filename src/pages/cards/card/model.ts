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

// card fields

export const submitCardForm = createEvent<React.MouseEvent>();

export const contentField = createField({
  name: 'contentField',
});

export const editForm = createForm({
  name: 'editForm',
  fields: [contentField],
});

// meta fields

export const submitMetaForm = createEvent<React.MouseEvent>();

export const titleField = createField({
  name: 'titleField',
});

export const metaTitleField = createField({
  name: 'metaTitleField',
});

export const metaDescField = createField({
  name: 'metaDescField',
});

export const metaForm = createForm({
  name: 'metaForm',
  fields: [titleField, metaTitleField, metaDescField],
});

export const pageMounted = createEvent<{ id: number }>();

const getCard = createEffect<{ id: number }, API.CardData>();

getCard.use(API.getCard);

export const $card = createStore<API.CardData | null>(null);

$card.on(getCard.done, (_, { result }) => result);

forward({ from: pageMounted, to: getCard });

const editCard = createEffect<API.CardData, {}>();

editCard.use(API.editCard);

guard({
  source: sample(editForm.$values, submitCardForm),
  filter: editForm.$isValid,
  target: editCard,
});

guard({
  source: sample(metaForm.$values, submitMetaForm),
  filter: metaForm.$isValid,
  target: editCard,
});
