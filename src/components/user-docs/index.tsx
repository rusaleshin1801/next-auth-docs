"use client";

import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/hooks";
import {
  useGetUserDocsQuery,
  useDeleteUserDocMutation,
} from "@/store/slices/userDocsSlice";
import { updateSnackbar } from "@/store/slices/snackbar";
import { StyledBox, StyledPaper } from "./styles";
import { UserDocsControls } from "./components/UserDocsControls";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  IconButton,
  Tooltip,
  Skeleton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export function UserDocsTable() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { data, error, isLoading } = useGetUserDocsQuery();
  const [deleteUserDoc] = useDeleteUserDocMutation();

  const handleEdit = (id: string) => {
    router.push(`/user-docs/${id}/update`);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Вы уверены, что хотите удалить этот документ?")) return;

    const response = await deleteUserDoc(id).unwrap();

    dispatch(
      updateSnackbar({
        open: true,
        message: response.success
          ? "Документ успешно удалён."
          : "Ошибка удаления",
        severity: response.success ? "success" : "error",
      })
    );
  };

  const tableHeaders = (
    <TableHead>
      <TableRow>
        <TableCell>ID</TableCell>
        <TableCell>Дата подписи компании</TableCell>
        <TableCell>Подпись компании</TableCell>
        <TableCell>Название документа</TableCell>
        <TableCell>Статус документа</TableCell>
        <TableCell>Тип документа</TableCell>
        <TableCell>Номер сотрудника</TableCell>
        <TableCell>Дата подписи сотрудника</TableCell>
        <TableCell>Подпись сотрудника</TableCell>
        <TableCell>Действия</TableCell>
      </TableRow>
    </TableHead>
  );

  const tableRows = data?.map((doc) => (
    <TableRow key={doc.id}>
      <TableCell>{doc.id}</TableCell>
      <TableCell>
        {doc.companySigDate
          ? new Date(doc.companySigDate).toLocaleDateString()
          : "—"}
      </TableCell>
      <TableCell>{doc.companySignatureName || "—"}</TableCell>
      <TableCell>{doc.documentName}</TableCell>
      <TableCell>{doc.documentStatus}</TableCell>
      <TableCell>{doc.documentType}</TableCell>
      <TableCell>{doc.employeeNumber}</TableCell>
      <TableCell>
        {doc.employeeSigDate
          ? new Date(doc.employeeSigDate).toLocaleDateString()
          : "—"}
      </TableCell>
      <TableCell>{doc.employeeSignatureName || "—"}</TableCell>
      <TableCell>
        <Tooltip title="Редактировать" placement="top">
          <IconButton onClick={() => handleEdit(doc.id)} color="primary">
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Удалить" placement="top">
          <IconButton onClick={() => handleDelete(doc.id)} color="error">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  ));

  const skeletonRows = [...Array(5)].map((_, index) => (
    <TableRow key={index}>
      <TableCell>
        <Skeleton variant="rectangular" width={150} height={24} />
      </TableCell>
      {Array(8)
        .fill(0)
        .map((_, i) => (
          <TableCell key={i}>
            <Skeleton variant="rectangular" width={100} height={24} />
          </TableCell>
        ))}
      <TableCell>
        <Skeleton
          variant="circular"
          width={32}
          height={32}
          style={{ marginRight: 8 }}
        />
        <Skeleton variant="circular" width={32} height={32} />
      </TableCell>
    </TableRow>
  ));

  if (error)
    return (
      <Typography
        color="error"
        align="center"
        variant="h6"
        style={{ marginTop: 20 }}
      >
        Ошибка загрузки данных
      </Typography>
    );

  return (
    <StyledBox>
      <StyledPaper>
        <UserDocsControls />

        <TableContainer component={Paper} sx={{ maxHeight: 500 }}>
          <Table stickyHeader>
            {tableHeaders}
            <TableBody>{isLoading ? skeletonRows : tableRows}</TableBody>
          </Table>
        </TableContainer>
      </StyledPaper>
    </StyledBox>
  );
}
