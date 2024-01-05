import React, { useState } from "react";
import styled from "styled-components";
import BackgroundImage from "../components/BackgroundImage";
import Headers from "../components/Header";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const Navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formValues, setFormvalues] = useState({
    email: "",
    password: "",
  });

  const handleSignIn = async () => {
    try {
      const { email, password } = formValues;
      await createUserWithEmailAndPassword(firebaseAuth, email, password);
  
      // Wait for the user to be created before redirecting
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
    <Container showPassword={showPassword}>
      <BackgroundImage />
      <div className="content">
        <Headers login />
        <div className="body flex column a-center j-center">
          <div className="text flex column">
            <h1>Unlimited movies, TV shows and more</h1>
            <h4>Watch anywhere, cancel anytime</h4>
            <h6>
              Ready to watch? Enter your email to create or restart membership
            </h6>
          </div>
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
            {showPassword && (
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
            )}
            {!showPassword && (
              <button
                className="get-started"
                onClick={() => setShowPassword(true)}
              >
                Get Started
              </button>
            )}
          </div>
          <button onClick={handleSignIn}>Sign Up</button>
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

      .form {
        display: grid;
        gap: 1rem;
        width: 60%;
        background-color: rgba(0, 0, 0, 0.2);
        padding: 1rem;
        grid-template-columns: ${({ showPassword }) =>
          showPassword ? "1fr 1fr" : "2fr 1fr"};
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

      button {
        display: flex;
        padding: 0.5rem 1rem;
        background-color: #e50914;
        border: none;
        cursor: pointer;
        color: white;
        border-radius: 0.2rem;
        font-weight: bolder;
        font-size: 1.05rem;
      }
    }
  }
`;
