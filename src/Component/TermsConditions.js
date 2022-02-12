import React from 'react';
import { Button, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import swalhtml from "@sweetalert/with-react";
import swal from "sweetalert";
import {isBlank} from "./Checks"
import renderHTML from 'react-render-html';
import { postDataAndImage } from './FetchData';

const useStyles = makeStyles((theme)=>({
    root: {
        height:500,
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
    },
    subdiv: {
        padding: 20,
        width: 700,
        borderRadius: 2,
        backgroundColor: '#fffff',
        marginTop: 0,
    },
}))

export default function TermsConditions(props){
    const classes = useStyles();
    const [conditioned,setConditioned]=useState("");

    TermsConditions.modules = {
        toolbar: [
            [{'header':'1'},{'header':'2'},{'font':[]}],
            [{size:[]}],
            ['bold','italic','underline','strike','blockquote'],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            //[{ 'script': 'sub'}, { 'script': 'super' }],
            [{'indent':'-1'},{'indent':'+1'}],
            ['link','image','video','color'],
            ['clean']
        ],
        clipboard: {
            //toggle to add extra line breaks when pasting HTML:
            matchVisual:false,
        }
    }
    TermsConditions.formats = [
        'header','font','size',
        'bold','italic','underline','strike','blockquote',
        'list','bullet','indent',
        'link','image','video','color',
    ]

    const handleClickSave=async()=>{
        var error=false;
        var msg = "<div>"
        if(isBlank(conditioned))
        {
            msg+="<font color='#e74c3c'><b>Terms&Conditions should not be blank..</b></font><br>"
            error=true;
        }
        msg+="</div>"
        if(error)
        {
            swalhtml(renderHTML(msg));
        }

        else
        {
            const formData = new FormData();
            formData.append("conditioned",conditioned);
            var config={headers:{"content-type":"multipart/form-data"}};
            var result = await postDataAndImage("termsandconditions/addcondition",formData,config);
            if(result)
            {
                swal({
                    title: "Terms Submitted Successfully",
                    icon: "success",
                    dangerMode: true,
                })
            }

        }
    }

    return(
        <div className={classes.root}>
            <div className={classes.subdiv}>
                <Grid container spacing={1}>
                    <Grid item xs={12} style={{display:'flex',justifyContent:'center',alignItems:'center',margin:20}}>
                        <div style={{fontWeight:500,fontSize:26}}>
                            Terms & Conditions
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <ReactQuill value={conditioned}
                        modules={TermsConditions.modules}
                        formats={TermsConditions.formats}
                        onChange={(value)=>setConditioned(value)} />
                    </Grid>
                    <Grid item xs={6} sm={6}>
                        <Button variant="contained" color="primary"  onClick={()=>handleClickSave()} fullWidth>Save</Button>
                    </Grid>
                    <Grid item xs={6} sm={6}>
                        <Button variant="contained" color="primary" fullWidth>Reset</Button>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}