import instance from "./axios.customize";

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await instance.post("/auth/login", { email, password });
    return response.data; // Trả về dữ liệu từ API
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Đăng nhập thất bại");
  }
};
