import React, {useState } from "react";
import { Col, Form, Row } from "react-bootstrap";


export default function CatalogueView(props){

    // ENlever les consoles + mettre des commentaires

    const [showColos, setShowColos] = useState([]);
    const [checkboxChecked, setCheckboxChecked] = useState(
        new Array(5).fill(false)
    );

    const arrayColo = [props.coloDispo, props.coloniesSpring, props.coloniesSummer, props.coloniesFall, props.coloniesWinter];


    const handleOnChange = (position) => {
        const updatedCheckedState = checkboxChecked.map((item, index) =>
          index === position ? !item : item
        );
    
        setCheckboxChecked(updatedCheckedState);
        console.log(updatedCheckedState)

        let newCol = []
        for (var i = 0; i <= 4; i++) {
            if(updatedCheckedState[i] === true){
                console.log("oui" + i)
                newCol.push(i)
            } else if (updatedCheckedState[i] === false){
                console.log("non" + i)
            }
       }
       console.log(newCol)
       setShowColos(newCol)
}

    console.log(showColos)

    return (
        <Row>
            <Col>
                <h3>Liste des colonies :</h3>
                <div>
                {
                    (() => {
                    if (checkboxChecked.includes(true)){
                        for (var i = 0; i <= showColos.length; i) {
                            if (showColos.includes(0)){
                                i++;
                                checkboxChecked.splice(1, 4, false, false, false, false)
                                return arrayColo[0];
                            } else {
                            i++
                            return showColos.map(x=>arrayColo[x])}}
                    } else {
                        return props.catalogue
                    }     
                    })()  
                    } 
                </div>
            </Col>
            <Col>
                <Row>
                    <h5>Filtrer par thème</h5>
                    <Form>
                    <div key={1}>
                    <Form.Check
                        inline
                        label="Printemps"
                        name="group1"
                        type="checkbox"
                        id={`custom-checkbox-${1}`}
                        disabled={checkboxChecked[0] === true}
                        checked={checkboxChecked[1]}
                        onChange={() => handleOnChange(1)} 
                    />
                    </div>
                    <div key={2}>
                    <Form.Check
                        inline
                        label="Eté"
                        name="group1"
                        type="checkbox"
                        id={`custom-checkbox-${2}`}
                        disabled={checkboxChecked[0] === true}
                        checked={checkboxChecked[2]}
                        onChange={() => handleOnChange(2)} 
                    />
                    </div>
                    <div key={3}>
                    <Form.Check
                        inline
                        label="Automne"
                        name="group1"
                        type="checkbox"
                        id={`custom-checkbox-${3}`}
                        disabled={checkboxChecked[0] === true}
                        checked={checkboxChecked[3]}
                        onChange={() => handleOnChange(3)} 
                    />
                    </div>
                    <div key={4}>
                    <Form.Check
                        inline
                        label="Hiver"
                        name="group1"
                        type="checkbox"
                        id={`custom-checkbox-${4}`}
                        disabled={checkboxChecked[0] === true}
                        checked={checkboxChecked[4]}
                        onChange={() => handleOnChange(4)} 
                    />
                    </div>
                </Form>
                </Row>
                <hr />
                <Row>
                    <h5>Filtrer par disponibilité</h5>
                    <Form>
                    <div key={0}>
                    <Form.Check
                        inline
                        label="Disponible"
                        name="group2"
                        type="switch"
                        id={`custom-checkbox-${0}`}
                        checked={checkboxChecked[0]}
                        onChange={() => handleOnChange(0)} 
                    />
                    </div>
                </Form>
                </Row>
                <hr />
            </Col>
        </Row>

    )

}

