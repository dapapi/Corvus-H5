export default {
    phone: function (value) {
        if (!(/^1[34578]\d{9}$/.test(value))) {
            // toast.error("手机号错误");
            return false;
        }
        return true;
    },

    username: function (value) {
        if (!(/^1[34578]\d{9}$/.test(value)) && !(/^[\u4e00-\u9fa5]{0,5}$/.test(value)) && !(/^\w+$/.test(value))) {
            // toast.error("用户名错误");
            return false
        }
        return true;
    },

    password: function (value) {
        if (!value) {
            // toast.error("密码不能为空");
            return false
        }
        if (!(/^\w{6,18}$/.test(value))) {
            // toast.error("密码只能为6-18位数字或字母");
            return false
        }
        return true;
    },

    smsCode: function (value) {
        if (!(/^\d{4}$/.test(value))) {
            // toast.error("验证码错误");
            return false
        }
        return true;
    },
    // 邮箱校验
    email (value) {
        if (!(/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(value))) {
            // toast.error("邮箱错误");
            return false
        }
        return true;
    }
}