function init() {
    var user_email = '';
    var url = location.href;
    var temp = url.split("?");
    var c = temp[1];
    console.log(c);

    firebase.auth().onAuthStateChanged(function (user) {
        var menu = document.getElementById('Out');
        var sen = document.getElementById('anima');
        // Check user login
        if (user) {
            user_email = user.email;
            if (c==1) sen.innerHTML="Makeups"
            if (c==2) sen.innerHTML="Dressup"
            if (c==3) sen.innerHTML="Leisure"
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

    post_btn = document.getElementById('post_btn');
    post_txt = document.getElementById('comment');

    // post_btn.addEventListener('click', function () {
    //     if (post_txt.value != "") {
    //         /// TODO 6: Push the post to database's "com_list" node
    //         ///         1. Get the reference of "com_list"
    //         ///         2. Push user email and post data
    //         ///         3. Clear text field
    //         firebase.database().ref('com_list').push({
    //             username: user_email,
    //             text: post_txt.value
    //         });
    //         post_txt.value ="";
    //     } 
    // });

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
                if(obj[key].Type==c){
                    total_post.push(obj[key]);
                    // if (obj[key].userName=="GOOGLE") post_list.innerHTML += str_before_username + obj[key].username + '</strong>' + obj[key].title +read+k+read1+str_after_content;
                    post_list.innerHTML += str_before_username + obj[key].userName + '</strong>' + obj[key].title +read+k+read1+str_after_content;
                }
            }
            postsRef.on('value', function(snap){
                total_post=[];
                post_list.innerHTML="";
                var s1=snap.val();
                var k=0;
                for (var key in s1){
                    k++;
                    if(s1[key].Type==c){
                        total_post.push(s1[key]);
                        // if (s1[key].userName=="GOOGLE") post_list.innerHTML += str_before_username + s1[key].username + '</strong>' + s1[key].title + read+k+read1+str_after_content;
                        post_list.innerHTML += str_before_username + s1[key].userName + '</strong>' + s1[key].title + read+k+read1+str_after_content;
                    }
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

function read(k){
    location.href="comment.html?"+k;
}

// user page, post page, post list page(cater), leave comment under any post