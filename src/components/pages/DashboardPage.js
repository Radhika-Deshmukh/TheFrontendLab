import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiTrendingUp, FiUsers, FiDollarSign, FiActivity } from 'react-icons/fi';
import { Card } from '../common/Card';
import { Button } from '../common/Button';

const DashboardContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const DashboardHeader = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing[8]};
`;

const DashboardTitle = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes['3xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.neutral[900]};
  margin-bottom: ${({ theme }) => theme.spacing[2]};
`;

const DashboardSubtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.neutral[600]};
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.spacing[6]};
  margin-bottom: ${({ theme }) => theme.spacing[8]};
`;

const StatCard = styled(Card)`
  padding: ${({ theme }) => theme.spacing[6]};
`;

const StatHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`;

const StatIcon = styled.div`
  width: 48px;
  height: 48px;
  background: ${({ color }) => color};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: ${({ theme }) => theme.fontSizes.xl};
`;

const StatValue = styled.div`
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.neutral[900]};
  margin-bottom: ${({ theme }) => theme.spacing[1]};
`;

const StatLabel = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.neutral[600]};
`;

const StatChange = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ positive }) => positive ? '#22c55e' : '#ef4444'};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;

const ChartsGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: ${({ theme }) => theme.spacing[6]};
  margin-bottom: ${({ theme }) => theme.spacing[8]};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
  }
`;

const ChartCard = styled(Card)`
  padding: ${({ theme }) => theme.spacing[6]};
`;

const ChartTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.neutral[900]};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`;

const ChartPlaceholder = styled.div`
  height: 300px;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.neutral[100]}, ${({ theme }) => theme.colors.neutral[200]});
  border-radius: ${({ theme }) => theme.borderRadius.md};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.neutral[500]};
  font-size: ${({ theme }) => theme.fontSizes.lg};
`;

const RecentActivity = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing[8]};
`;

const ActivityItem = styled.div`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.spacing[4]};
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutral[200]};

  &:last-child {
    border-bottom: none;
  }
`;

const ActivityIcon = styled.div`
  width: 40px;
  height: 40px;
  background: ${({ theme }) => theme.colors.primary[100]};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: ${({ theme }) => theme.spacing[4]};
  color: ${({ theme }) => theme.colors.primary[600]};
`;

const ActivityContent = styled.div`
  flex: 1;
`;

const ActivityTitle = styled.div`
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.neutral[900]};
  margin-bottom: ${({ theme }) => theme.spacing[1]};
`;

const ActivityDescription = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.neutral[600]};
`;

const ActivityTime = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.neutral[500]};
`;

const stats = [
  {
    icon: FiTrendingUp,
    color: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
    value: '$45,231',
    label: 'Total Revenue',
    change: '+12.5%',
    positive: true,
  },
  {
    icon: FiUsers,
    color: 'linear-gradient(135deg, #10b981, #047857)',
    value: '2,350',
    label: 'Active Users',
    change: '+8.2%',
    positive: true,
  },
  {
    icon: FiDollarSign,
    color: 'linear-gradient(135deg, #f59e0b, #d97706)',
    value: '$1,234',
    label: 'Average Order',
    change: '-2.1%',
    positive: false,
  },
  {
    icon: FiActivity,
    color: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
    value: '98.5%',
    label: 'Uptime',
    change: '+0.3%',
    positive: true,
  },
];

const activities = [
  {
    icon: FiUsers,
    title: 'New user registered',
    description: 'John Doe joined the platform',
    time: '2 minutes ago',
  },
  {
    icon: FiDollarSign,
    title: 'Payment received',
    description: '$1,200 from Sarah Wilson',
    time: '15 minutes ago',
  },
  {
    icon: FiTrendingUp,
    title: 'Sales target reached',
    description: 'Monthly target exceeded by 15%',
    time: '1 hour ago',
  },
  {
    icon: FiActivity,
    title: 'System update',
    description: 'Version 2.1.0 deployed successfully',
    time: '2 hours ago',
  },
];

export const DashboardPage = () => {
  return (
    <DashboardContainer>
      <DashboardHeader>
        <DashboardTitle>Dashboard</DashboardTitle>
        <DashboardSubtitle>Welcome back! Here's what's happening with your business.</DashboardSubtitle>
      </DashboardHeader>

      <StatsGrid>
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <StatCard>
              <StatHeader>
                <StatIcon color={stat.color}>
                  <stat.icon />
                </StatIcon>
                <StatChange positive={stat.positive}>
                  {stat.change}
                </StatChange>
              </StatHeader>
              <StatValue>{stat.value}</StatValue>
              <StatLabel>{stat.label}</StatLabel>
            </StatCard>
          </motion.div>
        ))}
      </StatsGrid>

      <ChartsGrid>
        <ChartCard>
          <ChartTitle>Revenue Overview</ChartTitle>
          <ChartPlaceholder>
            📊 Revenue Chart (Chart.js integration)
          </ChartPlaceholder>
        </ChartCard>
        <ChartCard>
          <ChartTitle>User Growth</ChartTitle>
          <ChartPlaceholder>
            📈 Growth Chart (Chart.js integration)
          </ChartPlaceholder>
        </ChartCard>
      </ChartsGrid>

      <RecentActivity>
        <Card>
          <div style={{ padding: '1.5rem', borderBottom: '1px solid #e5e7eb' }}>
            <ChartTitle>Recent Activity</ChartTitle>
          </div>
          {activities.map((activity, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <ActivityItem>
                <ActivityIcon>
                  <activity.icon />
                </ActivityIcon>
                <ActivityContent>
                  <ActivityTitle>{activity.title}</ActivityTitle>
                  <ActivityDescription>{activity.description}</ActivityDescription>
                </ActivityContent>
                <ActivityTime>{activity.time}</ActivityTime>
              </ActivityItem>
            </motion.div>
          ))}
        </Card>
      </RecentActivity>
    </DashboardContainer>
  );
};
