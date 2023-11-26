import React, { useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { Link } from 'react-router-dom';

export default function ColonieView(props){

    // Ajouter des if pour détailler le statut de la colonie (complet, dispo, complet etc.)

    const [addComponent, setAddComponent] = useState(false);
    const [deleteComponent, setDeleteComponent] = useState(false);

    const chiffre = props.nombre;
    console.log(chiffre);

    const handleAddClick = () => {
        setAddComponent(true);
    };

    const handleDeleteClick = () => {
        setDeleteComponent(true);
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
            <Row>
            <button className="button-custom" onClick={handleAddClick}>
            <label> Ajouter un participant </label>
            </button>                
            <div>     
            {
            (() => {
            if (addComponent === true && chiffre <= 14) {
                    return (props.addParticipant())
                } else if (addComponent === true && chiffre > 14) {
                    return (props.handleAvailable())
                }  
            })()  
            }  
            </div> 
            </Row>
            <hr className="hr-custom"/>
            <Row>
            <button className="button-custom" onClick={handleDeleteClick}>
            <label> Enlever un participant </label>
            </button>
            <div>     
            {
            (() => {
            if (deleteComponent === true && chiffre !== 0) {
                return(props.deleteParticipant())
                } else if (deleteComponent === true && chiffre === 0) {
                    return(<div>La colonie n'a pas de participant !</div>)
                }
            })()  
            }  
            </div> 
            <hr className="hr-custom"/> 
            </Row>
        </Col>
    </Row>
    )
}