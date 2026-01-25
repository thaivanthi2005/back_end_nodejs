// Button-status
const button_Satus = document.querySelectorAll("[button-status]");
if (button_Satus.length > 0) {
  let url = new URL(window.location.href);

  button_Satus.forEach((button) => {
    button.addEventListener("click", () => {
      const status = button.getAttribute("button-status");
      if (status) {
        url.searchParams.set("status", status);
      } else {
        url.searchParams.delete("status");
      }
      window.location.href = url.href;
    });
  });
}
//End_bt_STATUS

//FORM SEARCH

const formsearch = document.querySelector("#form-search");
if (formsearch) {
  let url = new URL(window.location.href);
  formsearch.addEventListener("submit", (e) => {
    e.preventDefault();
    const keyword = e.target.elements.keyword.value;
    if (keyword) {
      url.searchParams.set("keyword", keyword);
    } else {
      url.searchParams.delete("keyword");
    }

    window.location.href = url;
  });
}

//End Search

//Paginations
const button_Pagination = document.querySelectorAll("[button-pagination]");
if (button_Pagination) {
  let url = new URL(window.location.href);
  button_Pagination.forEach((button) => {
    button.addEventListener("click", () => {
      const page = button.getAttribute("button-pagination");
      url.searchParams.set("page", page);

      window.location.href = url.href;
    });
  });
}

// End_Paginations

//Checkbox
const checkBoxMulti = document.querySelector("[checkbox-multi]");
if (checkBoxMulti) {
  const inputCheckALL = checkBoxMulti.querySelector("input[name='checkall']");
  const inputsID = checkBoxMulti.querySelectorAll("input[name='id']");

  inputCheckALL.addEventListener("click", () => {
    if (inputCheckALL.checked) {
      inputsID.forEach((input) => {
        input.checked = true;
      });
    } else {
      inputsID.forEach((input) => {
        input.checked = false;
      });
    }
  });

  inputsID.forEach((input) => {
    input.addEventListener("click", () => {
      const coutCheck = checkBoxMulti.querySelectorAll(
        "input[name='id']:checked",
      ).length;
      if (coutCheck == 4) {
        inputCheckALL.checked = true;
      } else inputCheckALL.checked = false;
    });
  });
}
//End Checkbox

//Form change-Multi
const formChangeMulti = document.querySelector("[form-change-multi]");
if (formChangeMulti) {
  formChangeMulti.addEventListener("submit", (e) => {
    e.preventDefault();
    const checkBoxMulti = document.querySelector("[checkbox-multi]");
    const inputsChecked = checkBoxMulti.querySelectorAll(
      "input[name='id']:checked",
    );

    const typeChange = e.target.elements.type.value;
    if (typeChange == "delete-all") {
      const isConfirm = confirm("Bạn có chắc xóa những sản phẩm này ?");
      if (!isConfirm) {
        return;
      }
    }
    if (inputsChecked.length > 0) {
      let tmp = [];
      inputsChecked.forEach((input) => {
        if (typeChange == "change-position") {
          const position = input
            .closest("tr")
            .querySelector("input[name = 'position']").value;
          tmp.push(`${input.value}-${position}`);
        } else {
          tmp.push(input.value);
        }
      });
      const InputID = formChangeMulti.querySelector("input[name = 'ids']");
      InputID.value = tmp.join(",");
      formChangeMulti.submit();
    } else {
      alert("VUI LÒNG CHỌN 1 SẢN PHẨM");
    }
  });
}
//End Form change-Multi

//SHOW ALERT
const alert_time = document.querySelector("[show-alert]");
if (alert_time) {
  const time = parseInt(alert_time.getAttribute("data-time"));
  setTimeout(() => {
    alert_time.classList.add("alert-hidden");
  }, time);
}
//END SHOW ALERT

//upload-image
const uploadImage = document.querySelector("[upload-image]");
if (uploadImage) {
  const updateImageInput = document.querySelector("[upload-image-input]");
  const updateImagePreview = document.querySelector("[upload-image-preview]");
  updateImageInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      updateImagePreview.src = URL.createObjectURL(file);
    }
  });
}
//upload-image-end

//delete-image-preview
const deleteImagePre = document.querySelector("[upload-image-delete]");

if (deleteImagePre)
  deleteImagePre.addEventListener("click", () => {
    document.querySelector("[upload-image-input]").value = "";
    document.querySelector("[upload-image-preview]").src = "";
  });
//delete-image-preview end

//sort product
const sort_select = document.querySelectorAll("[sort-select]");
if (sort_select) {
  let url = new URL(window.location.href);
  sort_select.forEach((item_sort) => {
    item_sort.addEventListener("change", (e) => {
      const [valueKey, value] = e.target.value.split("-");
      url.searchParams.set("valueKey", valueKey);
      url.searchParams.set("value", value);
      if (valueKey && value) {
        const stringSort = `${valueKey}-${value}`;
        const optionSelect = sort_select.querySelector(
          `option[value='${stringSort}']`,
        );
      }
      console.log(optionSelect);
      // window.location.href = url.href;
    });
  });
}
//END sort product
