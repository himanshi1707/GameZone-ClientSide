import React, { useEffect, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import OtpInput from 'react-otp-input';
import ReactDOM from 'react-dom';
import Countdown from 'react-countdown';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import './styles.css';
import { postData } from '../FetchData';
import { InputAdornment } from '@material-ui/core';
import swal from 'sweetalert';

var otpGenerator = require('otp-generator')


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="http://www.numericinfosystems.in">
        Numeric infosystem
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(../gamingimage.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: 5,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height:'100px'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: 10,
    backgroundColor:'#dfe6e9',
    width:110,
    color:'#000',
  },
  inputStyle:{
      width:'3rem' ,
  }
}));

export default function SignUp(props) {
  const classes = useStyles();
  const [state,setState]=useState(false)
  const [showBox,setShowBox]=useState(false)
  const [mobileNumber,setMobileNumber]=useState(props.history.location.state.mobileno)
  const [emailID,setEmailID]=useState("")
  const [firstName,setFirstName]=useState("")
  const [lastName,setLastName]=useState("")
  const [password,setPassword]=useState("") 
  const [otp,setOtp]=useState("")
  const [getOtpInput,setOtpInput]=useState("")


const otpGeneratorfun=()=>{
      var otp=otpGenerator.generate(4, { digits:true, upperCase: false, specialChars: false,lowerCase:false,alphabets:false });
      alert(otp)
      setOtp(otp)
      //setShowBox(!showBox)
}

const handleSubmit=async()=>{
  if(otp==getOtpInput){
  var body={
    emailid:emailID,
    mobileno:mobileNumber,
    firstname:firstName,
    lastname:lastName,
    password:password}
    var result=await postData("userlogin/adduserdetails",body)
    if(result)
    {
      
    }
    else{
      swal({
        title:"Registration failed",
        icon:"error",
        dangerMode:true
      })
    }
  }
  else{
    alert("Invalid OTP.....")
  }
}

useEffect(function(){
  otpGeneratorfun();
},[])


const showOtp=()=>{
const Completionist = () => <span style={{color:'red'}}>Times up!</span>;
    return(
      <div>
        <div style={{display:'flex',justifyContent:'center',flexDirection:'column'}}>
            <div style={{textAlign:'center',fontWeight:'bold',padding:5}}>
                Waiting for OTP
            </div>
            <span style={{textAlign:'center',fontWeight:'bold',padding:5}}>
              {`Otp sent on mobile +91${mobileNumber}`}
            </span>
            <OtpInput
                value={getOtpInput}
                onChange={(value)=>setOtpInput(value)}
                inputStyle="inputStyle"
                numInputs={4}
                separator={<span>-</span>}
            />
            <Countdown date={Date.now() + 10000}>
                <Completionist />
            </Countdown></div>
            <div style={{display:'flex',justifyContent:'center'}}> 
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              startIcon={<VerifiedUserIcon />}
              onClick={()=>handleSubmit()}
            >
              Verify
            </Button></div></div>
    )
}
    
return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          {/* <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar> */}
          <img src="../gameicon2.png" width="80" height="80"/>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <div>
          <div style={{width:400,display:'flex',justifyContent:'center'}}>
          <Grid container spacing={1} style={{padding:10}}>
            <Grid item xs={6} sm={6} >
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="First Name"
              onChange={(event)=>setFirstName(event.target.value)}
              autoFocus
            />
            </Grid>
            <Grid item xs={6} sm={6}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Last Name"
              onChange={(event)=>setLastName(event.target.value)}
              autoFocus
            />
            </Grid>
            <Grid item xs={12}>
            <TextField
              variant="outlined"
              value={mobileNumber}
              margin="normal"
              required
              fullWidth
              label="Enter Mobile Number"
              onChange={(event)=>setMobileNumber(event.target.value)}
              autoFocus
              InputProps	={{
                startAdornment:
                <InputAdornment position="start">+91 | </InputAdornment>,
              }}
            />
            </Grid>
            <Grid item xs={12} >
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Email Address"
              onChange={(event)=>setEmailID(event.target.value)}
              autoFocus
            />
            </Grid>
            <Grid item xs={6} sm={6}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              onChange={(event)=>setPassword(event.target.value)}
              autoFocus
            />
            </Grid>
            <Grid item xs={6} sm={6}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              type="password"
              label="Re-enter Password"
              //onChange={(event)=>setMobileNo(event.target.value)}
              autoFocus
            />
            </Grid>
            <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',width:400}}>
            {showOtp()}
            </div>
            </Grid>
            </div>
            {/* <Box mt={5}>
              <Copyright />
            </Box> */}
        </div>
        </div>
      </Grid>
    </Grid>
  );
}
