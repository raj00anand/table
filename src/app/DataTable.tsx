'use client'

import { Box, Table, Thead, Tbody, Tr, Th, Td, Input, useColorModeValue, Flex, Button, Text, Center } from '@chakra-ui/react';
import { useState, useEffect, CSSProperties } from 'react';

type DataTableProps = {
  headers: string[];
  captions: string;
  rows: (string | JSX.Element[] | number)[][];
  pagination: boolean;
};

const DataTable: React.FC<DataTableProps> = ({ headers, rows, captions, pagination }) => {
  const [searchValue, setSearchValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  
  const [sortConfig, setSortConfig] = useState<{ key: number; direction: 'ascending' | 'descending' }>({
    key: -1,
    direction: 'ascending',
  });

  const pageSize = 10;

  useEffect(() => {
    setSearchValue('');
    setCurrentPage(1);
    setSortConfig({ key: -1, direction: 'ascending' });
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    setCurrentPage(1);
  };

  const handleSort = (key: number) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const filteredRows = rows.filter((row) =>
    row.some((cell) => String(cell).toLowerCase().includes(searchValue.toLowerCase()))
  );

  const sortedRows = [...filteredRows].sort((a, b) => {
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];
    if (aValue < bValue) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  const totalRows = sortedRows.length;
  const totalPages = Math.ceil(totalRows / pageSize);
  pagination = totalPages > 1;

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const visibleRows = sortedRows.slice(startIndex, endIndex);

  const rowColors = useColorModeValue(['white', 'white'], ['gray.700', 'gray.800']);

  return (
    <Box
      bgGradient="linear(to-r, teal.500, cyan.500)"
      minH="100vh"
      p={4}
      borderRadius="md"
      boxShadow="xl"
    >
      <Center>
        <Text
          mt={4}
          fontSize={50}
          color="white"
          fontWeight="bold"
          textShadow="2px 2px 4px rgba(0, 0, 0, 0.3)"
          animation="pulse 2s infinite"
          _hover={{ animation: 'none' }}
        >
          {captions}
        </Text>
      </Center>
      <Flex justify="center" mb={4} mt={6}>
        <Input
          placeholder="Search..."
          value={searchValue}
          onChange={handleSearchChange}
          w="500px"
          sx={{
            '::placeholder': { color: 'white' },
            '::before': { border: 'none' },
            '::after': { border: 'none' },
          }}
        />
      </Flex>

      <Table
        variant="striped"
        colorScheme="gray"
        size="sm"
        borderRadius={5}
      >
        <Thead>
          <Tr>
            {headers.map((header, index) => (
              <Th
                key={index}
                bg="white"
                p={2}
                textAlign="center"
                h="50px"
                onClick={() => handleSort(index)}
                cursor="pointer"
              >
                {header}
                {sortConfig.key === index && (
                  <span>{sortConfig.direction === 'ascending' ? ' ▲' : ' ▼'}</span>
                )}
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {visibleRows.map((row, rowIndex) => (
            <Tr
              key={rowIndex}
              bg={rowColors[rowIndex % rowColors.length]}
              boxShadow="rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px"
              borderRadius={5}
            >
              {row.map((cell, cellIndex) => {
                const isStatusColumn = headers[cellIndex] === 'Status';
                const isSelect = headers[cellIndex] === 'Select';
                const isCompleted = isStatusColumn && cell === 'Paid';
                const isWaiting = isStatusColumn && cell === 'Waiting';
                const isFailed = isStatusColumn && cell === 'Failed';

                let style: CSSProperties = {};
                if (isCompleted) {
                  style.background = '#9ff1da';
                  style.color = '#1A5D1A';
                  style.borderRadius = '20px';
                  style.padding = '2px 10px';
                  style.fontWeight = '500';
                } else if (isWaiting) {
                  style.background = '#FFE569';
                  style.color = '#bd6303';
                  style.borderRadius = '20px';
                  style.padding = '2px 10px';
                  style.fontWeight = '500';
                } else if (isFailed) {
                  style.background = '#f18f8f';
                  style.color = '#B70404';
                  style.borderRadius = '20px';
                  style.padding = '2px 10px';
                  style.fontWeight = '500';
                } else if (isSelect) {
                  style.background = '#DDE6ED';
                  style.color = '#34495a';
                  style.borderRadius = '5px';
                  style.padding = '2px 10px';
                  style.fontWeight = '500';
                } else {
                  style.background = 'transparent';
                  style.color = 'black';
                  style.borderRadius = '20px';
                  style.padding = '2px 10px';
                  style.fontWeight = '500';
                }

                return (
                  <Td
                    key={cellIndex}
                    p={2}
                    textAlign="center"
                    whiteSpace="nowrap"
                    overflow="hidden"
                    textOverflow="ellipsis"
                    h="50px"
                  >
                    <span style={style}>{cell}</span>
                  </Td>
                );
              })}
            </Tr>
          ))}
        </Tbody>
      </Table>

      {pagination && totalPages > 1 && (
        <Flex justify="center" mt={4}>
          {currentPage !== 1 && (
            <Button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              mr={2}
              colorScheme="blue"
              size="sm"
            >
              Previous
            </Button>
          )}
          {currentPage !== totalPages && (
            <Button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              ml={2}
              colorScheme="blue"
              size="sm"
            >
              Next
            </Button>
          )}
        </Flex>
      )}
    </Box>
  );
};

export default DataTable;


