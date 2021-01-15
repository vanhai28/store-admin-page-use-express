/*

 Auther : Nguyen Van Hai 
 Email : vanhai.qtv@gmail.com
 
 */

//----------------- START PAGE LIST USER ----------------

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
      badge.innerHTML = "blocked";
      badge.className = badge.className.replace("active", "blocked");
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
      badge.innerHTML = "active";
      badge.className = badge.className.replace("blocked", "active");
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
  Handlebars.registerHelper("formatNumber", function (number) {
    return number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
  });
  products = JSON.parse(products);

  var template = $("#table_data").html();

  //Compile the template data into a function
  var templateScript = Handlebars.compile(template);

  var html = templateScript({ products: products });

  document.getElementById("cart__data").innerHTML = html;
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

function sendResetPassword(event, form) {
  event.preventDefault();
  document.getElementById("message").style.display = "none";
  let request = new XMLHttpRequest();
  let verifyCode = form.verify_code.value;

  request.onreadystatechange = function () {
    if (this.status == 200 && this.readyState == 4) {
      form.innerHTML = "New password is sent to your email.";
    } else if (this.readyState == 4) {
      $("#message").html("Verify code is ircorrect!!");
      document.getElementById("message").style.display = "block";
    }
  };

  request.open("POST", "/reset/password?verify_code=" + verifyCode, true);
  request.send();
}
function sendEmailToVerify(event, form) {
  event.preventDefault();
  let request = new XMLHttpRequest();
  let email = form.email.value;

  request.onreadystatechange = function () {
    if (this.status == 200 && this.readyState == 4) {
      window.location.href = "/get/verify/code";
    } else if (this.readyState == 4) {
      $("#message").html("Tài khoản không tồn tại!");
      document.getElementById("message").style.display = "block";
    }
  };

  request.open("POST", "/recovery/password?email=" + email, true);
  request.send();
}

//------- ORDER PAGE  ---------------
// get data of books from server by page
// @param : page : the page number to get data
function getAPIOrders(page) {
  let api_link = "/admin/api/orders?page=" + page;
  let xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      replaceOrderData(this.responseText);
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
function replaceOrderData(products) {
  Handlebars.registerHelper("append", function (str1, str2) {
    return str1 + str2;
  });
  Handlebars.registerHelper("formatNumber", function (number) {
    return number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
  });
  products = JSON.parse(products);

  var template = $("#table_data").html();

  //Compile the template data into a function
  var templateScript = Handlebars.compile(template);

  var html = templateScript({ products: products });

  document.getElementById("cart__data").innerHTML = html;
}

function updateOrderStatus(_id, status) {
  let api_link =
    "/admin/api/orders/update/status?_id=" + _id + "&order_status=" + status;
  let xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      $("#order_status_" + _id).html(status);
    } else if (this.readyState == 4) {
      $("#message-from-sever").removeClass("d-none");
      $("#message-from-sever").html("error when get data category from server");
    }
  };

  xhttp.open("PUT", api_link, true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send();
}
