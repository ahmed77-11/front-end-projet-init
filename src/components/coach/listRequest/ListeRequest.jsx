import "./listeRequest.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useNavigate} from "react-router-dom";

const ListeRequest = () => {
    const [listReq, setListReq] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate=useNavigate();

    const handleAction = async (id, accept) => {
        try {
            const action = accept ? "accept" : "reject";
            await axios.patch(`http://localhost:3000/api/follow/${action}Request/${id}`, null, {
                withCredentials: true,
            });
            console.log(accept)
            accept?toast.success(`You Have A New Client !`):toast.error(`Request Rejected !`);
            fetchData(); // Refresh data after the action
        } catch (error) {
            toast.error("Failed to process the request. Please try again.");
            console.error(error);
        }
    };

    const fetchData = async () => {
        try {
            setLoading(true);
            const res = await axios.get("http://localhost:3000/api/user/coach/getClientPending", {
                withCredentials: true,
            });
            if (!res.data || res.data.length === 0) {
                throw new Error("No Requests Found");
            }
            setListReq(res.data);
            setLoading(false);
        } catch (e) {
            setLoading(false);
            setError(e.message || "An error occurred while fetching data");
        }
    };

    useEffect(() => {
        fetchData();
        toast.warning("You Request sended Succesfully");

    }, []);

    console.log(listReq);

    const handleNavigate=(id)=> {
        navigate("/coach/dashboard/client/"+id);
    }

    return (
        <div className="containerReq">
            <div className="header">
                <h1>Liste des Profils</h1>
            </div>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p className="error-message">{error}</p>
            ) : (
                <table className="profile-table">
                    <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {listReq.map((request) => (
                        <tr key={request.id} onClick={()=>handleNavigate(request.id)} style={{cursor:"pointer"}}>
                            <td>{request.nom}</td>
                            <td>{request.prenom}</td>
                            <td>{request.email}</td>
                            <td>{request.enabled ? "Active" : "Not Active"}</td>
                            <td>
                                <button
                                    className="accept-btn"
                                    onClick={(event) => {
                                        event.stopPropagation(); // Prevents row click
                                        handleAction(request.id, true);
                                    }}
                                >
                                    Accept
                                </button>
                                <button
                                    className="reject-btn"
                                    onClick={(event) => {
                                        event.stopPropagation(); // Prevents row click
                                        handleAction(request.id, false);
                                    }}
                                >
                                    Reject
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
            <ToastContainer/>
        </div>
    );
};

export default ListeRequest;
