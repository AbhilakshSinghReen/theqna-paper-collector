import LoaderMain from "./pages/LoaderMain";
import Layout from "./components/Layout";

export default function App() {
  return (
    <div
      style={{
        maxHeight: "500px",
      }}
    >
      <Layout>
        <LoaderMain />
      </Layout>
    </div>
  );
}
