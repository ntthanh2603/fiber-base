import { GenderType } from "@/lib/enum";
import instance from "./axios.customize";

export const registerUser = async (formData: {
  email: string;
  password: string;
  username: string;
  bio: string;
  website: string;
  age: number;
  gender: GenderType;
  address: string;
}) => {
  try {
    const response = await instance.post("/auth/register", formData);
    // console.log(response.data);

    return response;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Đăng ký thất bại");
  }
};
