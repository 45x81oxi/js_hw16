const FirestoreInit = (function () {
    var instance;
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyCXw12HuDoWlcvBt8wJJWSRJnWt0FWGi2w",
        authDomain: "news-app-932cc.firebaseapp.com",
        databaseURL: "https://news-app-932cc.firebaseio.com",
        projectId: "news-app-932cc",
        storageBucket: "news-app-932cc.appspot.com",
        messagingSenderId: "436984692386"
    };
    firebase.initializeApp(config);


// Initialize Cloud Firestore through Firebase
    var db = firebase.firestore();

    function getDb() {
        return db;
    }

    function createInstance() {
        return {
            getDb
        }
    }

    return {
        getInstance() {
            return instance || (instance = createInstance());
        }
    }
    //  db.collection("favorite-news").get().then((querySnapshot) => {
    //      querySnapshot.forEach((doc) => {
    //      console.log(`${doc.id}`);
    //          console.dir(doc.data());
    //     });
    // });

})();