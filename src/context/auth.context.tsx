import React, { createContext } from "react";
import { useLocation, useNavigate } from "@tanstack/react-router"; // Updated import
import { getMe } from "@/queries/auth";
import { AxiosError } from "axios";

import { AuthResponse } from "@/types/auth";
import { User } from "@/types/user";
import { axiosClient } from "@/lib/client";
import Cookies from "js-cookie";

// Create an instance of Cookies
const cookies = Cookies;

interface AuthContextInterface {
  isLoggedIn: boolean | null;
  user: User | null;
  token: string | null;
  login: (phoneNumber: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextInterface>({
  isLoggedIn: false,
  user: null,
  token: null,
  login: async () => false,
  logout: () => "",
});

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = React.useState<string | null>(null);
  const [user, setUser] = React.useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = React.useState<boolean | null>(null);

  const navigate = useNavigate(); // Use tanstack-react-router navigate
  const location = useLocation(); // Use tanstack-react-router location

  React.useEffect(() => {
    if (
      location.pathname.includes("/auth") ||
      location.pathname.includes("/docs") ||
      location.pathname === "/"
    ) {
      return;
    }

    const token = cookies.get("token"); // Get the token from cookies

    if (token) {
      setToken(token);
      setIsLoggedIn(true);

      getMe(token)
        .then((res) => {
          setUser(res.data);
        })
        .catch((err: AxiosError) => {
          if (err.response?.status === 401) {
            navigate({ to: "/sign-in" }); // Use object for navigate
          }
        });
    } else {
      setIsLoggedIn(false);
      navigate({ to: "/sign-in" }); // Use object for navigate
    }
  }, [location.pathname]);

  const login = async (phoneNumber: string, password: string) => {
    const resp = await axiosClient.post<AuthResponse>("/auth/auth/login", {
      phoneNumber,
      password,
    });

    if (!resp.data) {
      return false;
    }

    cookies.set("token", resp.data.tokens.accessToken, {
      maxAge: 30 * 24 * 60 * 60, // 30 days in seconds
    });
    setToken(resp.data.tokens.accessToken);
    setUser(resp.data.user);
    setIsLoggedIn(true);
    window.location.reload(); // Simulate router refresh

    return true;
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    setIsLoggedIn(false);

    cookies.remove("token"); // Remove the token from cookies

    navigate({
      to: "/", // Use object notation for navigation
      search: { logout: "true" }, // Pass query params correctly
    });
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        user,
        token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);

export default AuthContext;
