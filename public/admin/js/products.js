//change-status
const buttonChangeStatus = document.querySelectorAll("[button-change-status]");
if (buttonChangeStatus.length > 0) {
  const formChangeStatus = document.querySelector("#form-change-status");
  const path = formChangeStatus.getAttribute("data-path");

  buttonChangeStatus.forEach((button) => {
    button.addEventListener("click", () => {
      const statusCurrent = button.getAttribute("data-status");
      const id = button.getAttribute("data-id");

      let statusChange = statusCurrent == "InStock" ? "OutStock" : "InStock";

      const action = path + `/${statusChange}/${id}?_method=PATCH`;
      console.log(action);
      formChangeStatus.action = action;
      formChangeStatus.submit();
    });
  });
}
// End change_status

//Delete item
const buttonDelete = document.querySelectorAll("[button-delete]");
if (buttonDelete.length > 0) {
  const formDeleteItem = document.querySelector("#form-delete-product");
  const path = formDeleteItem.getAttribute("data-path");

  buttonDelete.forEach((button) => {
    button.addEventListener("click", () => {
      const isConfirm = confirm("Bạn có chắc muốn xóa sản phẩm này ?");
      if (isConfirm) {
        const dataID = button.getAttribute("data-id");

        const action = `${path}/${dataID}?_method=DELETE`;

        formDeleteItem.action = action;

        formDeleteItem.submit();
      }
    });
  });
}
// End delete item

