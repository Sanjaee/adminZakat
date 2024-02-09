import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";

export const Delete = () => {
  const [zakatData, setZakatData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://backendzakat.vercel.app/api/items"
        );
        const data = await response.json();
        setZakatData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    const intervalId = setInterval(fetchData, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const handleDelete = async (_id) => {
    try {
      // Mengirim permintaan DELETE ke server
      await fetch(`https://backendzakat.vercel.app/api/items/${_id}`, {
        method: "DELETE",
      });

      // Mengupdate state setelah menghapus data
      setZakatData((prevData) => prevData.filter((item) => item._id !== _id));

      // Menutup popup konfirmasi setelah menghapus
      setShowDeleteConfirmation(false);
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const formatDate = (timestamp) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };

    return new Date(timestamp).toLocaleDateString("id-ID", options);
  };

  const formatRupiah = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const showConfirmation = (_id) => {
    setSelectedItemId(_id);
    setShowDeleteConfirmation(true);
  };

  const hideConfirmation = () => {
    setSelectedItemId(null);
    setShowDeleteConfirmation(false);
  };

  const filteredData = zakatData.filter((item) =>
    item.nama.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="data">
      <Navbar />
      <div className="header">
        <h1>
          <b>Hapus Data Zakat</b>
        </h1>
      </div>

      <div className="total">
        <p>
          <b>Total Data: {filteredData.length}</b>
        </p>
        <p>
          <b>
            Total Beras:{" "}
            {filteredData.length > 0
              ? `${filteredData
                  .reduce(
                    (total, item) => total + (parseFloat(item.beras) || 0),
                    0
                  )
                  .toLocaleString("en-US", {
                    maximumFractionDigits: 2,
                  })} Liter`
              : "konsong"}
          </b>
        </p>
        <p>
          <b>
            Total Uang:{" "}
            {filteredData.length > 0
              ? formatRupiah(
                  filteredData.reduce(
                    (total, item) => total + (parseInt(item.uang, 10) || 0),
                    0
                  )
                )
              : "konsong"}
          </b>
        </p>
      </div>

      <div className="w-full mt-4 p-4">
        <input
          type="text"
          name=""
          id=""
          placeholder="Cari Nama"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="rounded-md"
        />
      </div>

      <table className="min-w-full text-[9px] sm:text-sm">
        <thead>
          <tr>
            <th className="py-2">Nomor</th>
            <th className="py-2">Nama</th>
            <th className="py-2">Gender</th>
            <th className="py-2">Barang</th>
            <th className="py-2">Beras</th>
            <th className="py-2">Uang</th>
            <th className="py-2">Waktu</th>
            <th className="py-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => (
            <tr key={index}>
              <td className="py-2">{index + 1}</td>
              <td className="py-2">{item.nama}</td>
              <td className="py-2">{item.gender}</td>
              <td className="py-2">{item.barang}</td>
              <td className="py-2">
                {item.beras ? `${item.beras} Liter` : "-"}
              </td>
              <td className="py-2">
                {isNaN(item.uang)
                  ? "-"
                  : item.uang
                  ? formatRupiah(item.uang)
                  : "-"}
              </td>
              <td className="py-2">{formatDate(item.waktu)}</td>
              <td className="py-2">
                <button
                  onClick={() => showConfirmation(item._id)}
                  className="bg-red-500 text-white rounded py-1 px-2"
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Popup Konfirmasi Hapus */}
      {showDeleteConfirmation && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <div
              className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <div>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Apakah Anda yakin ingin menghapus data ini?
                  </p>
                </div>
              </div>
              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={() => handleDelete(selectedItemId)}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Hapus
                </button>
                <button
                  type="button"
                  onClick={hideConfirmation}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Batal
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
