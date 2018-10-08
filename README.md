# Component to parent events:

## Sequence:
1. Component's button @click...
2. ...calls component’s `addToCart` method...
3. ...which emits `add-to-cart` event...
4. ...which triggers `updateCart` method in Vue instance

## html:
```html
<product @add-to-cart=“updateCart”></product>
```

## component:
```javascript
Vue.component(‘product’,{
    methods: {
        addToCart: function() {
            this.$emit(‘add-to-cart’)
        }
    },

    template: `
        <button @click=“addToCart”>Add to cart</button>
    `
}
```

## Vue instance:
```javascript
methods: {
    updateCart() {
        this.cart += 1;
    }
}
```
