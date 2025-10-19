import React from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import {
  FiHome,
  FiBarChart2,
  FiUser,
  FiSettings,
  FiFileText,
  FiUsers,
  FiPackage,
  FiTrendingUp,
  FiShield,
  FiHelpCircle,
  FiChevronLeft,
} from 'react-icons/fi';

const SidebarContainer = styled(motion.aside)`
  background: ${({ theme }) => theme.colors.neutral[900]};
  color: ${({ theme }) => theme.colors.neutral[50]};
  width: 280px;
  height: calc(100vh - 80px);
  position: fixed;
  left: 0;
  top: 80px;
  z-index: ${({ theme }) => theme.zIndex.dropdown};
  overflow-y: auto;
  box-shadow: ${({ theme }) => theme.shadows.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    transform: translateX(-100%);
  }
`;

const SidebarContent = styled.div`
  padding: ${({ theme }) => theme.spacing[6]} 0;
`;

const NavSection = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing[8]};
`;

const SectionTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.neutral[400]};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 0 ${({ theme }) => theme.spacing[6]};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`;

const NavList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const NavItem = styled.li`
  margin-bottom: ${({ theme }) => theme.spacing[1]};
`;

const NavLinkStyled = styled(NavLink)`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.spacing[3]} ${({ theme }) => theme.spacing[6]};
  color: ${({ theme }) => theme.colors.neutral[300]};
  text-decoration: none;
  transition: all 0.2s ease;
  position: relative;

  &:hover {
    background-color: ${({ theme }) => theme.colors.neutral[800]};
    color: ${({ theme }) => theme.colors.neutral[50]};
  }

  &.active {
    background-color: ${({ theme }) => theme.colors.primary[600]};
    color: ${({ theme }) => theme.colors.neutral[50]};

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 4px;
      background-color: ${({ theme }) => theme.colors.primary[400]};
    }
  }
`;

const NavIcon = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  margin-right: ${({ theme }) => theme.spacing[3]};
  display: flex;
  align-items: center;
`;

const NavText = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: ${({ theme }) => theme.zIndex.overlay};

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: none;
  }
`;

/* Small collapse button inside the sidebar for desktop users */
const CollapseButton = styled.button`
  position: absolute;
  right: 8px;
  top: 8px;
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.neutral[200]};
  padding: ${({ theme }) => theme.spacing[1]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.neutral[800]};
    color: ${({ theme }) => theme.colors.neutral[50]};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: none;
  }
`;

const navigationItems = [
  {
    title: 'Main',
    items: [
      { to: '/', icon: FiHome, label: 'Home' },
      { to: '/dashboard', icon: FiBarChart2, label: 'Dashboard' },
    ],
  },
  {
    title: 'User',
    items: [
      { to: '/profile', icon: FiUser, label: 'Profile' },
      { to: '/settings', icon: FiSettings, label: 'Settings' },
    ],
  },
  {
    title: 'Features',
    items: [
      { to: '/documents', icon: FiFileText, label: 'Documents' },
      { to: '/team', icon: FiUsers, label: 'Team' },
      { to: '/products', icon: FiPackage, label: 'Products' },
      { to: '/analytics', icon: FiTrendingUp, label: 'Analytics' },
    ],
  },
  {
    title: 'System',
    items: [
      { to: '/security', icon: FiShield, label: 'Security' },
      { to: '/help', icon: FiHelpCircle, label: 'Help & Support' },
    ],
  },
];

export const Sidebar = ({ isOpen, onClose }) => {
  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            <SidebarContainer
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'tween', duration: 0.3 }}
            >
              <SidebarContent>
                <CollapseButton
                  aria-label="Collapse sidebar"
                  onClick={onClose}
                  title="Collapse"
                >
                  <FiChevronLeft size={20} />
                </CollapseButton>

                {navigationItems.map((section) => (
                  <NavSection key={section.title}>
                    <SectionTitle>{section.title}</SectionTitle>
                    <NavList>
                      {section.items.map((item) => (
                        <NavItem key={item.to}>
                          <NavLinkStyled to={item.to}>
                            <NavIcon>
                              <item.icon />
                            </NavIcon>
                            <NavText>{item.label}</NavText>
                          </NavLinkStyled>
                        </NavItem>
                      ))}
                    </NavList>
                  </NavSection>
                ))}
              </SidebarContent>
            </SidebarContainer>

            <Overlay
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
            />
          </>
        )}
      </AnimatePresence>
    </>
  );
};
