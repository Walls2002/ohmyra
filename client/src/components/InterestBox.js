import React, { useState, useEffect } from "react";
import { Form, InputGroup } from "react-bootstrap";

export default function InterestBox({ socket }) {
  const [interestsCheck, setInterestsCheck] = useState(() => {
    const storedValue = localStorage.getItem("interestsCheck");
    return storedValue === "true";
  });
  const [interestsInString, setInterestsInString] = useState(() => {
    return localStorage.getItem("interestsInString") === undefined
      ? ""
      : localStorage.getItem("interestsInString");
  });

  function handleChangeCheckBox(e) {
    let isChecked = e.target.checked;
    console.log(isChecked);
    setInterestsCheck(isChecked);
    socket.emit("check_interests", {
      isChecked: isChecked,
    });
  }

  function interesetOnchnage(event) {
    setInterestsInString(event.target.value);
  }

  if (interestsCheck) {
    socket.emit("check_interests", {
      isChecked: interestsCheck,
    });
    socket.emit("interests_list", {
      interestsList: interestsInString.toLowerCase().split(" "),
    });
    console.log(interestsInString);
  }

  useEffect(() => {
    localStorage.setItem("interestsInString", interestsInString);
    localStorage.setItem("interestsCheck", interestsCheck);

    if (interestsInString !== null || interestsInString !== undefined) {
      socket.emit("interests_list", {
        interestsList: interestsInString.toLowerCase().split(" "),
      });
    }
  }, [interestsInString, socket, interestsCheck]);

  // Watch for changes to localStorage in other tabs
  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === "interestsCheck") {
        // Update the checkbox state when localStorage changes in another tab
        setInterestsCheck(event.newValue === "true");
      }
    };

    window.addEventListener("storage", handleStorageChange);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <div>
      <InputGroup className="mb-3">
        <InputGroup.Checkbox
          aria-label="Checkbox for following text input"
          style={{ backgroundColor: "black" }}
          onChange={handleChangeCheckBox}
          checked={interestsCheck}
        />
        <Form.Control
          disabled={!interestsCheck}
          onChange={(e) => {
            interesetOnchnage(e);
          }}
          value={interestsInString || ""}
          placeholder="Add your interests or school here"
          aria-label="Text input with checkbox"
        />
      </InputGroup>
    </div>
  );
}
