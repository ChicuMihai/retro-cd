import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import { Controller, useForm } from "react-hook-form";
import { styled, TextField } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import {
  addProduct,
  closeProductForm,
  editProductDetails
} from "./store/actions";
import { useDispatch } from "react-redux";
import FileUpload from "../../components/common/FileUpload";

const ProductForm = ({ isOpen, product, isEdit }) => {
  const InputField = styled(TextField)({ paddingBottom: 20 });
  const dispatch = useDispatch();
  const [state, setState] = useState({
    images: product.images ?? [],
    isUploading: false
  });
  const [fileError, setFileError] = useState(false);
  const { images } = state;
  const handleClose = () => {
    dispatch(closeProductForm());
  };
  const { handleSubmit, control, errors } = useForm({
    defaultValues: {
      prodName: product.name ?? "",
      prodPrice: product.price ?? "",
      prodDescription: product.description ?? "",
      prodLaunchDate: product.launchDate ?? "",
      prodPurchaseDate: product.purchaseDate ?? ""
    }
  });
  const onSubmit = data => {
    if (images.length <= 0) {
      setFileError(true);
      return;
    } else setFileError(false);
    isEdit
      ? dispatch(editProductDetails({ ...data, productId: product.id, images }))
      : dispatch(addProduct({ ...data, images }));
  };

  return (
    <Dialog open={isOpen}>
      <Box minWidth="300px" px="50px" py="30px">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            label="Nume Produs"
            fullWidth
            name="prodName"
            rules={{ required: "Introduceti nume produs" }}
            helperText={errors?.prodName?.message}
            error={!!errors?.prodName}
            as={InputField}
            control={control}
          />
          <Controller
            as={InputField}
            name="prodLaunchDate"
            label="Data Lansarii"
            type="date"
            fullWidth
            rules={{ required: "Adaugati Data Originii" }}
            helperText={errors?.prodLaunchDate?.message}
            error={!!errors.prodLaunchDate}
            control={control}
            InputLabelProps={{
              shrink: true
            }}
          />
          <Controller
            as={InputField}
            name="prodPurchaseDate"
            label="Data Achizitionarii"
            type="date"
            fullWidth
            rules={{ required: "Adaugati Data Achizitionari" }}
            helperText={errors?.prodPurchaseDate?.message}
            error={!!errors.prodPurchaseDate}
            control={control}
            InputLabelProps={{
              shrink: true
            }}
          />
          <Controller
            as={InputField}
            name="prodPrice"
            label="Pret Produs"
            type="number"
            fullWidth
            rules={{ required: "Introduceti pret produs" }}
            helperText={errors?.prodPrice?.message}
            error={!!errors.prodPrice}
            control={control}
          />
          <Controller
            as={InputField}
            name="prodDescription"
            label="Descriere Produs"
            rules={{ required: "Introduceti descriere produs" }}
            helperText={errors?.prodDescription?.message}
            multiline
            error={!!errors.prodDescription}
            fullWidth
            control={control}
          />
          <Box>
            <FileUpload setState={setState} error={fileError} images={images} />
          </Box>
          <Box>
            <Button type="submit" variant="contained" color="primary">
              Salveaza
            </Button>
            <Button type="button" variant="text" onClick={handleClose}>
              Anuleaza
            </Button>
          </Box>
        </form>
      </Box>
    </Dialog>
  );
};

export default ProductForm;
