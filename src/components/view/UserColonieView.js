import React, { useState } from "react";
import { Card, Col, Row } from "react-bootstrap";

export default function ColonieView(props){

    const chiffre = props.nombre;

    console.log(props.userReg)

    const [showInscriptionDone, setShowInscriptionDone] = useState(false)

    const handleUpdateClick = () => {
        props.updateUser()
        setShowInscriptionDone(true);
    };

    return (
        <Row>
        <Col>
            <Row>
                <h3>Informations sur la colonie :</h3>
                    <Card className="p-3"> 
                        <h6>
                        <span style={{ fontWeight: 'bold' }}>Description : </span>
                            <label>
                            {props.colonie[1]}
                            </label>
                        </h6>
                        <h6>
                            <span style={{ fontWeight: 'bold' }}>Nom : </span>
                            <label>
                            {props.colonie[3]}
                            </label>
                        </h6>
                        <h6>
                            <span style={{ fontWeight: 'bold' }}>Dates : </span>
                            <label>
                            Du {props.colonie[4]} au {props.colonie[5]}
                            </label>
                        </h6>
                        <h6>
                            <span style={{ fontWeight: 'bold' }}>Thème : </span>
                            <label>
                            {props.colonie[6]}
                            </label>
                        </h6>
                        <h6>
                            <span style={{ fontWeight: 'bold' }}>Disponibilité : </span>
                            <label>
                            {props.colonie[7]}
                            </label>
                        </h6>
                        </Card>
                        <div>
                            <hr className="hr-custom"/>
                            <h3>Inscription :</h3>
                                {
                                (() => {
                                if (chiffre <= 14 && props.userReg.colonie === null){
                                return (
                                <div>
                                <hr className="hr-custom"/>
                                <button className="button-custom" onClick={handleUpdateClick}>S'inscrire</button>
                                <h6 hidden={showInscriptionDone === false}><hr className="hr-custom"/>Vous êtes bien inscrit à la {props.colonie[1]} !</h6>
                                <hr className="hr-custom"/>
                                </div>)
                                } else if (chiffre <= 14 && props.userReg.colonie !== null) {
                                    return (<div><hr className="hr-custom"/>Vous êtes déjà inscrit à une colonie !</div>)
                                } else if (chiffre > 14) {
                                    return (props.handleFull() && <div><hr className="hr-custom"/>La colonie est complète !</div>)
                                }
                                })()  
                                }  
                        </div>
                    </Row>
            < hr/>
        </Col>
        <Col>
        <></>
        </Col>
        <Col>
            <Row>
            <h3>Liste des participants :</h3>
            <div>Nombre de participants : {props.nombre}</div>
            <hr className="hr-custom"/>
            <div>{props.participant}</div>
            </Row>
            <hr/>
        </Col>
    </Row>
    )
}