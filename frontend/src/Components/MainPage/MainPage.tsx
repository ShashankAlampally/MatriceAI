import React, { useState, useEffect } from 'react';
import './MainPage.css';
import DataTable, { TableColumn } from 'react-data-table-component';
import Card from '@material-ui/core/Card';
import StarRating from '../StarRating/StarRating';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const MainPage: React.FC = () => {
    const [data, setData] = useState<any[]>([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showFeedbackModal, setShowFeedbackModal] = useState(false);
    const [selectedRow, setSelectedRow] = useState<any>(null);
    const [username, setUsername] = useState("");
    const [status, setStatus] = useState("");
    const [feedback, setFeedback] = useState("");
    const [rating, setRating] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
        axios.get('http://shashanks-macbook-air.local:7001/view').
        then((response) =>{
            
        }).
        catch((error) =>{
            console.error(error);
        })
    }, []);

    const fetchData = () => {
        axios.get("http://shashanks-macbook-air.local:7001/view")
            .then(res => {
                setData(res.data.data);
            })
            .catch(err => {
                console.error("Error fetching data:", err);
            });
    };

    const handleAddButtonClick = () => {
        setShowAddModal(true);
    };

    const handleCloseAddModal = () => {
        setUsername("");
        setStatus("");
        setShowAddModal(false);
    };

    const handleSaveAddData = () => {
        const newData = {
            username,
            status
        };

        axios.post("http://shashanks-macbook-air.local:7001/create", newData)
            .then(res => {
                console.log("Data saved successfully:", res.data);
                setShowAddModal(false);
                fetchData();
            })
            .catch(err => {
                console.error("Error saving data:", err);
            });
    };
    const handleDelete = (id: string) => {
        axios.delete(`http://shashanks-macbook-air.local:7001/delete/${id}`)
            .then(res => {
                console.log("Data deleted successfully:", res.data);
                // Fetch updated data after deletion
                fetchData();
            })
            .catch(err => {
                console.error("Error deleting data:", err);
            });
    };

    const handleStatusChange = (id: string, newStatus: string) => {
        setSelectedRow(id);
        setStatus(newStatus);
        setShowFeedbackModal(true);
    };

    const handleCloseFeedbackModal = () => {
        setSelectedRow(null);
        setFeedback("");
        setRating(0);
        setShowFeedbackModal(false);
    };
    const handleSignout = () => {
        navigate('/login');
    }

    const handleSaveFeedbackData = () => {
        const  _id  = selectedRow;
        console.log(selectedRow);
        const updatedData = {
            status,
            feedback,
            rating
        };

        axios.put(`http://shashanks-macbook-air.local:7001/update/${_id}`, updatedData)
            .then(res => {
                console.log("Feedback saved successfully:", res.data);
                handleCloseFeedbackModal();
                fetchData();
            })
            .catch(err => {
                console.error("Error saving feedback:", err);
            });
    };

    const columns: TableColumn<any>[] = [
        { name: 'Name', selector: (row) => row.username, width: '20%' },
        {
            name: 'Interview Status',
            selector: (row) => row.status,
            cell: (row) => (
                <div>
                    <select
                        value={row.status}
                        onChange={(e) => handleStatusChange(row._id, e.target.value)}
                        style={{ border: 'none', width: '100%' }}
>
                        <option value="">Select Status</option>
                        <option value="Pending">Pending</option>
                        <option value="Accepted">Accepted</option>
                        <option value="Rejected">Rejected</option>
                    </select>
                </div>
            ),
            width: '20%'
        },
        { name: 'Interview Feedback', selector: (row) => row.feedback, width: '25%' },
        { name: 'Rating', selector: (row) => row.rating, cell: (row) => <StarRating stars={row.rating} />, width: '20%' },
        {
            name: '',
            cell: (row) => (
                <div className='justify-content-center'>
                    <div><button className="btn btn-outline-danger btn-sm " onClick={() => handleDelete(row._id)}>
                        <i className="fa fa-trash"></i> {/* Assuming you're using Font Awesome for delete icon */}
                    </button></div>
                </div>
            ),
            width: '10%'
        }
    ];
    

    return (
        <div className='container'>
            <div className='d-flex justify-content-between mt-3 mb-3'>
                <div>
                    <i className="fas fa-user-circle fa-2x">{}</i>
                </div>

                <div className='Actions'>
                    <button className='btn btn-primary' onClick={handleAddButtonClick}>Add</button>
                </div>
                <div>
                    <button className='btn btn-primary' onClick={handleSignout}>Sign Out</button>
                </div>
            </div>
            <div className='Details'>
                <Card>
                    <DataTable
                        title=''
                        columns={columns}
                        data={data}
                        pagination
                    />
                </Card>
            </div>
            
            <Modal show={showAddModal} onHide={handleCloseAddModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Data</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Name</label>
                            <input type="text" className="form-control" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="status" className="form-label">Interview Status</label>
                            <select className="form-select" id="status" name="status" value={status} onChange={(e) => setStatus(e.target.value)}>
                                <option value="">Select Status</option>
                                <option value="Pending">Pending</option>
                                <option value="Accepted">Accepted</option>
                                <option value="Rejected">Rejected</option>
                            </select>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <button className='btn btn-secondary' onClick={handleCloseAddModal}>Cancel</button>
                    <button className='btn btn-primary' onClick={handleSaveAddData}>Save</button>
                </Modal.Footer>
            </Modal>
            <Modal show={showFeedbackModal} onHide={handleCloseFeedbackModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Feedback & Rating</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="mb-3">
                            <label htmlFor="feedback" className="form-label">Interview Feedback</label>
                            <input type="text" className="form-control" id="feedback" name="feedback" value={feedback} onChange={(e) => setFeedback(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="rating" className="form-label">Rating</label>
                            <input type="number" className="form-control" id="rating" name="rating" min={0} max={5} value={rating} onChange={(e) => setRating(parseInt(e.target.value))} />
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <button className='btn btn-secondary' onClick={handleCloseFeedbackModal}>Cancel</button>
                    <button className='btn btn-primary' onClick={handleSaveFeedbackData}>Save</button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default MainPage;
