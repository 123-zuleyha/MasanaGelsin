import http from "./http-common";

class VenueDataService {

  //order
  createOrder(data){
    return http.post("/createOrder",data);
  }

  //payment
  addPayment(data){
    return http.post("/addPayment",data);
  }

  //home
  getHomeValues(){
    return http.get("/home");
  }

  addHomeValue(data){
    return http.post("/home",data);
  }

  //product
  getProductsByCategory(category) {
    return http.get(`/products?category=${category}`);
  }

  getProduct(id) {
    return http.get(`/products/${id}`);
  }

  addProduct(data) {
    return http.post("/addProduct",data);
  }

  updateProduct(id, data) {
    return http.put(`/products/${id}`, data);
  }

  removeProduct(id) {
    var productID = id;
    return http.delete(`/products/${id}`,productID);
  }

  //auth
  login(data){
    return http.post("/login",data);
  }

  register(data){
    return http.post("/register",data);
  }

  //Comments
  getComments() {
    return http.get(`comments`);
  }

  addComment(data) {
    return http.post("addComment",data);
  }


}

export default new VenueDataService();
