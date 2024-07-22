import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../components/ui/form";
import { toast } from "../components/ui/use-toast";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

// Define or import the getApiURL function
const getApiURL = () => "https://api.example.com"; // Replace with your actual API URL

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const signupSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  username: z.string().min(4, "Username must be at least 4 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;
type SignupFormValues = z.infer<typeof signupSchema>;

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const methods = useForm<LoginFormValues>({
    resolver: zodResolver(isLogin ? loginSchema : signupSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    setLoading(true);
    try {
      const endpoint = isLogin ? "/admin/auth/login" : "/admin/auth/signup";
      const response = await axios.post(`${getApiURL()}${endpoint}`, data);
      const { token } = response.data;

      Cookies.set("token", token);

      navigate("/");
    } catch (error) {
      toast({
        title: "Authentication Error",
        description: "Failed to authenticate. Please check your credentials and try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const checkTokenAndRedirect = () => {
    const token = Cookies.get("token");
    if (token) {
      navigate("/");
    }
  };

  useEffect(() => {
    checkTokenAndRedirect();
  }, []);

  return (
    <div className="h-screen m-auto w-[300px] flex flex-col items-center justify-around">
      <div className="flex flex-col items-center w-full gap-5">
        <h1 className="font-bold text-5xl">
          {isLogin ? "Sign In" : "Sign Up"}
        </h1>
        <FormProvider {...methods}>
          <Form onSubmit={methods.handleSubmit(onSubmit)} className="w-full space-y-6">
            <FormField
              name="email"
              render={(field) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Email" />
                  </FormControl>
                  <FormMessage>
                    {methods.formState.errors.email?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
            <FormField
              name="password"
              render={(field) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} placeholder="Password" />
                  </FormControl>
                  <FormMessage>
                    {methods.formState.errors.password?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full h-[40px] bg-[#04A775] hover:bg-[#016B4B]"
              disabled={loading}
            >
              {loading ? (
                <div className="spinner-border animate-spin inline-block w-4 h-4 border-4 rounded-full border-t-transparent border-white"></div>
              ) : isLogin ? (
                "Continue"
              ) : (
                "Sign Up"
              )}
            </Button>
          </Form>
        </FormProvider>
        <div className="flex-row flex items-center"></div>
        <hr className="border-t w-full" />
      </div>
    </div>
  );
}
