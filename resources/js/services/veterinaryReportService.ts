import axios from "axios";

export const submitVeterinaryReport = async (data: any) => {
    try {
        const response = await axios.post("/veterinary-disease-report/store", data);
        return response.data;
    } catch (error: any) {
        console.error("Veterinary report submission error:", error);
        throw error.response?.data || error;
    }
};

// ⭐ NEW FUNCTION for editing
export const updateVeterinaryReport = async (id: number, data: any) => {
  try {
    // 🔥 Must NOT include /edit
    const response = await axios.put(`/veterinary-disease-report/update/${id}`, data);
    return response.data;
  } catch (error: any) {
    console.error("Veterinary report update error:", error);
    throw error.response?.data || error;
  }
};


