function htmlspecialchars(ch) {
    if (ch===null) return '';
    ch = ch.replace(/&/g,"&amp;");
    ch = ch.replace(/\"/g,"&quot;");
    ch = ch.replace(/\'/g,"&#039;");
    ch = ch.replace(/</g,"&lt;");
    ch = ch.replace(/>/g,"&gt;");
    return ch;
}
function init() {
    var user_email = '';
    var user_name = '';
    var url = location.href;
    var temp = url.split("?");
    var k = temp[1];
    console.log(k);
    firebase.auth().onAuthStateChanged(function (user) {
        var menu = document.getElementById('Out');
        // Check user login
        if (user) {
            user_email = user.email;
            user_name = user.displayName;
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
        } else {
            // It won't show any post if not login
            menu.innerHTML = "<a class='dropdown-item' href='signin.html'>Login</a>";
            document.getElementById('post_list').innerHTML = "";
        }
    });

    cmt_btn = document.getElementById('cmt_btn');
    cmt_comment = document.getElementById('comment');
    console.log(cmt_comment);

    cmt_btn.addEventListener('click', function () {
        if (cmt_comment.value != "") {
            /// TODO 6: Push the post to database's "com_list" node
            ///         1. Get the reference of "com_list"
            ///         2. Push user email and post data
            ///         3. Clear text field
            firebase.database().ref('com_list'+k).push({
                username: user_email,
                userName: user_name,
                comment: htmlspecialchars(cmt_comment.value)
            });
            cmt_comment.value ="";
        } 
    });

    // The html code for post
    var str_before_username = "<div class='my-3 p-3 bg-white rounded box-shadow'><h6 class='border-bottom border-gray pb-2 mb-0'></h6><div class='media text-muted pt-3'><img src='girl.png' alt='' class='mr-2 rounded' style='height:32px; width:32px;'><p class='media-body pb-3 mb-0 small lh-125 border-bottom border-gray'><strong class='d-block text-gray-dark'>";
    var str_after_content = "</p></div></div>\n";
    var postsRef = firebase.database().ref('com_list');
    var postsRef_cmt = firebase.database().ref('com_list'+k);
    // List for store posts html
    var total_cmt = [];
    var total_post = [];
    // Counter for checking history post update complete
    var first_count = 0;
    // Counter for checking when to update new post
    var second_count = 0;

    postsRef.once('value')
        .then(function (snapshot) {
            console.log(snapshot.val())
            var obj=snapshot.val();
            var i=1;
            for (var key in obj){
                if (i==k){
                    // if (obj[key].userName=="GOOGLE") post_list.innerHTML +=  str_before_username + '<big>' + 'Writer:' + obj[key].username +'</br>'+'</br>'+ 'Title:' + obj[key].title + '</strong>' + '</big>' + '</br>' + obj[key].text +str_after_content;
                    post_list.innerHTML +=  str_before_username + '<big>' + 'Writer:' + obj[key].userName +'</br>'+'</br>'+ 'Title:' + obj[key].title + '</strong>' + '</big>' + '</br>' + obj[key].text +str_after_content;
                }
                i++;
            }
        })
        .catch(e => console.log(e.message));

    postsRef_cmt.once('value')
        .then(function (snapshot) {
            var obj1=snapshot.val();
            for (var key in obj1){
                total_cmt.push(obj1[key]);
                cmt_list.innerHTML += str_before_username +obj1[key].userName +'</br>'+ obj1[key].comment +str_after_content;
            }
            postsRef_cmt.on('value', function(snap){
                total_cmt=[];
                cmt_list.innerHTML="";
                var s1=snap.val();
                for (var key in s1){
                    console.log("deploy");
                    total_cmt.push(s1[key]);
                    cmt_list.innerHTML += str_before_username +'<big>'+'Responder:'+s1[key].userName + '</big>'+'</br>'+ s1[key].comment +str_after_content;
                }
            })
            /// TODO 7: Get all history posts when the web page is loaded and add listener to update new post
            ///         1. Get all history post and push to a list (str_before_username + email + </strong> + data + str_after_content)
            ///         2. Join all post in list to html in once
            ///         4. Add listener for update the new post
            ///         5. Push new post's html to a list
            ///         6. Re-join all post in list to html when update
            ///
            ///         Hint: When history post count is less then new post count, update the new and refresh html

        })
        .catch(e => console.log(e.message));
}

window.onload = function () {
    init();
};