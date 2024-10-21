<template>
    <div class="W">
        <img src="/img/tup.jpg">
        <!-- 注册 -->
        <!-- <div class="from admin" v-show="true"> -->
        <!-- <el-form ref="form" :model="form" label-width="80px" class="login-box" :rules="rules"> -->
        <!-- <el-form-item label="账号" prop="login"> -->
        <!-- <el-input v-model="form.login" placeholder="请输入账号"></el-input> -->
        <!-- </el-form-item> -->
        <!-- <el-form-item label="密码" prop="password"> -->
        <!-- <el-input type="password" v-model="form.password" placeholder="请输入密码"></el-input> -->
        <!-- </el-form-item> -->
        <!-- <el-form-item label="性别" prop="radio"> -->
        <!-- <el-radio v-model="form.radio" label="男">男</el-radio> -->
        <!-- <el-radio v-model="form.radio" label="女">女</el-radio> -->
        <!-- </el-form-item> -->
        <!-- <el-form-item label="年龄" prop="age"> -->
        <!-- <el-input v-model="form.age" placeholder="请输入年龄"></el-input> -->
        <!-- </el-form-item> -->
        <!-- <el-form-item label="出生日期" prop="data"> -->
        <!-- <el-date-picker v-model="form.data" type="date" placeholder="选择出生日期"> </el-date-picker> -->
        <!-- </el-form-item> -->
        <!-- <el-form-item label="年级" prop="class"> -->
        <!-- <el-select v-model="form.class" placeholder="请选择年级"> -->
        <!-- <el-option label="一年级" value="一年级"></el-option> -->
        <!-- <el-option label="二年级" value="二年级"></el-option> -->
        <!-- <el-option label="三年级" value="三年级"></el-option> -->
        <!-- <el-option label="四年级" value="四年级"></el-option> -->
        <!-- <el-option label="五年级" value="五年级"></el-option> -->
        <!-- <el-option label="六年级" value="六年级"></el-option> -->
        <!-- <el-option label="七年级" value="七年级"></el-option> -->
        <!-- <el-option label="八年级" value="八年级"></el-option> -->
        <!-- <el-option label="九年级" value="九年级"></el-option> -->
        <!-- <el-option label="十年级" value="十年级"></el-option> -->
        <!-- </el-select> -->
        <!-- </el-form-item> -->
        <!-- <el-form-item label="电话" prop="Iph"> -->
        <!-- <el-input v-model="form.Iph" placeholder="请输入电话"></el-input> -->
        <!-- </el-form-item> -->
        <!-- <el-form-item label="邮箱" prop="Emit"> -->
        <!-- <el-input v-model="form.Emit" placeholder="请输入邮箱"></el-input> -->
        <!-- </el-form-item> -->
        <!-- <el-form-item> -->
        <!-- <el-button type="primary" @click="demo"></el-button> -->
        <!-- <el-button type="primary" @click="onSubmit">立即登录</el-button> -->
        <!-- <el-button type="primary" @click="onADmin">立即注册</el-button> -->
        <!-- </el-form-item> -->
        <!-- </el-form> -->
        <!-- </div> -->
        <!--登陆 -->
        <div class="from login" v-show="true">
            <el-form ref="login" :model="login" label-width="80px" class="login-box" :rules="rules">
                <el-form-item label="账号" prop="login">
                    <el-input v-model="login.login" placeholder="请输入账号"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="login.password" placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item>
                    <!-- <el-button type="primary" @click="demo2"></el-button> -->
                    <el-button type="primary" @click="onSubmit">立即登录</el-button>
                </el-form-item>
            </el-form>
        </div>
        <!-- <div><button type="button" @click="NONE">切换</button></div> -->
    </div>
</template>

