
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

const products = [
    {
        id: "1",
        sku: "4gfrr",
        pname: "phone",
        budget: "3.9",
    },
    {
        id: "2",
        sku: "4gfrr",
        pname: "phone",
        budget: "24.5",
    },
    {
        id: "3",
        sku: "4gfrr",
        pname: "phone",
        budget: "12.8",
    },
    {
        id: "4",
        sku: "4gfrr",
        pname: "phone",
        budget: "2.4",
    },
];


const productManage = () => {
    return (

        <DashboardCard title="Products Management" action={
            <Box sx={{ display: "flex", gap: 1 }}>
                <Button
                    variant='contained'
                    color='primary'
                >
                    Add New Product
                </Button>
                <Button
                    variant='contained'
                    color='warning'
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
                        {products.map((product) => (
                            <TableRow key={product.name}>
                                <TableCell>
                                    <Typography
                                        sx={{
                                            fontSize: "15px",
                                            fontWeight: "500",
                                        }}
                                    >
                                        {product.id}
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
                                                {product.sku}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                        {product.pname}
                                    </Typography>
                                </TableCell>
                                <TableCell align="right">
                                    <Typography variant="h6">{product.budget}</Typography>
                                </TableCell>
                                <TableCell align="right">
                                    <Typography variant="h6">{product.budget}</Typography>
                                </TableCell>
                                <TableCell align="right">
                                    <Box sx={{ display: "flex", gap: 1 }}>
                                        <Button
                                            variant='contained'
                                            color='primary'
                                            size='small'
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
        </DashboardCard>
    );
};

export default productManage;
