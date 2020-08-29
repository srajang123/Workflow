import React, { Fragment, useEffect, useState } from 'react';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from "axios";
import Cookies from "js-cookie";
import ViewRequest from '../ViewRequestComponent';
import RequesterHeader from './RequesterHeaderComponent';

const RequesterAllRequest = () => {

    const [requesterRequestData, setRequesterRequestData] = useState([]);

    const fetchData = async () => {

        let activeUser = Cookies.getJSON("activeUser");
        axios.get('https://localhost:5000/requesterAll?mail:'+activeUser.mail)
        .then((response) => {
            setRequesterRequestData(response);
        })
        .catch((error) => {
            console.log(error)
        });
    }

    useEffect(()=> {
        fetchData();
    },[]);


    return (
        <Fragment>
            <RequesterHeader />
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to ="/requester"><i className="fa fa-user fa-sm"></i> Requester</Link></BreadcrumbItem>
                        <BreadcrumbItem active>All Request</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>All Request</h3>
                        <hr />
                    </div>
                </div>
                <ViewRequest data = {requesterRequestData}/>
            </div>
        </Fragment>
    );
}
export default RequesterAllRequest;