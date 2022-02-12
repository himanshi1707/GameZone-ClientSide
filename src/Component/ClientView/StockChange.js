import React, { useState } from 'react';
import {Grid, TextField,Button} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles((theme)=>({
    root: {
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
    },
    subdiv: {
        height:500,
        padding: 20,
        width: 700,
        borderRadius: 2,
        backgroundColor: '#fffff',
        marginTop: 40,
    },
    input: {
        display: 'none',
    },
}));

export default function StockChange(props){
    const classes=useStyles();

    const [stockID,setStockID] = useState();
    const [startPrice,setStartPrice] = useState();
    const [endPrice, setEndPrice] = useState();
    const [difference,setDifference] = useState();
    const dispatch=useDispatch();

    const handleData=()=>{
        dispatch({
            action:'ADD_CART',
            payload:[stockID,
                {
                    stockID:stockID,
                    startPrice:startPrice,
                    endPrice:endPrice,
                    difference:difference
                }
            ]
        })
    }

    return(
        <div className={classes.root}>
            <div className={classes.subdiv}>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <TextField variant="outlined" label="Stock ID" onChange={(event)=>setStockID(event.target.value)} fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField variant="outlined" label="Start Price" onChange={(event)=>setStartPrice(event.target.value)} fullWidth/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField variant="outlined" label="End Price" onChange={(event)=>setEndPrice(event.target.value)} fullWidth/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField variant="outlined" label="Difference" onChange={(event)=>setDifference(event.target.value)} fullWidth/>
                    </Grid>
                    <Grid item xs={6} sm={6}>
                        <Button variant="contained" color="primary" fullWidth>Save</Button>
                    </Grid>
                    <Grid item xs={6} sm={6}>
                        <Button variant="contained" color="primary" fullWidth>Reset</Button>
                    </Grid>
                </Grid>
            </div>
        </div>
    )   
}