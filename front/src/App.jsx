import useRouter from "@/lib/hooks/useRouter";
import NotFound from "@/routes/NotFound";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export default function App() {
  const routes = useRouter();

  return (
    <BrowserRouter>
          <Routes>
            {routes.map(({ path, component: Component }) => (
              <Route key={path} path={path} element={<Component />} />
            ))}
            <Route path="*" element={<NotFound />} />
          </Routes>
    </BrowserRouter>
  );
}