Vue.component( 'product', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },

    data() {
        return {
            brand: 'Vue Mastery',
            product: "Socks",
            details: ["80% cotton", "20% polyester", "Gender-neutral"],
            selectedVariant: 0,
            variants: [
                {
                    variantId: 2234,
                    variantColor: "green",
                    variantImage: "./assets/vmSocks-green.jpg",
                    variantQty: 10,
                },
                {
                    variantId: 2235,
                    variantColor: "blue",
                    variantImage: "./assets/vmSocks-blue.jpg",
                    variantQty: 0,
                }
            ],
            cart: 0,
            onSale: true,
        }
    },

    computed: {
        title() {
            return this.brand + ' ' + this.product;
        },
        image() {
            return this.variants[ this.selectedVariant ].variantImage;
        },
        inStock() {
            return this.variants[ this.selectedVariant ].variantQty;
        },
        productSale() {
            return this.onSale ? 'ON SALE!' : '';
        }
    },

    methods: {
        addToCart: function() {
            this.cart += 1;
        },

        updateProduct: function(index) {
            this.selectedVariant = index;
        }
    },

    template:
    `
        <div class="product">

            <div class="product-image">
            <img v-bind:src="image" alt="">
            </div>

            <div class="product-info">
            <h1>{{ title }} <span style="color:red; font-style:italic;">{{ productSale }}</span></h1>
            <p v-if="inStock">In Stock</p>
            <p v-else :class="{ outOfStockClass: !inStock }">Out of Stock</p>

            <p>User is premium: {{ premium }}</p>

            <ul>
                <li v-for="detail in details">{{ detail }}</li>
            </ul>

            <div v-for="(variant, index) in variants" 
                :key="variant.variantId"
                class="color-box"
                :style="{ backgroundColor: variant.variantColor }"
                @mouseover="updateProduct(index)"
            >
            </div>

            <button
                @click="addToCart"
                :class="{disabledButton: !inStock}"
                :disabled="!inStock"
            >Add to Cart</button>

            <div class="cart">
                <p>Cart ({{ cart }})</p>
            </div>
            </div>
        </div>
    `
});

var app = new Vue({
    el: "#app",

    data: {
        premium: true,
    }
});
