import * as firebase from "firebase"; 
import Constants from "expo-constants";

firebase.initializeApp(Constants.manifest.extra.firebase);

// <!-- The core Firebase JS SDK is always required and must be listed first -->
// <script src="https://www.gstatic.com/firebasejs/7.8.2/firebase-app.js"></script>

// <!-- TODO: Add SDKs for Firebase products that you want to use
//      https://firebase.google.com/docs/web/setup#available-libraries -->
// <script src="https://www.gstatic.com/firebasejs/7.8.2/firebase-analytics.js"></script>

// <script>
//   // Your web app's Firebase configuration
//   var firebaseConfig = {
//     apiKey: "AIzaSyBjXAgOozsrs0r7Y1mAfNjl158XaCuZHdE",
//     authDomain: "fitnessapp-86a7c.firebaseapp.com",
//     databaseURL: "https://fitnessapp-86a7c.firebaseio.com",
//     projectId: "fitnessapp-86a7c",
//     storageBucket: "fitnessapp-86a7c.appspot.com",
//     messagingSenderId: "302501304715",
//     appId: "1:302501304715:web:2b051025773952b7ca378e",
//     measurementId: "G-W1PP0SXJCW"
//   };
//   // Initialize Firebase
//   firebase.initializeApp(firebaseConfig);
//   firebase.analytics();
// </script>

export default firebase;