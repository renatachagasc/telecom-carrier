import React, { useState } from 'react';
import './index.css';
import { Link } from 'react-router-dom';
import Ink from 'react-ink';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Routes from '../../api/routes';
import avatar from "../../assets/img/avatar.png";

const Topbar = () => {
  const [selected, setSelected] = useState(window.location.pathname);

  return (
    <div className="topbar">
      <div className="topbar-header p-5">
        <div className="w-100 h-100 d-flex flex-column justify-content-between align-items-start">
          <div className="d-flex flex-row align-items-center">
            <img alt="avatar" className="avatar rounded-circle mr-2 order-0" src={avatar} />
            <div>
              <p className="avatar-name">Renata Chagas</p>
              <p className="avatar-office">Admin</p>
            </div>
          </div>
          <h1>Telecom Carrier</h1>
        </div>
      </div>
      <div className="topbar-options pl-5">
        <div className="topbar-options-top">

          { Routes.map(route => 
              <Link to={`/${route.name}`} key={`${route.title}`}>
                <div className={`topbar-option ${selected === `/${route.name}` ? 'selected' : ''}`} onClick={() => { setSelected(`/${route.name}`); }} aria-hidden="true">
                  <div className="topbar-option-svg"><FontAwesomeIcon size="1x" icon={route.icon} /></div>
                  <p className="topbar-option-text">{route.title}</p>
                  <Ink />
                </div>
              </Link>
            ) }

        </div>
      </div>
    </div>
  );
};

export default Topbar;
