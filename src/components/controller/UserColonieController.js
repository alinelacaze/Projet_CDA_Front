import React, { useState, useEffect } from "react";
import "whatwg-fetch";
import { useParams } from "react-router-dom";

import UserColonieView from "../view/UserColonieView";

export default function ColonieControllerUser(props) {

    const [colonie, setColonie] = useState([])
    const [participant, setParticipant] = useState([])
    const [nombre, setNombre] = useState([])
    const [userReg, setUserReg] = useState([])
    
    useEffect(() => fetchParticipants(), [])
    useEffect(() => fetchColonie(), [])
    useEffect(() => fetchNombreParticipants(), [])
    useEffect(() => registerUser(), [])

    const userRegistered = props.personne
    const params = useParams();
    const path = `${params.id}`

    // Retrieve data from selected colonie (after redirection from accueil or catalogue)

    function fetchColonie() {
        setColonie("Chargement...")
        fetch("http://localhost:8484/api/colonie/" + path)
           .then((response) => response.json())
           .then(json => setColonie(() => {
               const newColonie = [];
                newColonie.push(
                  json.id,
                  json.description,
                  json.dateAjout,
                  json.name,
                  json.dateDebut,
                  json.dateFin,
                  json.theme,
                  json.availability
                )
               return (newColonie)
           }))
        }

    // Display the name of participants

    function fetchParticipants() {
        setParticipant("Chargement...")
        fetch("http://localhost:8484/api/space/colonie/" + path + "/personnes")
           .then((response) => response.json())
           .then(json => setParticipant(() => {
               const newParticipant = [];
               for (let i = 0; i<json.length; i++){
                newParticipant.push(<li key={json[i].id}>
                  <p>{json[i].firstname}{' '}{json[i].lastname}</p>
                  </li>
                  )}
              return <ol>{newParticipant}</ol>
           }))
        }

    // Display the number of participants

    function fetchNombreParticipants() {
          fetch("http://localhost:8484/api/space/colonie/" + path + "/personnes")
             .then((response) => response.json())
             .then(json => setNombre(() => {
              return json.length
             }))
          }

    // Register the authenticated user to the colonie

        function registerUser() {

          fetch('http://localhost:8484/api/personne/' + `${userRegistered.id}/`)
          .then((response) => response.json())
          .then(json => setUserReg(() => {
           return json
          }))

        }

        function updateUser() {
            
            fetch('http://localhost:8484/api/personne/update/' + `${userRegistered.id}`, {
                method: 'PUT',
                body: JSON.stringify({...userReg, colonie: {id: path}}),
                headers: {
                  'Content-Type': 'application/json'
                }
              }
              );
              
              return(<div>Vous êtes inscrit !</div>)
        }

    // Update colonie availability to 'COMPLET' when the number of participants exceeds 15 

            function handleFull() {
                colonie[7] = 'COMPLET'
                const array = colonie
                console.log(array)
    
                fetch("http://localhost:8484/api/colonie/update/" + path, {
                  method: 'PUT',
                  body: JSON.stringify({
                    "id": array[0],
                    "name": array[3],
                    "dateDebut": array[4],
                    "dateFin": array[5],
                    "theme": array[6],
                    "availability": array[7]
                  }),
                  headers: {
                    'Content-Type': 'application/json'
                  },
                })
                .then(response => response.json())
                .then(updatedData => {
                  console.log('Data updated:', updatedData);
                })
                
                return(<div>La colonie est complète !</div>) 
              }

    // Update colonie availability to 'DISPONIBLE' when the number of participants reduces under 15 

          function handleAvailable() {
            colonie[7] = 'DISPONIBLE'
            const array = colonie
            console.log(array)

            fetch("http://localhost:8484/api/colonie/update/" + path, {
              method: 'PUT',
              body: JSON.stringify({
                "id": array[0],
                "name": array[3],
                "dateDebut": array[4],
                "dateFin": array[5],
                "theme": array[6],
                "availability": array[7]
              }),
              headers: {
                'Content-Type': 'application/json'
              },
            })
            .then(response => response.json())
            .then(updatedData => {
              console.log('Data updated:', updatedData);
            })

          }

    return (<UserColonieView colonie={colonie} participant={participant} nombre={nombre} userReg={userReg} updateUser={() => updateUser()} handleAvailable={() => handleAvailable()} handleFull={() => handleFull()} />);
}