import styled from 'styled-components';

import { BREAKPOINTS } from 'lib/media';

export const Container = styled.div`
  width: 100%;
  margin: 0 auto;

  @media (min-width: ${BREAKPOINTS.phone}) {
    padding: 0 1.3rem;
  }

  @media (min-width: ${BREAKPOINTS.smartphone}) {
    padding: 0 1rem;
  }

  @media (min-width: ${BREAKPOINTS.tablet}) {
    padding: 0 1.25rem;
  }

  @media (min-width: ${BREAKPOINTS.desktop}) {
    padding: 0 1.5rem;
  }
`;
