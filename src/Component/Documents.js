import React from 'react';
import { Button, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';
import { postDataAndImage } from './FetchData';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import swalhtml from "@sweetalert/with-react";
import swal from "sweetalert";
import {isBlank} from "./Checks"
import renderHTML from 'react-render-html';


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

export default function Documents(props){
    const classes = useStyles();
    const [document,setDocument]=useState("");

    Documents.modules = {
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
    Documents.formats = [
        'header','font','size',
        'bold','italic','underline','strike','blockquote',
        'list','bullet','indent',
        'link','image','video','color',
    ]
  
  
    const handleClickSave=async()=>{
        var error=false;
        var msg="<div>"
        if(isBlank(document))
        {
            msg+="<font color='#e74c3c'><b>Document should not be blank..</b></font><br>"
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
            formData.append("document", document);
            var config={headers:{"content-type":"multipart/form-data"}};
            var result=await postDataAndImage("documentation/insertdocumentation",formData,config);
            if(result)
            {
                swal({
                    title: "Document Submitted Successfully",
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
                <Grid item xs={12}>
                        <ReactQuill value={document}
                        modules={Documents.modules}
                        formats={Documents.formats}
                        onChange={(value)=>setDocument(value)} />
                    </Grid>
                    <Grid item xs={6} sm={6}>
                        <Button variant="contained" onClick={()=>handleClickSave()} color="primary" fullWidth>Save</Button>
                    </Grid>
                    <Grid item xs={6} sm={6}>
                        <Button variant="contained" color="secondary" fullWidth>Reset</Button>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}