import "./App.css";
import moment from "moment";

import styled from "styled-components";
import ClearIcon from "@mui/icons-material/Clear";
import { useRef, useState } from "react";

let initialList = [
  {
    name: "MARTHA",
    lastName: "YOHANES",
    country: "FINLAND",
    score: 85,
    date: moment().format("lll"),
  },
  {
    name: "DAVID",
    lastName: "SMITH",
    country: "UNITED KINGDOM",
    score: 80,
    date: moment().format("lll"),
  },
  {
    name: "ASABENEH",
    lastName: "YETAYEH",
    country: "FINLAND",
    score: 75,
    date: moment().format("lll"),
  },
  {
    name: "MATHIAS",
    lastName: "ELIAS",
    country: "SWEDEN",
    score: 70,
    date: moment().format("lll"),
  },
];

function App() {
  const [list, setList] = useState(initialList);
  const [score, setScore] = useState(Number(""));
  const [buttonPressed, setButtonPressed] = useState(true);
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const countryRef = useRef(null);
  const scoreRef = useRef(null);

  const AddHandler = (e) => {
    e.preventDefault();

    setButtonPressed(false);
    console.log("meeee", buttonPressed);

    if (
      !firstNameRef.current.value &&
      !lastNameRef.current.value &&
      !countryRef.current.value &&
      !scoreRef.current.value
    )
      return;

    initialList.push({
      name: firstNameRef.current.value.toUpperCase(),
      lastName: lastNameRef.current.value.toUpperCase(),
      country: countryRef.current.value.toUpperCase(),
      score: Number(scoreRef.current.value),
      date: moment().format("lll"),
    });
    setList([...initialList]);
  };
  const HandleDelete = (index) => {
    initialList = initialList.filter((_, i) => i !== index);
    setList([...initialList]);
  };
  const HandleScoreIncrease = (object) => {
    setScore((object.score += 5));
  };
  const HandleScoreDecrease = (object) => {
    setScore((object.score -= 5));
  };

  return (
    <div className="app">
      <h1>Leaderboard Application</h1>
      <Wrap>
        <form>
          <input placeholder="First Name" ref={firstNameRef} required />
          <input placeholder="Last Name" ref={lastNameRef} required />
          <input placeholder="country" ref={countryRef} type="text" required />
          <input placeholder="Player Score" ref={scoreRef} required />
          <button onClick={AddHandler}>Add Player</button>
        </form>
        {!firstNameRef.current?.value &&
        !lastNameRef.current?.value &&
        !countryRef.current?.value &&
        !scoreRef.current?.value &&
        buttonPressed === false ? (
          <P>All fields required!</P>
        ) : (
          ""
        )}
      </Wrap>

      <Wrapper>
        {list
          .sort((a, b) => (b.score > a.score ? 1 : -1))
          .map((item, i) => (
            <Li key={i}>
              <SpanWrapper>
                <NLD>
                  <div>
                    <span>{item.name}</span>
                    <span>{item.lastName}</span>
                  </div>
                  <Span>{item.date}</Span>
                </NLD>

                <span>{item.country}</span>
                <span>{item.score}</span>
              </SpanWrapper>
              <ButtonWrapper>
                <Button
                  onClick={() => {
                    HandleDelete(i);
                  }}
                >
                  <ClearIcon />
                </Button>
                <Button
                  onClick={() => {
                    HandleScoreIncrease(item);
                  }}
                >
                  +{5}
                </Button>
                <Button
                  onClick={() => {
                    HandleScoreDecrease(item);
                  }}
                >
                  -{5}
                </Button>
              </ButtonWrapper>
            </Li>
          ))}
      </Wrapper>
    </div>
  );
}

export default App;

const Span = styled.span`
  color: #bdaaad;
`;

const SpanWrapper = styled.div`
  flex: 0.7;
  display: flex;
  align-items: center;
  justify-content: space-between;
  > span {
    margin: 0 0px;
  }
`;

const ButtonWrapper = styled.div`
  margin-right: 10px;
  > button {
    margin-left: 10px;
  }
  display: flex;
  align-items: center;
`;

const NLD = styled.div`
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  > div > span {
    margin-right: 5px;
  }
`;

const Wrap = styled.div`
  margin-top: 20px;
  > form > input {
    padding: 10px;
    margin-right: 5px;
    font-size: 15px;
    outline-color: #e5c9c5;
    border: 1px solid #e5c9c5;
  }
  > form {
    display: flex;
  }
  display: flex;
  flex-direction: column;
  align-items: center;
  > form > button {
    background-color: #e5c9c5;
    border: none;
    font-size: 15px;
    color: white;
    padding: px;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 935px;
  min-width: 250px;
`;

const Li = styled.div`
  width: 100%;
  padding: 10px;
  background-color: #e5c9c5;
  margin-top: 10px;
  > span {
    margin-right: 5px;
  }
  > button {
    margin-right: 5px;
  }
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const P = styled.p`
  margin-top: 20px;
  margin-bottom: 10px;
  font-weight: 500;
  letter-spacing: 1.3px;
  color: red;
  font-size: 20px;
`;
const Button = styled.button`
  background-color: white;
  border: none;
  border-radius: 50%;
  padding: 20px;

  cursor: pointer;
  > .MuiSvgIcon-root {
    width: 15px;
    height: 15px;
    display: flex;
  }
`;
