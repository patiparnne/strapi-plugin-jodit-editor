import React, { useState, useEffect } from 'react';
import {
  Modal,
  Button,
  Box,
  Typography,
  Loader,
  Flex,
  Searchbar
} from '@strapi/design-system';
import { useFetchClient } from '@strapi/strapi/admin';
import styled from 'styled-components';

const MediaItem = styled.div<{ isSelected: boolean }>`
  position: relative;
  cursor: pointer;
  border: 2px solid ${props => props.isSelected ? '#4945ff' : 'transparent'};
  border-radius: 4px;
  overflow: hidden;
  transition: all 0.2s ease;

  &:hover {
    border-color: #4945ff;
    transform: scale(1.02);
  }
`;

const MediaPreview = styled.div`
  width: 100%;
  height: 120px;
  background: #f6f6f9;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const MediaInfo = styled.div`
  padding: 8px;
  background: white;
  font-size: 12px;
  color: #666;
  text-align: center;
  border-top: 1px solid #eee;
`;

const CheckboxOverlay = styled.div<{ isSelected: boolean }>`
  position: absolute;
  top: 8px;
  right: 8px;
  width: 20px;
  height: 20px;
  border-radius: 3px;
  background: ${props => props.isSelected ? '#4945ff' : 'rgba(255,255,255,0.8)'};
  border: 2px solid ${props => props.isSelected ? '#4945ff' : '#ddd'};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 12px;
`;

interface MediaFile {
  id: number;
  name: string;
  alternativeText?: string;
  url: string;
  mime: string;
  size: number;
  width?: number;
  height?: number;
  formats?: any;
  createdAt: string;
  updatedAt: string;
}

interface MediaLibraryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAssets: (assets: MediaFile[]) => void;
  multiple?: boolean;
}

const MediaLibraryModal: React.FC<MediaLibraryModalProps> = ({
  isOpen,
  onClose,
  onSelectAssets,
  multiple = true
}) => {
  const { get } = useFetchClient();
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<MediaFile[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const pageSize = 20;

  // Fetch media files
  const fetchFiles = async (searchTerm = '', currentPage = 1) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        'pagination[page]': currentPage.toString(),
        'pagination[pageSize]': pageSize.toString(),
        'sort': 'createdAt:desc'
      });

      if (searchTerm) {
        params.append('filters[name][$containsi]', searchTerm);
      }

      const response = await get(`/upload/files?${params.toString()}`);
      
      if (response.data) {
        setFiles(response.data.results || []);
        setPageCount(response.data.pagination?.pageCount || 0);
      }
    } catch (error) {
      console.error('Error fetching media files:', error);
      setFiles([]);
    } finally {
      setLoading(false);
    }
  };

  // Effect to fetch files when modal opens or search changes
  useEffect(() => {
    if (isOpen) {
      fetchFiles(searchQuery, page);
    }
  }, [isOpen, searchQuery, page]);

  // Effect to reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setSelectedFiles([]);
      setSearchQuery('');
      setPage(1);
    }
  }, [isOpen]);

  const handleFileSelect = (file: MediaFile) => {
    if (multiple) {
      setSelectedFiles(prev => {
        const isSelected = prev.find(f => f.id === file.id);
        if (isSelected) {
          return prev.filter(f => f.id !== file.id);
        } else {
          return [...prev, file];
        }
      });
    } else {
      setSelectedFiles([file]);
    }
  };

  const handleConfirm = () => {
    onSelectAssets(selectedFiles);
    onClose();
  };

  const renderMediaPreview = (file: MediaFile) => {
    const { mime, url, name } = file;
    
    if (mime.startsWith('image/')) {
      return <img src={url} alt={name} />;
    } else if (mime.startsWith('video/')) {
      return <video src={url} muted />;
    } else if (mime.startsWith('audio/')) {
      return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <div style={{ fontSize: '24px', marginBottom: '8px' }}>🎵</div>
          <div style={{ fontSize: '12px' }}>Audio File</div>
        </div>
      );
    } else {
      return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <div style={{ fontSize: '24px', marginBottom: '8px' }}>📁</div>
          <div style={{ fontSize: '12px' }}>File</div>
        </div>
      );
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <Modal.Root open={isOpen} onOpenChange={onClose}>
      <Modal.Content>
        <Modal.Header>
          <Typography fontWeight="bold" textColor="neutral800" as="h2">
            Media Library
          </Typography>
        </Modal.Header>
        
        <Modal.Body>
          <Box paddingBottom={4}>
            <Searchbar
              placeholder="Search files..."
              value={searchQuery}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
              onClear={() => setSearchQuery('')}
            />
          </Box>

          {loading ? (
            <Flex justifyContent="center" padding={8}>
              <Loader />
            </Flex>
          ) : (
            <>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', 
                gap: '16px',
                maxHeight: '400px',
                overflowY: 'auto'
              }}>
                {files.map((file) => {
                  const isSelected = selectedFiles.find(f => f.id === file.id);
                  return (
                    <div key={file.id}>
                      <MediaItem
                        isSelected={!!isSelected}
                        onClick={() => handleFileSelect(file)}
                      >
                        <MediaPreview>
                          {renderMediaPreview(file)}
                        </MediaPreview>
                        
                        <CheckboxOverlay isSelected={!!isSelected}>
                          {isSelected ? '✓' : ''}
                        </CheckboxOverlay>
                        
                        <MediaInfo>
                          <div style={{ fontWeight: 'bold', marginBottom: '4px', wordBreak: 'break-word' }}>
                            {file.name}
                          </div>
                          <div>{formatFileSize(file.size)}</div>
                          {file.width && file.height && (
                            <div>{file.width} × {file.height}</div>
                          )}
                        </MediaInfo>
                      </MediaItem>
                    </div>
                  );
                })}
              </div>

              {pageCount > 1 && (
                <Box paddingTop={4}>
                  <Flex justifyContent="center" gap={2}>
                    <Button
                      variant="secondary"
                      onClick={() => setPage(page - 1)}
                      disabled={page <= 1}
                      size="S"
                    >
                      Previous
                    </Button>
                    
                    <Typography variant="sigma" textColor="neutral600" style={{ alignSelf: 'center', padding: '0 16px' }}>
                      Page {page} of {pageCount}
                    </Typography>
                    
                    <Button
                      variant="secondary"
                      onClick={() => setPage(page + 1)}
                      disabled={page >= pageCount}
                      size="S"
                    >
                      Next
                    </Button>
                  </Flex>
                </Box>
              )}

              {files.length === 0 && !loading && (
                <Box padding={8} textAlign="center">
                  <Typography variant="omega" textColor="neutral600">
                    No files found
                  </Typography>
                </Box>
              )}
            </>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="tertiary" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleConfirm}
            disabled={selectedFiles.length === 0}
          >
            Select {selectedFiles.length > 0 ? `(${selectedFiles.length})` : ''}
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal.Root>
  );
};

export default MediaLibraryModal;
