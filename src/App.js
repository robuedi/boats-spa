import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Boats from "./pages/boats/Boats";
import BoatDetails from "./pages/boats/BoatDetails";
import PaymentFailed from "./pages/payment/PaymentFailed";
import PaymentCompleted from "./pages/payment/PaymentCompleted";
import Navbar from "./components/layout/Navbar/navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';

axios.defaults.baseURL = `${process.env.REACT_APP_API_URL}`;
const client = new ApolloClient({
    uri: `${process.env.REACT_APP_GRAPHQL_API}`,
    cache: new InMemoryCache(),
});

function App() {
  return (
    <Router>
        <ApolloProvider client={client}>
            <Navbar />
            <div className="container">
                <Routes>
                    <Route path="/" element={<Boats/>} exact />
                    <Route path="boats/:id" element={<BoatDetails />} />
                    <Route path="/payment/completed" element={<PaymentCompleted />} />
                    <Route path="/payment/failed" element={<PaymentFailed />} />
                </Routes>
            </div>
        </ApolloProvider>

    </Router>
  );
}

export default App;
