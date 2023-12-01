import React, { useEffect, useState } from "react";
import "whatwg-fetch";
import { Link } from 'react-router-dom';
import { Card } from "react-bootstrap";

import CatalogueView from "../view/CatalogueView";

export default function CatalogueController(props) {

// Code à enlever + Factorisation ?

  useEffect(() => fetchCatalogue(), [])
  useEffect(() => fetchColoniesSpring(), [])
  useEffect(() => fetchColoniesSummer(), [])
  useEffect(() => fetchColoniesFall(), [])
  useEffect(() => fetchColoniesWinter(), [])
  useEffect(() => getDispoColonie(), [])
  const [catalogue, setCatalogue] = useState([])
  const [coloniesSpring, setColoniesSpring] = useState([])
  const [coloniesSummer, setColoniesSummer] = useState([])
  const [coloniesFall, setColoniesFall] = useState([])
  const [coloniesWinter, setColoniesWinter] = useState([])
  const [coloDispo, setColoDispo] = useState([])

// Display only available colonies (switch ON/OFF)

  function getDispoColonie() {
    setColoDispo("Chargement...")
    fetch("http://34.163.222.87:8484/api/colonie/display")
       .then((response) => response.json())
       .then(json => setColoDispo(() => {
        let newCol = []
        for (let i = 0; i<json.length; i++){
          newCol.push(<li key={json[i].id}>
            <Card className="p-3">
                <h6>
                <span style={{ fontWeight: 'bold' }}>Description : </span>
                    <label>
                        {json[i].description}
                    </label>
                </h6>
                <h6>
                    <span style={{ fontWeight: 'bold' }}>Nom : </span>
                    <label>
                        {json[i].name}
                    </label>
                </h6>
                <h6>
                    <span style={{ fontWeight: 'bold' }}>Thème : </span>
                    <label>
                        {json[i].theme}
                    </label>
                </h6>
                <h6>
                    <span style={{ fontWeight: 'bold' }}>Disponibilité : </span>
                    <label>
                        {json[i].availability}
                    </label>
                </h6>
                <Link hidden={props.personne === null} className="link-custom" to={`/colonie/${json[i].id}`} params={{id: json[i].id}}>Voir plus</Link>
            </Card>
            <hr/>
            </li>
            )}
        return <ul className="list-unstyled">{newCol}</ul>
          }))
        }

// Display ALL colonies from catalogue (NO filtering)

    function fetchCatalogue() {
        setCatalogue("Chargement...")
        fetch("http://34.163.222.87:8484/api/catalogue/colonies")
          .then(response => response.json())
          .then(json => setCatalogue(() => {
            const newCatalogue = []
            for (let i = 0; i<json.length; i++){
              newCatalogue.push(<li key={json[i].id}>
                    <Card className="p-3">
                        <h6>
                        <span style={{ fontWeight: 'bold' }}>Description : </span>
                            <label>
                                {json[i].description}
                            </label>
                        </h6>
                        <h6>
                            <span style={{ fontWeight: 'bold' }}>Nom : </span>
                            <label>
                                {json[i].name}
                            </label>
                        </h6>
                        <h6>
                            <span style={{ fontWeight: 'bold' }}>Disponibilité : </span>
                            <label>
                                {json[i].availability}
                            </label>
                        </h6>
                        <Link hidden={props.personne === null} className="link-custom" to={`/colonie/${json[i].id}`} params={{id: json[i].id}}>Voir plus</Link>
                    </Card>
                    <hr/>
                    </li>
                    )}
            return <ul className="list-unstyled">{newCatalogue}</ul>
        }))
    }

// Display spring colonies (spring filter checked) + link "voir plus" redirect to colonie view

    const fetchColoniesSpring = () => {
      setColoniesSpring("Chargement...")
      fetch("http://34.163.222.87:8484/api/colonie/spring")
        .then(response => response.json())
        .then(json => setColoniesSpring(() => {
          const newColPrintemps = []
          for (let i = 0; i<json.length; i++){
              newColPrintemps.push(<li key={json[i].id}>
              <Card className="p-3">
                  <h6>
                  <span style={{ fontWeight: 'bold' }}>Description : </span>
                      <label>
                          {json[i].description}
                      </label>
                  </h6>
                  <h6>
                      <span style={{ fontWeight: 'bold' }}>Nom : </span>
                      <label>
                          {json[i].name}
                      </label>
                  </h6>
                  <h6>
                    <span style={{ fontWeight: 'bold' }}>Thème : </span>
                    <label>
                        {json[i].theme}
                    </label>
                </h6>
                  <h6>
                      <span style={{ fontWeight: 'bold' }}>Disponibilité : </span>
                      <label>
                          {json[i].availability}
                      </label>
                  </h6>
                  <Link hidden={props.personne === null} className="link-custom" to={`/colonie/${json[i].id}`} params={{id: json[i].id}}>Voir plus</Link>
              </Card>
              <hr/>
              </li>
              )}
          return <ul className="list-unstyled">{newColPrintemps}</ul>
      }))
  }

// Display summer colonies (summer filter checked) + link "voir plus" redirect to colonie view

  const fetchColoniesSummer = () => {
    setColoniesSummer("Chargement...")
    fetch("http://34.163.222.87:8484/api/colonie/summer")
      .then(response => response.json())
      .then(json => setColoniesSummer(() => {
        const newColSummer = []
        for (let i = 0; i<json.length; i++){
          newColSummer.push(<li key={json[i].id}>
            <Card className="p-3">
                <h6>
                <span style={{ fontWeight: 'bold' }}>Description : </span>
                    <label>
                        {json[i].description}
                    </label>
                </h6>
                <h6>
                    <span style={{ fontWeight: 'bold' }}>Nom : </span>
                    <label>
                        {json[i].name}
                    </label>
                </h6>
                <h6>
                    <span style={{ fontWeight: 'bold' }}>Thème : </span>
                    <label>
                        {json[i].theme}
                    </label>
                </h6>
                <h6>
                    <span style={{ fontWeight: 'bold' }}>Disponibilité : </span>
                    <label>
                        {json[i].availability}
                    </label>
                </h6>
                <Link hidden={props.personne === null} className="link-custom" to={`/colonie/${json[i].id}`} params={{id: json[i].id}}>Voir plus</Link>
            </Card>
            <hr/>
            </li>
            )}
        return <ul className="list-unstyled">{newColSummer}</ul>
    }))
}

// Display fall colonies (fall filter checked) + link "voir plus" redirect to colonie view

const fetchColoniesFall = () => {
  setColoniesFall("Chargement...")
  fetch("http://34.163.222.87:8484/api/colonie/fall")
    .then(response => response.json())
    .then(json => setColoniesFall(() => {
      const newColFall = []
      for (let i = 0; i<json.length; i++){
        newColFall.push(<li key={json[i].id}>
          <Card className="p-3">
              <h6>
              <span style={{ fontWeight: 'bold' }}>Description : </span>
                  <label>
                      {json[i].description}
                  </label>
              </h6>
              <h6>
                  <span style={{ fontWeight: 'bold' }}>Nom : </span>
                  <label>
                      {json[i].name}
                  </label>
              </h6>
              <h6>
                    <span style={{ fontWeight: 'bold' }}>Thème : </span>
                    <label>
                        {json[i].theme}
                    </label>
                </h6>
              <h6>
                  <span style={{ fontWeight: 'bold' }}>Disponibilité : </span>
                  <label>
                      {json[i].availability}
                  </label>
              </h6>
              <Link hidden={props.personne === null} className="link-custom" to={`/colonie/${json[i].id}`} params={{id: json[i].id}}>Voir plus</Link>
          </Card>
          <hr/>
          </li>
          )}
      return <ul className="list-unstyled">{newColFall}</ul>
  }))
}

// Display winter colonies (spring winter checked) + link "voir plus" redirect to colonie view

const fetchColoniesWinter = () => {
  setColoniesWinter("Chargement...")
  fetch("http://34.163.222.87:8484/api/colonie/winter")
    .then(response => response.json())
    .then(json => setColoniesWinter(() => {
      const newColWinter = []
      for (let i = 0; i<json.length; i++){
        newColWinter.push(<li key={json[i].id}>
          <Card className="p-3">
              <h6>
              <span style={{ fontWeight: 'bold' }}>Description : </span>
                  <label>
                      {json[i].description}
                  </label>
              </h6>
              <h6>
                  <span style={{ fontWeight: 'bold' }}>Nom : </span>
                  <label>
                      {json[i].name}
                  </label>
              </h6>
              <h6>
                    <span style={{ fontWeight: 'bold' }}>Thème : </span>
                    <label>
                        {json[i].theme}
                    </label>
                </h6>
              <h6>
                  <span style={{ fontWeight: 'bold' }}>Disponibilité : </span>
                  <label>
                      {json[i].availability}
                  </label>
              </h6>
              <Link hidden={props.personne === null} className="link-custom" to={`/colonie/${json[i].id}`} params={{id: json[i].id}}>Voir plus</Link>
          </Card>
          <hr/>
          </li>
          )}
      return <ul className="list-unstyled">{newColWinter}</ul>
  }))
}

/* TODO: supprimer le code (vérifier tout est OK spaceAdmin)
    const [data, setData] = useState({});

    function addColonie() {

      const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://34.163.222.87:8484/api/space/colonie', {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const result = await response.json();
        console.log(result);
      }

      return (
        <form onSubmit={handleSubmit}>
          <hr className="hr-custom"/>
          <label>
          Description : 
          <hr className="hr-custom"/>
            <input name="description" type="text" onChange={e => setData({...data, description: e.target.value})} />
          </label>
          <hr />
          <label>
          Date d'ajout :
          <hr className="hr-custom"/>
            <input name="dateAjout" type="toLocaleDateString" onChange={e => setData({...data, dateAjout: e.target.value})}/>
          </label>
          <hr />
          <label>
            Nom : 
            <hr className="hr-custom"/>
            <input name="name" type="text" onChange={e => setData({...data, name: e.target.value})}/>
          </label>
          <hr />
          <label>
          Date de début :
          <hr className="hr-custom"/>
            <input name="dateDebut" type="toLocaleDateString" onChange={e => setData({...data, dateDebut: e.target.value})}/>
          </label>
          <hr />
          <label>
          Date de fin :
          <hr className="hr-custom"/>
            <input name="dateFin" type="toLocaleDateString" onChange={e => setData({...data, dateFin: e.target.value})}/>
          </label>
          <hr />
          <label>
          Choisissez un thème :
          <hr className="hr-custom"/>
          <select className="select-design" name="theme" onChange={e => setData({...data, theme: e.target.value})}>
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
          <select className="select-design" name="availability" onChange={e => setData({...data, availability: e.target.value})}>
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
      );
    }
    */

    return (
        <CatalogueView coloDispo={coloDispo} coloniesSpring={coloniesSpring} coloniesSummer={coloniesSummer} coloniesFall={coloniesFall} coloniesWinter={coloniesWinter} catalogue={catalogue} />
    );
}