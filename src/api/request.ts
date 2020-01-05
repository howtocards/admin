/* eslint-disable no-use-before-define */
import qs from 'qs';

type Query = {
  [key: string]: string | string[];
};

const SERVER_ENDPOINT = process.env.SERVER_ENDPOINT ?? '/api';

export async function request(
  url: string,
  body: object | null = null,
  query: Query = {},
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> {
  const method = 'POST';

  const mockMethod = `${method} ${url}`;

  if (mockMethod in mocks) {
    await wait();

    const answer = mocks[mockMethod](body, query);
    /* eslint-disable no-console */
    console.group(`REQUEST MOCK: ${mockMethod}`);
    console.info(`answer:`, answer);
    console.groupEnd();
    /* eslint-enable no-console */
    return answer;
  }

  return fetch(
    `${SERVER_ENDPOINT}/${url}?${qs.stringify(query)}`,
  ).then(response => response.json());
}

type Mocks = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: <T extends Query>(body: any, query: T) => object;
};

const users: { [key: number]: { id: number; role: string } } = {
  1: {
    id: 1,
    role: 'operator',
  },
  2: {
    id: 2,
    role: 'security',
  },
  3: {
    id: 3,
    role: 'superadmin',
  },
};

const mocks: Mocks = {
  'POST /user/signin': (body: { login: string }): object => {
    let found;
    switch (body.login) {
      case 'operator':
        found = {
          user: users[1],
        };
        break;
      case 'security':
        found = {
          user: users[2],
        };
        break;
      case 'superadmin':
        found = {
          user: users[3],
        };
        break;
      default:
        throw new Failed({ error: 'Invalid credentials' });
    }

    window.localStorage.setItem('current-user-id', String(found.user.id));

    return found;
  },
  'POST /user/current-get': (_body: void): object => {
    const saved = window.localStorage.getItem('current-user-id');

    if (saved !== null) {
      const found = users[parseInt(saved, 10)];

      if (found) {
        return found;
      }
    }

    throw new Failed({ error: 'User not authorised' });
  },
  'POST /user/logout': (_body: void): object => {
    window.localStorage.removeItem('current-user-id');
    return {};
  },
  'POST /users/list': (_body: void) => [
    {
      id: 1,
      userName: 'smith',
      displayName: 'Mr. Smith',
      email: 'smith@example.com',
      isBlocked: false,
    },
    {
      id: 2,
      userName: 'jones',
      displayName: 'Mr. Jones',
      email: 'Jones@example.com',
      isBlocked: true,
    },
  ],
  'POST /user/update/id': (_body: void): object => {
    return {};
  },
  'POST /user/block/id': (_body: void): object => {
    return {};
  },
};

class Failed extends Error {
  public data: object;
  constructor(data: { error: string }) {
    super(`Failed to fetch data: ${data.error}`);
    this.data = data;
  }
}

function wait(): Promise<void> {
  return new Promise(resolve => {
    // eslint-disable-next-line no-magic-numbers
    setTimeout(resolve, Math.floor(Math.random() * 500) + 300);
  });
}
