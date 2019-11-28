let editMode = false;
let studentIDTemp;

//1. Khởi tạo một class với tên là Students
let Students = function() {
   this.storeKey = 'SAVE_STORAGE';
   this.resetForm = '';
   this.data = [
      {
         name: 'Hoàn Nguyễn',
         age: 25,
         phone: '1111.222.333',
         address: 'Bắc Giang',
         email: 'hoantn.super@gmail',
         picture: 'https://img2.thuthuatphanmem.vn/uploads/2018/11/30/anh-dai-dien-cute-cho-zalo_104205429.jpg'
      },
      {
         name: 'Hoàn Nguyễn',
         age: 25,
         phone: '1111.222.333',
         address: 'Bắc Giang',
         email: 'hoantn.super@gmail',
         picture: 'http://thuthuat123.com/uploads/2018/01/27/anh-dai-dien-dep-nhat-56_095736.jpg'
      },
      {
         name: 'Hoàn Nguyễn',
         age: 25,
         phone: '1111.222.333',
         address: 'Bắc Giang',
         email: 'hoantn.super@gmail',
         picture: 'https://i.pinimg.com/564x/e2/4e/ff/e24effa123797fd2099fbcf3060585bf.jpg'
      },
      {
         name: 'Hoàn Nguyễn',
         age: 25,
         phone: '1111.222.333',
         address: 'Bắc Giang',
         email: 'hoantn.super@gmail',
         picture: 'https://exp.gg/vn/wp-content/uploads/2018/12/Yasuo-chibi.jpg'
      }
   ];
   
   this.add = function(student) {
      this.data.push(student);
   };
   this.edit = function(index, student) {
      this.data[index] = student;
   };
   this.delete = function(index) {
      this.data.splice(index, 1);
   };
   this.save = function() {
      const jsonData = JSON.stringify(this.data);
      localStorage.setItem(this.storeKey, jsonData);
   };
   this.load = function() {
      const originData = localStorage.getItem(this.storeKey);
      if (JSON.parse(originData)) {
         this.data = JSON.parse(originData);
      }
   };
   this.list = function() {
      return this.data;
      console.log('this.data==>', this.data);
   };
}


let theStudent = new Students();
console.log('theStudent==>', theStudent);

//document ready
document.addEventListener('DOMContentLoaded', function() {
  theStudent.load();
  renderStudents();
});

function editStudentHanddle() {
   alert('Updating...');
   //lấy ra value sinh viên tại vị trí đã sửa...
   let name = getInputValue('.form-group .name');
   let age = getInputValue('.form-group .age');
   let phone = getInputValue('.form-group .phone');
   let address = getInputValue('.form-group .address');
   let email = getInputValue('.form-group .email');
   let picture = getInputValue('.form-group .picture');

   let student = {
      name: name,
      age: age,
      phone: phone,
      address: address,
      email: email,
      picture: picture
   }

   // let students = theStudent.data;
   // students[studentIDTemp] = student;
   editStudent(studentIDTemp, student);

   theStudent.save();
   renderStudents();
   resetFormStudent()
   disableEditMode();
   setHTML('.createStudent', 'Create');

   // console.log(studentIDTemp);
   // console.log(theStudent.data);
   // theStudent.data[studentIDTemp] = student;
}

//edit student by index
function editStudent(index, student) {
   let students = theStudent.data;
   students[index] = student;
}

function onClickCreatStudent() {
   if (editMode) {
      editStudentHanddle();
   } else {
      //ở chế độ tạo sinh viên...
      let name = getInputValue('.form-group .name');
      let age = getInputValue('.form-group .age');
      let phone = getInputValue('.form-group .phone');
      let address = getInputValue('.form-group .address');
      let email = getInputValue('.form-group .email');
      let picture = getInputValue('.form-group .picture');

      let student = {
         name: name,
         age: age,
         phone: phone,
         address: address,
         email: email,
         picture: picture
      }

      // thêm dữ liệu vào mảng data...
      theStudent.add(student);

      //lưu dữ liệu vào localStorage...
      theStudent.save();

      //sau khi create tạo hiển thị sinh viên...
      renderStudents();
      resetFormStudent();
   }
}

//3.hàm lấy giá trị của ô input
function getInputValue(selector) {
   let inputElement = document.querySelector(selector);
   return inputElement.value;
}

//hàm set giá trị cho ô input
function setInputValue(selector, value) {
   let inputElement = document.querySelector(selector);
   inputElement.value = value;
}

//4.hàm hiển thị danh sách sinh viên..
function renderStudents() {
  let students = theStudent.list();
  let html = '';
  for (let i = 0; i < students.length; i++) {
    let student = students[i];
    html += '<li class="student">';
    html += '<img src="'+ student.picture +'">';
    html += '<p><span>Name: ' + student.name + '</span></p>';
    html += '<p><span>Age: ' + student.age + '</span></p>';
    html += '<p><span>Phone: ' + student.phone + '</span></p>';
    html += '<p><span>Address: ' + student.address + '</span></p>';
    html += '<p><span>Email: ' + student.email + '</span></p>';
    html += '<i class="student-delete" onclick="onDeleteStudent('+ i +');">X</i>';
    html += '<i class="student-edit" onclick="onEditStudent('+ i +');">Edit</i>';
    html += '</li>';
  }

  setHTML('#students-list', html);

}

//5.tạo ra hàm setHTML để thay đổi html
function setHTML(selector, html) {
  let element = document.querySelector(selector);
  element.innerHTML = html;
}

//6.hàm xóa onDeleteStudent() - dùng cho ứng dụng này: 1 lần...
function onDeleteStudent(index) {
  let students = theStudent.data;
  if (confirm("Are you sure to delete this student?")) {
    students.splice(index, 1);
    theStudent.save();
    renderStudents();
  }
}

//hàm reset form
function resetFormStudent() {
   setInputValue('.form-group .name', theStudent.resetForm);
   setInputValue('.form-group .age', theStudent.resetForm);
   setInputValue('.form-group .phone', theStudent.resetForm);
   setInputValue('.form-group .address', theStudent.resetForm);
   setInputValue('.form-group .email', theStudent.resetForm);
   setInputValue('.form-group .picture', theStudent.resetForm);
}

//7.hàm sửa sinh viên
function onEditStudent(index) {
   //lưu biến studentIDTemp = index: kĩ thuật truyền tham số id
   studentIDTemp = index;
   // console.log(studentIDTemp);
   // let student = theStudent.data[index]; - thay thế cho bằng hàm getStudent..
   let student = getStudent(index);
   console.log('student edit', student);
   // let student = theStudent.list()[index];

   setInputValue('.form-group .name', student.name);
   setInputValue('.form-group .age', student.age);
   setInputValue('.form-group .phone', student.phone);
   setInputValue('.form-group .address', student.address);
   setInputValue('.form-group .email', student.email);
   setInputValue('.form-group .picture', student.picture);

   //bật chế độ chỉnh sửa:
   enableEditMode();
   // alert(editMode);

   //thay đổi nút Create - > Update
   setHTML('.createStudent', 'Save>>');
}

function getStudent(index) {
   return theStudent.data[index];
}

function enableEditMode() {
   editMode = true;
}

function disableEditMode() {
   editMode = false;
};
