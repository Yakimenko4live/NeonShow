import React from 'react';
import styled from 'styled-components';
import contactIcon from '../assets/icon-contact.png';

const ContactButton = () => {
  return (
    <StyledWrapper>
      <a href="#contact" className="contact-btn">
        <div className="spinner" />
        <div className="fill" />
        <img src={contactIcon} alt="Contact" className="icon" />
      </a>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .contact-btn {
    position: fixed;
    bottom: 30px;
    right: 80px;
    z-index: 999;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    text-decoration: none;
    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .contact-btn:hover {
    transform: scale(1.1);
  }

  .contact-btn:active {
    transform: scale(0.95);
  }

  .spinner {
    position: absolute;
    inset: 0;
    border-radius: 50%;
    background-image: linear-gradient(rgb(163, 35, 105) 35%, rgb(0, 180, 210));
    animation: spinning82341 1.7s linear infinite;
    filter: blur(1px);
    box-shadow:
      0px -5px 15px 0px rgb(200, 55, 111),
      0px 5px 15px 0px rgb(0, 180, 210);
  }

  .fill {
    position: absolute;
    inset: 6px;
    border-radius: 50%;
    background: conic-gradient(
      from 0deg,
      rgba(0, 180, 210, 0.7),
      rgba(200, 55, 111, 0.7),
      rgba(210, 40, 100, 0.7),
      rgba(0, 180, 210, 0.7)
    );
    animation: spinning82341 2.5s linear infinite reverse;
    filter: blur(3px);
  }

  .icon {
    position: relative;
    z-index: 2;
    width: 32px;
    height: 32px;
    object-fit: contain;
    pointer-events: none;
    animation: icon-glow 2.5s ease-in-out infinite;
  }

  @keyframes spinning82341 {
    to {
      transform: rotate(360deg);
    }
  }

  @keyframes icon-glow {
    0%, 100% {
      filter: drop-shadow(0 0 3px rgba(0, 180, 210, 0.6))
              drop-shadow(0 0 8px rgba(0, 180, 210, 0.3))
              brightness(1);
    }
    50% {
      filter: drop-shadow(0 0 6px rgba(255, 255, 255, 0.7))
              drop-shadow(0 0 12px rgba(200, 55, 111, 0.4))
              brightness(1.2);
    }
  }
`;

export default ContactButton;
