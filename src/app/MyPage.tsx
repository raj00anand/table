'use client'
import DataTable from './DataTable';
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import data from './data'

const MyPage: React.FC = () => {
  const headers = ['Timestamp', 'Purchase Id', 'Mail', 'Name', 'Source', 'Status', 'Select'];
  // const rows = [
  //   ['2023-07-01', '123', 'example@mail.com', 'John Doe', 'Web', 'Paid', 'Select'],
  //   ['2023-07-02', '456', 'another@mail.com', 'Jane Smith', 'Mobile', 'Waiting', 'Select'],
  //   ['2023-07-02', '456', 'another@mail.com', 'Jane Smith', 'Mobile', 'Failed', 'Select'],
  //   ['2023-07-02', '456', 'another@mail.com', 'Jane Smith', 'Mobile', 'Failed', 'Select'],
    
  //   // Add more rows as needed
  // ];

  const theme = extendTheme({
    colors: {
      custom: {
        rowColor: "gray.100",
        alternatingRowColor: "white",
      },
    },
  });

  return (
    <div>
      <ChakraProvider theme={theme}>
        <DataTable headers={headers} rows={data} pagination={false}/>
      </ChakraProvider>
      
      
    </div>
  );
};

export default MyPage;
