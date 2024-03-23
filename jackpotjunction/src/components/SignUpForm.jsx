import React from 'react';
import { Link } from 'react-router-dom';

const SignUpForm = () => {
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="signup-form">
                        <form>
                            <div className="form-row">
                                <div className="col mb-3">
                                    <label htmlFor="validationServerUsername"></label>
                                    <input type="text" className="form-control" id="validationServerUsername" placeholder="Username" aria-describedby="inputGroupPrepend3" required />
                                    <div className="invalid-feedback">
                                        Please choose a username.
                                    </div>
                                </div>
                                <div className="col mb-3">
                                    <label htmlFor="validationServerEmail"></label>
                                    <input type="email" className="form-control" id="validationServerEmail" placeholder="Email" required />
                                    <div className="invalid-feedback">
                                        Please provide a valid email.
                                    </div>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="col mb-3">
                                    <label htmlFor="validationServerPassword"></label>
                                    <input type="password" className="form-control" id="validationServerPassword" placeholder="Password" required />
                                    <div className="invalid-feedback">
                                        Please provide a password.
                                    </div>
                                </div>
                                <div className="col mb-3">
                                    <label htmlFor="validationServerConfirmPassword"></label>
                                    <input type="password" className="form-control" id="validationServerConfirmPassword" placeholder="Confirm Password" required />
                                    <div className="invalid-feedback">
                                        Please confirm your password.
                                    </div>
                                </div>
                            </div>
                            <div className="text-center">
                                <button className="btn btn-primary" type="submit">Submit form</button>
                            </div>
                        </form>
                        <p className="small text-center">Already have an account? <Link to="/login">Login here</Link>.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUpForm;
