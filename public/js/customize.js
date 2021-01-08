/*

 Auther : Nguyen Van Hai 
 Email : vanhai.qtv@gmail.com
 
 */

//----------------- START PAGE LIST USER ----------------

// Modifile status of user (active or block)
(function modifyStatusAccount() {
  let status = document.getElementsByClassName("status_account_active");

  // display badge for actived user
  for (let index = 0; index < status.length; index++) {
    const element = status[index];
    element.className += " badge badge-success";
    element.innerHTML = "Hoạt động";
  }

  status = document.getElementsByClassName("status_account_blocked");

  // display badge for blocked user
  for (let index = 0; index < status.length; index++) {
    const element = status[index];

    element.className += " badge badge-danger";
    element.innerHTML = "Đã khoá";
  }
})();

// send request delete account of user
function deleteUserAcc(id) {
  let xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      location.reload();
    } else if (this.readyState == 4) {
      // display error message
      let mesg = document.getElementsByClassName("messageDelete")[0];
      mesg.innerHTML = this.responseText;
      mesg.className = mesg.className.replace("d-none", " ");
    }
  };

  xhttp.open("post", "/admin/users/delete", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send("id=" + id);
}

function blockAccount(id) {
  let xhttp = new XMLHttpRequest();

  let badge = document.getElementById(id);

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      badge.innerHTML = "Đã khoá";
      badge.className = badge.className.replace(
        "badge-success",
        "badge-danger"
      );
    } else if (this.readyState == 4) {
      let mesg = document.getElementsByClassName("messageBlock")[0];
      mesg.innerHTML = this.responseText;
      mesg.className = mesg.className.replace("d-none", " ");
    }
  };

  xhttp.open("post", "/admin/users/block", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send("id=" + id);
}

function unBlockAccount(id) {
  let xhttp = new XMLHttpRequest();

  let badge = document.getElementById(id);

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      badge.innerHTML = "Hoạt động";
      badge.className = badge.className.replace(
        "badge-danger",
        "badge-success"
      );
    } else if (this.readyState == 4) {
      let mesg = document.getElementsByClassName("messageBlock")[0];
      mesg.innerHTML = this.responseText;
      mesg.className = mesg.className.replace("d-none", " ");
    }
  };

  xhttp.open("post", "/admin/users/unblock", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send("id=" + id);
}

function getAPI_Users(page) {
  let api_link = "/admin/users/api/list?page=" + page;
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      replaceUser(this.responseText);
    } else if (this.readyState == 4) {
      $("#message-from-sever").removeClass("d-none");
      $("#message-from-sever").html("error when get data user from server");
    }
  };

  xhttp.open("GET", api_link, true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send();
}

//
//--------------  START LIST BOOK PAGE --------------
//
// send request delete a book
function deleteBook(id) {
  let xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      location.reload();
    } else if (this.readyState == 4) {
      // display error message
      let mesg = document.getElementsByClassName("messageDelete")[0];
      mesg.innerHTML = this.responseText;
      mesg.className = mesg.className.replace("d-none", " ");
    }
  };

  xhttp.open("post", "/admin/book/delete", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send("id=" + id);
}

function replaceUser(data) {
  data = JSON.parse(data);
  Handlebars.registerHelper("append", function (str1, str2) {
    return str1 + str2;
  });
  let template = $("#replaceDataUser").html();

  let templateScript = Handlebars.compile(template);
  data = data.data;

  let html = templateScript({ data: data });

  document.getElementById("cart__body").innerHTML = html;
  modifyStatusAccount();
}

//-------------- FOR PAGINATION ----------------

// get data of books from server by page
// @param : page : the page number to get data
function getAPIBooks(page) {
  let id_category = document.getElementById("dropdownCategory").value;
  let api_link = "/admin/book/api/lists?page=" + page + "&idCat=" + id_category;
  let xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      replaceBook(this.responseText);
      replaceBook2(this.responseText);
    } else if (this.readyState == 4) {
      $("#message-from-sever").removeClass("d-none");
      $("#message-from-sever").html("error when get data category from server");
    }
  };

  xhttp.open("GET", api_link, true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send();
}

