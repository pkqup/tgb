function  UserInfo(){
    window.location.href="html/accountManage/userMsg.html";
}

function Account(){
    window.location.href="../html/accountManage/accoutMessage.html";
}
function Logout(){
    localStorage.removeItem('userInfo');
    window.location.href="login.html";
}