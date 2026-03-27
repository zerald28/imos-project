import axios from "axios";

const API_BASE = "http://localhost:8000/api";

export const fetchFarmersWithInsurance = async (search: string = "") => {
    const res = await axios.get(`${API_BASE}/insurance/farmers`, {
        params: { search }
    });
    return res.data.farmers;
};
