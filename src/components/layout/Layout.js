import React, { useState } from 'react';
import styled from 'styled-components';

import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { Footer } from './Footer';

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContent = styled.main`
  display: flex;
  flex: 1;
  background-color: ${({ theme }) => theme.colors.neutral[50]};
`;

const ContentArea = styled.div`
  flex: 1;
  padding: ${({ theme }) => theme.spacing[6]};
  margin-left: ${({ sidebarOpen }) => (sidebarOpen ? '280px' : '0')};
  transition: margin-left 0.3s ease;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    margin-left: 0;
    padding: ${({ theme }) => theme.spacing[4]};
  }
`;

/*
  FooterWrapper mirrors ContentArea margin so footer contents
  are not hidden behind the fixed sidebar.
*/
const FooterWrapper = styled.div`
  transition: margin-left 0.3s ease;
  margin-left: ${({ sidebarOpen }) => (sidebarOpen ? '280px' : '0')};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    margin-left: 0;
  }
`;

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <LayoutContainer>
      <Header onToggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
      <MainContent>
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <ContentArea sidebarOpen={sidebarOpen}>{children}</ContentArea>
      </MainContent>

      {/* Ensure footer shifts the same as content to avoid being overlapped */}
      <FooterWrapper sidebarOpen={sidebarOpen}>
        <Footer />
      </FooterWrapper>
    </LayoutContainer>
  );
};
export default Layout;
