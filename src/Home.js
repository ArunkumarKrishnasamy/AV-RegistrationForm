import React from "react";
import Form from "./Form";
import Login from "./Login";

function Home() {
  return (
    <div>
      <div className="row">
        <Form />
        <Login />
      </div>
    </div>
  );
}

export default Home;
