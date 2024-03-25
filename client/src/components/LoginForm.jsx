import React from 'react';
import { Link } from 'react-router-dom';

const LoginForm = () => {
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="login-form">
                        <form>
                            <div className="form-row">
                                <div className="col mb-3">
                                    <label htmlFor="serverUsername"></label>
                                    <input type="text" className="form-control" id="serverUsername" placeholder="Username" aria-describedby="inputGroupPrepend3" required />
                                    <div className="invalid-feedback">
                                        Please enter your username
                                    </div>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="col mb-3">
                                    <label htmlFor="serverPassword"></label>
                                    <input type="password" className="form-control" id="serverPassword" placeholder="Password" required />
                                    <div className="invalid-feedback">
                                        Please enter your password
                                    </div>
                                </div>
                            </div>
                            <div className="text-center">
                                <button className="btn btn-primary" type="submit">Submit form</button>
                            </div>
                        </form>
                        <p className="small text-center">Don't have an account? <Link to="/SignUp">Sign up here</Link>.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginForm;