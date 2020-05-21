import React from 'react';
import AdminNav from "./AdminNav";
import Box from "@material-ui/core/Box";

const AdminLayout = ({children}) => {
    return (
        <div>
            <AdminNav />
            <Box pt="80px">
                {children}
            </Box>
        </div>
    );
};

export default AdminLayout;