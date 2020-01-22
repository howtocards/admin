import * as React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { Icon, Menu, Button, Avatar } from 'antd';
import { useSessionKiller } from '../hooks';

type HeaderProps = {
  className?: string;
  links: Array<{ path: string; name: string }>;
};

const HeaderContent: React.FC<HeaderProps> = ({ className, links }) => {
  const killSession = useSessionKiller();
  const userID = window.localStorage.getItem('current-user-id');

  return (
    <div className={className}>
      <Logo />
      <nav>
        <Menu theme="dark" mode="horizontal" style={{ lineHeight: '64px' }}>
          {links.map(({ path, name }) => (
            <Menu.Item key={path}>
              <Link to={path}>{name}</Link>
            </Menu.Item>
          ))}
        </Menu>
      </nav>
      <Avatar
        style={{ backgroundColor: 'rgb(114, 101, 230)', marginRight: 12 }}
      >
        ID: {userID}
      </Avatar>
      <Button type="primary" icon="logout" onClick={killSession}>
        Logout
      </Button>
    </div>
  );
};

export const AuthHeader = styled(HeaderContent)`
  display: flex;
  flex-direction: row;
  align-items: center;
  align-content: center;
  line-height: 4rem;
  height: 100%;

  nav {
    display: flex;
    padding: 0 1.5rem;
    flex-grow: 1;
  }

  nav a {
    text-transform: capitalize;
    font-weight: 700;
  }
`;

const LogoContent: React.FC<{ className?: string }> = ({ className }) => (
  <Link className={className} to="/">
    <Icon type="home" />
  </Link>
);

const Logo = styled(LogoContent)`
  font-size: 1rem;
  color: white;

  div {
    margin-left: 1rem;
  }
`;
