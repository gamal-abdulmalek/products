import { useState } from "react";
import * as XLSX from "xlsx";
import {
    Modal,Box,Button,Typography
  } from "@mui/material";
import { HttpClient } from "@/api/client/http-client";

export default function CategoryModal({open, handleClose}) {
  const [categories, setCategories] = useState([]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });

      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      const structuredData = processCategories(jsonData);
      setCategories(structuredData);

      uploadToBackend(structuredData);
    };

    reader.readAsArrayBuffer(file);
  };

  const processCategories = (data) => {
    const structuredData = [];

    data.forEach((row) => {
      const mainCategory = row[0];
      const subCategory = row[2];
      const childCategory = row[4];

      if (mainCategory) {
        
        let mainCat = structuredData.find((cat) => cat.name === mainCategory);
        if (!mainCat) {
          mainCat = { name: mainCategory, subcategories: [] };
          structuredData.push(mainCat);
        }

        if (subCategory) {
            
          let subCat = mainCat.subcategories.find(
            (sub) => sub.name === subCategory
          );
          if (!subCat) {
            subCat = { name: subCategory, childCategories: [] };
            mainCat.subcategories.push(subCat);
          }

          if (childCategory) {
            
            subCat.childCategories.push({ name: childCategory });
          }
        }
      }
    });

    return structuredData;
  };

  const uploadToBackend = async (structuredData) => {
    try {
      const response = await HttpClient.post("/api/categories/import", {categories: structuredData });

      if (!response.message) {
        throw new Error("Failed to upload categories");
      }

      alert("Categories uploaded successfully");
    } catch (error) {
      console.error(error);
      alert(error);
    }
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
    <Button
            variant="contained"
            component="label"
            sx={{ marginTop: 2, textTransform: "none" }}
          >
            Upload Categories
            <input type="file" hidden accept=".xlsx, .xls" onChange={handleFileUpload} />
          </Button>
          
            <Typography variant="caption" display="block" sx={{ marginTop: 1 }}>
              {JSON.stringify(categories, null, 2)}
            </Typography>
          
    </Box>
    </Modal>
  );
}