// update new data got from server by using AJAX
// @param products : data got from server
function replaceBook(products) {
  products = JSON.parse(products);

  var template = $("#handlebars-demo").html();

  //Compile the template data into a function
  var templateScript = Handlebars.compile(template);
  products.books = products.book;

  var html = templateScript(products);

  document.getElementById("pagination").innerHTML = html;
}

// FOR test , this will be added into function replaceBook
function replaceBook2(products) {
  Handlebars.registerHelper("join", function (arr) {
    let result = "";
    for (let i = 0; i < arr.length - 1; i++) {
      result += arr[i] + " ,";
    }
    result += arr[arr.length - 1];
    return result;
  });
  Handlebars.registerHelper("append", function (str1, str2) {
    return str1 + str2;
  });

  products = JSON.parse(products);
  products = products.book;

  var template = $("#table_data").html();

  //Compile the template data into a function
  var templateScript = Handlebars.compile(template);

  var html = templateScript({ products: products });

  document.getElementById("tbody__data").innerHTML = html;
}

// use AJAX for category book

// Get data of books by category from server
(function getAPIBooksByCategory(category) {
  const btnCategory = document.getElementsByClassName("btn--category");
  for (let index = 0; index < btnCategory.length; index++) {
    const element = btnCategory[index];
    element.onclick = function () {
      let api_link = "/admin/book/api/list?page=1&&idCat=" + element.value;
      let xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          replaceBook(this.responseText);
          replaceBook2(this.responseText);
          let data = JSON.parse(this.responseText);
          if (data.curentCategoryView) {
            $("#dropdownCategory").html(data.curentCategoryView.nameOfCategory);
            document.getElementById("dropdownCategory").value =
              data.curentCategoryView._id;
          } else {
            $("#dropdownCategory").html("All");
            document.getElementById("dropdownCategory").value = 0;
          }
        } else if (this.readyState == 4) {
          $("#message-from-sever").removeClass("d-none");
          $("#message-from-sever").html(
            "error when get data category from server"
          );
        }
      };

      xhttp.open("GET", api_link, true);
      xhttp.setRequestHeader(
        "Content-type",
        "application/x-www-form-urlencoded"
      );
      xhttp.send();
    };
  }
})();
//
//-----   START PROFILE PAGE --------------
//
// Read URL of uploaded image
function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
      $(".image-upload-wrap").hide();
      $(".file-upload-image").attr("src", e.target.result);
      $(".file-upload-content").show();

      $(".image-title").html(input.files[0].name);
    };

    reader.readAsDataURL(input.files[0]);
  } else {
    removeUpload();
  }
}

// remove uploaded image
function removeUpload() {
  $(".file-upload-input").replaceWith($(".file-upload-input").clone());
  $(".file-upload-content").hide();
  $(".image-upload-wrap").show();
}
// Set onclick event for  edit button
const editBtn = document.getElementsByClassName("btn__edit-user");
for (let index = 0; index < editBtn.length; index++) {
  const element = editBtn[index];
  element.onclick = function () {
    let btnSave = document.getElementsByClassName("btn__save-infor")[index];
    let inputInfor = document.getElementsByClassName("input__infor")[index];
    btnSave.style.display = "block";
    inputInfor.removeAttribute("disabled");
  };
}
// Set onclick event for  save-edit button
const saveBtn = document.getElementsByClassName("btn__save-infor");

for (let index = 0; index < saveBtn.length; index++) {
  const element = saveBtn[index];

  element.onclick = function () {
    let inputInfor = document.getElementsByClassName("input__infor")[index];
    let infor = {
      field: inputInfor.name,
      value: inputInfor.value,
    };

    saveInforAccount(infor, index);
  };
}

// send request to save changed information
function saveInforAccount(value, index) {
  let api_link =
    "/admin/api/account?field=" + value.field + "&value=" + value.value;
  let xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let inputInfor = document.getElementsByClassName("input__infor")[index];
      inputInfor.setAttribute("disabled", "true");
      document.getElementsByClassName("btn__save-infor")[index].style.display =
        "none";
    } else if (this.readyState == 4) {
      $("#message-from-sever").removeClass("d-none");
      $("#message-from-sever").html("error when get data user from server");
    }
  };

  xhttp.open("GET", api_link, true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send();
}

