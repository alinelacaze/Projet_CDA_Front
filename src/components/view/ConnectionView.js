import React, { useState } from "react";
import { Card, Col, Form, InputGroup, Nav, Row } from "react-bootstrap";
import { Link } from 'react-router-dom';

export default function ConnectionView(props) {

    // Enlever les consoles + mettre des commentaires

    const [fields, setFields] = useState({ login: "", password: "" });
    const [fieldsRegister, setFieldsRegister] = useState({ loginRegister: "", passwordRegister: "", firstname: "", lastname: "" });

    return (
        <Row className="d-flex justify-content-center p-3 pt-5">
            <Card className="max-width-50-rem p-0">
            <Card.Header className="text-center">Authentification</Card.Header>
                <Row className="pt-4 ps-3 pe-3">
                    <Col sm={{ offset: 1, span: 10 }} md={3} lg={2}>
                        <output>Identifiant</output>
                    </Col>
                    <Col sm={{ offset: 1, span: 10 }} md={{ offset: 0, span: 7 }} lg={7}>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="inpLogin"><i className="fa fa-user"></i></InputGroup.Text>
                            <Form.Control 
                                type="text"
                                aria-describedby="inpLogin"
                                placeholder="Veuillez entrer un identifiant"
                                value={fields.login}
                                onChange={form => setFields({...fields, login: form.target.value})}
                            />
                        </InputGroup>
                    </Col>
                </Row>
                <Row className="ps-3 pe-3">
                    <Col sm={{ offset: 1, span: 10 }} md={3} lg={2}>
                        <output>Mot de passe</output>
                    </Col>
                    <Col sm={{ offset: 1, span: 10 }} md={{ offset: 0, span: 7 }} lg={7}>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="inpPassword"><i className="fa fa-key"></i></InputGroup.Text>
                            <Form.Control 
                                type="text" 
                                aria-describedby="inpPassword"
                                placeholder="Veuillez entrer un mot de passe"
                                value={fields.password}
                                onChange={form => setFields({...fields, password: form.target.value})}
                            />
                        </InputGroup>
                    </Col>
                </Row>
                <Row className="pb-3 ps-3 pe-3">
                    <Col sm={{ offset: 1, span: 10 }} lg={4} className="p-1">
                        <Nav.Link
                            className="btn bg-black w-100 text-white"
                            as={Link} to="/welcome"
                            onClick={() => props.fetchPersonne(fields.login, fields.password)}
                        >
                            Connexion
                        </Nav.Link>
                    </Col>
                </Row>
            </Card>
            <hr className="hr-custom"/>
            <Card className="max-width-50-rem p-0">
            <Card.Header className="text-center">Créer un compte</Card.Header>
            <Row className="pt-4 ps-3 pe-3">
                    <Col sm={{ offset: 1, span: 10 }} md={3} lg={2}>
                        <output>Prénom</output>
                    </Col>
                    <Col sm={{ offset: 1, span: 10 }} md={{ offset: 0, span: 7 }} lg={7}>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="inpFirstname"><i className="fa fa-user"></i></InputGroup.Text>
                            <Form.Control 
                                type="text"
                                aria-describedby="inpFirstname"
                                placeholder="Veuillez entrer votre prénom"
                                value={fieldsRegister.firstname}
                                onChange={form => setFieldsRegister({...fieldsRegister, firstname: form.target.value})}
                            />
                        </InputGroup>
                    </Col>
                </Row>
            <Row className="pt-4 ps-3 pe-3">
                    <Col sm={{ offset: 1, span: 10 }} md={3} lg={2}>
                        <output>Nom de famille</output>
                    </Col>
                    <Col sm={{ offset: 1, span: 10 }} md={{ offset: 0, span: 7 }} lg={7}>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="inpLastname"><i className="fa fa-user"></i></InputGroup.Text>
                            <Form.Control 
                                type="text"
                                aria-describedby="inpLastname"
                                placeholder="Veuillez entrer votre nom de famille"
                                value={fieldsRegister.lastname}
                                onChange={form => setFieldsRegister({...fieldsRegister, lastname: form.target.value})}
                            />
                        </InputGroup>
                    </Col>
                </Row>
                <Row className="pt-4 ps-3 pe-3">
                    <Col sm={{ offset: 1, span: 10 }} md={3} lg={2}>
                        <output>Identifiant</output>
                    </Col>
                    <Col sm={{ offset: 1, span: 10 }} md={{ offset: 0, span: 7 }} lg={7}>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="inpLogin"><i className="fa fa-user"></i></InputGroup.Text>
                            <Form.Control 
                                type="text"
                                aria-describedby="inpLogin"
                                placeholder="Veuillez entrer un identifiant"
                                value={fieldsRegister.loginRegister}
                                onChange={form => setFieldsRegister({...fieldsRegister, loginRegister: form.target.value})}
                            />
                        </InputGroup>
                    </Col>
                </Row>
                <Row className="ps-3 pe-3">
                    <Col sm={{ offset: 1, span: 10 }} md={3} lg={2}>
                        <output>Mot de passe</output>
                    </Col>
                    <Col sm={{ offset: 1, span: 10 }} md={{ offset: 0, span: 7 }} lg={7}>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="inpPassword"><i className="fa fa-key"></i></InputGroup.Text>
                            <Form.Control 
                                type="text" 
                                aria-describedby="inpPassword"
                                placeholder="Veuillez entrer un mot de passe"
                                value={fieldsRegister.passwordRegister}
                                onChange={form => setFieldsRegister({...fieldsRegister, passwordRegister: form.target.value})}
                            />
                        </InputGroup>
                    </Col>
                </Row>
                <Row className="pb-3 ps-3 pe-3">
                    <Col sm={{ offset: 1, span: 10 }} lg={4} className="p-1">
                        <Nav.Link
                            className="btn bg-black w-100 text-white"
                            as={Link} to="/welcome"
                            onClick={() => props.registerPersonne(fieldsRegister.loginRegister, fieldsRegister.passwordRegister, fieldsRegister.firstname, fieldsRegister.lastname)}
                        >
                            Connexion
                        </Nav.Link>
                    </Col>
                </Row>
            </Card>
        </Row>
    );
}