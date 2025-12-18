<script setup>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAuth } from '@/composables/useAuth';

const router = useRouter();
const route = useRoute();
const { login, isAuthenticating, authError } = useAuth();

const email = ref('eve.holt@reqres.in');
const password = ref('cityslicka');
const formError = ref('');

const handleLogin = async () => {
  formError.value = '';
  if (!email.value || !password.value) {
    formError.value = 'Email and password are required.';
    return;
  }
  const success = await login(email.value, password.value);
  if (success) {
    const redirect = route.query.redirect || { name: 'Catalog' };
    router.push(redirect);
  }
};
let correctCaptchaAnswer = null;


function generateCaptcha() {
  const a = Math.floor(Math.random() * 9) + 1;
  const b = Math.floor(Math.random() * 9) + 1;

  correctCaptchaAnswer = a + b;

  document.getElementById("captchaQuestion").textContent = `${a} + ${b} = ?`;
  document.getElementById("captchaAnswer").value = "";
  document.getElementById("captchaError").textContent = "";
}


function setupSwitcher() {
  const btnSignup = document.getElementById("btnSignup");
  const btnLogin = document.getElementById("btnLogin");
  const signupForm = document.getElementById("signupForm");
  const loginForm = document.getElementById("loginForm");

  btnSignup.addEventListener("click", () => {
    btnSignup.classList.add("active");
    btnLogin.classList.remove("active");
    signupForm.classList.remove("hidden");
    loginForm.classList.add("hidden");
  });

  btnLogin.addEventListener("click", () => {
    btnLogin.classList.add("active");
    btnSignup.classList.remove("active");
    loginForm.classList.remove("hidden");
    signupForm.classList.add("hidden");
  });
}


window.addEventListener("DOMContentLoaded", () => {
  generateCaptcha();
  setupSwitcher();
  document.getElementById("btnRefresh").addEventListener("click", generateCaptcha);
});


const signupForm = document.getElementById("signupForm");

signupForm.addEventListener("submit", function (e) {
  e.preventDefault();

  
  document.getElementById("suNameError").textContent = "";
  document.getElementById("suEmailError").textContent = "";
  document.getElementById("suPasswordError").textContent = "";
  document.getElementById("captchaError").textContent = "";
  document.getElementById("signupSuccess").textContent = "";

  let valid = true;

  const name = document.getElementById("suName").value.trim();
  const email = document.getElementById("suEmail").value.trim();
  const password = document.getElementById("suPassword").value;
  const captchaAnswer = document.getElementById("captchaAnswer").value.trim();

  
  if (name === "") {
    document.getElementById("suNameError").textContent = "Name required.";
    valid = false;
  }

 
  if (email === "") {
    document.getElementById("suEmailError").textContent = "Email required.";
    valid = false;
  } else if (!email.includes("@limu.edu.ly")) {
    document.getElementById("suEmailError").textContent =
      "The email must contain @limu.edu.ly";
    valid = false;
  }


  if (password.length < 6) {
    document.getElementById("suPasswordError").textContent =
      "The password must be 6 characters or more.";
    valid = false;
  }


  if (captchaAnswer === "") {
    document.getElementById("captchaError").textContent =
      "Please enter the answer to the captcha.";
    valid = false;
  } else if (parseInt(captchaAnswer) !== correctCaptchaAnswer) {
    document.getElementById("captchaError").textContent =
      "The captcha answer is incorrect.";
    valid = false;
  }


  if (valid) {
    document.getElementById("signupSuccess").textContent =
      "Account creation successful... You are being redirected";
    setTimeout(() => {
      window.location.href =HOME_PAGE;
    }, 700);
  }
});


const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function (e) {
  e.preventDefault();

  document.getElementById("liEmailError").textContent = "";
  document.getElementById("liPasswordError").textContent = "";
  document.getElementById("loginMsg").textContent = "";

  let valid = true;

  const email = document.getElementById("liEmail").value.trim();
  const password = document.getElementById("liPassword").value;

  if (email === "") {
    document.getElementById("liEmailError").textContent = "Email required";
    valid = false;
  }
  if (password === "") {
    document.getElementById("liPasswordError").textContent = "Password required.";
    valid = false;
  }

  
loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
  
    document.getElementById("liEmailError").textContent = "";
    document.getElementById("liPasswordError").textContent = "";
  
    let valid = true;
  
    const email = document.getElementById("liEmail").value.trim();
    const password = document.getElementById("liPassword").value.trim();
  
   
    if (email === "") {
      document.getElementById("liEmailError").textContent = "Email required";
      valid = false;
    } 
    else if (!email.includes("@limu.edu.ly")) {
      document.getElementById("liEmailError").textContent =
        "The email contains @limu.edu.ly";
      valid = false;
    }
  
   
    if (password.length < 6) {
      document.getElementById("liPasswordError").textContent =
        "The password must be 6 characters or more.";
      valid = false;
    }
  
   
    if (valid) {
      window.location.href = HOME_PAGE;
    }
  });
  
});
</script>

