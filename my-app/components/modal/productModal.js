import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

const ProductModal = ({ open, handleClose, productData = null,categoryData, onSave }) => {
  const [productName, setProductName] = useState("");
  const [productSKU, setProductSKU] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [minQty, setMinQty] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (productData) {
      setProductName(productData.productName || "");
      setProductSKU(productData.productSKU || "");
      setDescription(productData.description || "");
      setPrice(productData.price || "");
      setCategory(productData.category || "");
      setMinQty(productData.minQty || "");
      setImage(null); 
    } else {
        
      setProductName("");
      setProductSKU("");
      setDescription("");
      setPrice("");
      setCategory("");
      setMinQty("");
      setImage(null);
    }
  }, [productData]);

  const handleImageUpload = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const product = {
      productName,
      productSKU,
      description,
      price,
      category,
      image,
      minQty,
    };

    onSave(product);

    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="product-modal-title"
      aria-describedby="product-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 500,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography
          id="product-modal-title"
          variant="h5"
          fontWeight="bold"
          sx={{ textAlign: "center", mb: 3 }}
        >
          {productData ? "Update Product" : "Add New Product"}
        </Typography>
        <form onSubmit={handleSubmit}>
          {/* Product Name */}
          <TextField
            label="Product Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />

          {/* Product SKU */}
          <TextField
            label="Product SKU"
            variant="outlined"
            fullWidth
            margin="normal"
            value={productSKU}
            onChange={(e) => setProductSKU(e.target.value)}
          />

          {/* Description */}
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            multiline
            rows={3}
            margin="normal"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          {/* Price */}
          <TextField
            label="Price"
            variant="outlined"
            type="number"
            fullWidth
            margin="normal"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          {/* Category */}
          <FormControl fullWidth margin="normal">
            <InputLabel id="category-label">Category</InputLabel>
            <Select
              labelId="category-label"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              label="Category"
            >
              <MenuItem value="1">Clothing</MenuItem>
            </Select>
          </FormControl>

          {/* minQty */}
          <TextField
            label="minQty"
            variant="outlined"
            type="number"
            fullWidth
            margin="normal"
            value={minQty}
            onChange={(e) => setMinQty(e.target.value)}
          />

          {/* Image Upload */}
          <Button
            variant="contained"
            component="label"
            sx={{ marginTop: 2, textTransform: "none" }}
          >
            Upload Image
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleImageUpload}
            />
          </Button>
          {image && (
            <Typography variant="caption" display="block" sx={{ marginTop: 1 }}>
              Selected File: {image.name}
            </Typography>
          )}

          {/* Submit */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: 3, padding: 1 }}
          >
            {productData ? "Update Product" : "Add Product"}
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default ProductModal;