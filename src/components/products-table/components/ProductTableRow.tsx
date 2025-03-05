import { TableCell } from "@mui/material";
import { StyledTableRow } from "../styles";
import {
  deleteProduct,
  fetchProducts,
  Products,
} from "@/store/slices/productSlice";
import { Button } from "@/ui";
import { useAppDispatch } from "@/hooks";
import theme from "@/utils/theme";
import DeleteIcon from "@mui/icons-material/Delete";

interface Props {
  product: Products;
  onClick: () => void;
}

export function ProductTableRow({ product, onClick }: Props) {
  const dispatch = useAppDispatch();

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm(`Удалить продукт ${product.name}?`)) return;

    try {
      await dispatch(deleteProduct(product.id));
      dispatch(fetchProducts({ shouldShowLoading: false }));
    } catch (error) {
      console.error("Ошибка удаления:", error);
    }
  };

  return (
    <StyledTableRow>
      <ProductTableCell>{product.name}</ProductTableCell>
      <ProductTableCell>{product.description}</ProductTableCell>
      <ProductTableCell>{product.price}</ProductTableCell>
      <ProductTableCell>{product.discountPrice}</ProductTableCell>
      <ProductTableCell>{product.sku}</ProductTableCell>
      <TableCell sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        <Button
          onClick={onClick}
          label="Редактировать"
          textColor={theme.palette.primary.main}
        />
        <DeleteIcon onClick={handleDelete} sx={{ cursor: "pointer" }} />
      </TableCell>
    </StyledTableRow>
  );
}

function ProductTableCell({ children }: { children: React.ReactNode }) {
  return <TableCell>{children}</TableCell>;
}
