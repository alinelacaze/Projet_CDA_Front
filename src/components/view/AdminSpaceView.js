import React from "react";
import Accordion from 'react-bootstrap/Accordion';

export default function AdminSpaceView(props){
    
    return (
        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header>Ajouter une colonie</Accordion.Header>
            <Accordion.Body>
                {props.addColonie()}
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Modifier une colonie</Accordion.Header>
            <Accordion.Body>
                {props.updateColonie()}
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>Supprimer une colonie</Accordion.Header>
            <Accordion.Body>
                {props.deleteColonie()}
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="3">
            <Accordion.Header>Ajouter un témoignage</Accordion.Header>
            <Accordion.Body>
                {props.addTemoignage()}
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      );
}
