// chế độ nghiêm ngặt của javascript..
// 'use strict';
var editMode = false;
// 1.thêm 1 mảng lưu thông tin của sinh viên

// tạo 1 biến chứa id của sinh viên khi chỉnh sửa
var studentId;
var students = [
  {
    name: 'Hoàn Nguyễn',
    age: 25,
    phone: '0984.894.098',
    address: 'Bac Giang',
    email: 'hoantn.dev@gmail.com'
  },
  {
    name: 'Việt Nguyễn',
    age: 28,
    phone: '1111.111.11',
    address: 'Hà Nội',
    email: 'hoantn.dev@gmail.com'
  },
  {
    name: 'Đông Nguyễn',
    age: 28,
    phone: '2222.222.2',
    address: 'Hà Nội',
    email: 'hoantn.dev@gmail.com'
  }
]

// var originStudents = JSON.stringify(students);
// // console.log(students);
// localStorage.setItem('students', originStudents);

// 2.document ready
document.addEventListener('DOMContentLoaded', function() {
  // gọi hàm renderStudents:hiển thị sinh viên khi load trang....
  renderStudents();
});


// 3.tạo hàm hiển thị danh sách sinh viên
function renderStudents() {
  var html = '';
  for (var i = 0; i < students.length; i++) {
    var student = students[i];
    html += '<li class="student">';
    html +='<img src="images/anh_01.jpg" alt="">';
    html += '<p><span>Name: ' + student.name + '</span></p>';
    html += '<p><span>Age: ' + student.age + '</span></p>';
    html += '<p><span>Address: ' + student.address + '</span></p>';
    html += '<p><span>Phone: ' + student.phone + '</span></p>';
    html += '<p><span>Mail: ' + student.email + '</span></p>';
    html += '<i class="student-delete" onclick="onDeleteStudent('+ i +');">X</i>';
    html += '<i class="student-edit" onclick="onEditStudent('+ i +');">Edit</i>';
    html += '</li>';
  }
  // var studentsElement = document.getElementById('students-list');
  // studentsElement.innerHTML = html;
  setHTML('#students-list', html);
}


// 4.tạo ra hàm lấy giá trị của ô input
function getInputValue(selector) {
    var inputElement = document.querySelectorAll(selector);
    return inputElement.value;
}

// 4.tạo hàm thêm sinh viên khi click vào button...
function onClickCreatStudent() {
  if (editMode) {
    editStudentHandle();
  } else {

    // lấy giá trị của từng ô input
    var name = getInputValue('.student-form .name');
    var age = getInputValue('.student-form .age');
    var phone = getInputValue('.student-form .phone');
    var address = getInputValue('.student-form .address');

    // tạo 1 object chứa giá trị của các sinh viên
    var student = {
      name: name,
      age: age,
      phone: phone,
      address: address
    }
    // tách riêng hàm addStudent thêm 1 chức năng mới
    // students.push(student);
    addStudent(student);

    // gọi lại hàm renderstudents khi thêm sinh viên xong...
    renderStudents();
  }
}


// 5.tách riêng hàm onClickCreatStudent với hàm thêm sinh viên addStudent
function addStudent(student) {
  students.push(student);
}


// 6.tạo hàm deleteStudent() - xóa sinh viên dùng chung cho ứng dụng, nhiều lần
function deleteStudent(index) {
  students.splice(index, 1);
}

// 7.hàm xóa onDeleteStudent() - dùng cho ứng dụng này: 1 lần...
function onDeleteStudent(index) {
  if (confirm("Are you delete student?")) {
    students.splice(index, 1);
    renderStudents();
  }
}

// 8.hàm sửa sinh viên: onEditStudent()
function onEditStudent(index) {
  //viết lại 1 hàm để lấy phần tử sinh viên...
  // var student = students[index];
  var student = getStudent(index);

  // do gán nhiều lần nên ta sẽ viết ra 1 hàm riêng để làm chức năng này
  // var nameElement = document.querySelector('.student-form .name');
  // nameElement.value = student.name;
  setInputValue('.student-form .name', student.name);
  setInputValue('.student-form .age', student.age);
  setInputValue('.student-form .phone', student.phone);
  setInputValue('.student-form .address', student.address);

  //bật chế độ chỉnh sửa khi ấn vào edit
  enableEditMode();

  //khi bật chế độ chỉnh sửa thì nút creat -> save
  setHTML('.createStudent', 'Saves..  ');

  //lưu studentId khi ở chế độ chỉnh sửa..
  studentId = index;
  // console.log(studentId);
}

// 10.viết lại 1 hàm lấy ra sinh viên
function getStudent(index) {
  return students[index];
}

// 9.tạo ra hàm setInputValue() - đặt, gán giá trị vào ô input..
function setInputValue(selector, value) {
  var element = document.querySelector(selector);
  element.value = value;
}

// 11.tạo cờ thay đổi nút trong js từ create => save
// chế độ editMode = false, thì đang ở trạng thái tạo mới.
// chế độ editMode = true, thì đang ở trạng thái sửa hay edit
// tạo ra 1 hàm chỉ để thay đổi trạng thái từ false sang true hoặc từ true sang false
function enableEditMode() {
  editMode = true;
}

function disableEditMode() {
  editMode = false;
}
// 12.tạo ra hàm setHTML để thay đổi nút Create ==> Save
function setHTML(selector, html) {
  var element = document.querySelector(selector);
  element.innerHTML = html;
}

//nếu ở editMode = true thì ta sửa thông tin sinh viên => editStudentHandle(), không
// thì ta thêm sinh viên...
function editStudentHandle() {
  // alert('che do dang sua...');
  var name = getInputValue('.student-form .name');
  var age = getInputValue('.student-form .age');
  var phone = getInputValue('.student-form .phone');
  var address = getInputValue('.student-form .address');

  //gán studentId của từng sinh viên..
  // cập nhật lại mảng students theo studentId

  // students[studentId] = {
  //   name: name,
  //   age: age,
  //   phone: phone,
  //   address: address
  // }
  //thay thế bằng hàm editStudent
  editStudent(studentId, {
    name: name,
    age: age,
    phone: phone,
    address: address
  })

  //renderstudents khi sửa xong...
  renderStudents();

  //tắt chế độ sửa sau khi edit xong
  disableEditMode();

  //gán lại chữ Save ==> thành Create
  setHTML('.createStudent', 'Create');

  //gọi lại hàm resetFormStudent();
  resetFormStudent();
}


// tạo ra 1 function để thay đổi sinh viên...từ index = studentId..
function editStudent(index, student) {
  students[index] = student;
}

function resetFormStudent() {
  setInputValue('.student-form .name', '');
  setInputValue('.student-form .age', '');
  setInputValue('.student-form .phone', '');
  setInputValue('.student-form .address', 'x');
}
