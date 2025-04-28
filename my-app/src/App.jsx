import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { FormProvider } from "./pages/FormContext";

function App() {
  return (
    <FormProvider>
      <div>
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </FormProvider>
  );
}

export default App;