// check is password match
function checkMatchPassword() {
  let password = document.getElementById("new_password");
  let re_password = document.getElementById("re_enter_password");

  if (password.value !== re_password.value) {
    re_password.setCustomValidity("Password is not match !!");
    return false;
  }

  re_password.setCustomValidity("");
  return true;
}

// handle send request change password
$("#form__change_password").submit(function (e) {
  document.getElementById("re_enter_password").onchange = function () {
    checkMatchPassword();
  };
  e.preventDefault();
  $("#result_change_password").css("display", "none");

  if (!checkMatchPassword()) {
    return;
  }

  let oldPassword = document.getElementById("old_password");
  let newPassword = document.getElementById("new_password");
  let reNewPassword = document.getElementById("re_enter_password");
  let api_link =
    "/admin/api/change/password?oldpass=" +
    oldPassword.value +
    "&newpass=" +
    newPassword.value;

  let request = new XMLHttpRequest();

  request.onreadystatechange = function () {
    if (this.status == 200 && this.readyState == 4) {
      $("#result_change_password").html("Thay đổi thành công");
      $("#result_change_password").css("display", "block");
    } else if (this.readyState == 4) {
      $("#result_change_password").html("Thay đổi Thất bại");
      $("#result_change_password").css("display", "block");
    }

    oldPassword.value = "";
    newPassword.value = "";
    reNewPassword.value = "";
  };

  request.open("POST", api_link, true);
  request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  request.send();
});

// Save change avatar
$("#change_avatar_form").submit(function (e) {
  e.preventDefault();

  let data = new FormData();
  data.append("file", $("#input_avatar")[0].files[0]);
  var request = new XMLHttpRequest();

  request.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      $("#message__result").html("Thay đổi thành công");
      $("#message__result").removeClass(" d-none");
      $("#avatar-image").attr("src", this.responseText);
      $(".watch_avatar img").attr("src", this.responseText);
    } else if (this.readyState == 4) {
      $("#message__result").html("Thay đổi Thất bại");
      $("#message__result").removeClass(" d-none");
    }
  };
  request.open("POST", "/admin/api/change/avatar");
  request.send(data);
});

//
//  ------  PAGE DASHBOARD ---------
//
function generateColorRGB(numberOfColor) {
  let color = "#";
  let colorComponent = "123456789ABCDEF";
  let result = [];

  for (let index = 0; index < numberOfColor; index++) {
    for (let i = 0; i < 6; i++) {
      let randNumber = Math.floor(Math.random() * 16);
      color += colorComponent.charAt(randNumber);
    }

    result.push(color);
    color = "#";
  }

  return result;
}

(function () {
  if (window.location.href.includes("/admin/dashboard")) {
    let canvas = document.getElementById("category_chart").getContext("2d");
    let request = new XMLHttpRequest();

    if (!canvas) {
      return;
    }

    request.onreadystatechange = function () {
      if (this.status == 200 && this.readyState == 4) {
        let data = JSON.parse(this.responseText);
        createPieChart(canvas, data, "Các loại sản phẩm");
      }
    };
    request.open("GET", "/admin/book/api/category/all");
    request.send();
  }
})();

function createPieChart(canvas, dataRender, title) {
  let labels = [];
  let dataArray = [];
  let colorList = generateColorRGB(dataRender.length);

  dataRender.forEach((element) => {
    labels.push(element.nameOfCategory);
    dataArray.push(element.numberOfProduct);
  });

  var myChart = new Chart(canvas, {
    type: "doughnut",
    data: {
      labels: labels,

      datasets: [
        {
          label: "# of Votes",
          data: dataArray,
          backgroundColor: colorList,
          borderColor: colorList,
          borderWidth: 1,
        },
      ],
    },
    options: {
      title: {
        display: true,
        text: title,
      },

      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });
}

/**
 * ADD BOOK Page
 */
//update input category
function selectCategory(value) {
  document.getElementById("input__category").value = value;
}
//read Image URL on addbook page
function readImageURL(input, classDestination) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
      let imagesName = [];
      let images = input.files;

      for (let index = 0; index < images.length; index++) {
        let element = images[index];
        imagesName.push(element.name);
      }

      let destinaion = "label." + classDestination;
      $(destinaion).html(imagesName.join(", "));
    };

    reader.readAsDataURL(input.files[0]);
  }
}
