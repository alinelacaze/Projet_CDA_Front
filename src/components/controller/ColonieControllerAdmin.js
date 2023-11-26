import React, { useState, useEffect } from "react";
import "whatwg-fetch";
import { useParams } from "react-router-dom";
import { Button, Col, Modal, Row, Nav } from "react-bootstrap";

import ColonieViewAdmin from "../view/ColonieViewAdmin";

export default function ColonieControllerAdmin() {

  // Enlever code

    const [colonie, setColonie] = useState([])
    const [participant, setParticipant] = useState([])
    // const [updatePerso, setUpdatePerso] = useState([])
    const [nombre, setNombre] = useState([])
    const [values, setValues] = useState([])

    useEffect(() => fetchParticipants(), [])
    useEffect(() => fetchColonie(), [])
    useEffect(() => fetchNombreParticipants(), [])

    const params = useParams();
    const path = `${params.id}`
    console.log(path)

    console.log(colonie)

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

          // Update colonie availability to 'COMPLET' when the number of participants exceeds 15 

          function handleAvailable() {
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

          // TO REMOVE: Update colonie availability to 'DISPONIBLE' when the number of participants reduces under 15 

          function handleAvailableAgain() {
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
      
    // Display the name of participants

    function fetchParticipants() {

        setParticipant("Chargement...")
        fetch("http://localhost:8484/api/space/colonie/" + path + "/personnes")
           .then((response) => response.json())
           .then(json => setParticipant(() => {
               const newParticipant = [];
               for (let i = 0; i<json.length; i++){
                newParticipant.push(<li key={json[i].id}>
                  <p>{' '}{json[i].firstname}{' '}{json[i].lastname}{' '}</p>
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

    /*
        function deleteColonie() {
          fetch("http://localhost:8484/api/colonie/delete/" + path, {
            method: 'DELETE'})
            .then(() => console.log("Delete successful"));
          }

    function updateColonie() {
        
        const handleUpdate = async (e) => {
            e.preventDefault();
            const response = await fetch("http://localhost:8484/api/colonie/update/" + path, {
              method: 'PUT',
              body: JSON.stringify(updatedColonie),
              headers: {
                'Content-Type': 'application/json'
              }
            });
            const result = await response.json();
            console.log(result);
          }

        return (    
            <form onSubmit={handleUpdate}>
            <hr className="hr-custom"/>
            <label>
            Nom : 
            <hr className="hr-custom"/>
              <input name="name" type="text" onChange={e => setUpdatedColonie({...updatedColonie, id: path, name: e.target.value})} />
            </label>
            <hr />
            <label>
            Date de début :
            <hr className="hr-custom"/> 
              <input name="dateDebut" type="date" onChange={e => setUpdatedColonie({...updatedColonie, dateDebut: e.target.value})}/>
            </label>
            <hr />
            <label>
            Date de Fin :
            <hr className="hr-custom"/> 
              <input name="dateFin" type="date" onChange={e => setUpdatedColonie({...updatedColonie, dateFin: e.target.value})}/>
            </label>
            <hr />
            <label>
            Choisissez un thème :
            <hr className="hr-custom"/> 
              <select className="select-design" name="theme" type="text" onChange={e => setUpdatedColonie({...updatedColonie, theme: e.target.value})}>
                <option hidden value="default">Sélectionnez...</option>
                <option value="PRINTEMPS">Printemps</option>
                <option value="ETE">Eté</option>
                <option value="AUTOMNE">Automne</option>
                <option value="HIVER">Hiver</option>
              </select>
            </label>
            <hr />
            <label>
            Choisissez une disponibilité :
            <hr className="hr-custom"/> 
              <select className="select-design" name="availability" type="text" onChange={e => setUpdatedColonie({...updatedColonie, availability: e.target.value})}>
                <option hidden value="default">Sélectionnez...</option>
                <option value="DISPONIBLE">Disponible</option>
                <option value="INDISPONIBLE">Indisponible</option>
                <option value="COMPLET">Complet</option>
                <option value="TERMINE">Terminé</option>
                <option value="ANNULE">Annulé</option>
              </select>
            <hr className="hr-custom"/>
            </label>
            <hr className="hr-custom"/>
            <button type="submit">Enregistrer</button>
            <hr className="hr-custom"/>
          </form>
        );
      }*/

      // Add participant to the colonie

      function addParticipant() {
        if (colonie[7] === "DISPONIBLE"){
        const handleAddSubmit = async (e) => {
          e.preventDefault();

          const responseOne = await fetch('http://localhost:8484/api/personne/' + `${values.firstname}/` + `${values.lastname}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          });
          const resultOne = await responseOne.json();
          console.log(resultOne);
        

          const responseTwo = await fetch('http://localhost:8484/api/personne/update/' + `${resultOne.id}`, {
            method: 'PUT',
            body: JSON.stringify({...resultOne, colonie: {id: path}}),
            headers: {
              'Content-Type': 'application/json'
            }
          }
          );
          const resultTwo = await responseTwo.json();
          console.log(resultTwo);
        }

        return (
          <form onSubmit={handleAddSubmit}>
            <hr className="hr-custom"/> 
            <label>
            Prénom : 
            <hr />
              <input name="firstname" type="text" onChange={e => setValues({...values, firstname: e.target.value})} />
            </label>
            <hr />
            <label>
            Nom :
            <hr /> 
              <input name="lastname" type="text" onChange={e => setValues({...values, lastname: e.target.value})}/>
            </label>
            <hr />
            <button type="submit">Enregistrer</button>
            <hr className="hr-custom"/> 
          </form>
        );
        } else {
          return(<div>La colonie n'est pas disponible !</div>)
        } 

      }
      
      // Remove participant from the colonie

      const [deleteConfirmed, setDeleteConfirmed] = useState(false)

      function deleteParticipant() {
          const handleAddSubmit = async (e) => {
            e.preventDefault();
  
            const responseOne = await fetch('http://localhost:8484/api/personne/' + `${values.firstname}/` + `${values.lastname}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json'
              }
            });
            const resultOne = await responseOne.json();
            console.log(resultOne);
          
  
            const responseTwo = await fetch('http://localhost:8484/api/personne/update/' + `${resultOne.id}`, {
              method: 'PUT',
              body: JSON.stringify({...resultOne, colonie: null}),
              headers: {
                'Content-Type': 'application/json'
              }
            }
            );
            const resultTwo = await responseTwo.json();
            console.log(resultTwo);

            setDeleteConfirmed(true)

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
  
          return (
            <form onSubmit={handleAddSubmit}>
              <hr className="hr-custom"/> 
              <label>
              Prénom : 
              <hr />
                <input name="firstname" type="text" onChange={e => setValues({...values, firstname: e.target.value})} />
              </label>
              <hr />
              <label>
              Nom :
              <hr /> 
                <input name="lastname" type="text" onChange={e => setValues({...values, lastname: e.target.value})}/>
              </label>
              <hr />
              <button type="submit">Enregistrer</button>
              <hr className="hr-custom"/> 
              {
              (() => {
                if (deleteConfirmed === true){
                  return (
                    <div>{values.firstname}{' '}{values.lastname} ne participe plus à la colonie !</div>
                  );
                }      
                    })()  
              }
            </form>
          );
      }
      
  return (
        <ColonieViewAdmin handleAvailable={() => handleAvailable()} handleAvailableAgain={() => handleAvailableAgain()} colonie={colonie} participant={participant} nombre={nombre} addParticipant={() => addParticipant()} deleteParticipant={() => deleteParticipant()} />
    );
}