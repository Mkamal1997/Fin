import Keycloak from 'keycloak-js'
const keycloakConfig = {
   url: 'http://localhost:8080/auth', 
   realm: 'FinancementProjet', 
   clientId: 'Financement_Projet'
}
const keycloak = new Keycloak(keycloakConfig);

const onTokens = tokens => {
  window.localStorage.setItem('authToken', tokens.token);
};

export default keycloak