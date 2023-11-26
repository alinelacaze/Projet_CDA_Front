import React, { useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";


export default function UserSpaceView(props){

    console.log(`perso`, props.perso)
    console.log(`coloInscrit`, props.coloInscrit)

    return (
        <Row>
            <Col>
                <h3>Mes informations :</h3>
                <hr className="hr-custom"/>
                <h5>{props.perso[1]}{' '}{props.perso[2]}</h5>  
                <hr/>
                <h3>Ma colonie :</h3>
                <hr className="hr-custom"/>
                <div>
                {
                    (() => {
                    if (props.perso[3] === null){ 
                        return(
                            <h6 style={{ color: 'red' }}>Vous n'êtes inscrit à aucune colonie !</h6>
                        )
                    } else if (props.perso[3] !== null) {
                        return (
                        <Card className="p-3">
                        <h6><span style={{ fontWeight: 'bold' }}>Vous êtes inscrit à la </span><label>{props.coloInscrit.description}</label> <span style={{ fontWeight: 'bold' }}> du </span> <label>{props.coloInscrit.dateDebut}</label> <span style={{ fontWeight: 'bold' }}> au </span><label>{props.coloInscrit.dateFin}</label></h6>
                        <hr className="hr-custom"/>
                        <h6>
                            <span style={{ fontWeight: 'bold' }}>Nom : </span>
                            <label>
                                {props.coloInscrit.name}
                            </label>
                        </h6>
                        <h6>
                          <span style={{ fontWeight: 'bold' }}>Thème : </span>
                          <label>
                                {props.coloInscrit.theme}
                          </label>
                      </h6>
                        <h6>
                            <span style={{ fontWeight: 'bold' }}>Disponibilité : </span>
                            <label>
                                {props.coloInscrit.availability}
                            </label>
                        </h6>
                    </Card>)
                    }     
                    })()  
                    } 
                    </div>
            </Col>
            <Col>
                <hr className="hr-custom"/>
                    <h5>Inscrivez-vous !</h5>
                    <div>
                        {props.inscriptionColonie()}
                    </div>
                    <hr className="hr-custom"/>
                    <hr/>
                    <hr className="hr-custom"/>
                    <button className="button-custom" disabled={props.perso[3] === null} onClick={() => props.unregister()}>
                        <h5>Se désinscrire</h5>
                    </button>
            </Col>
        </Row>
    )

}
