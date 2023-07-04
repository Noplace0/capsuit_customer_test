import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
    const [customers, setCustomers] = useState([]);
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(lastname);
    };

    useEffect(() => {
        axios
            .get(
                `
                http://127.0.0.1:5000/customers?first_name=${firstname}&last_name=${lastname}
            `
            )
            .then((response) => setCustomers(response.data))
            .catch((error) => console.error(error));
    }, [firstname, lastname]);

    return (
        <div>
            <h3>examples:</h3>
            <p>Last: Schmitt First: Carine</p>
            <p>Last: King First: Jean</p>
            <form onSubmit={handleSubmit}>
                <div className="container">
                    <p>first_name</p>
                    <input
                        type="text"
                        placeholder="Top text"
                        className="form--input"
                        name="topText"
                        value={firstname}
                        onChange={(event) => setFirstName(event.target.value)}
                    />
                    <p>last_name</p>
                    <input
                        type="text"
                        placeholder="Top text"
                        className="form--input"
                        name="topText"
                        value={lastname}
                        onChange={(event) => setLastName(event.target.value)}
                    />
                </div>
                <button type="submit">DEBUG</button>
            </form>
            <table>
                <thead>
                    <tr>
                        <th>Customer Number</th>
                        <th>Customer Name</th>
                        <th>Address</th>
                        <th>Country</th>
                        <th>Credit Limit</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map((customer) => (
                        <tr key={customer.customerNumber}>
                            <td>{customer.customerNumber}</td>
                            <td>{customer.customerName}</td>
                            <td>
                                {customer.addressLine1} {customer.addressLine2}
                            </td>
                            <td>{customer.country}</td>
                            <td>{customer.creditLimit}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default App;
