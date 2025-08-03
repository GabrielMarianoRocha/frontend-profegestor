'use client'
import * as React from 'react';
import { useState } from 'react';
import { 
  Box, 
  Stack, 
  Button, 
  Typography, 
  Modal
} from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { styled } from '@mui/material/styles';
import Sidebar from '../components/Sidebar';

const PageContainer = styled('div')({
  display: 'flex',
  minHeight: '100vh',
  width: '100%',
  overflow: 'hidden'
});

const MainContent = styled('main')(({ theme }) => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  padding: theme.spacing(3),
  marginLeft: 0,
  minHeight: '100vh',
  overflow: 'auto',
  backgroundColor: theme.palette.grey[50],
}));

const DataGridWrapper = styled(Box)({
  flex: 1,
  minHeight: 0, // Crucial para o flexbox funcionar corretamente
  width: '100%',
  position: 'relative'
});

// Container interno do DataGrid
const DataGridContainer = styled(Box)(({ theme }) => ({
  height: '100%',
  width: '100%',
  backgroundColor: theme.palette.common.white,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[1],
  '& .MuiDataGrid-root': {
    border: 'none',
    minHeight: '300px' // Altura mínima garantida
  },
  '& .MuiDataGrid-virtualScroller': {
    overflowY: 'auto'
  }
}));

export default function Dashboard() {
  const [rows] = React.useState([
    { id: 1, name: 'Jon Snow', email: 'jon@snow.com', phone: '(11) 9999-9999' },
    // ... outros dados
  ]);

  const [columns] = React.useState<GridColDef[]>([
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Nome', width: 180 },
    { field: 'email', headerName: 'E-mail', width: 220 },
    { field: 'phone', headerName: 'Telefone', width: 150 },
  ]);

  return (
    <PageContainer>
      <Sidebar />
      
      <MainContent>
        {/* Header */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          mb: 3,
          p: 2,
          backgroundColor: 'white',
          borderRadius: 1,
          boxShadow: 1
        }}>
          <Typography variant="h6" fontWeight="bold">
            Meus Alunos
          </Typography>
          <Button variant="contained" color="primary">
            Novo Aluno
          </Button>
        </Box>

        {/* DataGrid */}
        <DataGridWrapper>
          <DataGridContainer>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSizeOptions={[5, 10, 25]}
              initialState={{
                pagination: {
                  paginationModel: { pageSize: 10 },
                },
              }}
              sx={{
                '& .MuiDataGrid-cell:focus': {
                  outline: 'none',
                },
                '& .MuiDataGrid-columnHeader:focus': {
                  outline: 'none',
                },
              }}
            />
          </DataGridContainer>
        </DataGridWrapper>
      </MainContent>
    </PageContainer>
  );
}