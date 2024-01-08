import React, { useState } from "react";
import styled from "styled-components";
import BackgroundImage from "../components/BackgroundImage";
import Headers from "../components/Header";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const Navigate = useNavigate();
  const [formValues, setFormvalues] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async () => {
    try {
      const { email, password } = formValues;
      await signInWithEmailAndPassword(firebaseAuth, email, password);

      // Wait for the user to be authenticated before redirecting
      onAuthStateChanged(firebaseAuth, (currentUser) => {
        if (currentUser) {
          Navigate("/");
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      <BackgroundImage />
      <div className="content">
        <Headers signup />
        <div className="body flex column a-center j-center">
          <div className="form-container">
            <div className="login-text">Login</div>
            <div className="form">
              <input
                type="email"
                placeholder="Email Address"
                name="email"
                value={formValues.email}
                onChange={(e) =>
                  setFormvalues({
                    ...formValues,
                    [e.target.name]: e.target.value,
                  })
                }
              />
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={formValues.password}
                onChange={(e) =>
                  setFormvalues({
                    ...formValues,
                    [e.target.name]: e.target.value,
                  })
                }
              />
              <button className="get-started" onClick={handleLogin}>
                Log In
              </button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  position: relative;

  .content {
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.7);
    height: 100vh;
    width: 100vw;
    display: grid;
    grid-template-rows: 15vh 85vh;
    padding-bottom: 20px;

    .body {
      gap: 2rem;
      color: white;

      .text {
        gap: 1rem;
        text-align: center;
        font-size: 2rem;

        h1 {
          padding: 0 1rem;
          color: #e50914;
          font-size: 2.5rem;
        }
      }

      .form-container {
        background-color: rgba(0, 0, 0, 0.5); /* Transparent black */
        padding: 2rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 30%; /* Adjust the width as desired */
        .login-text {
          color: white;
          font-size: 1.5rem;
          text-align: center;
          margin-bottom: 1rem;
        }

        .form {
          display: grid;
          gap: 1rem;
          width: 100%;
          background-color: rgba(0, 0, 0, 0.2);
          padding: 1rem;
          input {
            color: black;
            border: none;
            padding: 1rem;
            font-size: 1.2rem;
            border: 1px solid black;
            &:focus {
              outline: none;
            }
          }

          button.get-started {
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 0.5rem 1rem;
            background-color: #e50914;
            border: none;
            cursor: pointer;
            color: white;
            font-weight: bolder;
            font-size: 1.05rem;
          }
        }
      }
    }
  }
`;
