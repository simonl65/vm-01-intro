var eventBus = new Vue();

Vue.component('product-review', {
    data() {
        return {
            name: null,
            review: null,
            rating: null,
            recommendation: null,
            errors: [],
        }
    },

    methods: {
        onSubmit() {
            console.log(this.recommendation)
            if( this.name && this.rating && this.review && this.recommendation ) {
                let productReview = {
                    name: this.name,
                    review: this.review,
                    rating: this.rating,
                    recommendation: this.recommendation
                }

                eventBus.$emit('review-submitted', productReview)

                this.name = null,
                this.review = null,
                this.rating = null,
                this.recommendation = null
            }
            else {
                this.errors = [];
                if( !this.name ) this.errors.push("Name is required.")
                if( !this.review ) this.errors.push("Review is required.")
                if( !this.rating ) this.errors.push("Rating is required.")
                if( !this.recommendation ) this.errors.push("Must decide on a recommendation.")
            }
        }
    },

    template: `
        <form class="review-form" @submit.prevent="onSubmit">

            <p class="errors" v-if="errors.length">
                <b>Please correct the following error(s):</b>
                <ul v-for="error in errors">
                    <li>{{ error }}</li>
                </ul>
            </p>

            <p>
                <label for="name">Name:</label>
                <input id="name" v-model="name">
            </p>

            <p>
                <label for="review">Review:</label>
                <textarea id="review" v-model="review"></textarea>
            </p>

            <p>
                <label for="rating">Rating:</label>
                <select id="rating" v-model.number="rating">
                <option>5</option>
                <option>4</option>
                <option>3</option>
                <option>2</option>
                <option>1</option>
                </select>
            </p>

            <p>Would you recommend this product?</p>
            <label style="display: inline-block">
                Yes <input type="radio" name="recommendation" v-model="recommendation" value="yes">
            </label>
            <label style="display: inline-block">
                No <input type="radio" name="recommendation" v-model="recommendation" value="no">
            </label>
          
            <p>
                <input type="submit" value="Submit">
            </p>

        </form>
    `
})

Vue.component('product-tabs', {
    props: {
        reviews: {
            type: Array,
            required: false
        }
    },

    data() {
        return {
            tabs: ['Reviews', 'Add a review'],
            selectedTab: 'Reviews',
        }
    },

    template: `
    <div>
        <span class="tab"
            :class="{ activeTab: selectedTab === tab }"
            v-for="(tab, idx) in tabs"
            :key="idx"
            @click="selectedTab = tab"
        >{{ tab }}</span>

        <div v-show="selectedTab === 'Reviews'">
            <p v-if="!reviews.length">There are no reviews yet.</p>
            <ul v-else>
                <li v-for="review in reviews">
                    <p class="ratingTitle">{{ review.name }} (Rating: {{ review.rating }})</p>
                    <p class="ratingText">{{ review.review }}</p>
                    <small v-if="review.recommendation == 'yes'">Product is recommended</small>
                </li>
            </ul>
        </div>

        <product-review v-show="selectedTab === 'Add a review'"></product-review>
    </div>
    `
});

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
                    variantQty: 5,
                }
            ],
            onSale: false,
            reviews: [],
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

    mounted() {
        eventBus.$on('review-submitted', (productReview) => {
            this.reviews.push(productReview)
        })
    },

    methods: {
        addToCart: function() {
            this.$emit('add-to-cart', this.variants[ this.selectedVariant ].variantId);
        },

        updateProduct: function(index) {
            this.selectedVariant = index;
        },
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
            </div>

            <product-tabs :reviews="reviews"></product-tabs>
        </div>
    `
});

var app = new Vue({
    el: "#app",

    data: {
        premium: true,
        cart: [],
    },

    methods: {
        updateCart( id ) {
            this.cart.push(id);
        },
    }
});
