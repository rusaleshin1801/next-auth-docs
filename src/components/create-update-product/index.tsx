"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import { useRouter, useParams } from "next/navigation";
import { Typography, CircularProgress } from "@mui/material";
import { Button, Input } from "@/ui";
import { useAppSelector, useAppDispatch } from "@/hooks";
import {
  Products,
  setSelectedProduct,
  clearSelectedProduct,
  createProduct,
  updateProduct,
  uploadProductImage,
  fetchProductById,
} from "@/store/slices/productSlice";
import DeleteIcon from "@mui/icons-material/Delete";

import {
  Container,
  DropzoneContainer,
  ImagePreviewContainer,
  ImagePreview,
  FormContainer,
  Title,
  SubmitButton,
} from "./styles";

export function CreateUpdateProduct() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const productId = id ? Number(id) : null;
  const product = useAppSelector((state) => state.products.selectedProduct);
  const loading = useAppSelector((state) => state.products.loading);

  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    setError,
    formState: { errors },
  } = useForm<Products>({
    defaultValues: {
      name: "",
      description: "",
      price: "",
      discountPrice: "",
      sku: "",
      imageUrl: "",
    },
  });

  useEffect(() => {
    if (productId !== null) {
      dispatch(fetchProductById(productId))
        .unwrap()
        .then((product) => dispatch(setSelectedProduct(product)))
        .catch(console.error);
    } else {
      dispatch(clearSelectedProduct());
      reset();
      setPreviewUrl(null);
      setFile(null);
    }
  }, [productId, dispatch, reset]);

  useEffect(() => {
    if (product) {
      Object.entries(product).forEach(([key, value]) =>
        setValue(key as keyof Products, value)
      );
      setPreviewUrl(
        product.imageUrl
          ? `${process.env.NEXT_PUBLIC_API_URL}${product.imageUrl}`
          : null
      );
    } else {
      reset();
      setPreviewUrl(null);
      setFile(null);
    }
  }, [product, setValue, reset]);

  const onDrop = (acceptedFiles: File[]) => {
    const uploadedFile = acceptedFiles[0];
    if (!uploadedFile) return;

    setFile(uploadedFile);
    const fileUrl = URL.createObjectURL(uploadedFile);
    setPreviewUrl(fileUrl);
    setValue("imageUrl", fileUrl);
  };

  const removeImage = () => {
    setFile(null);
    setPreviewUrl(null);
    setValue("imageUrl", "");
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
  });

  const onSubmit = async (data: Products) => {
    if (!data.name || !data.sku) return;

    try {
      if (productId !== null && !isNaN(productId)) {
        await dispatch(updateProduct({ ...data, id: productId })).unwrap();
        if (file)
          await dispatch(uploadProductImage({ id: productId, file })).unwrap();
      } else {
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) =>
          formData.append(key, value as string)
        );
        if (file) formData.append("file", file);
        await dispatch(createProduct(formData)).unwrap();
      }

      dispatch(clearSelectedProduct());
      reset();
      router.push("/products");
    } catch (error: unknown) {
      if (typeof error === "object" && error !== null && "errors" in error) {
        const errorObj = error as { errors: Record<string, string> };

        Object.entries(errorObj.errors).forEach(([field, message]) => {
          setError(field as keyof Products, {
            type: "server",
            message: message,
          });
        });
      }
    }
  };

  if (loading) {
    return <CircularProgress sx={{ display: "block", margin: "auto" }} />;
  }

  return (
    <Container>
      <Title>{productId ? "Редактировать продукт" : "Добавить продукт"}</Title>

      <form onSubmit={handleSubmit(onSubmit)}>
        <FormContainer>
          {[
            {
              label: "Название продукта",
              name: "name",
              required: "Название обязательно",
            },
            { label: "Описание продукта", name: "description" },
            { label: "Стоимость", name: "price" },
            { label: "Стоимость со скидкой", name: "discountPrice" },
            { label: "Артикул", name: "sku", required: "Артикул обязателен" },
          ].map(({ label, name, required }) => (
            <Input
              key={name}
              label={label}
              placeholder={`Введите ${label.toLowerCase()}...`}
              fullWidth
              {...register(
                name as keyof Products,
                required ? { required } : {}
              )}
              error={!!errors[name as keyof Products]}
              errorMessage={errors[name as keyof Products]?.message}
            />
          ))}

          {previewUrl ? (
            <ImagePreviewContainer>
              <ImagePreview src={previewUrl} alt="Загруженное изображение" />
              <div onClick={removeImage} style={{ cursor: "pointer" }}>
                <DeleteIcon fontSize="large" />
              </div>
            </ImagePreviewContainer>
          ) : (
            <DropzoneContainer {...getRootProps()}>
              <input {...getInputProps()} />
              <Typography>
                {isDragActive
                  ? "Отпустите файл для загрузки..."
                  : "Перетащите изображение сюда или кликните для выбора файла"}
              </Typography>
            </DropzoneContainer>
          )}
        </FormContainer>

        <SubmitButton>
          <Button
            type="submit"
            label={productId ? "Сохранить изменения" : "Добавить продукт"}
            color="customColor"
            fullWidth
          />
        </SubmitButton>
      </form>
    </Container>
  );
}
