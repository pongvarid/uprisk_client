<template>
<div>
    <div :class="`containerR ${switchc}`" ref="main">
        <div class="forms-containerR">
            <div class="signin-signup">
                <div class="sign-in-form forms" v-if="tab == 0">
                    <v-icon  style="font-size:70px;">em em-chart_with_upwards_trend</v-icon>
                    <h2 class="text-2xl">ระบบ บริหารจัดการความเสี่ยงและควบคุมภายใน</h2>
                    <p>ใช้บัญชี Microsotft 365 ของมหาวิทยาลัยพะเยา ในการเข้าใช้งานระบบ</p>
                    <br />
 <hr class="border-gray-400 w-full"><br />
                    <v-btn @click="getLogin()" x-large dark color="#e17100">
                        <v-icon>mdi-microsoft</v-icon>&nbsp;เข้าสู่ระบบด้วย Microsoft
                        365
                    </v-btn><br /> 
                  
                    <!-- <div class="flex items-center">
                        <img class="h-12" src="https://km.li.mahidol.ac.th/wp-content/uploads/2017/04/member-04-up.png" alt="">
                        <h2 class=" text-gray-600"><b>กองแผนงาน</b><br>มหาวิทยาลัยพะเยา</h2>
                    </div> -->

                </div>

                <div v-if="tab == 1">
                    <div class="md:p-12">
                        <form @submit.prevent="getLogin()"> 
                    <h2 class="text-2xl">ระบบ บริหารจัดการความเสี่ยงและควบคุมภายใน</h2>
                    <p>เข้าสู่ระบบโดยใช้ ชื่อผู้ใช้ และ รหัสผ่าน</p>
                    <br />  <hr class="border-gray-400 w-full"><br /> 
                            <v-text-field required v-model="form.username" label="ชื่อผู้ใช้" filled required></v-text-field>

                            <v-text-field required v-model="form.password" type="password" label="รหัสผ่าน" filled required></v-text-field>

                            <div class="text-center mt-6">
                                <v-btn large dark color="#129c51">เข้าสู่ระบบ</v-btn>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </div>

        <div class="panels-containerR">
            <div class="panel left-panel">
                <div class="content">
                    <h3>คุณมีบัญชีผู้ใช้ภายใน ?</h3>
                    <p>
                        หากคุณมีบัญชีภายในที่สร้างโดยผู้ดูแลระบบ (กองแผนงาน)
                        คุณสามารถเข้าสู่ระบบโดยใช้ ชื่อผู้ใช้ และ รหัสผ่าน
                        ที่ผู้ดูแลระบบสร้างขึ้นได้
                    </p>
                    <v-btn @click="ChangeTo('sign-up-mode')" outlined dark>เข้าสู่ระบบแบบบัญชีผู้ใช้ภายใน</v-btn>
                </div>
                <img src="/assets/images/login-icon.svg" class="image" alt="" />
            </div>
            <div class="panel right-panel">
                <div class="content">
                    <h3>คุณมี Microsoft 365 ?</h3>
                    <p>
                        หากคุณมีบัญชี Microsoft 365 ของมหาวิทยาลัยพะเยาอยู่แล้ว
                        คุณสามารถเข้าสู่ระบบได้ในทันที !
                    </p>

                    <v-btn @click="ChangeTo('')" outlined dark>เข้าสู่ระบบด้วย Microsoft 365</v-btn>
                </div>
                <img src="/assets/images/login-icon1.svg" class="image" alt="" />
            </div>
        </div>
    </div>
</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const containerR = document.querySelector(".containerR");
@Component({
    components: {},
    computed: {},
})
export default class Test extends Vue {
    tab: number = 0;
    switchc: string = "";
    private form: any = {
        username: "root",
        password: "Pautn1611",
    };
    private async getLogin() {
        await this.$router.push('/app/')
    }
    async created() {}
    async ChangeTo(val: string) {
        this.switchc = val;
        await this.sleep(1000);
        this.tab = val ? 1 : 0;
    }
    async sleep(ms: any) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
}
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700;800&display=swap");

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.containerR {
    position: relative;
    width: 100%;
    background-color: #fff;
    min-height: 100vh;
    overflow: hidden;
}

.forms-containerR {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
}

.signin-signup {
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    left: 75%;
    width: 50%;
    transition: 1s 0.7s ease-in-out;
    display: grid;
    grid-template-columns: 1fr;
    z-index: 5;
}

.forms {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0rem 5rem;
    transition: all 0.2s 0.7s;
    overflow: hidden;
    grid-column: 1 / 2;
    grid-row: 1 / 2;
}

div.sign-up-form {
    opacity: 1;
    z-index: 99;
}

form.sign-in-form {
    z-index: 2;
}

.title {
    font-size: 2.2rem;
    color: #444;
    margin-bottom: 10px;
}

.input-field {
    max-width: 380px;
    width: 100%;
    background-color: #f0f0f0;
    margin: 10px 0;
    height: 55px;
    border-radius: 55px;
    display: grid;
    grid-template-columns: 15% 85%;
    padding: 0 0.4rem;
    position: relative;
}

.input-field i {
    text-align: center;
    line-height: 55px;
    color: #acacac;
    transition: 0.5s;
    font-size: 1.1rem;
}

.input-field input {
    background: none;
    outline: none;
    border: none;
    line-height: 1;
    font-weight: 600;
    font-size: 1.1rem;
    color: #333;
}

.input-field input::placeholder {
    color: #aaa;
    font-weight: 500;
}

.social-text {
    padding: 0.7rem 0;
    font-size: 1rem;
}

