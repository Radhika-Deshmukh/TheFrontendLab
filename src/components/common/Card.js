import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const CardContainer = styled(motion.div)`
  background: ${({ theme }) => theme.colors.neutral[50]};
  border: 1px solid ${({ theme }) => theme.colors.neutral[200]};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  overflow: hidden;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.md};
    border-color: ${({ theme }) => theme.colors.neutral[300]};
  }
`;

const CardHeader = styled.div`
  padding: ${({ theme }) => theme.spacing[6]};
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutral[200]};
  background: ${({ theme }) => theme.colors.neutral[50]};
`;

const CardTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.neutral[900]};
  margin: 0;
`;

const CardSubtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.neutral[600]};
  margin: ${({ theme }) => theme.spacing[1]} 0 0 0;
`;

const CardBody = styled.div`
  padding: ${({ theme }) => theme.spacing[6]};
`;

const CardFooter = styled.div`
  padding: ${({ theme }) => theme.spacing[6]};
  border-top: 1px solid ${({ theme }) => theme.colors.neutral[200]};
  background: ${({ theme }) => theme.colors.neutral[50]};
`;

const CardImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const CardVariants = {
  elevated: styled(CardContainer)`
    box-shadow: ${({ theme }) => theme.shadows.lg};
    
    &:hover {
      box-shadow: ${({ theme }) => theme.shadows.xl};
      transform: translateY(-2px);
    }
  `,
  outlined: styled(CardContainer)`
    box-shadow: none;
    border: 2px solid ${({ theme }) => theme.colors.neutral[200]};
    
    &:hover {
      border-color: ${({ theme }) => theme.colors.primary[300]};
    }
  `,
  filled: styled(CardContainer)`
    background: ${({ theme }) => theme.colors.primary[50]};
    border-color: ${({ theme }) => theme.colors.primary[200]};
    
    &:hover {
      background: ${({ theme }) => theme.colors.primary[100]};
    }
  `,
};

export const Card = ({ 
  variant = 'default',
  title,
  subtitle,
  image,
  children,
  footer,
  className,
  ...props 
}) => {
  const CardComponent = variant === 'default' ? CardContainer : CardVariants[variant];

  return (
    <CardComponent
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      {...props}
    >
      {image && <CardImage src={image} alt={title} />}
      
      {(title || subtitle) && (
        <CardHeader>
          {title && <CardTitle>{title}</CardTitle>}
          {subtitle && <CardSubtitle>{subtitle}</CardSubtitle>}
        </CardHeader>
      )}
      
      {children && <CardBody>{children}</CardBody>}
      
      {footer && <CardFooter>{footer}</CardFooter>}
    </CardComponent>
  );
};
