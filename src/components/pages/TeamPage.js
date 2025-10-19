import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiUsers, FiUserPlus, FiMail, FiPhone, FiMapPin, FiEdit2, FiTrash2, FiEye } from 'react-icons/fi';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { useDebounce } from '../../hooks';

const TeamContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const TeamHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing[8]};
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing[4]};
`;

const TeamTitle = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes['3xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.neutral[900]};
`;

const SearchContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[4]};
  flex: 1;
  max-width: 500px;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: ${({ theme }) => theme.spacing[3]};
  border: 1px solid ${({ theme }) => theme.colors.neutral[300]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.fontSizes.base};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary[500]};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary[100]};
  }
`;

const FilterSelect = styled.select`
  padding: ${({ theme }) => theme.spacing[3]};
  border: 1px solid ${({ theme }) => theme.colors.neutral[300]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: white;
  font-size: ${({ theme }) => theme.fontSizes.base};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary[500]};
  }
`;

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: ${({ theme }) => theme.spacing[6]};
  margin-bottom: ${({ theme }) => theme.spacing[8]};
`;

const MemberCard = styled(Card)`
  padding: ${({ theme }) => theme.spacing[6]};
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }
`;

const MemberHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`;

const Avatar = styled.div`
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary[500]}, ${({ theme }) => theme.colors.primary[600]});
  border-radius: ${({ theme }) => theme.borderRadius.full};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  margin-right: ${({ theme }) => theme.spacing[4]};
`;

const MemberInfo = styled.div`
  flex: 1;
`;

const MemberName = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.neutral[900]};
  margin: 0 0 ${({ theme }) => theme.spacing[1]} 0;
`;

const MemberRole = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.neutral[600]};
  margin: 0;
`;

const MemberStatus = styled.span`
  background: ${({ status }) => 
    status === 'active' ? '#dcfce7' : 
    status === 'away' ? '#fef3c7' : '#fee2e2'
  };
  color: ${({ status }) => 
    status === 'active' ? '#166534' : 
    status === 'away' ? '#92400e' : '#991b1b'
  };
  padding: ${({ theme }) => theme.spacing[1]} ${({ theme }) => theme.spacing[2]};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;

const MemberDetails = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`;

const DetailItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing[2]};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.neutral[600]};
`;

const DetailIcon = styled.span`
  margin-right: ${({ theme }) => theme.spacing[2]};
  color: ${({ theme }) => theme.colors.neutral[500]};
`;

const MemberActions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[2]};
`;

const ActionButton = styled.button`
  padding: ${({ theme }) => theme.spacing[2]};
  border: none;
  background: ${({ theme }) => theme.colors.neutral[100]};
  color: ${({ theme }) => theme.colors.neutral[600]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: ${({ theme }) => theme.colors.neutral[200]};
    color: ${({ theme }) => theme.colors.neutral[800]};
  }

  &.danger:hover {
    background: ${({ theme }) => theme.colors.error[100]};
    color: ${({ theme }) => theme.colors.error[700]};
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing[16]} ${({ theme }) => theme.spacing[8]};
  color: ${({ theme }) => theme.colors.neutral[500]};
`;

const EmptyIcon = styled.div`
  font-size: ${({ theme }) => theme.fontSizes['4xl']};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`;

const EmptyTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  color: ${({ theme }) => theme.colors.neutral[700]};
  margin-bottom: ${({ theme }) => theme.spacing[2]};
`;

const EmptyDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.base};
  margin-bottom: ${({ theme }) => theme.spacing[6]};
