import React, { useEffect, useState } from "react";
import Select from 'react-select';
import { Button, Col, Modal, Row, Nav } from "react-bootstrap";
import { Link } from 'react-router-dom';
import "whatwg-fetch";
import axios from 'axios';

import AdminSpaceView from "../view/AdminSpaceView";

export default function AdminSpaceController() {

  // Ajouter une colonie - Onglet 1

  const [addCol, setAddCol] = useState({});
  const [showModalAdd, setShowAdd] = useState(false);

  const handleCloseAdd = () => setShow(false);

    function addColonie() {

      const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:8484/api/space/colonie', {
          method: 'POST',
          body: JSON.stringify(addCol),
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const result = await response.json();
        console.log(result);

        setShowAdd(true)
      }

      return (
        <Col>
        <form onSubmit={handleSubmit}>
          <hr className="hr-custom"/>
          <label>
          Description : 
          <hr className="hr-custom"/>
            <input name="description" type="text" onChange={e => setAddCol({...addCol, description: e.target.value})} />
          </label>
          <hr />
          <label>
          Date d'ajout :
          <hr className="hr-custom"/>
            <input name="dateAjout" type="date" onChange={e => setAddCol({...addCol, dateAjout: e.target.value})}/>
          </label>
          <hr />
          <label>
            Nom : 
            <hr className="hr-custom"/>
            <input name="name" type="text" onChange={e => setAddCol({...addCol, name: e.target.value})}/>
          </label>
          <hr />
          <label>
          Date de début :
          <hr className="hr-custom"/>
            <input name="dateDebut" type="date" onChange={e => setAddCol({...addCol, dateDebut: e.target.value})}/>
          </label>
          <hr />
          <label>
          Date de fin :
          <hr className="hr-custom"/>
            <input name="dateFin" type="date" onChange={e => setAddCol({...addCol, dateFin: e.target.value})}/>
          </label>
          <hr />
          <label>
          Choisissez un thème :
          <hr className="hr-custom"/>
          <select className="select-design" name="theme" onChange={e => setAddCol({...addCol, theme: e.target.value})}>
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
          <select className="select-design" name="availability" onChange={e => setAddCol({...addCol, availability: e.target.value})}>
            <option hidden value="default">Sélectionnez...</option>
            <option value="DISPONIBLE">Disponible</option>
            <option value="INDISPONIBLE">Indisponible</option>
            <option value="COMPLET">Complet</option>
            <option value="TERMINE">Terminé</option>
            <option value="ANNULE">Annulé</option>
          </select>
          </label>
          <hr />
          <hr className="hr-custom"/>
          <button type="submit">Enregistrer</button>
          <hr className="hr-custom"/>
          <hr className="hr-custom"/>
        </form>
        <Modal show={showModalAdd} onHide={handleCloseAdd}>
          <Modal.Body>La colonie a bien été ajoutée au catalogue !</Modal.Body>
            <Modal.Footer>
            <Button variant="primary" onClick={() => {handleCloseAdd; window.location.reload(false)}}>
            Continuer
            </Button>
            </Modal.Footer>
            </Modal>
        </Col>
      );
    }

  // Modifier une colonie - Onglet 2

    function updateColonie() {

        // Select any colonie from catalogue

          const [col, setCol] = useState([])
          const [data, setData] = useState([])
          useEffect(() => getColonie(), []);
      
              function getColonie() {
                setCol("Chargement...")
                fetch("http://localhost:8484/api/catalogue/colonies")
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
      
              const options = [col.newCol]
              console.log(options)
      
              const [selected, setSelected] = useState(null);
      
              const handleChange = (selectedOption) => {
                setSelected(selectedOption);
                console.log(`Option selected:`, selectedOption);
              };
      
              const functionTwo = (selectedOption) => {
                setData({...data, colonie: {id: selectedOption.value}});
              };

              console.log(`selected`, selected)

              // Update every fields from selected colonie

              const [updatedColonie, setUpdatedColonie] = useState([]);
              console.log(`colo`, updatedColonie)
    
              const handleUpdate = async (e) => {
                    e.preventDefault();
                  const response = await fetch("http://localhost:8484/api/colonie/update/" + selected.value, {
                    method: 'PUT',
                    body: JSON.stringify(updatedColonie),
                    headers: {
                      'Content-Type': 'application/json'
                    }
                  });
                  const result = await response.json();
                  console.log(`Put`, result);
                }

        return (    
            <Col>
            <label>
            Choisissez une colonie :
            <hr className="hr-custom"/> 
              <Select options={options[0]} defaultValue={{ label: "Sélectionnez...", value: "placeholder" }} onChange={(f) => {handleChange(f); functionTwo(f)}} autoFocus={true}/>
            </label>
            <div className="mt-4">
              {selected && <>Vous avez sélectionné la {selected.label}</>}
            </div>
            <hr className="hr-custom"/>
            <form onSubmit={handleUpdate}>
            <hr className="hr-custom"/>
            <label>
            Nom : 
            <hr className="hr-custom"/>
              <input name="name" type="text" defaultValue="Entrez un nom..." onChange={e => setUpdatedColonie({...updatedColonie, name: e.target.value})}/>
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
              <select className="select-design" name="theme" type="text" onChange={e => setUpdatedColonie({...updatedColonie, id: selected.value, theme: e.target.value})}>
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
          </Col>
        );
      }

      // Supprimer une colonie - Onglet 3

      function deleteColonie() {

        // Select any colonie from catalogue

        const [col, setCol] = useState([])
          const [data, setData] = useState([])
          useEffect(() => getColonie(), []);
      
              function getColonie() {
                setCol("Chargement...")
                fetch("http://localhost:8484/api/colonie/toDelete")
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
      
              const options = [col.newCol]
              console.log(options)
      
              const [selected, setSelected] = useState(null);
      
              const handleChange = (selectedOption) => {
                setSelected(selectedOption);
                console.log(`Option selected:`, selectedOption);
              };
      
              const functionTwo = (selectedOption) => {
                setData({...data, colonie: {id: selectedOption.value}});
              };

              console.log(`selected`, selected)

              // Delete selected colonie

              const [showModal, setShow] = useState(false);

              const handleClose = () => setShow(false);

              const handleDelete = (event) => {
                event.preventDefault();
                fetch("http://localhost:8484/api/colonie/delete/" + selected.value, {
                  method: 'DELETE'})
                  .then(() => console.log("good"));

                  setShow(true)
              }

              return (    
                <Col>
                <label>
                Choisissez une colonie* :
                <hr className="hr-custom"/> 
                  <Select options={options[0]} defaultValue={{ label: "Sélectionnez...", value: "placeholder" }} onChange={(f) => {handleChange(f); functionTwo(f)}} autoFocus={true}/>
                </label>
                <hr className="hr-custom"/> 
                <h6 style={{ color: 'red' }}>*Seules les colonies sans participant peuvent être supprimées</h6>
                <div className="mt-4">
                  {selected && <>Vous avez sélectionné la {selected.label}</>}
                </div>
                <form onSubmit={handleDelete}>
                <hr className="hr-custom"/>
                  <button type="submit">Supprimer</button>
                <hr className="hr-custom"/>
                </form>
                <Modal show={showModal} onHide={handleClose}>
                    <Modal.Body>{selected && <>La {selected.label} a bien été supprimée !</>}</Modal.Body>
                    <Modal.Footer>
                    <Nav.Link 
                    variant="primary" 
                    as={Link} to="/adminSpace"
                    onClick={handleClose}>
                    Continuer
                    </Nav.Link>
                    </Modal.Footer>
                  </Modal>
                </Col>
                )
      }

      // Ajouter un témoignage

      function addTemoignage() {

        const [data, setData] = useState([]);

        const [catalogue, setCatalogue] = useState([])
        useEffect(() => fetchCatalogue(), [])
    
        function fetchCatalogue() {
        setCatalogue("Chargement...")
        fetch("http://localhost:8484/api/colonie/finished")
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
        fetch("http://localhost:8484/api/colonie/" + number)
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
            const url = 'http://localhost:8484/api/upload/';
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
        data[8] = "http://localhost:8484/api/upload/files/" + `${nomImage}`;
        console.log(`data`, data)
        const urlData = "http://localhost:8484/api/colonie/update/" + number;
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
        
        setShowTem(true)
      }

      const [showModalTem, setShowTem] = useState(false);

      const handleCloseTem = () => setShowTem(false);

      return(
        <div>
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
        <Modal show={showModalTem} onHide={handleCloseTem}>
          <Modal.Body>Le témoignage a bien été enregistré !</Modal.Body>
          <Modal.Footer>
          <Nav.Link 
          variant="primary" 
          as={Link} to="/adminSpace"
          onClick={handleCloseTem}>
            Continuer
          </Nav.Link>
          </Modal.Footer>
          </Modal>
        </Row>
        <hr className="hr-custom"/>
      </div>
      )
      }

    return (
        <AdminSpaceView updateColonie={() => updateColonie()} deleteColonie={() => deleteColonie()} addColonie={() => addColonie()} addTemoignage={() => addTemoignage()} />
    );
}