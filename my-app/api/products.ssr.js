import { API_ENDPOINTS } from "./client/endpoints";
import { HttpClient } from "./client/http-client";
export const getServerSideProps = async () => {
    const data = await HttpClient.get(`${API_ENDPOINTS.PRODUCTS}`);
    return {
        props: {
            data,
        },
    }
}