.social-media {
    display: flex;
    justify-content: center;
}

.social-icon {
    height: 46px;
    width: 46px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 0.45rem;
    color: #333;
    border-radius: 50%;
    border: 1px solid #333;
    text-decoration: none;
    font-size: 1.1rem;
    transition: 0.3s;
}

.social-icon:hover {
    color: #4481eb;
    border-color: #4481eb;
}

.btn {
    width: 150px;
    background-color: #5995fd;
    border: none;
    outline: none;
    height: 49px;
    border-radius: 49px;
    color: #fff;
    text-transform: uppercase;
    font-weight: 600;
    margin: 10px 0;
    cursor: pointer;
    transition: 0.5s;
}

.btn:hover {
    background-color: #4d84e2;
}

.panels-containerR {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
}

.containerR:before {
    content: "";
    position: absolute;
    height: 2000px;
    width: 2000px;
    top: -10%;
    right: 48%;
    background: rgb(84, 65, 172);
    background: linear-gradient(90deg,
            rgb(51, 63, 116) 0%,
            rgb(76, 85, 209) 100%);
    transform: translateY(-50%);
    transition: 1.8s ease-in-out;
    border-radius: 50%;
    z-index: 6;
}

.image {
    width: 100%;
    transition: transform 1.1s ease-in-out;
    transition-delay: 0.4s;
}

.panel {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: space-around;
    text-align: center;
    z-index: 6;
}

.left-panel {
    pointer-events: all;
    padding: 3rem 17% 2rem 12%;
}

.right-panel {
    pointer-events: none;
    padding: 3rem 12% 2rem 17%;
}

.panel .content {
    color: #fff;
    transition: transform 0.9s ease-in-out;
    transition-delay: 0.6s;
}

.panel h3 {
    font-weight: 600;
    line-height: 1;
    font-size: 1.5rem;
}

.panel p {
    font-size: 0.95rem;
    padding: 0.7rem 0;
}

.btn.transparent {
    margin: 0;
    background: none;
    border: 2px solid #fff;
    width: 130px;
    height: 41px;
    font-weight: 600;
    font-size: 0.8rem;
}

.right-panel .image,
.right-panel .content {
    transform: translateX(800px);
}

/* ANIMATION */
.containerR.sign-up-mode:before {
    transform: translate(100%, -50%);
    right: 52%;
}

.containerR.sign-up-mode .left-panel .image,
.containerR.sign-up-mode .left-panel .content {
    transform: translateX(-800px);
}

.containerR.sign-up-mode .signin-signup {
    left: 25%;
}

.containerR.sign-up-mode form.sign-up-form {
    opacity: 1;
    z-index: 2;
}

.containerR.sign-up-mode form.sign-in-form {
    opacity: 0;
    z-index: 1;
}

.containerR.sign-up-mode .right-panel .image,
.containerR.sign-up-mode .right-panel .content {
    transform: translateX(0%);
}

.containerR.sign-up-mode .left-panel {
    pointer-events: none;
}

.containerR.sign-up-mode .right-panel {
    pointer-events: all;
}

@media (max-width: 870px) {
    .containerR {
        min-height: 800px;
        height: 100vh;
    }

    .signin-signup {
        width: 100%;
        top: 95%;
        transform: translate(-50%, -100%);
        transition: 1s 0.8s ease-in-out;
    }

    .signin-signup,
    .containerR.sign-up-mode .signin-signup {
        left: 50%;
    }

    .panels-containerR {
        grid-template-columns: 1fr;
        grid-template-rows: 1fr 2fr 1fr;
    }

    .panel {
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        padding: 2.5rem 8%;
        grid-column: 1 / 2;
    }

    .right-panel {
        grid-row: 3 / 4;
    }

    .left-panel {
        grid-row: 1 / 2;
    }

    .image {
        width: 400px;
        transition: transform 0.9s ease-in-out;
        transition-delay: 0.6s;
    }

    .panel .content {
        padding-right: 15%;
        transition: transform 0.9s ease-in-out;
        transition-delay: 0.8s;
    }

    .panel h3 {
        font-size: 1.2rem;
    }

    .panel p {
        font-size: 0.7rem;
        padding: 0.5rem 0;
    }

    .btn.transparent {
        width: 110px;
        height: 35px;
        font-size: 0.7rem;
    }

    .containerR:before {
        width: 1500px;
        height: 1500px;
        transform: translateX(-50%);
        left: 30%;
        bottom: 68%;
        right: initial;
        top: initial;
        transition: 2s ease-in-out;
    }

    .containerR.sign-up-mode:before {
        transform: translate(-50%, 100%);
        bottom: 32%;
        right: initial;
    }

    .containerR.sign-up-mode .left-panel .image,
    .containerR.sign-up-mode .left-panel .content {
        transform: translateY(-300px);
    }

    .containerR.sign-up-mode .right-panel .image,
    .containerR.sign-up-mode .right-panel .content {
        transform: translateY(0px);
    }

    .right-panel .image,
    .right-panel .content {
        transform: translateY(300px);
    }

    .containerR.sign-up-mode .signin-signup {
        top: 5%;
        transform: translate(-50%, 0);
    }
}

@media (max-width: 570px) {
    form {
        padding: 0 1.5rem;
    }

    .image {
        display: none;
    }

    .panel .content {
        padding: 0.5rem 1rem;
    }

    .containerR {
        padding: 1.5rem;
    }

    .containerR:before {
        bottom: 72%;
        left: 50%;
    }

    .containerR.sign-up-mode:before {
        bottom: 28%;
        left: 50%;
    }
}
</style>
