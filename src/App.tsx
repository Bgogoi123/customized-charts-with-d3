import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { QueryClient, QueryClientProvider } from "react-query";
import Charts from "./pages/Charts";

function App() {
  const queryClient = new QueryClient();

  const apolloClient = new ApolloClient({
    uri: "http://127.0.0.1:5174/",
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={apolloClient}>
      <QueryClientProvider client={queryClient}>
        <Charts />
      </QueryClientProvider>
    </ApolloProvider>
  );
}

export default App;
