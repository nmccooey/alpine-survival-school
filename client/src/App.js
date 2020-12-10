import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AboutScreen from "./screens/AboutScreen";
import FaqScreen from "./screens/FaqScreen";
import HomeScreen from "./screens/HomeScreen";
import CourseScreen from "./screens/CourseScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import CartScreen from "./screens/CartScreen";
import ShippingScreen from "./screens/ShippingScreen";

const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route path="/shipping" component={ShippingScreen} />
          <Route path="/" component={HomeScreen} exact />
          <Route path="/login" component={LoginScreen} />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/profile" component={ProfileScreen} />
          <Route path="/course/:id" component={CourseScreen} />
          <Route path="/cart/:id?" component={CartScreen} />
          <Route path="/about" component={AboutScreen} exact />
          <Route path="/faq" component={FaqScreen} exact />
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
