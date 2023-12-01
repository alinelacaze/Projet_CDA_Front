import React, { useEffect, useState } from "react";
import "whatwg-fetch";
import Select from 'react-select';
import { Button, Accordion, Card, Col, Form, Image, Row, Stack } from "react-bootstrap";
import ListGroup from 'react-bootstrap/ListGroup';
import axios from 'axios';

import TemoignagesView from "../view/TemoignagesView";

export default function TemoignagesController() {

  // Enlever code + Vérifier tout est OK admin
  
  function handleNewCard() {

/*    const [data, setData] = useState([]);

    const [catalogue, setCatalogue] = useState([])
    useEffect(() => fetchCatalogue(), [])

    function fetchCatalogue() {
    setCatalogue("Chargement...")
    fetch("http://34.163.222.87:8484/api/catalogue/colonies")
      .then(response => response.json())
      .then(json => setCatalogue(() => {
        let newCatalogue = []
        for (let i = 0; i<json.length; i++){
          newCatalogue.push({
                value: json[i].id,
                label: json[i].description,
          })}
          return {newCatalogue}
    }))
}

const options = [catalogue.newCatalogue]
const [selected, setSelected] = useState('');

const [showSelect, setShowSelect] = useState(false);

const handleChange = (selectedOption) => {
  setSelected(selectedOption);
  setShowSelect(true);
  console.log(`Option selected:`, selectedOption);
};

function selectColonie() {
    return(
        <div>
            <hr className="hr-custom"/> 
            <Select options={options[0]} defaultValue={{ label: "Sélectionnez...", value: "placeholder" }} onChange={(e) => {handleChange(e)}} autoFocus={true}/>
            <hr className="hr-custom"/>
            {
          (() => {
            if (showSelect === true){
              return (
                <button className="button-custom" onClick={handleSaveChoice}>
                <label>Valider la sélection</label>
                </button>
              );
            }      
                })()  
          }
        </div>)
}


console.log(`selection:`, Object.values(selected))
const chiffre = Object.values(selected)
const number = chiffre[0]
console.log(number)


function enregistrerCard() {
    setData("Chargement...")
    fetch("http://34.163.222.87:8484/api/colonie/" + number)
       .then((response) => response.json())
       .then(json => setData(() => {
           const newColonie = [];
            newColonie.push(
              json.id,
              json.description,
              json.dateAjout,
              json.name,
              json.dateDebut,
              json.dateFin,
              json.theme,
              json.availability,
              json.urlImage
            )
            return (newColonie)
       }))
      }


      const [nomImage, setNomImage] = useState("")

    
      const handlePicSubmit = (e) => {
        const file = e.target.files[0];
        const url = 'http://34.163.222.87:8484/api/upload/';
        const formData = new FormData();
        formData.append('file', file);
        formData.append('fileName', file.name);
        const config = {
          headers: {
            'content-type': 'multipart/form-data',
          },
        };
        axios.post(url, formData, config).then((response) => {
          console.log(response.data);
        });
        setNomImage(file.name)
      }
    
      console.log(nomImage)
    
      
      
      const[showComponent, setShowComponent] = useState(false)
    
      const handleAddColClick = () => {
        setShowComponent(true);
      };

    
      const handleSaveChoice = () => {
        enregistrerCard();
      };
    
  console.log(data)


  const handleUpdateURL = () => {
    data[8] = "http://34.163.222.87:8484/api/upload/files/" + `${nomImage}`;
    console.log(`data`, data)
    const urlData = "http://34.163.222.87:8484/api/colonie/update/" + number;
    console.log(`url`, urlData)
    const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "id": number,
        "name": data[3],
        "dateDebut": data[4],
        "dateFin": data[5],
        "theme": data[6],
        "availability": data[7],
        "urlImage": data[8]
        })
    }
    fetch(urlData, requestOptions)
    .then(response => response.json())
    .then(json => setData(json));
    
  }

  */

  const [finCol, setFinCol] = useState([])
  useEffect(() => fetchFinishedCol(), [])


  const fetchFinishedCol = () => {
    fetch("http://34.163.222.87:8484/api/colonie/finished")
      .then(response => response.json())
      .then(json => setFinCol(() => {
        const newFinCol = []
        for (let i = 0; i<json.length; i++){
          newFinCol.push(
            <Stack className="stack-custom" hidden={json[i].urlImage === null}>
            <Card key={json[i].id} style={{ width: '30rem' }} className="card-custom">
              <Card.Img src={json[i].urlImage}/>
              <Card.Body>
                <Card.Title>{json[i].name}</Card.Title>
                <Card.Text>
                  Du {json[i].dateDebut} au {json[i].dateFin}
                </Card.Text>
              </Card.Body>
            </Card>
            </Stack>
            )}
        return (newFinCol)
      }))

}

return (<div>
          {finCol}
        </div>)

/*
      return(
        <div>
          {finCol}
          <hr/>
          <Row>
          <form>
          <input type="file" onChange={(e) => {handlePicSubmit(e)}} />
          <hr className="hr-custom"/>
          <button className="button-custom" onClick={handleAddColClick}>
            <label>Choisir une colonie</label>
          </button>
          {
          (() => {
            if (showComponent === true){
              return (selectColonie());
            }      
                })()  
          }
          <hr className="hr-custom"/>
          <button className="button-custom" type="submit" onClick={handleUpdateURL}>
            <label>Enregistrer le témoignage</label>
          </button>
          <hr className="hr-custom"/> 
          </form>
          </Row>
          <hr className="hr-custom"/>
        </div>
      )
    */
    }


return (
    <TemoignagesView handleNewCard={() => handleNewCard()} />
);
}