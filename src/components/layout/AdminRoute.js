import React from 'react';
import {Redirect, Route} from "react-router-dom";
import Container from "@material-ui/core/Container";
import {useSelector} from "react-redux";
import {isEmpty, isLoaded} from "react-redux-firebase";
import Loader from "../common/Loader";
import AdminNav from "./AdminNav";
import Box from "@material-ui/core/Box";

const AdminRoute = (props) => {
    const auth = useSelector(state => state.firebase.auth)
    const token = useSelector(state=>state.firebase.profile.token)
    const isAdmin = token?.claims?.isAdmin
    if(!isLoaded(auth)) return <Loader />
    if(isEmpty(auth)) return <Redirect to="/" />
    if(!isAdmin) return <Redirect to="/" />
    return (
        <Container>
            <AdminNav />
            <Box pt="80px">
                <Route {...props} />
            </Box>
        </Container>
    );
};

export default AdminRoute;