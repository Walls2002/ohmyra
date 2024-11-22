import React, { useState, useEffect } from "react";
import { Form, InputGroup, Button } from "react-bootstrap";

export default function InterestBox({ socket }) {
  const [interestsCheck, setInterestsCheck] = useState(false);

  const [interestsInString, setInterestsInString] = useState(() => {
    return localStorage.getItem("interestsInString") === undefined
      ? ""
      : localStorage.getItem("interestsInString");
  });
  const [interestsInArray, setInterestsInArray] = useState([]);

  socket.on("get_interests", (data) => {
    setInterestsCheck(data.isInterestChecked);
    setInterestsInString(data.interestsList);
    console.log("Interest List: ", data.interestsList);
  });

  function handleChangeCheckBox(e) {
    let isChecked = e.target.checked;
    console.log(isChecked);
    setInterestsCheck(isChecked);

    socket.emit("check_interests", {
      isChecked: isChecked,
    });
  }
  function saveInterests() {
    setInterestsInArray(interestsInString.split(" "));

    const interestsToArray = interestsInString.toLowerCase().split(" ");

    socket.emit("interests_list", {
      interestsList: interestsToArray,
    });
  }

  useEffect(() => {
    if (interestsInString !== null && interestsInString !== undefined) {
      localStorage.setItem("interestsInString", interestsInString);
    }
  }, [interestsInString]);

  return (
    <div>
      <InputGroup className="mb-3">
        <InputGroup.Checkbox
          aria-label="Checkbox for following text input"
          style={{ backgroundColor: "black" }}
          onChange={handleChangeCheckBox}
          value={interestsCheck}
        />
        <Form.Control
          disabled={!interestsCheck}
          onChange={(e) => setInterestsInString(e.target.value)}
          value={interestsInString || ""}
          placeholder="Add your interests or school here"
          aria-label="Text input with checkbox"
        />
        <Button
          onClick={saveInterests}
          disabled={!interestsCheck}
          variant="dark"
          id="button-addon2"
        >
          Save
        </Button>
      </InputGroup>

      {interestsCheck ? (
        <div style={{ overflowWrap: "anywhere", textAlign: "center" }}>
          <span style={{ color: "rgb(43, 48, 53)" }} className="fw-bold">
            Interest
          </span>
          :
          {interestsInArray.map((interest, index) => (
            <span
              key={index}
              style={{ marginLeft: "8px", color: "rgb(43, 48, 53)" }}
            >
              "{interest}"
            </span>
          ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
