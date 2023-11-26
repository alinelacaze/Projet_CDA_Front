import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Link } from 'react-router-dom';

export default function ColonieView(props){

    // Ajouter des if pour détailler le statut de la colonie (complet, dispo, complet etc.)

    const chiffre = props.nombre;
    console.log(chiffre);
    console.log(`personne`, props.personneParticipante)

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
                                {
                                (() => {
                                if (chiffre <= 14 && props.personneParticipante.colonie === null){
                                return (
                                <div>
                                <hr className="hr-custom"/>
                                <button className="button-custom" onClick={() => props.inscriptionCol()}>S'inscrire</button>
                                <hr className="hr-custom"/>
                                </div>)
                                } else if (chiffre <= 14 && props.personneParticipante.colonie !== null) {
                                    return (<div>Vous êtes déjà inscrit à une colonie !</div>)
                                } else if (chiffre > 14) {
                                    return (<div>La colonie est complète !</div>)
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