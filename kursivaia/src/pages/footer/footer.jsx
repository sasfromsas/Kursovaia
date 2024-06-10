import React, { useState, useEffect } from 'react';
import './footer.css'
import { Form, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './../../images/icons8-discord-50.png'
const Footer = () => {
  // Состояние для хранения имени пользователя

  const navigate = useNavigate();

  return (
    <div className="FooterMain">
        <div className="content">
            <div className="InnerContent">
                <div className="DiscordIcon"></div>
                <a href="https://discord.gg/94JtJ3E9Ww" style={{marginLeft:'5px'}}>Discord</a>
            </div>
            <div className="InnerContent">
                <div className="GitHubIcon"></div>
                <a href="https://github.com/sasfromsas" style={{marginLeft:'5px'}}>GitHub</a>
                <a href=""></a>
            </div>
        </div>
        
    </div>
  );
};

export default Footer;
