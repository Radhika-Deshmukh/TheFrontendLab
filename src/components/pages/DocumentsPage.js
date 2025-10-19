import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiSearch, FiFilter, FiPlus, FiEdit2, FiTrash2, FiEye } from 'react-icons/fi';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { useDebounce } from '../../hooks';

const DocumentsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const DocumentsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing[8]};
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing[4]};
`;

const DocumentsTitle = styled.h1`
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

const DocumentsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing[6]};
  margin-bottom: ${({ theme }) => theme.spacing[8]};
`;

const DocumentCard = styled(Card)`
  padding: ${({ theme }) => theme.spacing[6]};
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }
`;

const DocumentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`;

const DocumentTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.neutral[900]};
  margin: 0;
`;

const DocumentType = styled.span`
  background: ${({ theme }) => theme.colors.primary[100]};
  color: ${({ theme }) => theme.colors.primary[700]};
  padding: ${({ theme }) => theme.spacing[1]} ${({ theme }) => theme.spacing[2]};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;

const DocumentContent = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`;

const DocumentDescription = styled.p`
  color: ${({ theme }) => theme.colors.neutral[600]};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: 1.5;
  margin-bottom: ${({ theme }) => theme.spacing[3]};
`;

const DocumentMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.neutral[500]};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`;

const DocumentActions = styled.div`
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
const mockDocuments = [
  {
    id: 1,
    title: 'Project Requirements Document',
    type: 'PDF',
    description: 'Comprehensive requirements for the new project including technical specifications and user stories.',
    createdAt: '2024-01-15',
    updatedAt: '2024-01-20',
    size: '2.4 MB',
    author: 'John Doe',
  },
  {
    id: 2,
    title: 'API Documentation',
    type: 'MD',
    description: 'Complete API documentation with endpoints, parameters, and response examples.',
    createdAt: '2024-01-10',
    updatedAt: '2024-01-18',
    size: '1.8 MB',
    author: 'Jane Smith',
  },
  {
    id: 3,
    title: 'Design System Guidelines',
    type: 'PDF',
    description: 'Visual design system guidelines including colors, typography, and component specifications.',
    createdAt: '2024-01-05',
    updatedAt: '2024-01-12',
    size: '3.2 MB',
    author: 'Mike Johnson',
  },
  {
    id: 4,
    title: 'User Research Report',
    type: 'DOCX',
    description: 'Detailed user research findings and recommendations for product improvements.',
    createdAt: '2024-01-08',
    updatedAt: '2024-01-15',
    size: '4.1 MB',
    author: 'Sarah Wilson',
  },
  {
    id: 5,
    title: 'Technical Architecture',
    type: 'PDF',
    description: 'System architecture diagrams and technical implementation details.',
    createdAt: '2024-01-12',
    updatedAt: '2024-01-19',
    size: '2.9 MB',
    author: 'David Brown',
  },
  {
    id: 6,
    title: 'Testing Strategy',
    type: 'MD',
    description: 'Comprehensive testing strategy including unit, integration, and e2e testing approaches.',
    createdAt: '2024-01-14',
    updatedAt: '2024-01-21',
    size: '1.5 MB',
    author: 'Lisa Davis',
  },
];

export const DocumentsPage = () => {
  const [documents, setDocuments] = useState(mockDocuments);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // Filter documents based on search term and type
  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
                         doc.description.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
                         doc.author.toLowerCase().includes(debouncedSearchTerm.toLowerCase());
    const matchesType = filterType === 'all' || doc.type.toLowerCase() === filterType.toLowerCase();
    return matchesSearch && matchesType;
  });

  const handleDeleteDocument = (id) => {
    setDocuments(prev => prev.filter(doc => doc.id !== id));
  };

  const handleEditDocument = (id) => {
    // In a real app, this would open an edit modal or navigate to edit page
    console.log('Edit document:', id);
  };

  const handleViewDocument = (id) => {
    // In a real app, this would open the document viewer
    console.log('View document:', id);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <DocumentsContainer>
      <DocumentsHeader>
        <DocumentsTitle>Documents</DocumentsTitle>
        <SearchContainer>
          <SearchInput
            type="text"
            placeholder="Search documents..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FilterSelect
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="pdf">PDF</option>
            <option value="md">Markdown</option>
            <option value="docx">Word</option>
            <option value="txt">Text</option>
          </FilterSelect>
        </SearchContainer>
        <Button variant="primary">
          <FiPlus />
          New Document
        </Button>
      </DocumentsHeader>

      {filteredDocuments.length === 0 ? (
        <Card>
          <EmptyState>
            <EmptyIcon>📄</EmptyIcon>
            <EmptyTitle>No documents found</EmptyTitle>
            <EmptyDescription>
              {searchTerm || filterType !== 'all' 
                ? 'Try adjusting your search or filter criteria.'
                : 'Get started by creating your first document.'
              }
            </EmptyDescription>
            <Button variant="primary">
              <FiPlus />
              Create Document
            </Button>
          </EmptyState>
        </Card>
      ) : (
        <DocumentsGrid>
          {filteredDocuments.map((doc, index) => (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <DocumentCard>
                <DocumentHeader>
                  <DocumentTitle>{doc.title}</DocumentTitle>
                  <DocumentType>{doc.type}</DocumentType>
                </DocumentHeader>
                
                <DocumentContent>
                  <DocumentDescription>{doc.description}</DocumentDescription>
                  
                  <DocumentMeta>
                    <span>Created: {formatDate(doc.createdAt)}</span>
                    <span>{doc.size}</span>
                  </DocumentMeta>
                  
                  <DocumentMeta>
                    <span>By: {doc.author}</span>
                    <span>Updated: {formatDate(doc.updatedAt)}</span>
                  </DocumentMeta>
                </DocumentContent>
                
                <DocumentActions>
                  <ActionButton onClick={() => handleViewDocument(doc.id)} title="View">
                    <FiEye />
                  </ActionButton>
                  <ActionButton onClick={() => handleEditDocument(doc.id)} title="Edit">
                    <FiEdit2 />
                  </ActionButton>
                  <ActionButton 
                    onClick={() => handleDeleteDocument(doc.id)} 
                    title="Delete"
                    className="danger"
                  >
                    <FiTrash2 />
                  </ActionButton>
                </DocumentActions>
              </DocumentCard>
            </motion.div>
          ))}
        </DocumentsGrid>
      )}
    </DocumentsContainer>
  );
};
