<script setup>
defineProps({
  cart: {
    type: Array,
    required: true
  },
  removeitem: {
    type: Function,
    required: true
  }
})
</script>

<script>
import { fetchApi } from '../util'

export default {
  methods: {
    submitClick() {
      if (this.formValidation()) {
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        fetchApi('/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name,
            phone,
            items: this.cart
          })
        })
          .then(res => {
            if (res.status >= 400) {
              alert("Registration Failed!");
              window.location = window.location.origin
            }
          })
          .then(() => {
            Promise.all(this.cart.map(item => {
              fetchApi('/items', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  id: item.id
                })
              })
            }))
              .then(() => {
                alert("Registration Sucessfull!");
                window.location = window.location.origin
              })
          })
      } else {
        alert("Registration Failed!");
      }
    },
    //This function is used to validate the field of name and phone//
    formValidation() {
      let flag = true;

      const name = document.getElementById('name').value;
      const phone = document.getElementById('phone').value;

      // Validate letters only as Name
      if (name == "") {
        alert("Please fill in your Name!");
        flag = false;
      }

      // Validate letters only as Name
      if (!/^[a-zA-Z]*$/g.test(name)) {
        alert("Enter alphabetic characters as Name!");
        flag = false;
      }

      // Validate Phone number
      if (phone == "") {
        alert("Please fill in your Phone Number!");
        flag = false;
      }
      // Validate Numbers only as Phone
      if (!/^[0-9]*$/g.test(phone)) {
        alert("Enter numeric values as Phone Number!");
        flag = false;
      }
      return flag;
    }
  }
}

</script>

<template>
  <div>
      <div style = "white-space:pre" class="content">
      <p v-for="item in cart" :key="item.id" class="box" style="width:200px" >
          <img v-bind:src="'/src/assets/img/' + item.image" style="margin-left: 60px;" alt="" width="60" height="60">
          <br/>
          Subject: {{item.subject}}
          <br/>
          Location: {{item.location}}
          <br/>
          Price: {{item.price}}
          <br/>
          <button class="cartbutton" v-on:click= "removeitem(item)" style="width: 150px;">Remove</button>
          </p>
      </div>
      <!--This section is for the checkout form.-->
      <div id="checkout" class="checkout">
          <h1>Checkout Out: </h1>
              <label for="name">Name:</label>
              <input type="text" id="name" name="name" required><br><br>
              <label for="tel">Phone:</label>
              <input type="tel" id="phone" name="phone" required><br><br>
              <button v-on:click="submitClick()">Submit</button>
      </div>
  </div>
</template>
