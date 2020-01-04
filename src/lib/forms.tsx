import {
  createStore,
  createEvent,
  combine,
  Store,
  Event,
  Unit,
} from 'effector';

type CreateField = {
  initialValue?: string;
  map?: (value: string) => string;
  name: string;
  reset?: Unit<void>;
  validator?: (value: string) => string | null;
};

export type FieldConfig = {
  $error: Store<string | null>;
  $value: Store<string>;
  changed: Event<React.ChangeEvent<HTMLInputElement>>;
  name: string;
};

export const createField = ({
  initialValue = '',
  map,
  name,
  reset = createEvent(`${name}Reset`),
  validator,
}: CreateField): FieldConfig => {
  const changed = createEvent<React.ChangeEvent<HTMLInputElement>>(
    `${name}Changed`,
  );

  const $source = createStore(initialValue, { name: `${name}Store` });

  const $error = $source.map(validator ?? (() => null));
  const $value = $source.map(map ?? (a => a));

  $source.on(changed, (_, payload) => payload.currentTarget.value).reset(reset);

  return { name, $value, $error, changed };
};

type CreateForm = {
  name: string;
  fields: FieldConfig[];
};

export type FormConfig = {
  $values: Store<Record<string, string>>;
  $isValid: Store<boolean>;
  $isTouched: Store<boolean>;
  submit: Event<void>;
};

export function createForm({ name, fields }: CreateForm): FormConfig {
  const submit = createEvent<void>(`${name}Submit`);

  const $isTouched = createStore<boolean>(false, { name: `${name}Store` });
  const $isValid = validateFields(fields);

  $isTouched.on(submit, () => true);

  const $values: Store<Record<string, string>> = combine(
    fields.reduce(
      (accumulator, { $value, name: fieldName }) => ({
        ...accumulator,
        ...{ [fieldName]: $value },
      }),
      {},
    ),
  );

  return { submit, $isValid, $isTouched, $values };
}

export const validateFields = (fields: FieldConfig[]) => {
  const allStores = fields.map(({ $error }) => $error);
  return combine(allStores, all => all.every((value: string | null) => !value));
};
