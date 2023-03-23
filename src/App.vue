<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Lesson from './components/Lesson.vue'
import Checkout from './components/Checkout.vue'

</script>

<script>
import { fetchApi } from './util'

export default {
  data() {
    return {
      items: [],
      cart: [],
      page: "items",
      sortBy: '',
      sortDirection: 'asc',
      search: '',
    }
  },
  methods: {
    sort: function (s) {
      if (s === this.sortBy) {
        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
      }
      this.sortBy = s;

      this.items.sort((a, b) => this.sortDirection === 'asc' ? a[this.sortBy] > b[this.sortBy] : a[this.sortBy] < b[this.sortBy])
    },
    filteredsearch() {
      fetchApi('/items?q=' + this.search)
        .then(res => res.json())
        .then(items => {
          items.forEach(item => {
            const cartItems = this.cart.filter(i => i.id == item.id)
            if (cartItems.length)
              item.spaces -= cartItems.length
          })

          this.items = items;
        })
    },
    addtocart: function (item) {
      if (item.spaces >= 1) {
        item.spaces = item.spaces - 1;
        this.cart.push(item);
      }
      return item;
    },
    removeitem: function (item) {
      this.cart.splice((item), 1);
      item.spaces = item.spaces + 1;
      return item;
    },
  },
  beforeMount() {
    fetchApi('/items')
      .then(res => res.json())
      .then(items => this.items = items)
  },
}
</script>

<template>
  <header>
    <div class="pageheadingbox">
      <!-- <h1 class="pageheading">School Cart </h1>  -->
    </div>
    <div class="navbar">
      <div class="dropdown">
        <button style="width: 150px;" class="dropbtn">SORT
          <i class="fa fa-caret-down"></i>
        </button>
        <!--This enable to show the sort button and function them.-->
        <div class="dropdown-content">
          <div class="btn-group">
            <button v-on:click="sort('subject')"
              v-bind:class="[sortBy === 'subject' ? sortDirection : '']">Alphabetical</button>
            <button v-on:click="sort('price')" v-bind:class="[sortBy === 'price' ? sortDirection : '']">Price</button>
            <button v-on:click="sort('location')"
              v-bind:class="[sortBy === 'location' ? sortDirection : '']">Location</button>
            <button v-on:click="sort('spaces')"
              v-bind:class="[sortBy === 'spaces' ? sortDirection : '']">Availablity</button>
          </div>
        </div>
      </div>
      <!--This shows the lesson and cart button..-->
      <div class="dropdown">
        <!--Cart button onlt visible if Cart have items using V-if property-->
        <button v-if="cart.length > 0" style="width: 150px;" class="dropbtn" v-on:click="this.page = 'cart'">CART</button>
        <button style="width: 150px;" class="dropbtn" v-on:click="this.page = 'items'">LESSONS</button>
        <input class="search" type="text" @input="filteredsearch()" v-model="search" placeholder="Search" />
      </div>

    </div>
  </header>
  <Lesson :lessons="items" :addtocart="addtocart" v-if="page == 'items'" />
  <Checkout :cart="cart" :removeitem="removeitem" v-if="page == 'cart'" />
</template>
