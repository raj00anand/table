'use client'

import { Box, Table, Thead, Tbody, Tr, Th, Td, Input, useColorModeValue, Flex, Button } from '@chakra-ui/react';
import { useState, useEffect, CSSProperties } from 'react';

type DataTableProps = {
  headers: string[];
  rows: (string | JSX.Element[] | number)[][];
  pagination?: boolean;
};

const DataTable: React.FC<DataTableProps> = ({ headers, rows, pagination }) => {
  
const rowColors = useColorModeValue(['white', 'white'], ['gray.700', 'gray.800']);
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
            bg={rowColors[rowIndex % rowColors.length]}
            boxShadow="rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px"
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
      <style jsx global>{`
        .equal-width-table {
          width: 100%;
          table-layout: fixed;
        }
        .equal-width-table th,
        .equal-width-table td {
          width: calc(100% / ${headers.length});
        }
      `}</style>
    </Box>
  );
};

export default DataTable;
