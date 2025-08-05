"use client";
import * as React from "react";
import { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Stack,
  Button,
  Typography,
  Modal,
  Divider,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { styled } from "@mui/material/styles";
import Sidebar from "../components/Sidebar";
import { getStudents, createStudent } from "@/services/api/studentApi";
import { Input } from "../ui/input";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const PageContainer = styled("div")({
  display: "flex",
  minHeight: "100vh",
  width: "100%",
  overflow: "hidden",
});

const MainContent = styled("main")(({ theme }) => ({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  padding: theme.spacing(3),
  marginLeft: 0,
  minHeight: "100vh",
  overflow: "auto",
  backgroundColor: theme.palette.grey[50],
}));

const DataGridWrapper = styled(Box)({
  flex: 1,
  minHeight: 0,
  width: "100%",
  position: "relative",
});

const DataGridContainer = styled(Box)(({ theme }) => ({
  height: "100%",
  width: "100%",
  backgroundColor: theme.palette.common.white,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[1],
  "& .MuiDataGrid-root": {
    border: "none",
    minHeight: "300px",
  },
  "& .MuiDataGrid-virtualScroller": {
    overflowY: "auto",
  },
}));

export default function Students() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    getStudents().then(setStudents).catch(console.error);
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    startDate: "",
    monthlyFee: "",
    notes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const userId = "ed9143e4-ba4d-4afe-a229-1ce9d029465e"; // Substitua pelo ID real do usuário logado

      const dataToSend = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        startDate: formData.startDate || undefined,
        monthlyFee: formData.monthlyFee ? Number(formData.monthlyFee) : undefined,
        notes: formData.notes || "",
        userId: userId,
        classes: [],
        payments: [],
        progress: [],
      };

      await createStudent(dataToSend);
      handleClose();
    } catch (error) {
      console.error("Erro ao criar aluno:", error);
    }
  };

  const [columns] = React.useState<GridColDef[]>([
    { field: "id", headerName: "ID", width: 90 },
    { field: "name", headerName: "Nome", width: 180 },
    { field: "email", headerName: "E-mail", width: 220 },
    { field: "phone", headerName: "Telefone", width: 150 },
    { field: "startDate", headerName: "Data de inicio", width: 150 },
    { field: "monthlyFee", headerName: "Valor mensal", width: 150 },
    { field: "notes", headerName: "Anotações", width: 150 },
  ]);

  return (
    <PageContainer>
      <Sidebar />
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            p: 4,
            borderRadius: 2,
            bgcolor: "background.paper",
            width: 400,
            mx: "auto",
            mt: "10%",
          }}
        >
          <Typography variant="h6" mb={2}>
            Cadastrar Aluno
          </Typography>

          <Stack spacing={2}>
            <TextField
              label="Nome"
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Telefone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Data de Início"
              name="startDate"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={formData.startDate}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Mensalidade"
              name="monthlyFee"
              type="number"
              value={formData.monthlyFee}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Anotações"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              fullWidth
              multiline
              rows={3}
            />
          </Stack>

          <Divider sx={{ my: 3 }} />

          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button onClick={handleClose} color="inherit">
              Cancelar
            </Button>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Salvar
            </Button>
          </Stack>
        </Box>
      </Modal>
      <MainContent>
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
            p: 2,
            backgroundColor: "white",
            borderRadius: 1,
            boxShadow: 1,
          }}
        >
          <Typography variant="h6" fontWeight="bold">
            Meus Alunos
          </Typography>
          <Button onClick={handleOpen} variant="contained" color="primary">
            Novo Aluno
          </Button>
        </Box>

        <DataGridWrapper>
          <DataGridContainer>
            <DataGrid
              rows={students}
              columns={columns}
              pageSizeOptions={[5, 10, 25]}
              initialState={{
                pagination: {
                  paginationModel: { pageSize: 10 },
                },
              }}
              sx={{
                "& .MuiDataGrid-cell:focus": {
                  outline: "none",
                },
                "& .MuiDataGrid-columnHeader:focus": {
                  outline: "none",
                },
              }}
            />
          </DataGridContainer>
        </DataGridWrapper>
      </MainContent>
    </PageContainer>
  );
}
