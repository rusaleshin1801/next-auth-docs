"use client";

import { useEffect } from "react";
import {
  Table,
  TableBody,
  TablePagination,
  CircularProgress,
  TableRow,
  TableCell,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/hooks";
import { fetchProducts, setPagination } from "@/store/slices/productSlice";
import { StyledBox, StyledPaper, StyledTableContainer } from "./styles";
import { ProductTableHeader } from "./components/ProductTableHeader";
import { ProductTableRow } from "./components/ProductTableRow";
import { ProductTableControls } from "./components/ProductTableControls";

export function ProductTable() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { products, loading, error, page, limit, sort, order, totalCount } =
    useAppSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts({ page, limit, sort, order }));
  }, [dispatch, page, limit, sort, order]);

  if (loading || error) {
    return (
      <StyledBox>
        <StyledPaper>
          <Typography
            align="center"
            sx={{ p: 2, color: error ? "error.main" : "text.primary" }}
          >
            {loading ? <CircularProgress /> : `Ошибка загрузки: ${error}`}
          </Typography>
        </StyledPaper>
      </StyledBox>
    );
  }

  return (
    <StyledBox>
      <StyledPaper>
        <ProductTableControls />

        <StyledTableContainer>
          <Table>
            <ProductTableHeader />
            <TableBody>
              {products.length > 0 ? (
                products.map((product) => (
                  <ProductTableRow
                    key={product.id}
                    product={product}
                    onClick={() =>
                      router.push(`/products/${product.id}/update`)
                    }
                  />
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 2 }}>
                    <span style={{ fontSize: "16px" }}>
                      Список товаров пуст
                    </span>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </StyledTableContainer>

        <TablePagination
          component="div"
          count={totalCount}
          page={page - 1}
          rowsPerPage={limit}
          onPageChange={(_, newPage) =>
            dispatch(setPagination({ page: newPage + 1, limit }))
          }
          onRowsPerPageChange={(e) =>
            dispatch(setPagination({ page: 1, limit: +e.target.value }))
          }
          labelRowsPerPage="Строк на странице:"
          labelDisplayedRows={({ from, to, count }) =>
            `${from}–${to} из ${count !== -1 ? count : `более ${to}`}`
          }
        />
      </StyledPaper>
    </StyledBox>
  );
}