<script>
import moment from 'moment';
export default {
    name: 'loginShow',
    data() {
        return {
            // 注册
            form: {
                login: '',
                password: '',
                radio: '',
                age: '',
                data: '',
                class: '',
                Iph: '',
                Emit: '',
            },
            // 登陆
            login: {
                login: '',
                password: '',
            },
            // 登陆
            showElement: 'true',
            // 注册
            show: 'false',
            // 标记限制输入内容
            rules: {
                login: [
                    { required: true, message: '请输入账号', trigger: 'blur' },
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur', min: 8 },
                ],
                radio: [
                    { required: true, message: '请输入性别', trigger: 'blur', },
                ],
                age: [
                    { required: true, message: '请输入年龄', trigger: 'blur', },
                ],
                data: [
                    { required: true, message: '请输入出生日期', trigger: 'blur', },
                ],
                class: [
                    { required: true, message: '请输入', trigger: 'blur', },
                ],
                Iph: [
                    { required: true, message: '请输入手机号', trigger: 'blur', max: 11 },
                ],
                Emit: [
                    { required: true, message: '请输入邮箱', trigger: 'blur' },
                ],
            }
        }
    },
    methods: {
        // 测试注册内容能否获得
        demo() {
            const originalDate = this.form.data;
            const formattedDate = moment(originalDate).format('YYYY-MM-DD');
            console.log(`${this.form.login.toString()},
         ${this.form.password.toString()},
          ${this.form.radio.toString()},
          ${this.form.age.toString()},
              ${formattedDate},
           ${this.form.class.toString()},
            ${this.form.Iph},
             ${this.form.Emit.toString()},
    `);
        },
        // 测试登录数据
        demo2() {
            alert(`${this.login.login.toString()}
            ${this.login.password.toString()}
            `)
        },
        // 登录数据验证
        onSubmit() {
            this.$refs.login.validate((value) => {
                if (value && this.login.login.length > 0 && this.login.password.length > 0) {
                    fetch('http://127.0.0.1:3000/admin', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            login: this.login.login.toString(),
                            password: this.login.password.toString()
                        })
                    })
                        .then(response => {
                            if (response.status === 200) {
                                // window.location.href = ' http://localhost:8081/';
                                window.location.href = 'http://172.17.125.155:8081/';
                                // this.$router.replace('/success')
                            } else if (response.status === 401) {
                                window.location.href = '/error.html';
                                // this.$router.replace('/error')
                            }
                        })
                        .catch(error => {
                            console.log('error+', error);
                        });
                } else {
                    alert("请输入您的账号和密码");
                }
            })
        },
        // 注册数据
        onADmin() {
            this.$refs.form.validate((value) => {
                if (value && this.form.login.length > 0 && this.form.password.length > 0) {
                    const originalDate = this.form.data;
                    const formattedDate = moment(originalDate).format('YYYY-MM-DD');
                    fetch('http://127.0.0.1:3000/login', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            login: this.form.login.toString(),
                            password: this.form.password.toString(),
                            radio: this.form.radio.toString(),
                            age: this.form.age.toString(),
                            //出生日期
                            formattedDate: formattedDate,
                            class: this.form.class.toString(),
                            Iph: this.form.Iph.toString(),
                            Emit: this.form.Emit.toString()
                        })
                    })
                        .then(response => {
                            if (response) {
                                if (response.status === 200) {
                                    alert("注册成功");
                                } else {
                                    alert("注册失败");
                                }
                            }
                        })
                        .catch(error => {
                            if (error) {
                                alert("注册失败");
                            }
                        });
                } else {
                    alert("请输入您的账号和密码");
                }
            })
        },
        // NONE() {
        // console.log(this.showElement);
        // console.log(this.show);
        // }
    }
}

</script>
<style>
.login-box {
    width: 350px;
    border: 1px solid #dcdfe6;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 0 30px #dcdfe6;
    background-color: #ffffff;
    margin-left: 150px;
}

img {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%
}

.from {
    z-index: 1;
    position: relative;

}


.btn {
    width: 40px;
    height: 20px;
    border-radius: 3px;
    background-color: #ffffff;
    position: relative;
    z-index: 2;
}

.login {
    position: absolute;
    right: 20px;
    top: 100px;
}
</style>