`;

// Mock data
const mockTeamMembers = [
  {
    id: 1,
    name: 'John Doe',
    role: 'Frontend Developer',
    email: 'john.doe@company.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    status: 'active',
    avatar: 'JD',
  },
  {
    id: 2,
    name: 'Jane Smith',
    role: 'Backend Developer',
    email: 'jane.smith@company.com',
    phone: '+1 (555) 234-5678',
    location: 'New York, NY',
    status: 'active',
    avatar: 'JS',
  },
  {
    id: 3,
    name: 'Mike Johnson',
    role: 'UI/UX Designer',
    email: 'mike.johnson@company.com',
    phone: '+1 (555) 345-6789',
    location: 'Austin, TX',
    status: 'away',
    avatar: 'MJ',
  },
  {
    id: 4,
    name: 'Sarah Wilson',
    role: 'Product Manager',
    email: 'sarah.wilson@company.com',
    phone: '+1 (555) 456-7890',
    location: 'Seattle, WA',
    status: 'active',
    avatar: 'SW',
  },
  {
    id: 5,
    name: 'David Brown',
    role: 'DevOps Engineer',
    email: 'david.brown@company.com',
    phone: '+1 (555) 567-8901',
    location: 'Denver, CO',
    status: 'inactive',
    avatar: 'DB',
  },
  {
    id: 6,
    name: 'Lisa Davis',
    role: 'QA Engineer',
    email: 'lisa.davis@company.com',
    phone: '+1 (555) 678-9012',
    location: 'Boston, MA',
    status: 'active',
    avatar: 'LD',
  },
];

export const TeamPage = () => {
  const [teamMembers, setTeamMembers] = useState(mockTeamMembers);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // Filter team members based on search term and status
  const filteredMembers = teamMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
                         member.role.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(debouncedSearchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || member.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleDeleteMember = (id) => {
    setTeamMembers(prev => prev.filter(member => member.id !== id));
  };

  const handleEditMember = (id) => {
    // In a real app, this would open an edit modal or navigate to edit page
    console.log('Edit member:', id);
  };

  const handleViewMember = (id) => {
    // In a real app, this would open the member profile
    console.log('View member:', id);
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'active': return 'Active';
      case 'away': return 'Away';
      case 'inactive': return 'Inactive';
      default: return 'Unknown';
    }
  };

  return (
    <TeamContainer>
      <TeamHeader>
        <TeamTitle>Team Members</TeamTitle>
        <SearchContainer>
          <SearchInput
            type="text"
            placeholder="Search team members..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FilterSelect
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="away">Away</option>
            <option value="inactive">Inactive</option>
          </FilterSelect>
        </SearchContainer>
        <Button variant="primary">
          <FiUserPlus />
          Add Member
        </Button>
      </TeamHeader>

      {filteredMembers.length === 0 ? (
        <Card>
          <EmptyState>
            <EmptyIcon>👥</EmptyIcon>
            <EmptyTitle>No team members found</EmptyTitle>
            <EmptyDescription>
              {searchTerm || filterStatus !== 'all' 
                ? 'Try adjusting your search or filter criteria.'
                : 'Get started by adding your first team member.'
              }
            </EmptyDescription>
            <Button variant="primary">
              <FiUserPlus />
              Add Team Member
            </Button>
          </EmptyState>
        </Card>
      ) : (
        <TeamGrid>
          {filteredMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <MemberCard>
                <MemberHeader>
                  <Avatar>{member.avatar}</Avatar>
                  <MemberInfo>
                    <MemberName>{member.name}</MemberName>
                    <MemberRole>{member.role}</MemberRole>
                  </MemberInfo>
                  <MemberStatus status={member.status}>
                    {getStatusText(member.status)}
                  </MemberStatus>
                </MemberHeader>
                
                <MemberDetails>
                  <DetailItem>
                    <DetailIcon><FiMail /></DetailIcon>
                    {member.email}
                  </DetailItem>
                  <DetailItem>
                    <DetailIcon><FiPhone /></DetailIcon>
                    {member.phone}
                  </DetailItem>
                  <DetailItem>
                    <DetailIcon><FiMapPin /></DetailIcon>
                    {member.location}
                  </DetailItem>
                </MemberDetails>
                
                <MemberActions>
                  <ActionButton onClick={() => handleViewMember(member.id)} title="View Profile">
                    <FiEye />
                  </ActionButton>
                  <ActionButton onClick={() => handleEditMember(member.id)} title="Edit">
                    <FiEdit2 />
                  </ActionButton>
                  <ActionButton 
                    onClick={() => handleDeleteMember(member.id)} 
                    title="Remove"
                    className="danger"
                  >
                    <FiTrash2 />
                  </ActionButton>
                </MemberActions>
              </MemberCard>
            </motion.div>
          ))}
        </TeamGrid>
      )}
    </TeamContainer>
  );
};
