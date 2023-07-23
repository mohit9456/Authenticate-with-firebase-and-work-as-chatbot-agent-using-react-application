// import React from 'react'
// import ChatBot from 'react-simple-chatbot';
// import { ThemeProvider } from 'styled-components';



// const steps = [
// 	{
// 		id: '0',
// 		message: 'Hey User!',
// 		trigger: '1',
// 	}, {
// 		id: '1',
// 		message: 'Please tell your Name',
// 		trigger: '2'
// 	}, {
// 		id: '2',
// 		user: true,
// 		trigger: '3',
// 	}, {
// 		id: '3',
// 		message: " hi {previousValue}, how can I help you?",
// 		trigger: 4
// 	}, {
// 		id: '4',
// 		options: [
// 			{ value: "React", label: "React", trigger: "React" },
// 			{ value: "Angular", label: "Angular", trigger: "Angular" },
// 			{ value: "Next", label: "Next", trigger: "Next" },
// 			{ value: "Express", label: "Express", trigger: "Express" },
// 		],
// 	},
//   {
//     id: "React",
//     message: "React.js, more commonly known as React, is a free, open-source JavaScript library. It works best to build user interfaces by combining sections of code (components) into full websites. Originally built by Facebook, Meta and the open-source community now maintain it. One of the good things about React is that you can use it as much or as little as you want! For example, you can build your entire site in React or just use one single React component on one page.",
//     trigger: "5",
//   },
//   {
//     id: 'Angular',
//     message: "AngularJS is a JavaScript framework. It can be added to an HTML page with a <script> tag. AngularJS extends HTML attributes with Directives, and binds data to HTML with Expressions. AngularJS is a JavaScript Framework. AngularJS is a JavaScript framework written in JavaScript. AngularJS is distributed as a JavaScript file, and can be added to a web page with a script tag: <script src='https://ajax.googleapis.com/ajax/libs/angularjs/1.6.9/angular.min.js'></script>",
//     trigger: "5",
//   },
//   {
//     id: 'Next',
//     message: "Next.js is a flexible React framework that gives you building blocks to create fast web applications. By framework, we mean Next.js handles the tooling and configuration needed for React, and provides additional structure, features, and optimizations for your application.",
//     trigger: "5",
//   },
//   {
//     id: 'Express',
//     message: "Express.js is a web application framework for Node.js. It provides various features that make web application development fast and easy which otherwise takes more time using only Node.jsExpress.js is based on the Node.js middleware module called connect which in turn uses http module. So, any middleware which is based on connect will also work with Express.js.",
//     trigger: "5",
//   },
//   {
//     id: "5",
//     message: "Do you know about more topics ?",
//     trigger : "6",
//   },
//   {
//     id: "6",
//     options: [
// 			{ value: "Yes", label: "Yes", trigger: "Yes" },
// 			{ value: "No", label: "No", trigger: "No" },
// 		],
//   },
//   {
//     id: "Yes",
//     options: [
// 			{ value: "React", label: "React", trigger: "React" },
// 			{ value: "Angular", label: "Angular", trigger: "Angular" },
// 			{ value: "Next", label: "Next", trigger: "Next" },
// 			{ value: "Express", label: "Express", trigger: "Express" },
// 		],
//   },
//   {
//     id: "No",
//     message: "Hope you give better knowledge from here. happy Future !",
//     end: true,
//   }

// ];



// const theme = {
// 	background: '#C9FF8F',
// 	headerBgColor: '#197B22',
// 	headerFontSize: '20px',
// 	botBubbleColor: '#0F3789',
// 	headerFontColor: 'white',
// 	botFontColor: 'white',
// 	userBubbleColor: '#FF5733',
// 	userFontColor: 'white',
// };

// const config = {
// 	floating: true,
// };

// function App() {
// 	return (
// 		<div className="App">
// 			<ThemeProvider theme={theme}>
// 				<ChatBot
// 					headerTitle="My ChatAgent"
// 					steps={steps}
// 					{...config}

// 				/>
// 			</ThemeProvider>
// 		</div>
// 	);
// }

// export default App;



import React, { useState } from 'react'
import OtpInput from 'otp-input-react'
import { auth } from './firebase.config'
// import { useRoutes } from 'react-router-dom'
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import './App.css'
import { toast, Toaster } from "react-hot-toast";
import Chat from './Chat'




const App = () => {
	const [otp, setOtp] = useState('')
	const [ph, setPh] = useState('')
	const [showOTP, setShowOTP] = useState(false)
	const [user, setUser] = useState(null)
	


	function onCaptchaVerify() {
		window["recaptchaVerifier"] = new RecaptchaVerifier('recaptcha-container', {
			'size': 'invisible',
			'callback': (response) => {
			  onSignup();
			}
		  }, auth);
		
	}



	function onOTPVerify() {
		window["confirmationResult"]
		  .confirm(otp)
		  .then(async (res) => {
			console.log(res);
			setUser(res.user);
			setTimeout(() => {
				toast.success("You Loggedin successfully!");
			}, 3000);
		  })
		  .catch((err) => {
			console.log(err);
		  });
	  }

	function onSignup()  {
		onCaptchaVerify();

    const appVerifier = window["recaptchaVerifier"];

    const formatPh = "+" + ph;

    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        window["confirmationResult"] = confirmationResult;
        setShowOTP(true);
        toast.success("OTP sended successfully!");
      })
      .catch((error) => {
        console.log(error);
      });
	}




	return( 
	<section className='otp-1'>
		<div>
		<Toaster toastOptions={{ duration: 4000 }} />
			<div id="recaptcha-container"></div>
			{user ? 
			(<div>
				<Chat />
			</div>)  : 
			(<div className='w-80 flex flex-col gap-4 rounded-lg p-4 '>
				<h1 className='otp-2'>
					Welcome to  <br /> MY CHATBOT AGENT
				</h1>
				{ showOTP ? (<>
					<label htmlFor="otp" className=' otp-3'>Enter your OTP</label>
					<OtpInput value={otp} onChange={setOtp} OTPLength={6} otpType="number" disabled={false} autoFocus className='otp-4'></OtpInput>
					<button onClick={onOTPVerify} className='otp-5'>
						<span>Verify OTP</span>
					</button>
				</>) :

				(<>
					<label htmlFor="" className='otp-34'>Verify your Phone Number</label>
					<PhoneInput country={'in'} value={ph} onChange={setPh}></PhoneInput>
					<button onClick={onSignup} className='otp-5'>
						<span>Send code via SMS</span>
					</button>
				</>)}
			</div>)}
		</div>
	</section>
	);
};

export default App;