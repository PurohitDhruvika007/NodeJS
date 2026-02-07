import React from 'react'

export default function AddEmployees() {
    return (
        <div>
            <div className='container'>
                <div>
                    <h1>Add Employees</h1>
                    <div className='d-flex justify-content-between gap-4'>
                        <div className="mb-3 col-4">
                            <label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
                        </div>
                        <div className="mb-3 col-4">
                            <label htmlFor="exampleFormControlInput2" className="form-label">Password</label>
                            <input type="password" className="form-control" id="exampleFormControlInput2" placeholder="enter password" />
                        </div>
                        <div>
                            <div className='d-flex align-items-center mt-4'>
                                <button className='btn btn-primary'>Add Employees</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Role</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">palak</th>
                                <td>palak@gmail.com</td>
                                <td>web developer</td>
                                <td><div className='d-flex gap-3'>
                                    <button className='btn btn-warning'>Edit</button>
                                    <button className='btn btn-danger'>delete</button>
                                </div></td>
                            </tr>

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
