import React, { Component } from 'react';
import { Avatar } from 'antd';
import { getAvatarColor } from './Colors';
import './Profile.css';
import { withKeycloak } from '@react-keycloak/web';
import NavBar from "./NavBar";

const UserInfo = ({ keycloak, keycloakInitialized }) => {
  localStorage.setItem("react-token", keycloak.token);
  localStorage.setItem("react-refresh-token", keycloak.refreshToken);
  localStorage.setItem("email-keycloak", keycloak.tokenParsed.email);

    setTimeout(() => {
        keycloak.updateToken(70).success((refreshed) => {
            if (refreshed) {
                console.debug('Token refreshed' + refreshed);
            } else {
                console.warn('Token not refreshed, valid for '
                    + Math.round(keycloak.tokenParsed.exp + keycloak.timeSkew - new Date().getTime() / 10000) + ' seconds');
            }
        }).error(() => {
            console.error('Failed to refresh token');
        });


    }, 60000)

    return (
    <div className="center">
      <NavBar/>
    <div className="UserInfo">
      {keycloak && keycloak.authenticated && 
        <div className="user-profile">
          <div className="user-details">
              <div className="user-avatar">
                  <Avatar className="user-avatar-circle" style={{ backgroundColor: getAvatarColor(keycloak.tokenParsed.name)}}>
                      {keycloak.tokenParsed.given_name[0]}{keycloak.tokenParsed.family_name[0]}
                  </Avatar>
              </div>
              <div className="user-summary">
                  <div className="full-name">{keycloak.tokenParsed.name}</div>
                  <div className="username">@{keycloak.tokenParsed.preferred_username}</div>
                  <div className="user-joined">{keycloak.tokenParsed.email}</div>
              </div>
          </div>
        </div>  
      }

  </div>
  </div>
    );
  }


export default withKeycloak(UserInfo);
