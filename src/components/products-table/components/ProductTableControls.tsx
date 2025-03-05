import { useEffect } from "react";
import { Button, Input } from "@/ui";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { useRouter } from "next/navigation";
import theme from "@/utils/theme";
import { ControlsContainer } from "../styles";
import { useAppSelector, useAppDispatch } from "@/hooks";
import { setSearch, fetchProducts } from "@/store/slices/productSlice";

export function ProductTableControls() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const search = useAppSelector((state) => state.products.search);

  useEffect(() => {
    const timeout = setTimeout(() => dispatch(fetchProducts({ search })), 500);
    return () => clearTimeout(timeout);
  }, [search, dispatch]);

  return (
    <ControlsContainer>
      <Button
        onClick={() => router.push("/products/create")}
        label="Добавить продукт"
        textColor={theme.palette.primary.main}
      />
      <Input
        startIcon={<SearchIcon />}
        endIcon={
          search && (
            <ClearIcon
              onClick={() => dispatch(setSearch(""))}
              sx={{ cursor: "pointer" }}
            />
          )
        }
        placeholder="Поиск по названию, описанию или артиклу ..."
        value={search}
        onChange={(e) => dispatch(setSearch(e.target.value))}
        fullWidth
      />
    </ControlsContainer>
  );
}
