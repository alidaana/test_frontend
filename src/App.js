import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "./DataTable";
import "./App.css";

function App() {
  const [vehicles, setVehicles] = useState(null);
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [description, setDesc] = useState("");

  const [makeEdit, setMakeEdit] = useState("");
  const [modelEdit, setModelEdit] = useState("");
  const [yearEdit, setYearEdit] = useState("");
  const [descriptionEdit, setDescEdit] = useState("");

  const [responseFetch, setres] = useState("");
  const [disable, setDisable] = useState(true);
  const [id, setId] = useState("");

  async function getVehicles() {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/vehicles");
      console.log(response);

      setVehicles(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  async function addVehicle() {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/vehicles/add",
        {
          make: make,
          model: model,
          year: year,
          description: description,
          image: "image",
        }
      );
      console.log(response);
      setres(response);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getVehicles();
    console.log(vehicles);
  }, []);

  useEffect(() => {
    console.log(vehicles);
  }, [vehicles, responseFetch]);

  useEffect(() => {
    getVehicles();
  }, [responseFetch]);

  const deleteVehicle = async (id) => {
    try {
      const response = await axios.delete(
        `http://127.0.0.1:8000/api/vehicles/delete/${id}`
      );
      console.log(response);
      setres(response);
    } catch (error) {
      console.error(error);
    }
  };

  const editVehicle = (id, make, model, desc, year) => {
    console.log("this is the edit " + id, make, model, year, desc);
    setMakeEdit(make);
    setDescEdit(desc);
    setModelEdit(model);
    setYearEdit(+year);
    setId(id);

    setDisable(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addVehicle();
  };

  const handleEdit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/vehicles/${id}`,
        {
          make: makeEdit,
          model: modelEdit,
          year: yearEdit,
          description: descriptionEdit,
          image: "image",
        }
      );
      console.log(response);
      setres(response);
    } catch (error) {
      console.error(error);
    }

    setMakeEdit("");
    setDescEdit("");
    setModelEdit("");
    setYearEdit("");
    setId("");

    setDisable(true);
  };

  return (
    <div className="App">
      <Table
        data={vehicles ? vehicles : []}
        onDelete={deleteVehicle}
        onEdit={editVehicle}
      />
      <div className="forms">
        <form className={"add-form"} onSubmit={handleSubmit}>
          <h2>Add Vehicle</h2>
          <div className="form-group">
            <label>
              make:<br></br>
              <input
                type="text"
                value={make}
                onChange={(e) => setMake(e.target.value)}
              />
            </label>
          </div>

          <div className="form-group">
            <label>
              model:<br></br>
              <input
                type="text"
                value={model}
                onChange={(e) => setModel(e.target.value)}
              />
            </label>
          </div>

          <div className="form-group">
            <label>
              year:<br></br>
              <input
                type="number"
                value={year}
                onChange={(e) => setYear(e.target.value)}
              />
            </label>
          </div>

          <div className="form-group">
            <label>
              description:<br></br>
              <input
                type="text"
                value={description}
                onChange={(e) => setDesc(e.target.value)}
              />
            </label>
          </div>
          <input type="submit" />
        </form>

        <form className={"add-form"} onSubmit={handleEdit}>
          <h2>Edit Vehicle</h2>
          <div className="form-group">
            <label>
              make:<br></br>
              <input
                disabled={disable}
                type="text"
                value={makeEdit}
                onChange={(e) => setMakeEdit(e.target.value)}
              />
            </label>
          </div>

          <div className="form-group">
            <label>
              model:<br></br>
              <input
                disabled={disable}
                type="text"
                value={modelEdit}
                onChange={(e) => setModelEdit(e.target.value)}
              />
            </label>
          </div>

          <div className="form-group">
            <label>
              year:<br></br>
              <input
                disabled={disable}
                type="number"
                value={yearEdit}
                onChange={(e) => setYearEdit(e.target.value)}
              />
            </label>
          </div>

          <div className="form-group">
            <label>
              description:<br></br>
              <input
                disabled={disable}
                type="text"
                value={descriptionEdit}
                onChange={(e) => setDescEdit(e.target.value)}
              />
            </label>
          </div>
          <input hidden={disable} type="submit" />
        </form>
        <img src="images/eEJQC1YpApP4t1Ygm4SHhUsMcn1SgbQDFN6AaLgX.png"></img>
      </div>
    </div>
  );
}

export default App;
