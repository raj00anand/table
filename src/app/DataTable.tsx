'use client'

import { Box, Table, Thead, Tbody, Tr, Th, Td, Input, useColorModeValue, Flex, Button } from '@chakra-ui/react';
import { useState, useEffect, CSSProperties } from 'react';

type DataTableProps = {
  headers: string[];
  rows: (string | JSX.Element[] | number)[][];
  pagination?: boolean;
};

const DataTable: React.FC<DataTableProps> = ({ headers, rows, pagination }) => {
  

  return (
    <Box overflowX="auto">
      <Table variant="striped" colorScheme="gray" size="sm" className="equal-width-table">
        <Thead>
          <Tr>
            {headers.map((header, index) => (
              <Th
                key={index}
                bg="white"
                p={2}
                textAlign="center"
                h="50px"
                cursor="pointer"
              >
                {header}
              </Th>
            ))}
          </Tr>
        </Thead>
        
        <Tbody>
          {rows.map((row, rowIndex) => (
            <Tr
              key={rowIndex}
            >
              {row.map((cell, cellIndex) => {
                
                return (
                  <Td
                    key={cellIndex}
                    p={2}
                    
                  >
                    <span>{cell}</span>
                  </Td>
                );
              })}
            </Tr>
          ))}
        </Tbody>
      </Table>
      
    </Box>
  );
};

export default DataTable;
