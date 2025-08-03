'use client'
import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Sidebar from '../components/Sidebar';
import { styled } from '@mui/material/styles';

// Componente estilizado para o conteúdo principal
const MainContent = styled('main')(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  marginLeft: 0,
  height: '100vh',
  overflow: 'auto',
}));

const DataGridContainer = styled(Box)({
  height: 'calc(100vh - 180px)', // Ajuste esta altura conforme necessário
  width: '100%',
  '& .MuiDataGrid-root': {
    height: '100%',
  },
});

const columns: GridColDef<(typeof rows)[number]>[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'name',
    headerName: 'Nome',
    width: 150,
    editable: true,
  },
  {
    field: 'email',
    headerName: 'Email',
    width: 150,
    editable: true,
  },
  {
    field: 'phone',
    headerName: 'Telefone',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'startDate',
    headerName: 'Data de inicio',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
  },
   {
    field: 'notes',
    headerName: 'Anotações  ',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 14 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 31 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 31 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 11 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];
export default function Dashboard() {
  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <Sidebar />
      
      <MainContent>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          mb: 3 
        }}>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <Stack direction="row" spacing={2}>
            <Button variant="contained" color="primary">
              Cadastrar aluno
            </Button>
          </Stack>
        </Box>

        <DataGridContainer>
          <DataGrid
            rows={rows}
            columns={columns}
            sx={{
              '& .MuiDataGrid-cell': {
                borderRight: '1px solid rgba(224, 224, 224, 0.5)',
              },
              '& .MuiDataGrid-columnHeaders': {
                backgroundColor: '#f5f5f5',
                fontWeight: 'bold',
              },
              '& .MuiDataGrid-row:hover': {
                backgroundColor: 'rgba(25, 118, 210, 0.04)',
              }
            }}
          />
        </DataGridContainer>
      </MainContent>
    </Box>
  );
}