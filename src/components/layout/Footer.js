import React from 'react';
import { FiHeart, FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi';
import styled from 'styled-components';


const FooterContainer = styled.footer`
  background: ${({ theme }) => theme.colors.neutral[900]};
  color: ${({ theme }) => theme.colors.neutral[300]};
  padding: ${({ theme }) => theme.spacing[8]} ${({ theme }) => theme.spacing[6]};
  margin-top: auto;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.spacing[8]};
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const FooterTitle = styled.h3`
  color: ${({ theme }) => theme.colors.neutral[50]};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`;

const FooterText = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: 1.6;
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`;

const SocialLinks = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[4]};
`;

const SocialLink = styled.a`
  color: ${({ theme }) => theme.colors.neutral[400]};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primary[400]};
  }
`;

const FooterBottom = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors.neutral[700]};
  margin-top: ${({ theme }) => theme.spacing[8]};
  padding-top: ${({ theme }) => theme.spacing[6]};
  text-align: center;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.neutral[400]};
`;

const HeartIcon = styled(FiHeart)`
  color: ${({ theme }) => theme.colors.error[500]};
  margin: 0 ${({ theme }) => theme.spacing[1]};
`;

export const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <FooterTitle>FrontendShowcase</FooterTitle>
          <FooterText>
            A comprehensive React frontend project showcasing modern development practices,
            including design systems, testing, and maintainable code architecture.
          </FooterText>
          <SocialLinks>
            <SocialLink href="#" aria-label="GitHub">
              <FiGithub />
            </SocialLink>
            <SocialLink href="#" aria-label="LinkedIn">
              <FiLinkedin />
            </SocialLink>
            <SocialLink href="#" aria-label="Twitter">
              <FiTwitter />
            </SocialLink>
          </SocialLinks>
        </FooterSection>

        <FooterSection>
          <FooterTitle>Features</FooterTitle>
          <FooterText>
            • Modern React with Hooks<br />
            • Responsive Design System<br />
            • Comprehensive Testing<br />
            • TypeScript Support<br />
            • Performance Optimization
          </FooterText>
        </FooterSection>

        <FooterSection>
          <FooterTitle>Technologies</FooterTitle>
          <FooterText>
            • React 18<br />
            • Styled Components<br />
            • React Router<br />
            • React Query<br />
            • Framer Motion
          </FooterText>
        </FooterSection>

        <FooterSection>
          <FooterTitle>Contact</FooterTitle>
          <FooterText>
            Radhika.<br />
            Phone Number: 8766354548<br />
            Email: <a href="mailto:rd001official@gmail.com" style={{ color: 'inherit', textDecoration: 'underline' }}>
              rd001official@gmail.com
            </a><br />
            Built with <HeartIcon /> by Frontend Developer<br />
            with modern web technologies.
          </FooterText>
        </FooterSection>
      </FooterContent>

      <FooterBottom>
        © 2024 FrontendShowcase. All rights reserved. Built with modern React practices.
      </FooterBottom>
    </FooterContainer>
  );
};
