// Cập nhật số lượng sản phẩm trong giỏ hàng
const input_quantity = document.querySelectorAll("input[name='quantity']");
input_quantity.forEach((item) => {
  item.addEventListener("change", (e) => {
    const productId = e.target.attributes.product_id.value;
    const quantity = e.target.value;
    // console.log(e.target.attributes.product_id.value);
    window.location.href = `/cart/update/${productId}/${quantity}`;
  });
});
// Hết cập nhật số lượng sản phẩm trong giỏ hàng
