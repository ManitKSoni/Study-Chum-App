var firebase = require('firebase')

const firebaseConfig = {
    apiKey: "AIzaSyBbrmcraXR7RRJ6T4ibN21hWoieIpWc_-s",
    authDomain: "studychums-f41e0.firebaseapp.com",
    databaseURL: "https://studychums-f41e0.firebaseio.com",
    projectId: "studychums-f41e0",
    storageBucket: "studychums-f41e0.appspot.com",
    messagingSenderId: "1016678898432",
    appId: "1:1016678898432:web:cbd200b2b09abb362f71e5",
    measurementId: "G-EQ5EYZM1GB"
};

// Initialize Firebase
const Firebase = firebase.initializeApp(firebaseConfig)

export default Firebase