<template>
   <div class="auth-box">
    <h1 class="title">📚 Library System</h1>
    <p class="sub-title">Register / Login </p>

   
    <div class="switcher">
      <button id="btnSignup" class="active">Sign Up</button>
      <button id="btnLogin">Log In</button>
    </div>

    
    <form id="signupForm" class="form-area">
      <h2>Sign Up</h2>

      <div class="form-group">
        <label for="suName"> Name</label>
        <input type="text" id="suName" placeholder="Enter your full name">
        <div id="suNameError" class="error"></div>
      </div>

      <div class="form-group">
        <label for="suEmail"> LIMU Email</label>
        <input type="email" id="suEmail" placeholder="example@limu.edu.ly">
        <div id="suEmailError" class="error"></div>
      </div>

      <div class="form-group">
        <label for="suPassword">Password (6+)</label>
        <input type="password" id="suPassword" placeholder="********">
        <div id="suPasswordError" class="error"></div>
      </div>

      
      <div class="form-group">
        <label>Captcha (Solve the calculation)</label>
        <div class="captcha-row">
          <div id="captchaQuestion" class="captcha-question">0 + 0 = ?</div>
          <button type="button" class="captcha-refresh" id="btnRefresh">⟳</button>
          <input type="text" id="captchaAnswer" class="captcha-input" placeholder="Answer">
        </div>
        <div id="captchaError" class="error"></div>
      </div>

      <button type="submit" class="submit-btn">Create Account</button>
      <div id="signupSuccess" class="success-msg"></div>
    </form>

    
    <form id="loginForm" class="form-area hidden">
      <h2>Log In</h2>

      <div class="form-group">
        <label for="liEmail">Email</label>
        <input type="email" id="liEmail" placeholder="example@limu.edu.ly">
        <div id="liEmailError" class="error"></div>
      </div>

      <div class="form-group">
        <label for="liPassword">Password</label>
        <input type="password" id="liPassword" placeholder="********">
        <div id="liPasswordError" class="error"></div>
      </div>

      <button type="submit" class="submit-btn">Log In</button>
      <div id="loginMsg" class="success-msg"></div>
    </form>

  </div>
</template>

<style scoped>
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: sans-serif;
  }
  
 
  body {
    min-height: 100vh;
    background: linear-gradient(135deg, #000000, #ffffff);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
 
  .auth-box {
    background: rgba(255,255,255,0.95);
    width: 380px;
    padding: 20px 22px 24px;
    border-radius: 12px;
    box-shadow: 0 6px 16px rgba(0,0,0,0.25);
    border: 1px solid #ddd;
  }
  
  .title {
    text-align: center;
    font-size: 22px;
    color: #111827;
  }
  
  .sub-title {
    text-align: center;
    font-size: 12px;
    color: #6b7280;
    margin-bottom: 14px;
  }
  
  
  .switcher {
    display: flex;
    margin-bottom: 14px;
  }
  
  .switcher button {
    flex: 1;
    padding: 6px 0;
    border: 1px solid #d1d5db;
    background: #f3f4f6;
    cursor: pointer;
    font-size: 14px;
  }
  
  .switcher button:first-child {
    border-radius: 8px 0 0 8px;
  }
  
  .switcher button:last-child {
    border-radius: 0 8px 8px 0;
  }
  
  .switcher button.active {
    background: #111827;
    color: #fff;
  }
  

  .form-area {
    margin-top: 6px;
  }
  
  .form-area h2 {
    font-size: 18px;
    margin-bottom: 10px;
    color: #111827;
    text-align: center;
  }
  
  .form-group {
    margin-bottom: 12px;
  }
  
  label {
    display: block;
    margin-bottom: 3px;
    font-size: 13px;
    color: #111827;
  }
  
  input[type="text"],
  input[type="email"],
  input[type="password"] {
    width: 100%;
    padding: 7px 9px;
    border-radius: 7px;
    border: 1px solid #cbd5f5;
    font-size: 14px;
    outline: none;
  }
  
  input:focus {
    border-color: #111827;
  }
  
 
  .error {
    color: #dc2626;
    font-size: 11px;
    min-height: 13px;
    margin-top: 2px;
  }
  
 
  .captcha-row {
    display: flex;
    align-items: center;
    gap: 6px;
  }
  
  .captcha-question {
    background: #111827;
    color: #fff;
    padding: 5px 9px;
    border-radius: 6px;
    font-size: 13px;
  }
  
  .captcha-refresh {
    border: none;
    background: transparent;
    cursor: pointer;
    font-size: 18px;
  }
  
  .captcha-input {
    flex: 1;
  }
  
 
  .submit-btn {
    width: 100%;
    padding: 8px;
    border-radius: 8px;
    border: none;
    background: #111827;
    color: #fff;
    font-size: 14px;
    cursor: pointer;
    margin-top: 4px;
  }
  
  .submit-btn:hover {
    opacity: 0.9;
  }
  
  
  .success-msg {
    margin-top: 6px;
    font-size: 12px;
    color: #16a34a;
    text-align: center;
    min-height: 16px;
  }
  
 
  .hidden {
    display: none;
  }
  
</style>