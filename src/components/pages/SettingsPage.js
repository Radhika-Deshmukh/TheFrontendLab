import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiSettings, FiBell, FiShield, FiDroplet, FiGlobe, FiMoon, FiSun } from 'react-icons/fi';
import { Card } from '../common/Card';
import { Button } from '../common/Button';

const SettingsContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const SettingsHeader = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing[8]};
`;

const SettingsTitle = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes['3xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.neutral[900]};
  margin-bottom: ${({ theme }) => theme.spacing[2]};
`;

const SettingsSubtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.neutral[600]};
`;

const SettingsGrid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing[6]};
`;

const SettingCard = styled(Card)`
  padding: ${({ theme }) => theme.spacing[6]};
`;

const SettingHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing[6]};
`;

const SettingIcon = styled.div`
  width: 48px;
  height: 48px;
  background: ${({ color }) => color};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: ${({ theme }) => theme.spacing[4]};
  color: white;
  font-size: ${({ theme }) => theme.fontSizes.xl};
`;

const SettingTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.neutral[900]};
  margin: 0;
`;

const SettingDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.neutral[600]};
  margin: ${({ theme }) => theme.spacing[1]} 0 0 0;
`;

const SettingContent = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing[4]};
`;

const SettingItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing[4]};
  background: ${({ theme }) => theme.colors.neutral[50]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
`;

const SettingItemInfo = styled.div`
  flex: 1;
`;

const SettingItemTitle = styled.div`
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.neutral[900]};
  margin-bottom: ${({ theme }) => theme.spacing[1]};
`;

const SettingItemDescription = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.neutral[600]};
`;

const Toggle = styled.button`
  width: 48px;
  height: 24px;
  background: ${({ active }) => active ? '#3b82f6' : '#d1d5db'};
  border: none;
  border-radius: 12px;
  position: relative;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &::after {
    content: '';
    position: absolute;
    top: 2px;
    left: ${({ active }) => active ? '26px' : '2px'};
    width: 20px;
    height: 20px;
    background: white;
    border-radius: 50%;
    transition: left 0.2s ease;
  }
`;

const Select = styled.select`
  padding: ${({ theme }) => theme.spacing[2]} ${({ theme }) => theme.spacing[3]};
  border: 1px solid ${({ theme }) => theme.colors.neutral[300]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: white;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary[500]};
  }
`;

const ColorPicker = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[2]};
`;

const ColorOption = styled.button`
  width: 32px;
  height: 32px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  border: 2px solid ${({ active }) => active ? '#3b82f6' : 'transparent'};
  background: ${({ color }) => color};
  cursor: pointer;
  transition: border-color 0.2s ease;
`;

const settings = [
  {
    icon: FiBell,
    color: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
    title: 'Notifications',
    description: 'Manage your notification preferences',
    items: [
      {
        title: 'Email Notifications',
        description: 'Receive email updates about important events',
        type: 'toggle',
        value: true,
      },
      {
        title: 'Push Notifications',
        description: 'Get push notifications on your device',
        type: 'toggle',
        value: false,
      },
      {
        title: 'SMS Notifications',
        description: 'Receive SMS for critical updates',
        type: 'toggle',
        value: false,
      },
    ],
  },
  {
    icon: FiShield,
    color: 'linear-gradient(135deg, #10b981, #047857)',
    title: 'Privacy & Security',
    description: 'Control your privacy and security settings',
    items: [
      {
        title: 'Two-Factor Authentication',
        description: 'Add an extra layer of security to your account',
        type: 'toggle',
        value: true,
      },
      {
        title: 'Data Collection',
        description: 'Allow us to collect anonymous usage data',
        type: 'toggle',
        value: false,
      },
      {
        title: 'Profile Visibility',
        description: 'Make your profile visible to other users',
        type: 'toggle',
        value: true,
      },
    ],
  },
  {
    icon: FiDroplet,
    color: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
    title: 'Appearance',
    description: 'Customize the look and feel of the application',
    items: [
      {
        title: 'Theme',
        description: 'Choose your preferred color scheme',
        type: 'select',
        value: 'light',
        options: ['light', 'dark', 'auto'],
      },
      {
        title: 'Language',
        description: 'Select your preferred language',
        type: 'select',
        value: 'en',
        options: ['en', 'es', 'fr', 'de'],
      },
      {
        title: 'Accent Color',
        description: 'Choose your favorite accent color',
        type: 'color',
        value: 'blue',
        options: ['blue', 'green', 'purple', 'red', 'orange'],
      },
    ],
  },
];

export const SettingsPage = () => {
  const [settingsState, setSettingsState] = useState({
    notifications: {
      email: true,
      push: false,
      sms: false,
    },
    security: {
      twoFactor: true,
      dataCollection: false,
      profileVisibility: true,
    },
    appearance: {
      theme: 'light',
      language: 'en',
      accentColor: 'blue',
    },
  });

  const handleToggle = (category, setting) => {
    setSettingsState(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: !prev[category][setting],
      },
    }));
  };

  const handleSelect = (category, setting, value) => {
    setSettingsState(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: value,
      },
    }));
  };

  const renderSettingControl = (item, category, settingKey) => {
    switch (item.type) {
      case 'toggle':
        return (
          <Toggle
            active={settingsState[category][settingKey]}
            onClick={() => handleToggle(category, settingKey)}
          />
        );
      case 'select':
        return (
          <Select
            value={settingsState[category][settingKey]}
            onChange={(e) => handleSelect(category, settingKey, e.target.value)}
          >
            {item.options.map(option => (
              <option key={option} value={option}>
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </option>
            ))}
          </Select>
        );
      case 'color':
        return (
          <ColorPicker>
            {item.options.map(color => (
              <ColorOption
                key={color}
                color={color === 'blue' ? '#3b82f6' : 
                       color === 'green' ? '#10b981' :
                       color === 'purple' ? '#8b5cf6' :
                       color === 'red' ? '#ef4444' : '#f59e0b'}
                active={settingsState[category][settingKey] === color}
                onClick={() => handleSelect(category, settingKey, color)}
              />
            ))}
          </ColorPicker>
        );
      default:
        return null;
    }
  };

  return (
    <SettingsContainer>
      <SettingsHeader>
        <SettingsTitle>Settings</SettingsTitle>
        <SettingsSubtitle>Customize your experience and manage your preferences</SettingsSubtitle>
      </SettingsHeader>

      <SettingsGrid>
        {settings.map((setting, index) => (
          <motion.div
            key={setting.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <SettingCard>
              <SettingHeader>
                <SettingIcon color={setting.color}>
                  <setting.icon />
                </SettingIcon>
                <div>
                  <SettingTitle>{setting.title}</SettingTitle>
                  <SettingDescription>{setting.description}</SettingDescription>
                </div>
              </SettingHeader>
              <SettingContent>
                {setting.items.map((item, itemIndex) => {
                  const settingKey = Object.keys(settingsState[setting.title.toLowerCase().replace(/\s+/g, '').replace(/&/g, '')])[itemIndex];
                  return (
                    <SettingItem key={item.title}>
                      <SettingItemInfo>
                        <SettingItemTitle>{item.title}</SettingItemTitle>
                        <SettingItemDescription>{item.description}</SettingItemDescription>
                      </SettingItemInfo>
                      {renderSettingControl(item, setting.title.toLowerCase().replace(/\s+/g, '').replace(/&/g, ''), settingKey)}
                    </SettingItem>
                  );
                })}
              </SettingContent>
            </SettingCard>
          </motion.div>
        ))}
      </SettingsGrid>
    </SettingsContainer>
  );
};
