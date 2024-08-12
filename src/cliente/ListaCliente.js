import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function ListaClientes() {
  const [clientes, setCliente] = useState([]);

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await axios.get(
          "/api/cliente?_size=500"
        );
        // Verifica que response.data sea un array
        if (Array.isArray(response.data)) {
          setCliente(response.data);
        } else {
          console.error("Los datos recibidos no son un array:", response.data);
          setCliente([]); 
        }
      } catch (error) {
        console.log(error);
        setCliente([]); 
      }
    };
    fetchClientes();
  }, []);

  return (
    <div className="container">
      <h1>Lista de clientes</h1>
      <hr />
      <a href="/clientes/agregar" className="btn btn-primary">
        Agregar Cliente
      </a>
      <br />
      <br />
      <table className="table">
        <thead>
          <tr>
            <th>Rut</th>
            <th>Dv</th>
            <th>Nombres</th>
            <th>Apellidos</th>
            <th>Email</th>
            <th>Celular</th>
            <th>Fecha</th>
            <th>Opciones</th>
          </tr>
        </thead>
        <tbody>
          {clientes.length > 0 ? (
            clientes.map((cliente) => (
              <tr key={cliente.id_cliente}>
                <td>{cliente.id_cliente}</td>
                <td>{cliente.dv}</td>
                <td>{cliente.nombres}</td>
                <td>{cliente.apellidos}</td>
                <td>{cliente.email}</td>
                <td>{cliente.celular}</td>
                <td>{cliente.fecha_registro}</td>
                <td>
                  <Link
                    to={`/clientes/eliminar/${cliente.id_cliente}`}
                    className="btn btn-danger"
                  >
                    Eliminar
                  </Link>
                  <Link
                    to={`/clientes/actualizar/${cliente.id_cliente}`}
                    className="btn btn-warning"
                  >
                    Actualizar
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8">No hay clientes disponibles</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ListaClientes;