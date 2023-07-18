'use client'
import DataTable from './DataTable';
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import data from './data'

const MyPage: React.FC = () => {
  const headers = ['Timestamp', 'Purchase Id', 'Mail', 'Name', 'Source', 'Status', 'Select'];
  

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
        <DataTable headers={headers} rows={data} captions={"Bookings"} pagination={false}/>
      </ChakraProvider>
      
      
    </div>
  );
};

export default MyPage;
