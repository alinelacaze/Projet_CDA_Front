import React, { useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Link } from 'react-router-dom';

export default function Welcome(props) {

    const [showBounceSpring, setShowBounceSpring] = useState(false)

    const handleMouseEnterSpring = e => {
        setShowBounceSpring(true)
      }
      const handleMouseLeaveSpring = e => {
        setShowBounceSpring(false)
      }

      const [showBounceSummer, setShowBounceSummer] = useState(false)

      const handleMouseEnterSummer = e => {
        setShowBounceSummer(true)
        }
        const handleMouseLeaveSummer = e => {
            setShowBounceSummer(false)
        }

        const [showBounceFall, setShowBounceFall] = useState(false)

        const handleMouseEnterFall = e => {
            setShowBounceFall(true)
          }
          const handleMouseLeaveFall = e => {
            setShowBounceFall(false)
          }

          const [showBounceWinter, setShowBounceWinter] = useState(false)

          const handleMouseEnterWinter = e => {
            setShowBounceWinter(true)
            }
            const handleMouseLeaveWinter = e => {
                setShowBounceWinter(false)
            }

        const [spring, setSpring] = useState([])

        const fetchColSpring = () => {
            setSpring("Chargement...")
            fetch("http://34.163.222.87:8484/api/colonie/spring")
              .then(response => response.json())
              .then(json => setSpring(() => {
                const newColSpring = []
                for (let i = 0; i<json.length; i++){
                    newColSpring.push(<li key={json[i].id}>
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
                return <ol>{newColSpring}</ol>
            }))
        }

        const [summer, setSummer] = useState([])

        const fetchColSummer = () => {
            setSummer("Chargement...")
            fetch("http://34.163.222.87:8484/api/colonie/summer")
              .then(response => response.json())
              .then(json => setSummer(() => {
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
                return <ol>{newColSummer}</ol>
            }))
        }

        const [fall, setFall] = useState([])

        const fetchColFall = () => {
            setFall("Chargement...")
            fetch("http://34.163.222.87:8484/api/colonie/fall")
              .then(response => response.json())
              .then(json => setFall(() => {
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
                return <ol>{newColFall}</ol>
            }))
        }

        const [winter, setWinter] = useState([])

        const fetchColWinter = () => {
            setWinter("Chargement...")
            fetch("http://34.163.222.87:8484/api/colonie/winter")
              .then(response => response.json())
              .then(json => setWinter(() => {
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
                return <ol>{newColWinter}</ol>
            }))
        }

    return (
        <Col>
            <Row>
                <hr className="hr-custom"/>
                <h4 className="text-center fst-italic">Bienvenue aux Séjours Altiplano !</h4>
                <hr className="hr-custom"/>
            </Row>
            <hr className="hr-custom"/>
            <h5>Choisissez une saison ... </h5>
            <h5 hidden={props.personne !== null}><Link to={"/connection"}>Connectez-vous</Link> pour vous inscrire à une colonie ! </h5>
            <hr className="hr-custom"/>
            < hr/>
            <Row className="d-flex justify-content-center">
                <Col onClick={fetchColSpring}>
                    <h4
                    onMouseEnter={handleMouseEnterSpring}
                    onMouseLeave={handleMouseLeaveSpring}
                    >                        
                    {showBounceSpring === true && <i style={{ color: 'green' }} className="fa fa-seedling fa-2x fa-bounce" />}
                    {showBounceSpring === false && <i style={{ color: 'green' }} className="fa fa-seedling fa-2x" />}
                    {'  '}Printemps </h4>
                    <i className="ms-1 me-1 fa fa-binoculars fa-1x"/>
                    <i className="ms-1 me-1 fa fa-person-hiking fa-1x"/>
                    <hr className="hr-custom"/>
                    {spring}
                </Col>
                <Col onClick={fetchColSummer}>
                    <h4
                    onMouseEnter={handleMouseEnterSummer}
                    onMouseLeave={handleMouseLeaveSummer}
                    >                         
                    {showBounceSummer === true && <i style={{ color: 'orange' }} className="fa fa-sun fa-2x fa-bounce" />}
                    {showBounceSummer === false && <i style={{ color: 'orange' }} className="fa fa-sun fa-2x" />}
                    {'  '}Eté </h4>
                    <i className="ms-1 me-1 fa fa-campground fa-1x"/>
                    <i className="ms-1 me-1 fa fa-person-swimming fa-1x"/>
                    <hr className="hr-custom"/>
                    {summer}
                </Col>
                <Col onClick={fetchColFall}>
                    <h4
                    onMouseEnter={handleMouseEnterFall}
                    onMouseLeave={handleMouseLeaveFall}
                    >                        
                    {showBounceFall === true && <i style={{ color: 'darkgoldenrod' }} className="fa fa-leaf fa-2x fa-bounce" />}
                    {showBounceFall === false && <i style={{ color: 'darkgoldenrod' }} className="fa fa-leaf fa-2x" />}
                    {'  '}Automne </h4>
                    <i className="ms-1 me-1 fa fa-campground fa-1x"/>
                    <i className="ms-1 me-1 fa fa-person-hiking fa-1x"/>
                    <hr className="hr-custom"/>
                    {fall}
                </Col>
                <Col onClick={fetchColWinter}>
                    <h4
                    onMouseEnter={handleMouseEnterWinter}
                    onMouseLeave={handleMouseLeaveWinter}
                    >                         
                    {showBounceWinter === true && <i style={{ color: 'lightblue' }} className="fa fa-snowflake fa-2x fa-bounce" />}
                    {showBounceWinter === false && <i style={{ color: 'lightblue' }} className="fa fa-snowflake fa-2x" />}
                    {'  '}Hiver </h4>
                     <i className="ms-1 me-1 fa fa-dice fa-1x"/>
                     <i className="ms-1 me-1 fa fa-person-skiing fa-1x"/>
                     <hr className="hr-custom"/>
                     {winter}
                </Col>
            </Row>
        </Col> 
    );
}