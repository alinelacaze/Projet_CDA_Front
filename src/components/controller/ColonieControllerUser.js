import React, { useState, useEffect } from "react";
import "whatwg-fetch";
import { useParams } from "react-router-dom";

import ColonieViewUser from "../view/ColonieViewUser";

export default function ColonieControllerUser(props) {

    // Enlever code


    const [colonie, setColonie] = useState([])
    const personneParticipante = [props.personne, colonie]
    const [participant, setParticipant] = useState([])
    // const [updatedColonie, setUpdatedColonie] = useState([])
    const [nombre, setNombre] = useState([])
    // const [values, setValues] = useState([])

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

        // Participant registration to the colonie

        function inscriptionCol() {

          fetch('http://localhost:8484/api/personne/update/' + personneParticipante.id, {
              method: 'PUT',
              body: JSON.stringify({...personneParticipante, colonie: {id: path}
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

        // Update colonie availability to 'INDISPONIBLE' when the number of participants exceeds 15 

          function handleAvailable() {
            colonie[7] = 'INDISPONIBLE'
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

      
  return (
        <ColonieViewUser colonie={colonie} participant={participant} personneParticipante={personneParticipante} nombre={nombre} inscriptionCol={() => inscriptionCol()} />
    );
}