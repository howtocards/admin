import * as React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Icon, Menu, Button } from 'antd';
import { useSessionKiller } from '../hooks';

type HeaderProps = {
  className?: string;
  links: Array<{ path: string; title: string }>;
};

const HeaderContent: React.FC<HeaderProps> = ({ className, links }) => {
  const killSession = useSessionKiller();

  return (
    <div className={className}>
      <Logo />
      <nav>
        <Menu theme="dark" mode="horizontal">
          {links.map(({ path, title }) => (
            <Menu.Item key={path}>
              <Link to={path}>{title}</Link>
            </Menu.Item>
          ))}
        </Menu>
      </nav>
      <Button type="primary" icon="logout" onClick={killSession}>
        Завершить сессию
      </Button>
    </div>
  );
};

export const AuthHeader = styled(HeaderContent)`
  display: flex;
  flex-direction: row;
  align-items: center;

  nav {
    display: flex;
    padding: 0 1.5rem;
    flex-grow: 1;
  }

  nav a {
    font-weight: 700;
  }

  nav > * {
    line-height: 4rem;
  }
`;

const LogoContent: React.FC<{ className?: string }> = ({ className }) => (
  <Link className={className} to="/">
    <Icon type="user" />
    <div>Клиенты</div>
  </Link>
);

const Logo = styled(LogoContent)`
  position: relative;
  font-size: 2rem;
  color: white;
  display: flex;
  align-items: center;

  div {
    margin-left: 1rem;
  }
`;
