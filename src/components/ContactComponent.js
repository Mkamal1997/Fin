import React from "react";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import { Link } from "react-router-dom";

function Contact(props) {
  return (
    <div className="container">
      <div className="row">
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/home">Home</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>Espace Communication</BreadcrumbItem>
        </Breadcrumb>
        <div className="col-12">
          <h3>Espace Communication</h3>
          <hr />
        </div>
      </div>
      <div className="row row-content">
        <div className="col-12">
          <h3>Location Information</h3>
         
        </div>
        <div className="col-12 col-sm-4 offset-sm-1">
          <h5>Our Address</h5>
          <address>
            101, bd Mohamed Zerktouni
            <br />
            Palmiers, CASABLANCA
            <br />
            Maroc
            <br />
            <i className="fa fa-phone"></i>: 05 22 20 25 33
            <br />
            <i className="fa fa-fax"></i>: 05 22 22 26 99
            <br />
            <i className="fa fa-envelope"></i>:{" "}
            <a href="mailto:BPtalents@cpm.co.ma">BPtalents@cpm.co.ma</a>
          </address>
        </div>
        <div className="col-12 col-sm-6 offset-sm-1">
          <h5>Map of our Location</h5>
        </div>
        <div className="col-12 col-sm-11 offset-sm-1">
          <div className="btn-group" role="group">
            <a
              role="button"
              className="btn btn-primary"
              href="tel: 05 22 20 25 33"
            >
              <i className="fa fa-phone"></i> Call
            </a>
            <a role="button" className="btn btn-info">
              <i className="fa fa-skype"></i> Skype
            </a>
            <a
              role="button"
              className="btn btn-success"
              href="mailto:BPtalents@cpm.co.ma"
            >
              <i className="fa fa-envelope-o"></i> Email
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;

