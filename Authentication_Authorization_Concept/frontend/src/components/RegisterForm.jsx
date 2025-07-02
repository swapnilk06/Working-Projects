import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";

const registerSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(6),
  role: z.enum(["admin", "manager", "user"]),
});

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(registerSchema) });

  const onSubmit = async (data) => {
    try {
      const res = await axios.post("/api/auth/register", data);
      alert(res.data.message);
    } catch (err) {
      alert("Register failed");
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

      <select {...register("role")} className="w-full p-2 border rounded">
        <option value="admin">Admin</option>
        <option value="manager">Manager</option>
        <option value="user">User</option>
      </select>
      <p className="text-red-500 text-sm">{errors.role?.message}</p>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
      >
        Register
      </button>
    </form>
  );
}
