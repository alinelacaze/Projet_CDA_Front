import React from "react";

import ConnectionView from "../view/ConnectionView";

export default function ConnectionController(props) {

    // Mettre des commentaires

    const backUrl = "http://localhost:8484/api/security";

    function fetchPersonne(login, password) {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username: login, password: password })
        };
        fetch(`${backUrl}/authorize`, requestOptions)
            .then(response => response.json())
            .then(json => props.setPersonne({
                token: json.token,
                id: json.personne.id,
                firstname: json.personne.firstname,
                lastname: json.personne.lastname,
                role: json.personne.role
            }));
            localStorage.setItem('user', props.personne)
    }

    function registerPersonne(loginRegister, passwordRegister, firstname, lastname) {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username: loginRegister, password: passwordRegister, firstname: firstname, lastname: lastname, role: 'USER' })
        };
        fetch(`${backUrl}/register`, requestOptions)
            .then(response => response.json())
            .then(json => props.setPersonne({
                token: json.token,
                id: json.personne.id,
                firstname: json.personne.firstname,
                lastname: json.personne.lastname,
                role: json.personne.role
            }));
    }


     return (
         <ConnectionView fetchPersonne={(login, password) => fetchPersonne(login, password)} registerPersonne={(loginRegister, passwordRegister, firstname, lastname) => registerPersonne(loginRegister, passwordRegister, firstname, lastname)} />
     );
}