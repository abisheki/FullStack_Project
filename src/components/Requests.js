import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Requests() {
  const requestData = [
    { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', status: 'Pending' },
    { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee', status: 'Approved' },
    { id: 3, title: '1984', author: 'George Orwell', status: 'Rejected' },
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Pending':
        return <span className="badge bg-warning">Pending</span>;
      case 'Approved':
        return <span className="badge bg-success">Approved</span>;
      case 'Rejected':
        return <span className="badge bg-danger">Rejected</span>;
      default:
        return <span className="badge bg-secondary">Unknown</span>;
    }
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Your Book Requests</h2>
      <p className="text-center mb-4 lead">Manage and track the status of books you've requested from other users.</p>

      {/* Requests Table */}
      <div className="card shadow-sm">
        <div className="card-body">
          {requestData.length > 0 ? (
            <table className="table table-hover table-striped">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {requestData.map((request) => (
                  <tr key={request.id}>
                    <td>{request.id}</td>
                    <td>{request.title}</td>
                    <td>{request.author}</td>
                    <td>{getStatusBadge(request.status)}</td>
                    <td>
                      {request.status === 'Pending' && (
                        <button className="btn btn-outline-danger btn-sm">
                          Cancel Request
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-muted text-center">You haven't requested any books yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Requests;
