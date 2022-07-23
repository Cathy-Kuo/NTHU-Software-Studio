function get_info(){
    return new Promise((resolve, reject) => {
        let success_rate = Math.random();
        let timer = Math.floor(Math.random() * 1000 + 500);
        if (success_rate > 0.5) {
            let tmp_id = Math.floor(Math.random() * 14000 + 6000);
            setTimeout(() => {
                resolve(tmp_id);
            }, timer);
        }
        else {
            setTimeout(() => {
                reject('get_info Failed');
            }, timer);
        }
    });
}

function get_first(){
    return new Promise((resolve, reject) => {
        let success_rate = Math.random();
        let timer = Math.floor(Math.random() * 1000 + 500);
        if (success_rate > 0.1) {
            let tmp_id = Math.floor(Math.random() * 14000 + 6000);
            setTimeout(() => {
                resolve(tmp_id);
            }, timer);
        }
        else {
            setTimeout(() => {
                reject('get_info Failed');
            }, timer);
        }
    });
}

function get_last(){
    return new Promise((resolve, reject) => {
        let success_rate = Math.random();
        let timer = Math.floor(Math.random() * 1000 + 500);
        if (success_rate > 0.1) {
            let tmp_id = Math.floor(Math.random() * 14000 + 6000);
            setTimeout(() => {
                resolve(tmp_id);
            }, timer);
        }
        else {
            setTimeout(() => {
                reject('get_info Failed');
            }, timer);
        }
    });
}

function get_user(){
    return new Promise((resolve, reject) => {
        let success_rate = Math.random();
        let timer = Math.floor(Math.random() * 1000 + 500);
        if (success_rate > 0.1) {
            let tmp_id = Math.floor(Math.random() * 14000 + 6000);
            setTimeout(() => {
                resolve(tmp_id);
            }, timer);
        }
        else {
            setTimeout(() => {
                reject('get_info Failed');
            }, timer);
        }
    });
}

function get_email(){
    return new Promise((resolve, reject) => {
        let success_rate = Math.random();
        let timer = Math.floor(Math.random() * 1000 + 500);
        if (success_rate > 0.1) {
            let tmp_id = Math.floor(Math.random() * 14000 + 6000);
            setTimeout(() => {
                resolve(tmp_id);
            }, timer);
        }
        else {
            setTimeout(() => {
                reject('get_info Failed');
            }, timer);
        }
    });
}

function get_add(){
    return new Promise((resolve, reject) => {
        let success_rate = Math.random();
        let timer = Math.floor(Math.random() * 1000 + 500);
        if (success_rate > 0.1) {
            let tmp_id = Math.floor(Math.random() * 14000 + 6000);
            setTimeout(() => {
                resolve(tmp_id);
            }, timer);
        }
        else {
            setTimeout(() => {
                reject('get_info Failed');
            }, timer);
        }
    });
}

function initApp() {
    var reSamplebtn = document.getElementById('resamplebtn');
    reSamplebtn.addEventListener('click', retrive_data);
}

async function retrive_data(){
    var txtInfoName = document.getElementById('user-info-name');
    var txtFirstName = document.getElementById('firstName');
    var txtLastName = document.getElementById('lastName');
    var txtUserName = document.getElementById('username');
    var txtEmail = document.getElementById('email');
    var txtAddress = document.getElementById('address');
    var boxReSample = document.getElementById('re-sample');
    txtInfoName.innerText = '-';
    txtFirstName.value = '-';
    txtLastName.value = '-';
    txtUserName.value = '-';
    txtEmail.value = '-';
    txtAddress.value = '-';
    try{
        var info = await get_info();
        txtInfoName.innerText = info; 
        var values = await Promise.all([ get_first(), get_last(), get_user(), get_email(), get_add()]);
            txtFirstName.value = values[0];
            txtLastName.value = values[1];
            txtUserName.value = values[2];
            txtEmail.value = values[3];
            txtAddress.value = values[4];
    }
    catch(e){
        txtInfoName.innerText = "Fail";
        if (boxReSample.checked){
            retrive_data();
        }
    }
}

window.onload = function () {
    initApp();
}