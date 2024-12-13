import React, { useRef, useState } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  CardMedia,
  Box,
  CircularProgress,
  TextField,
} from "@mui/material";
import { useInfiniteQuery } from "react-query";
import { HttpClient } from "@/api/client/http-client";

const fetchProducts = async ({ pageParam = 1, queryKey }) => {
  const [, search] = queryKey; 
  const response = await HttpClient.get(
    `api/fetchproducts?page=${pageParam}&search=${search || ""}`
  );
  return response.data;
};

export default function ProductGrid() {
  const observerRef = useRef(null);
  const [search, setSearch] = useState("");

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    refetch,
  } = useInfiniteQuery(["products", search], fetchProducts, {
    getNextPageParam: (lastPage) => {
      if (lastPage.current_page < lastPage.last_page) {
        return lastPage.current_page + 1;
      }
      return undefined;
    },
  });

  const handleObserver = React.useCallback(
    (entries) => {
      const [entry] = entries;
      if (entry.isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage]
  );

  React.useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, { threshold: 0.5 }); 
    if (observerRef.current) observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [handleObserver]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    refetch(); 
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" align="center" gutterBottom>
        Product Grid
      </Typography>

      <Box my={4}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search by product name or category"
          value={search}
          onChange={handleSearchChange}
        />
      </Box>

      {status === "loading" && (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress />
        </Box>
      )}

      {status === "error" && (
        <Typography color="error" align="center">
          Failed to load products.
        </Typography>
      )}

      {status === "success" && (
        <Grid container spacing={3}>
          {data.pages.map((page) =>
            page.map((product) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                <Card>
                  <CardMedia
                    component="img"
                    height="200"
                    image={product.photo}
                    alt={product.name}
                  />
                  <CardContent>
                    <Typography variant="h6">{product.name}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      ${product.price}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Category: {product.category?.name || "N/A"}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      )}

      {isFetchingNextPage && (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress />
        </Box>
      )}

      <div ref={observerRef} style={{ height: "20px", visibility: "hidden" }} />
    </Container>
  );
}