# Software Studio 2019 Spring Midterm Project
## Notice
* Replace all [xxxx] to your answer

## Topic
* Project Name : [Girls' Forum - A forum for girls to share their thoughts]
* Key functions (add/delete)
    1. [User page]
    2. [Post page]
    3. [Post list page]
    4. [Leave comment under any post]

    
* Other functions (add/delete)
    1. [Edit name]

## Basic Components
|Component|Score|Y/N|
|:-:|:-:|:-:|
|Membership Mechanism|20%|Y|
|Firebase Page|5%|Y|
|Database|15%|Y|
|RWD|15%|Y|
|Topic Key Function|15%|Y|

## Advanced Components
|Component|Score|Y/N|
|:-:|:-:|:-:|
|Third-Party Sign In|2.5%|Y|
|Chrome Notification|5%|Y|
|Use CSS Animation|2.5%|Y|
|Security Report|5%|Y|

## Website Detail Description

# 作品網址：[https://forum-758ac.firebaseapp.com]

# Components Description : 
1. [Membership Mechanism] : [可以註冊及登入。]
2. [Host on your Firebase page] : [https://forum-758ac.firebaseapp.com]
3. [Database read/write] : [只有在使用者登入後才可以閱讀及寫入資料。]
4. [RWD] : [可以適應不同的網頁大小及裝置且網頁排版不會跑掉。]
5. [User page] : [在網頁最上面的選單部分有三個圖案，在滑鼠移到後會顯示他們的功能，點擊中間的女生頭像會跳到user_page，在user_page裡面可以看到personal-profile（email,name）與自己的貼文。]
6. [Post page] : [在網頁最上面的選單部分有三個圖案，點擊左邊的筆會跳到post_page，在裡面可以新增貼文，有標題及內容，還需要選擇自己貼文的分類（makeups,dressup,leisure）]
7. [Post list page] : [在登入後就是這個page，裡面有所有的文章（顯示方式為：第一行為po文者的name,第二行為標題），在按網頁左上角的'Girls'Forum'也是跳到這個page。]
8. [Leave comment under any post] : [在每篇文章的左手邊有一個'Readit!'的按鍵，按下去後可以看到整篇文章並且留言。]
9. [Sign Up/In with Google] : [在login_page有一個LoginWithGoogle的按鍵，可以直接signin，使用此種signin的使用者name會設成email，可以自行到user_page做更改。]
10. [Add Chrome notification] : [在有人po文時會有通知顯示。]
11. [Use CSS animation] : [在網頁上方有個文字條，在每次網頁load時會以跑馬燈形式跑進來。]


# Other Functions Description(1~10%) : 
1. [Edit name] : [可以到user page的地方做名稱的更改，之後的po文將會以新的name做呈現。]


## Security Report (Optional)
為避免在寫入資料時（po文,改名稱,留言），被人惡意置入特殊字元（js語法 如<div>...</div>）而導致頁面被更動，在所有能寫入的地方都有檢查過裡面的資料，將特殊字元改掉，避免頁面損壞。
