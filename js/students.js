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
         phone: '19001512',
         address: 'Bắc Giang',
         email: 'hoantn.codegym@gmail',
         picture: 'https://www.upsieutoc.com/images/2019/11/29/z1638693811565_d8c7a9053207617a5d427ba199cba132.jpg'
      },
      {
         name: 'Bạch Long',
         age: 18,
         phone: '1900.1221',
         address: 'Hà Nội',
         email: 'longbn.codegym@gmail',
         picture: 'https://files.slack.com/files-pri/T4AQ8L79A-FQQH4C2BU/image.png'
      },
      {
         name: 'Đông Nguyễn',
         age: 18,
         phone: '1900.1357',
         address: 'Hà Nội',
         email: 'dongtn.codegym@gmail',
         picture: 'https://codegym.vn/wp-content/uploads/2019/08/Ho%CC%A3c-ly%CC%81-thuye%CC%82%CC%81t-2-1.jpg'
      },
      {
         name: 'An Nguyễn',
         age: 25,
         phone: '111.222.33',
         address: 'Hà Nội',
         email: 'an.codegym@gmail',
         picture: 'https://www.upsieutoc.com/images/2019/11/29/d4527a9a26bd4fd6116df2485f2a5d53-original.png'
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

//create a object...
let theStudent = new Students();
console.log('theStudent==>', theStudent);

//document ready
document.addEventListener('DOMContentLoaded', function() {
  theStudent.load();
  renderStudents();
});

function editStudentHanddle() {
   alert('Updating...');
   //get student in index edit...
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

//3.get input value
function getInputValue(selector) {
   let inputElement = document.querySelector(selector);
   return inputElement.value;
}

//set input value
function setInputValue(selector, value) {
   let inputElement = document.querySelector(selector);
   inputElement.value = value;
}

//4.renderstudents
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

//5.setHTML
function setHTML(selector, html) {
  let element = document.querySelector(selector);
  element.innerHTML = html;
}

//6.onDeleteStudent() once...
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

//7.edit student
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
