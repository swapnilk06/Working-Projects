import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";

const loginSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(6),
});

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data) => {
    try {
      const res = await axios.post("/api/auth/login", data);
      alert("Login success! Token: " + res.data.token);
      localStorage.setItem("token", res.data.token);
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input
        {...register("username")}
        placeholder="Username"
        className="w-full p-2 border rounded"
      />
      <p className="text-red-500 text-sm">{errors.username?.message}</p>

      <input
        {...register("password")}
        type="password"
        placeholder="Password"
        className="w-full p-2 border rounded"
      />
      <p className="text-red-500 text-sm">{errors.password?.message}</p>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
      >
        Login
      </button>
    </form>
  );
}
