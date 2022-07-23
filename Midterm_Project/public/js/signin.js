function htmlspecialchars(ch) {
    if (ch===null) return '';
    ch = ch.replace(/&/g,"&amp;");
    ch = ch.replace(/\"/g,"&quot;");
    ch = ch.replace(/\'/g,"&#039;");
    ch = ch.replace(/</g,"&lt;");
    ch = ch.replace(/>/g,"&gt;");
    return ch;
}
function initApp() {
    // Login with Email/Password
    var txtEmail = document.getElementById('inputEmail');
    var txtPassword = document.getElementById('inputPassword');
    var newEmail = document.getElementById('newEmail');
    var newPassword = document.getElementById('newPassword');
    var newName = document.getElementById('newName');
    var btnLogin = document.getElementById('btnLogin');
    var btnGoogle = document.getElementById('btngoogle');
    var btnSignUp = document.getElementById('btnSignUp');
    var name;
    var flag=0;

    btnLogin.addEventListener('click', function () {
        firebase.auth().signInWithEmailAndPassword(htmlspecialchars(txtEmail.value), htmlspecialchars(txtPassword.value)).then(function(result){
            window.location.href="index.html?"+name+"&"+flag;
        })
        .catch(function(error) { // Handle Errors here.
            create_alert("error", "error");
            txtEmail.value="";
            txtPassword.value="";
        });
        /// TODO 2: Add email login button event
        ///         1. Get user input email and password to login
        ///         2. Back to index.html when login success
        ///         3. Show error message by "create_alert" and clean input field
        
    });

    btnGoogle.addEventListener('click', function () {
        /// TODO 3: Add google login button event
        ///         1. Use popup function to login google
        ///         2. Back to index.html when login success
        ///         3. Show error message by "create_alert"
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then(function(result) {
            // This gives you a Google Access Token. You can use it to access the Google API. 
            var token = result.credential.accessToken;
            
            // The signed-in user info.
            var user = result.user;
            flag=2;
            window.location.href="index.html?GOOGLE"+"&"+flag;
            // ...
            }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used. 
            var credential = error.credential;
            create_alert("error", "error");
        });
    });

    btnSignUp.addEventListener('click', function () {        
        /// TODO 4: Add signup button event
        ///         1. Get user input email and password to signup
        ///         2. Show success message by "create_alert" and clean input field
        ///         3. Show error message by "create_alert" and clean input field
        firebase.auth().createUserWithEmailAndPassword(newEmail.value,newPassword.value).then(function(result) { 
            create_alert("success", "Success!")
            newEmail.value="";
            newPassword.value="";
            name=htmlspecialchars(newName.value);
            newName.value="";
            flag=1;
        })
        .catch(function(error) { 
            create_alert("error", "Fail!!")
            newEmail.value="";
            newPassword.value="";
            newName.value="";
        }); 


        
    });
}

// Custom alert
function create_alert(type, message) {
    var alertarea = document.getElementById('custom-alert');
    if (type == "success") {
        str_html = "<div class='alert alert-success alert-dismissible fade show' role='alert'><strong>Success! </strong>" + message + "<button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button></div>";
        alertarea.innerHTML = str_html;
    } else if (type == "error") {
        str_html = "<div class='alert alert-danger alert-dismissible fade show' role='alert'><strong>Error! </strong>" + message + "<button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button></div>";
        alertarea.innerHTML = str_html;
    }
}

window.onload = function () {
    initApp();
};