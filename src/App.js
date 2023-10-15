import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import BoatDetails from "./pages/Boat/BoatDetails";
import Navbar from "./components/layout/Navbar/navbar";
import "bootstrap/dist/css/bootstrap.min.css";

import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';

const client = new ApolloClient({
    uri: "http://localhost/graphql",
    cache: new InMemoryCache(),
});

function App() {
  return (
    <Router>
        <ApolloProvider client={client}>
            <Navbar />
            <div className="container">
                <Routes>
                    <Route path="/" element={<Home/>} exact />
                    <Route
                        path="boats/:id"
                        element={<BoatDetails />}
                    />
                </Routes>
            </div>
        </ApolloProvider>
    </Router>
  );
}

export default App;
