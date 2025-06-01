import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../utils/schema";
import axios from "axios";
import { motion } from "framer-motion";

const Register = () => {
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
      alert(err.response.data.message || "Error");
    }
  };

  return (
    <motion.div
      className="p-6 max-w-md mx-auto mt-10 bg-white rounded-xl shadow-md"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2 className="text-xl font-bold mb-4">Register</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          {...register("username")}
          placeholder="Username"
          className="w-full p-2 border rounded"
        />
        <p className="text-red-500 text-sm">{errors.username?.message}</p>

        <input
          type="password"
          {...register("password")}
          placeholder="Password"
          className="w-full p-2 border rounded"
        />
        <p className="text-red-500 text-sm">{errors.password?.message}</p>

        <select {...register("role")} className="w-full p-2 border rounded">
          <option value="">Select Role</option>
          <option value="admin">Admin</option>
          <option value="manager">Manager</option>
          <option value="user">User</option>
        </select>
        <p className="text-red-500 text-sm">{errors.role?.message}</p>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
        >
          Register
        </button>
      </form>
    </motion.div>
  );
};

export default Register;
