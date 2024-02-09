import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Navbar from "./Navbar";

function AdminPost() {
  const initialFormData = {
    nama: "",
    gender: "",
    barang: "",
    uang: "",
    beras: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const postData = () => {
    const allFormData = { ...formData };

    if (allFormData.gender === "") {
      allFormData.gender = "defaultGender";
    }
    if (allFormData.barang === "") {
      allFormData.barang = "defaultBarang";
    }
    if (allFormData.uang === "") {
      allFormData.uang = "-";
    }
    if (allFormData.beras === "") {
      allFormData.beras = "-";
    }

    fetch("https://backendzakat.vercel.app/api/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(allFormData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        toast.success("Post item berhasil!");
        setFormData(initialFormData);
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Error posting item.");
      });
  };

  return (
    <div>
      <Navbar />

      <form>
        <h1>Tambah Data</h1>
        <label htmlFor="nama">Nama:</label>
        <input
          type="text"
          id="nama"
          name="nama"
          value={formData.nama}
          onChange={handleChange}
        />
        <br />

        <label htmlFor="gender">Gender:</label>
        <input
          type="text"
          id="gender"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
        />
        <br />

        <label htmlFor="barang">Barang:</label>
        <input
          type="text"
          id="barang"
          name="barang"
          value={formData.barang}
          onChange={handleChange}
        />
        <br />

        <label htmlFor="uang">Uang:</label>
        <input
          type="text"
          id="uang"
          name="uang"
          value={formData.uang}
          onChange={handleChange}
        />
        <br />

        <label htmlFor="beras">Beras:</label>
        <input
          type="text"
          id="beras"
          name="beras"
          value={formData.beras}
          onChange={handleChange}
        />
        <br />

        <button className="btn" type="button" onClick={postData}>
          Post Item
        </button>
      </form>

      {/* Toast Container for notifications */}
      <ToastContainer />
    </div>
  );
}

export default AdminPost;
