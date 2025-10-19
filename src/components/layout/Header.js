import React from 'react';
import styled from 'styled-components';
import { FiMenu, FiX, FiBell, FiSearch, FiUser } from 'react-icons/fi';
import { motion } from 'framer-motion';

const HeaderContainer = styled.header`
  background: ${({ theme }) => theme.colors.neutral[900]};
  color: ${({ theme }) => theme.colors.neutral[50]};
  padding: ${({ theme }) => theme.spacing[4]} ${({ theme }) => theme.spacing[6]};
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: ${({ theme }) => theme.shadows.md};
  position: sticky;
  top: 0;
  z-index: ${({ theme }) => theme.zIndex.sticky};
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[4]};
`;

const MenuButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.neutral[50]};
  font-size: ${({ theme }) => theme.fontSizes.xl};
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing[2]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.neutral[800]};
  }

  /* NOTE: we deliberately keep this visible on large screens so user can hide sidebar */
`;

const Logo = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.primary[400]};
`;

const SearchContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.neutral[800]};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  padding: ${({ theme }) => theme.spacing[2]} ${({ theme }) => theme.spacing[4]};
  min-width: 300px;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;

const SearchInput = styled.input`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.neutral[50]};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  padding-left: ${({ theme }) => theme.spacing[2]};
  width: 100%;
  outline: none;

  &::placeholder {
    color: ${({ theme }) => theme.colors.neutral[400]};
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[4]};
`;

const IconButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.neutral[50]};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing[2]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  position: relative;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.neutral[800]};
  }
`;

const NotificationBadge = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  background-color: ${({ theme }) => theme.colors.error[500]};
  color: white;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  padding: 2px 6px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  min-width: 18px;
  text-align: center;
`;

const UserAvatar = styled.div`
  width: 40px;
  height: 40px;
  background-color: ${({ theme }) => theme.colors.primary[500]};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
`;

export const Header = ({ onToggleSidebar, sidebarOpen }) => {
  return (
    <HeaderContainer>
      <LeftSection>
        <MenuButton onClick={onToggleSidebar}>
          {sidebarOpen ? <FiX /> : <FiMenu />}
        </MenuButton>
        <Logo>FrontendShowcase</Logo>
      </LeftSection>

      <SearchContainer>
        <FiSearch />
        <SearchInput placeholder="Search..." />
      </SearchContainer>

      <RightSection>
        <IconButton>
          <FiBell />
          <NotificationBadge>3</NotificationBadge>
        </IconButton>
        <UserAvatar>
          <FiUser />
        </UserAvatar>
      </RightSection>
    </HeaderContainer>
  );
};
