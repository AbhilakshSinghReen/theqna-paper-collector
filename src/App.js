import { GlobalStateContextProvider } from "./context/GlobalStateContextProvider";
import LoaderMain from "./pages/LoaderMain";
import Layout from "./components/Layout";

export default function App() {
  return (
    <div>
      <GlobalStateContextProvider>
        <Layout>
          <LoaderMain />
        </Layout>
      </GlobalStateContextProvider>
    </div>
  );
}
