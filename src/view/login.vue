<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAuth } from '@/composables/useAuth';

const router = useRouter();
const route = useRoute();
const { login, isAuthenticating, authError } = useAuth();

const email = ref('eve.holt@reqres.in');
const password = ref('cityslicka');
const formError = ref('');
const isLoginActive = ref(false); // false shows signup by default

const HOME_PAGE = '/';

const toggleSignup = () => {
  isLoginActive.value = false;
};
const toggleLogin = () => {
  isLoginActive.value = true;
};



const handleLogin = async () => {
  formError.value = ''
  let valid = true;
  if (!email.value || !password.value) {
    formError.value = 'Email and password are required.'
    valid = false
    return
  }

    const el = document.getElementById('loginSuccess')
    if (el) el.textContent = 'Log in successful... You are being redirected'

    
    setTimeout(() => {
      router.push(HOME_PAGE) 
    }, 700)
  };


const handleSignup = (e) => {
  e.preventDefault();
  // keep existing DOM-based validation for signup for now
  // but guard against missing elements
  const suName = document.getElementById('suName')?.value.trim() || '';
  const suEmail = document.getElementById('suEmail')?.value.trim() || '';
  const suPassword = document.getElementById('suPassword')?.value || '';
  

  document.getElementById('suNameError') && (document.getElementById('suNameError').textContent = '');
  document.getElementById('suEmailError') && (document.getElementById('suEmailError').textContent = '');
  document.getElementById('suPasswordError') && (document.getElementById('suPasswordError').textContent = '');
  document.getElementById('signupSuccess') && (document.getElementById('signupSuccess').textContent = '');

  let valid = true;
  if (suName === '') {
    const el = document.getElementById('suNameError'); if (el) el.textContent = 'Name required.'; valid = false;
  }
  if (suEmail === '') { const el = document.getElementById('suEmailError'); if (el) el.textContent = 'Email required.'; valid = false; }
  else if (!suEmail.includes('@')) { const el = document.getElementById('suEmailError'); if (el) el.textContent = 'The email must contain @limu.edu.ly'; valid = false; }
  if (suPassword.length < 6) { const el = document.getElementById('suPasswordError'); if (el) el.textContent = 'The password must be 6 characters or more.'; valid = false; }

  if (valid) {
    const el = document.getElementById('signupSuccess'); if (el) el.textContent = 'Account creation successful... You are being redirected';
    setTimeout(() => { window.location.href = HOME_PAGE; }, 700);
  }
};
</script>

<template>
    <h1 class="title">📚 Library System</h1>
    <p class="sub-title">Register / Login </p>

   
    <div class="switcher">
      <center>
      <button id="btnSignup" :class="{ active: !isLoginActive }" @click="toggleSignup" style="margin-right: 10px;">Sign Up</button>
      <button id="btnLogin" :class="{ active: isLoginActive }" @click="toggleLogin">Log In</button>
      </center>
    </div>

    
    <form id="signupForm" class="form-area" v-show="!isLoginActive" @submit.prevent="handleSignup">
      <h2>Sign Up</h2>

      <div class="form-group">
        <label for="suName"> Name</label>
        <input type="text" id="suName" placeholder="Enter your full name">
        <div id="suNameError" class="error"></div>
      </div>

      <div class="form-group">
        <label for="suEmail"> Email</label>
        <input type="email" id="suEmail" placeholder="example@gmail.com">
        <div id="suEmailError" class="error"></div>
      </div>

      <div class="form-group">
        <label for="suPassword">Password (6+)</label>
        <input type="password" id="suPassword" placeholder="********">
        <div id="suPasswordError" class="error"></div>
      </div>

      
      
      
      <button type="submit" class="submit-btn">Create Account</button>
      <div id="signupSuccess" class="success-msg"></div>
    </form>

    
    <form id="loginForm" class="form-area" v-show="isLoginActive" @submit.prevent="handleLogin">
      <h2>Log In</h2>

      <div class="form-group">
        <label for="liEmail">Email</label>
        <input type="email" id="liEmail" v-model="email" placeholder="example@limu.edu.ly">
        <div id="liEmailError" class="error"></div>
      </div>

      <div class="form-group">
        <label for="liPassword">Password</label>
        <input type="password" id="liPassword" v-model="password" placeholder="********">
        <div id="liPasswordError" class="error"></div>
      </div>

      <div class="error" v-if="formError">{{ formError }}</div>
      <button type="submit" class="submit-btn">Log In</button>
      <div id="loginMsg" class="success-msg"></div>
    </form>


</template>

<style scoped>
.auth-page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 64px); /* account for fixed header */
  padding: 2rem 1rem;
  background: transparent;
}

.auth-box {
  background: #fff;
  width: 420px;
  max-width: 95%;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(16,24,40,0.08);
  border: 1px solid #e5e7eb;
}

.title {
  text-align: center;
  font-size: 22px;
  color: black;
  margin-bottom: 4px;
}

.sub-title {
  text-align: center;
  font-size: 13px;
  color: var(--muted);
  margin-bottom: 14px;
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
  margin-bottom: 6px;
  font-size: 13px;
  color: #374151;
}

input[type="text"],
input[type="email"],
input[type="password"] {
  width: 100%;
  padding: 0.6rem 0.75rem;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  font-size: 14px;
  background: #fff;
}

input:focus {
  outline: none;
  box-shadow: 0 0 0 4px rgba(37,99,235,0.08);
  border-color: var(--brand);
}

.error {
  color: #dc2626;
  font-size: 11px;
  min-height: 13px;
  margin-top: 2px;
}

.success-msg {
  margin-top: 6px;
  font-size: 12px;
  color: #16a34a;
  text-align: center;
  min-height: 16px;
}

.submit-btn {
  width: 100%;
  padding: 0.65rem;
  border-radius: 8px;
  border: none;
  background: var(--brand);
  color: #fff;
  font-weight: 600;
  cursor: pointer;
}

.submit-btn:hover { background: var(--brand-600); }

@media (max-width: 480px) {
  .auth-box { width: 100%; padding: 18px; }
}

</style>