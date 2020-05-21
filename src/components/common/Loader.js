import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Box from "@material-ui/core/Box";
import {makeStyles} from "@material-ui/core/styles";
const Loader = ({ size }) => {
  const styles = makeStyles({
    root:{
      position:'relative'
    },
    spinner:{
      position:'absolute',
      left:'50%',
      top:'250px'
    }
  })
  const classes= styles()
  return (
    <Box className={classes.root}>
      <CircularProgress className={classes.spinner} mode="indeterminate" size={size || 125} />
    </Box>
  );
};
export default Loader;
