import React, { useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import logo from 'src/pictures/logo.png';
import monts from 'src/pictures/monts.jpg';

import Welcome from "./Welcome";
import ConnectionController from "./controller/ConnectionController";
import UserSpaceController from "./controller/UserSpaceController";
import CatalogueController from "./controller/CatalogueController";
import ColonieControllerAdmin from "./controller/ColonieControllerAdmin";
import UserColonieController from "./controller/UserColonieController";
import TemoignagesController from "./controller/TemoignagesController";
import AdminSpaceController from "./controller/AdminSpaceController";

export default function App() {

  const [personne, setPersonne] = useState(null);
  console.log(personne)

  function personneName() {
    return personne !== null ? `${personne.firstname} ${personne.lastname}` : "";
  }

  function logout() {
    setPersonne(null);
    console.log(personne);
  }

  return (
    <BrowserRouter>
      <header className="d-flex justify-content-center align-items-center" style={{backgroundImage:`url(${monts})`, backgroundSize: 'cover'}}>
          <h1>Séjours<img src={logo} alt={"logo"} className="brand-logo"/>Altiplano</h1>
      </header>

      <Navbar className="mb-0" collapseOnSelect="true" bg="black" variant="dark" sticky="top" expand="md">
        <Container>
          <Navbar.Brand className="fst-italic">Bonjour {personneName()} !</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav>
              <Nav.Link eventKey="1" as={Link} to="/welcome">
                <i className="fa fa-home me-2"></i>
                Accueil
              </Nav.Link>
              <Nav.Link eventKey="2" as={Link} to="/catalogue">
                <i className="fa fa-list me-2"></i>
                Catalogue
              </Nav.Link>
              <Nav.Link eventKey="3" as={Link} to="/temoignages" hidden={personne === null }>
                <i className="fa fa-star me-2"></i>
                Témoignages
              </Nav.Link>
              <Nav.Link eventKey="4" as={Link} to="/userSpace" hidden={personne === null || `${personne.role}` !== `USER`}>
                <i className="fa fa-user me-2"></i>
                Mon espace utilisateur
              </Nav.Link>
              <Nav.Link eventKey="5" as={Link} to="/adminSpace" hidden={personne === null || `${personne.role}` !== `ADMIN`}>
                <i className="fa fa-user me-2"></i>
                Mon espace administrateur
              </Nav.Link>
              <Nav.Link eventKey="6" as={Link} to="/connection" hidden={personne !== null}>
                <i className="fa fa-key me-2"></i>
                Connexion
              </Nav.Link>
              <Nav.Link eventKey="7" as={Link} to="/welcome" hidden={personne === null} onClick={() => logout()}>
                <i className="fa fa-unlock me-2"></i>
                Déconnexion
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <article>
        <Container>
          <Routes>
            <Route exact path="/" element={<Welcome personne={personne} setPersonne={personne => setPersonne(personne)} />} />
            <Route exact path="/welcome" element={<Welcome personne={personne} setPersonne={personne => setPersonne(personne)} />} />
            <Route 
              exact path="/connection" 
              element={<ConnectionController personne={personne} setPersonne={personne => setPersonne(personne)} />}
            />
            <Route 
              exact path="/catalogue" element={<CatalogueController personne={personne} setPersonne={personne => setPersonne(personne)} />} />
            <Route 
              exact path="/temoignages" element={<TemoignagesController />} />
            <Route 
              exact path="/colonie/:id" element={personne === null? <Welcome /> : (`${personne.role}` === `ADMIN`? <ColonieControllerAdmin /> : <UserColonieController personne={personne} setPersonne={personne => setPersonne(personne)}/>)} />
            <Route 
              exact path="/userSpace"
              element={<UserSpaceController personne={personne} setPersonne={personne => setPersonne(personne)} />}
            />
            <Route 
              exact path="/adminSpace"
              element={<AdminSpaceController personne={personne} setPersonne={personne => setPersonne(personne)}  />}
            />
          </Routes>
        </Container>
      </article>

      <footer className="d-flex justify-content-center align-items-center">
          <h6>Séjours Altiplano - 2023</h6>
      </footer>
    </BrowserRouter>
  );
}