function htmlspecialchars(ch) {
    if (ch===null) return '';
    ch = ch.replace(/&/g,"&amp;");
    ch = ch.replace(/\"/g,"&quot;");
    ch = ch.replace(/\'/g,"&#039;");
    ch = ch.replace(/</g,"&lt;");
    ch = ch.replace(/>/g,"&gt;");
    return ch;
}
var userName;
function init() {
    var user_email = '';
    firebase.auth().onAuthStateChanged(function (user) {
        var menu = document.getElementById('Out');
        // Check user login
        if (user) {
            user_email = user.email;
            userName=user.displayName;
            document.getElementById('profile').innerHTML="<h4>Email: "+user_email+"</h4>"+"<h4>Name: "+user.displayName+"</h4>"+"</br>";
            
            menu.innerHTML = "<span class='log'>" + "</span><span class='log' id='logout-btn' data-prompt2='Logout'><img class='stiky' src='bye.png' width='65' height='55'></span>";
            var btnLogOut = document.getElementById('logout-btn');
            /// TODO 5: Complete logout button event
            ///         1. Add a listener to logout button 
            ///         2. Show alert when logout success or error (use "then & catch" syntex)

            btnLogOut.addEventListener('click', function () {
                firebase.auth().signOut().then(function() {
                    window.location.href="signin.html";
                    create_alert("success", "Success!");
                })
                .catch(function(error) {
                    create_alert("error", "Fail!");
                });
            });
            post_btn = document.getElementById('post_btn');
            post_txt = document.getElementById('comment');
        
        
            // The html code for post
            var str_before_username = "<div class='my-3 p-3 bg-white rounded box-shadow'><h6 class='border-bottom border-gray pb-2 mb-0'>Recent updates</h6><div class='media text-muted pt-3'><img src='girl.png' alt='' class='mr-2 rounded' style='height:32px; width:32px;'><p class='media-body pb-3 mb-0 small lh-125 border-bottom border-gray'><strong class='d-block text-gray-dark'>";
            var str_after_content = "</p></div></div>\n";
            var read="<div><button type='button' class='btn btn-info' onclick='read(";
            var read1=")'>Read it!</button></div>"
            var postsRef = firebase.database().ref('com_list');
            // List for store posts html
            var total_post = [];
            // Counter for checking history post update complete
            var first_count = 0;
            // Counter for checking when to update new post
            var second_count = 0;
        
            postsRef.once('value')
                .then(function (snapshot) {
                    console.log(snapshot.val())
                    var obj=snapshot.val();
                    var k=0;
                    for (var key in obj){
                        k++;
                        total_post.push(obj[key]);
                        if (obj[key].username==user_email){
                            // if (obj[key].userName=="GOOGLE") post_list.innerHTML += str_before_username + obj[key].username + '</strong>' + obj[key].title +read+k+read1+str_after_content;
                            post_list.innerHTML += str_before_username + obj[key].userName + '</strong>' + obj[key].title +read+k+read1+str_after_content;
                        }
                    }
        
                })
                .catch(e => console.log(e.message));

        } else {
            // It won't show any post if not login
            menu.innerHTML = "<a class='dropdown-item' href='signin.html'>Login</a>";
            document.getElementById('post_list').innerHTML = "";
        }
    });

   
}

window.onload = function () {
    init();
};

function read(k){
    location.href="comment.html?"+k;
}

function edit(){
    var user = firebase.auth().currentUser;
    var name = prompt("New name:",userName);
    if (name != null){
        user.updateProfile({
            displayName: name,
        }).then(function() {
            console.log(user.displayName);
          }).catch(function(error) {
            // An error happened.
            console.log("error");
          });
    }
    setTimeout(()=>{location.href="javascript:window.location.reload()";} , 5);
}
// user page, post page, post list page(cater), leave comment under any post