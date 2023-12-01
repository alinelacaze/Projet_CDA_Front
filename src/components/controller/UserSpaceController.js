import React, { useEffect, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import Select from 'react-select'
import "whatwg-fetch";
import axios from 'axios';

import UserSpaceView from "../view/UserSpaceView";

export default function UserSpaceController(props) {

  // Enlever les console log + Faire marcher l'inscription

    console.log(props);
    const persoId = props.personne.id;
    const [perso, setPerso] = useState([]);
    const [coloInscrit, setColonieInscrit] = useState([]);

    useEffect(() => fetchPerso(), []);
    useEffect(() => gelColId(), []);

  // Retrieve details of authenticated user

    function fetchPerso() {

        fetch("http://34.163.222.87:8484/api/personne/" + `${persoId}`)
           .then((response) => response.json())
           .then(json => setPerso(() => {
            const newPerso = [];
            newPerso.push(
                 json.id,
                 json.firstname,
                 json.lastname,
                 json.colonie
             )
             return (newPerso)
            }
            ))
          }

    console.log(`perso`, perso)

    // Retrieve data from user's colonie

      function gelColId() {

        axios.get("http://34.163.222.87:8484/api/colonie/personne/" + `${persoId}`).then(resp => {
          setColonieInscrit(resp.data);
        });
        console.log(`coloInscrit`, coloInscrit)

      } 

    // Register to ONE available colonie by selection

    function inscriptionColonie() {

        // Display only available colonies
 
        const [col, setCol] = useState([])

        useEffect(() => getColonie(), []);
    
            function getColonie() {
              setCol("Chargement...")
              fetch("http://34.163.222.87:8484/api/colonie/display")
                 .then((response) => response.json())
                 .then(json => setCol(() => {
                  let newCol = []
                  for (let i = 0; i<json.length; i++){
                    newCol.push({
                      value: json[i].id,
                      label: json[i].description
                  })
                  }
                  return {newCol}
                    }))
                  }

        // Update colonie from selection
    
          const [bodyPerso, setBodyPerso] = useState({}) 

            const handleSubmit = async (e) => {
              e.preventDefault();
              const response = await fetch('http://34.163.222.87:8484/api/personne/update/' + `${persoId}`, {
                method: 'PUT',
                body: JSON.stringify(bodyPerso),
                headers: {
                  'Content-Type': 'application/json'
                }
              });
              const result = await response.json();
              console.log(result);
            }
    
            const options = [col.newCol]
            console.log(options)
    
            const [selected, setSelected] = useState(null);
    
            const handleChange = (selectedOption) => {
              setSelected(selectedOption);
              console.log(`Option selected:`, selectedOption);
            };
    
            const functionTwo = (selectedOption) => {
              setBodyPerso({id: persoId, colonie: {id: selectedOption.value}});
            };
      
            return (
              <div>
              <form onSubmit={handleSubmit}>
                <label>
                Choisissez une colonie disponible :
                <hr className="hr-custom"/> 
                  <Select options={options[0]} defaultValue={{ label: "Sélectionnez...", value: "placeholder" }} onChange={(e) => {handleChange(e); functionTwo(e)}} autoFocus={true}/>
                </label>
                <div className="mt-4">
                  {selected && <>Vous avez sélectionné la {selected.label}</>}
                </div>
                <hr className="hr-custom"/>
                <button type="submit">Enregistrer</button>
                <hr className="hr-custom"/> 
              </form>
              </div>
            );
        }

        // Unregister user from any colonie

        function unregister() {

          setPerso({...perso, colonie: null})
          console.log(`perso null colo`, perso)

          fetch('http://34.163.222.87:8484/api/personne/update/' + `${persoId}`, {
            method: 'PUT',
            body: JSON.stringify({...props.personne, colonie: null}),
            headers: {
              'Content-Type': 'application/json'
            }
          });

        }

    return (
        <UserSpaceView perso={perso} coloInscrit={coloInscrit} unregister={() => unregister()} inscriptionColonie={() => inscriptionColonie()} />
    );
}