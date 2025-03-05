import { TableHead, TableCell, TableSortLabel } from "@mui/material";
import { StyledTableRow } from "../styles";
import { setSorting, fetchProducts } from "@/store/slices/productSlice";
import { useAppSelector, useAppDispatch } from "@/hooks";

const columns = [
  { id: "name", label: "Название", sortable: false },
  { id: "description", label: "Описание", sortable: false },
  { id: "price", label: "Стоимость", sortable: true },
  { id: "discountPrice", label: "Стоимость со скидкой", sortable: true },
  { id: "sku", label: "Артикул", sortable: false },
  { id: "actions", label: "Действия", sortable: false },
] as const;

export function ProductTableHeader() {
  const dispatch = useAppDispatch();
  const { sort, order, page, limit } = useAppSelector(
    (state) => state.products
  );

  const handleSortChange = (property: "price" | "discountPrice") => {
    const newOrder = sort === property && order === "ASC" ? "DESC" : "ASC";

    dispatch(setSorting({ sort: property, order: newOrder }));
    dispatch(fetchProducts({ page, limit, sort: property, order: newOrder }));
  };

  return (
    <TableHead>
      <StyledTableRow>
        {columns.map(({ id, label, sortable }) => (
          <TableCell key={id}>
            {sortable ? (
              <TableSortLabel
                active={sort === id}
                direction={order.toLowerCase() as "asc" | "desc"}
                onClick={() =>
                  handleSortChange(id as "price" | "discountPrice")
                }
              >
                {label}
              </TableSortLabel>
            ) : (
              label
            )}
          </TableCell>
        ))}
      </StyledTableRow>
    </TableHead>
  );
}
