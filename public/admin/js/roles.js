//Permissions
const tablePermissions = document.querySelector("[table-permissions]");

if (tablePermissions) {
  const buttonSubmit = document.querySelector("[button-submit]");
  buttonSubmit.addEventListener("click", () => {
    let permissions = [];

    const products_category_view =
      tablePermissions.querySelectorAll("[data-name]");

    products_category_view.forEach((item) => {
      const name = item.getAttribute("data-name");
      const inputs = item.querySelectorAll("input");

      if (name == "id") {
        inputs.forEach((input) => {
          const id = input.value;
          permissions.push({
            id: id,
            permissions: [],
          });
        });
      } else {
        inputs.forEach((input, value) => {
          const checked = input.checked;
          if (checked) {
            permissions[value].permissions.push(name);
          }
        });
      }
    });
    if (permissions.length > 0) {
      const form_permissions = document.querySelector("#form-permissions");

      const input_permission = form_permissions.querySelector(
        'input[name="permissions"]',
      );
      input_permission.value = JSON.stringify(permissions);
      form_permissions.submit();
    }
  });
}

//ENd Permissions

//Permissions default
const data_roles = document.querySelector("[data-roles]");
console.log(data_roles);
if (data_roles) {
  const data = JSON.parse(data_roles.getAttribute("data-roles"));
  console.log(data);
  data.forEach((item, index) => {
    const permissions = item.permissions;
    permissions.forEach((permissions) => {
      const row = tablePermissions.querySelector(
        `[data-name="${permissions}"]`,
      );
      const input = row.querySelectorAll("input")[index];

      input.checked = true;
    });
  });
}
//END Permissions default
