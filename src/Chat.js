import React from 'react'
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';







const steps = [
	{
		id: '0',
		message: 'Hey User!',
		trigger: '1',
	}, {
		id: '1',
		message: 'Please tell your Name',
		trigger: '2'
	}, {
		id: '2',
		user: true,
		trigger: '3',
	}, {
		id: '3',
		message: " hi {previousValue}, how can I help you?",
		trigger: 4
	}, {
		id: '4',
		options: [
			{ value: "React", label: "React", trigger: "React" },
			{ value: "Angular", label: "Angular", trigger: "Angular" },
			{ value: "Next", label: "Next", trigger: "Next" },
			{ value: "Express", label: "Express", trigger: "Express" },
		],
	},
  {
    id: "React",
    message: "React.js, more commonly known as React, is a free, open-source JavaScript library. It works best to build user interfaces by combining sections of code (components) into full websites. Originally built by Facebook, Meta and the open-source community now maintain it. One of the good things about React is that you can use it as much or as little as you want! For example, you can build your entire site in React or just use one single React component on one page.",
    trigger: "5",
  },
  {
    id: 'Angular',
    message: "AngularJS is a JavaScript framework. It can be added to an HTML page with a <script> tag. AngularJS extends HTML attributes with Directives, and binds data to HTML with Expressions. AngularJS is a JavaScript Framework. AngularJS is a JavaScript framework written in JavaScript. AngularJS is distributed as a JavaScript file, and can be added to a web page with a script tag: <script src='https://ajax.googleapis.com/ajax/libs/angularjs/1.6.9/angular.min.js'></script>",
    trigger: "5",
  },
  {
    id: 'Next',
    message: "Next.js is a flexible React framework that gives you building blocks to create fast web applications. By framework, we mean Next.js handles the tooling and configuration needed for React, and provides additional structure, features, and optimizations for your application.",
    trigger: "5",
  },
  {
    id: 'Express',
    message: "Express.js is a web application framework for Node.js. It provides various features that make web application development fast and easy which otherwise takes more time using only Node.jsExpress.js is based on the Node.js middleware module called connect which in turn uses http module. So, any middleware which is based on connect will also work with Express.js.",
    trigger: "5",
  },
  {
    id: "5",
    message: "Do you know about more topics ?",
    trigger : "6",
  },
  {
    id: "6",
    options: [
			{ value: "Yes", label: "Yes", trigger: "Yes" },
			{ value: "No", label: "No", trigger: "No" },
		],
  },
  {
    id: "Yes",
    options: [
			{ value: "React", label: "React", trigger: "React" },
			{ value: "Angular", label: "Angular", trigger: "Angular" },
			{ value: "Next", label: "Next", trigger: "Next" },
			{ value: "Express", label: "Express", trigger: "Express" },
		],
  },
  {
    id: "No",
    message: "Hope you give better knowledge from here. happy Future !",
    end: true,
  }

];


const theme = {
	background: '#C9FF8F',
	headerBgColor: '#197B22',
	headerFontSize: '20px',
	botBubbleColor: '#0F3789',
	headerFontColor: 'white',
	botFontColor: 'white',
	userBubbleColor: '#FF5733',
	userFontColor: 'white',
};


const config = {
	floating: true,
};




const Chat = () => {
    return (
		<div style={{background:"rgb(5, 21, 0);"}} className="App">
			<ThemeProvider theme={theme}>
				<ChatBot
					headerTitle="My ChatAgent"
					steps={steps}
					{...config}

				/>
			</ThemeProvider>
		</div>
	);
}

export default Chat
