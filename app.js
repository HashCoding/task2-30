(function() {
    
    var bindEvent = function(element, type, handle) {
        if(element.addEventListener) {
            element.addEventListener(type, handle, false);
        } else if(element.attachEvent) {
            element.attachEvent('on'+type, handle);
        } else {
            element['on'+type] = handle;
        }
    }
    
   var nickname = document.getElementById('nickname');
   var nicknameWarn = document.getElementById('nickname-warn');
   var password = document.getElementById('password');
   var passwordWarn = document.getElementById('password-warn');
   var rePassword = document.getElementById('re-password');
   var rePasswordWarn = document.getElementById('re-password-warn');
   var email = document.getElementById('email');
   var emailWarn = document.getElementById('email-warn');
   var phone = document.getElementById('phone');
   var phoneWarn = document.getElementById('phone-warn');
   var submit = document.getElementById('submit');
    
    var trimReg = /^\s+|\s+$/g;
    var chinaReg = /[\u4E00-\uFA29]|[\uE7C7-\uE7F3]/g;
    var lenReg = /^.{4,16}$/;
    var emailReg = /^[a-z]([a-z0-9]*[-_\.]?[a-z0-9]+)*@([a-z0-9]*[-_]?[a-z0-9]+)+[\.][a-z]{2,3}([\.][a-z]{2})?$/i;
    var phoneReg = /^1[3|4|5|7|8]\d{9}$/;
    
    var msg = {
        success: {
            'nickname': '名称格式正确',
            'password': '密码可用',
            'rePassword': '密码一致',
            'email': '邮箱正确',
            'phone': '手机正确'
        },
        error: {
            'nickname': '名称格式不正确',
            'password': '密码不可用',
            'rePassword': '密码不一致',
            'email': '邮箱不正确',
            'phone': '手机不正确'
        },
        warnning: {
            'nickname': '必填，长度为4-16个字符',
            'password': '必填，长度为4-16个字符',
            'rePassword': '请再次输入相同的密码',
            'email': '请输入邮箱',
            'phone': '请输入手机号'
        }
    }
    
    var colors = {
        'success': 'green',
        'error': 'red',
        'warnning': ''  
    }
    
    var show = function(status, c) {
        spanNode.innerHTML = msg[status];
        spanNode.style.color = colors[c];
        nicknameNode.className += 'input '+  c;
    }
    
    
    var check = (function() {
        
       var checknicknameOrPassword = function(nickname) {
           nickname = nickname.replace(trimReg, "").replace(chinaReg, '++');
            if(nickname.length === 0 || !lenReg.test(nickname)) {
                return 'error';      
            } else {
                return 'success';
            }
       }
       
       var checkRePassword = function(password, rePassword) {
           if (password !== rePassword) {
               return 'error';
           } else {
               return 'success';
           }
       }
       
       var checkEmail = function (email) {
            if(email.search(emailReg) > -1) {
                return 'success';
            } else {
                return 'error';
            } 
       }
       
       var checkPhone = function(phone) {
           if(phone.search(phoneReg) > -1) {
               return 'success';
           } else {
               return 'error';
           }
       }
       return {
           'checknickname': checknicknameOrPassword,
           'checkPassword': checknicknameOrPassword,
           'checkRePassword': checkRePassword,
           'checkEmail': checkEmail,
           'checkPhone': checkPhone
       }
       
    })();
    
    
    var repeatWarn = function(element, elementWarn, status, id) {
        elementWarn.innerHTML = msg[status][id];
        elementWarn.style.color = colors[status];
        element.className = 'input ' + status;  
    }
    
    
    bindEvent(nickname, 'focus', function() {
        repeatWarn(nickname, nicknameWarn, 'warnning', 'nickname');
    });
    bindEvent(password, 'focus', function() {
        repeatWarn(password, passwordWarn, 'warnning', 'password');
    });
    bindEvent(rePassword, 'focus', function() {
        repeatWarn(rePassword, rePasswordWarn, 'warnning', 'rePassword');
    });
    bindEvent(email, 'focus', function() {
        repeatWarn(email, emailWarn, 'warnning', 'email');
    });
    bindEvent(phone, 'focus', function() {
        repeatWarn(phone, phoneWarn, 'warnning', 'phone');
    });


    bindEvent(nickname, 'blur', function() {
        var checkResult = check['checknickname'](nickname.value);
        repeatWarn(nickname, nicknameWarn, checkResult, 'nickname');
    });
    bindEvent(password, 'blur', function() {
         var checkResult = check['checkPassword'](password.value);
         repeatWarn(password, passwordWarn, checkResult, 'password');
    });
    bindEvent(rePassword, 'blur', function () {
        var checkResult = check['checkRePassword'](password.value, rePassword.value);
        repeatWarn(rePassword, rePasswordWarn, checkResult, 'rePassword')
    });
    bindEvent(email, 'blur', function () {
        var checkResult = check['checkEmail'](email.value);
        repeatWarn(email, emailWarn, checkResult, 'email')
    });
    bindEvent(phone, 'blur', function () {
        var checkResult = check['checkPhone'](phone.value);
        repeatWarn(phone, phoneWarn, checkResult, 'phone')
    });
    
    bindEvent(submit, 'click', function() {
        if(check['checknickname'] === 'success' && check['checkPassword'] === 'success' && check['checkRePassword'] === 'success' && check['checkEmail'] === 'success' && check['checknickname'] === 'success' && check['checkPhone'] === 'success') {
            alert('输入正确');
        } else {
            alert('输入错误');
        }
    })
    
})();