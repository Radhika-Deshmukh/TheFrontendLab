import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const ButtonBase = styled(motion.button)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing[2]};
  font-family: inherit;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  transition: all 0.2s ease;
  cursor: pointer;
  border: none;
  outline: none;
  text-decoration: none;
  position: relative;
  overflow: hidden;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary[500]};
    outline-offset: 2px;
  }
`;

const ButtonVariants = {
  primary: styled(ButtonBase)`
    background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary[500]}, ${({ theme }) => theme.colors.primary[600]});
    color: white;
    box-shadow: ${({ theme }) => theme.shadows.sm};

    &:hover:not(:disabled) {
      background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary[600]}, ${({ theme }) => theme.colors.primary[700]});
      box-shadow: ${({ theme }) => theme.shadows.md};
      transform: translateY(-1px);
    }

    &:active:not(:disabled) {
      transform: translateY(0);
    }
  `,
  secondary: styled(ButtonBase)`
    background: ${({ theme }) => theme.colors.neutral[100]};
    color: ${({ theme }) => theme.colors.neutral[700]};
    border: 1px solid ${({ theme }) => theme.colors.neutral[200]};

    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.colors.neutral[200]};
      border-color: ${({ theme }) => theme.colors.neutral[300]};
    }
  `,
  outline: styled(ButtonBase)`
    background: transparent;
    color: ${({ theme }) => theme.colors.primary[600]};
    border: 1px solid ${({ theme }) => theme.colors.primary[600]};

    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.colors.primary[50]};
      border-color: ${({ theme }) => theme.colors.primary[700]};
    }
  `,
  ghost: styled(ButtonBase)`
    background: transparent;
    color: ${({ theme }) => theme.colors.neutral[600]};

    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.colors.neutral[100]};
      color: ${({ theme }) => theme.colors.neutral[800]};
    }
  `,
  danger: styled(ButtonBase)`
    background: ${({ theme }) => theme.colors.error[500]};
    color: white;

    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.colors.error[600]};
    }
  `,
};

const ButtonSizes = {
  small: styled(ButtonBase)`
    padding: ${({ theme }) => theme.spacing[2]} ${({ theme }) => theme.spacing[3]};
    font-size: ${({ theme }) => theme.fontSizes.sm};
    min-height: 32px;
  `,
  medium: styled(ButtonBase)`
    padding: ${({ theme }) => theme.spacing[3]} ${({ theme }) => theme.spacing[4]};
    font-size: ${({ theme }) => theme.fontSizes.base};
    min-height: 40px;
  `,
  large: styled(ButtonBase)`
    padding: ${({ theme }) => theme.spacing[4]} ${({ theme }) => theme.spacing[6]};
    font-size: ${({ theme }) => theme.fontSizes.lg};
    min-height: 48px;
  `,
};

export const Button = ({ 
  variant = 'primary', 
  size = 'medium', 
  children, 
  disabled = false,
  loading = false,
  onClick,
  type = 'button',
  ...props 
}) => {
  const ButtonComponent = ButtonVariants[variant];
  const SizedButton = ButtonSizes[size];

  return (
    <SizedButton
      as={ButtonComponent}
      disabled={disabled || loading}
      onClick={onClick}
      type={type}
      whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
      whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
      {...props}
    >
      {loading && (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          style={{ marginRight: '8px' }}
        >
          ⟳
        </motion.div>
      )}
      {children}
    </SizedButton>
  );
};
