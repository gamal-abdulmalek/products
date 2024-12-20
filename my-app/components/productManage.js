import { useState } from 'react';
import {
    Typography, Box,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Button
} from '@mui/material';
import DashboardCard from './ui/DashboardCard';
import ProductModal from './modal/productModal';
import CategoryModal from './modal/categoryModal';
import { addProduct, updateProduct } from '@/api/product';


const productManage = ({ data }) => {
    const { mutate: product, isLoading, serverError, setServerError } = addProduct();
    const { mutate: updatedProduct, isUpdateLoading, updateError, setUpdateError } = updateProduct();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const handleOpenModal = (product = null) => {
        setSelectedProduct(product); 
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
      };

      const handleCategoryOpenModal = (product = null) => {
        setIsCategoryModalOpen(true);
    };

    const handleCategoryCloseModal = () => {
        setIsCategoryModalOpen(false);
      };
    
      const handleSaveProduct = (productData) => {
        if (selectedProduct) {
            productData["id"] = selectedProduct.id;
            updatedProduct(productData)
          console.log("Updating product:", productData);
        } else {
            // alert("Adding product successfully");
            product(productData);  
        }
      };
    return (

        <DashboardCard title="Products Management" action={
            <Box sx={{ display: "flex", gap: 1 }}>
                <Button
                    variant='contained'
                    color='primary'
                    onClick={() => handleOpenModal()}
                >
                    Add New Product
                </Button>
                <Button
                    variant='contained'
                    color='warning'
                    onClick={()=>handleCategoryOpenModal()}
                >
                    Import From Excel
                </Button>
            </Box>
        }>
            <Box sx={{ overflow: 'auto', width: { xs: '280px', sm: 'auto' } }}>
                <Table
                    aria-label="simple table"
                    sx={{
                        whiteSpace: "nowrap",
                        mt: 2
                    }}
                >
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    No
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    SKU
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Name
                                </Typography>
                            </TableCell>
                            <TableCell align="right">
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Price
                                </Typography>
                            </TableCell>
                            <TableCell align="right">
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Min Quantity
                                </Typography>
                            </TableCell>
                            <TableCell align="right">
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Action
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((product, index) => (
                            <TableRow key={product.name}>
                                <TableCell>
                                    <Typography
                                        sx={{
                                            fontSize: "15px",
                                            fontWeight: "500",
                                        }}
                                    >
                                        {index + 1}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Box>
                                            <Typography variant="subtitle2" fontWeight={600}>
                                                {product.SKU}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                        {product.name}
                                    </Typography>
                                </TableCell>
                                <TableCell align="right">
                                    <Typography variant="h6">{product.price}</Typography>
                                </TableCell>
                                <TableCell align="right">
                                    <Typography variant="h6">{product.minQty}</Typography>
                                </TableCell>
                                <TableCell align="right">
                                    <Box sx={{ display: "flex", gap: 1 }}>
                                        <Button
                                            variant='contained'
                                            color='primary'
                                            size='small'
                                            onClick={() =>
                                                handleOpenModal({
                                                  id:product.id,
                                                  name: product.name,
                                                  SKU: product.SKU,
                                                  description: product.description,
                                                  price: product.price,
                                                  minQty: product.minQty,
                                                  category_id: product.category_id,
                                                })
                                              }
                                        >
                                            update
                                        </Button>
                                        <Button
                                            variant='contained'
                                            color='error'
                                            size='small'
                                        >
                                            delete
                                        </Button>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>
            <ProductModal
            open={isModalOpen}
            handleClose={handleCloseModal}
            productData={selectedProduct}
            categoryData={data.categories}
            onSave={handleSaveProduct}
        />

        <CategoryModal
            open={isCategoryModalOpen}
            handleClose={handleCategoryCloseModal}
        />
        </DashboardCard>
    );
};

export default productManage;
