import React, { useState } from 'react';
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
import Header from './Header';
import Footer from './Footer';
import { useDispatch } from 'react-redux';

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
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
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
    margin: theme.spacing(3, 0, 2),
    width:110,
    color:'#ffff',
    backgroundColor:'#1e6b7b',
  },
  inputStyle:{
      width:'3rem' ,
  }
}));

export default function SignIn(props) {

  const classes = useStyles();
  //const [state,setState]=useState(false)
  const [showBox,setShowBox]=useState(false)
  const [mobileNumber,setMobileNumber]=useState("")
  const [getOtpInput,setOtpInput]=useState("")
  const [otp,setOtp]=useState();
  const [getUserData,setUserData]=useState([]);
  var dispatch=useDispatch();
//   const handleClick=async()=>{
//     var body={'mobileno':mobileNo};
//     var result = await postData("userlogin/chkuserlogin", body);
//     if(result.result)
//     {
//       props.history.push({pathname:'/admindashboard'})
//     }
//     else{
//       //setMsg("Invalid AdminId/Password....");
//     }
//   };

// const showOtp=()=>{
//     const Completionist = () => <span>You are good to go!</span>;
// }

const handleShowCart=()=>{
  if(otp==getOtpInput)
  {
    //alert(JSON.stringify(getUserData))
    dispatch({type:'ADD_USER',payload:[getUserData.mobileno,getUserData]})
    props.history.push({'pathname':'/showcart'},{mobileno:mobileNumber})
  }
  else{
    alert("Invalid Case....")
  }
}

const handleOtpClick=async()=>{
    var body={'mobileno':mobileNumber};
    var result = await postData("userlogin/chkuserlogin", body);
    if(result.result)
    {
        var otp=otpGenerator.generate(4, { digits:true, upperCase: false, specialChars: false,lowerCase:false,alphabets:false });
        setUserData(result.data)
        alert(otp)
        setOtp(otp)
        setShowBox(!showBox)
    }
    else{
        props.history.push({'pathname':'/signup'},{mobileno:mobileNumber})
    }
   
}

const showOtp=()=>{
const Completionist = () => <span style={{color:'red'}}>Times up!</span>;
    return(
<div>
        <div style={{display:'flex',justifyContent:'center',flexDirection:'column'}}>
            <div>
                Waiting for OTP
            </div>
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
              onClick={()=>handleShowCart()}
              className={classes.submit}
              startIcon={<VerifiedUserIcon />}
            >
              Verify
            </Button></div></div>
    )
}
    
return (
  <div>
    <Header history={props.history} />
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          {/* <Avatar className={classes.avatar}> */}
            <img src="../gameicon2.png" width="100" height="100"/>
            {/* <LockOutlinedIcon /> */}
          <Typography component="h1" variant="h5" style={{marginBottom:20}}>
            Sign in
          </Typography>
          <div style={{marginBottom:20}}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              //id="email"
              label="Mobile No"
            //   name="mobile"
            //   autoComplete="email"
              onChange={(event)=>setMobileNumber(event.target.value)}
              autoFocus
              InputProps	={{
                startAdornment:
                <InputAdornment position="start">+91 | </InputAdornment>,
              }}
            />
            </div>
              <div style={{backgroundColor:'#1e6b7b',padding:20,borderRadius:65,color:'#fff'}}>
                <ArrowForwardIosIcon   onClick={()=>handleOtpClick()} />
              </div>
                {showBox ? showOtp() : <></>}
            {/* <div>
                {showOtp()}
            </div> */}
            <Box mt={5}>
              <Copyright />
            </Box>
        </div>
      </Grid>
    </Grid>
    </div>
  );
}

