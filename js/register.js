//Khởi tạo một class với tên là Register...
let Register = function() {
   this.keyUser = 'keyUser';
   this.keyPass = 'keyPass';
   this.keyRePass = 'keyRePass';

   this.username = [];
   this.password = [];
   this.re_password = [];

   this.add = function(user, pass, re_pass) {
      this.username.push(user);
      this.password.push(pass);
      this.re_password.push(re_pass);
   };

   this.save = function(key, value) {
      // const jsonData = JSON.stringify(this.username);
      // localStorage.setItem(this.loginKey, jsonData);
      const jsonData = JSON.stringify(value);
      localStorage.setItem(key, jsonData);
   };
}

let register = new Register();
// console.log('register==>', register);

//2. get input value...
function getInputValue(selector) {
   let inputElement = document.querySelector(selector);
   return inputElement.value;
}

//3. clickRegister()
function clickRegister() {
   let username = getInputValue('.username');
   let password = getInputValue('.password');
   let re_password = getInputValue('.re_password');

   //add username, password, re-password vào mảng
   register.add(username, password, re_password);

   console.log(register);
   //add username, password, re-password vào localStorage...
   register.save(register.keyUser , register.username);
   register.save(register.keyPass , register.password);
   register.save(register.keyRePass , register.re_password);
   // register.save(this.userKey, this.username);
   // register.save(this.userKey, this.username);

}

//3. checkPassword()
