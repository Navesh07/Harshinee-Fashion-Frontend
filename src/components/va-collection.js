import { LitElement, html } from 'lit'
import { render} from 'lit'
import {anchorRoute, gotoRoute} from './../Router'
import Auth from './../Auth'
import App from './../App'
import UserAPI from '../UserAPI'
import Toast from '../Toast'

customElements.define('va-collection', class Collection extends LitElement {
  constructor(){
    super()    
  }

  static get properties(){ 
    return {
      id: {
        type: String
      }, 
      name: {
        type: String
      },
      description: {
        type: String
      },
      price: {
        type: String
      },
      user: {
        type: Object
      },
      image: {
        type: String
      },
      size: {
        type: String
      }
      

    }
  }

  firstUpdated(){
    super.firstUpdated()
  }

  moreInfoHandler(){
    // create sl-dialogue
    const dialogEl = document.createElement('sl-dialog')
    // add className
    dialogEl.className = 'collection-dialog'
    // sl-dialogue content
    const dialogContent = html`
    <style>
  .wrap {
    display: flex;
  }
  .image {
    width: 50%;
  }
  .image img {
    width: 100%;
  }
  .content {
    padding-left: 1em;
  }
  .gender span,
  .length span {
    text-transform: uppercase;
    font-weight: bold;
  }

  .price {
    font-size: 1.5em;
    color: var(--app-header-txt-color)

  }

</style>
<div class="wrap">
  <div class="image">
    <img src="${App.apiBase}/images/${this.image}" alt="${this.name}" />
  </div>
  <div class="content">
    <h1>${this.name}</h1>
    <p>${this.description}</p>
    <p class="price">Rs ${this.price}</p>
    <p>Size available : ${this.size}</p>

    <p></p>
    <sl-button @click=${this.addCartHandler.bind(this)}>
      <sl-icon slot="prefix" name="cart-plus"></sl-icon>
      Add to cart
    </sl-button>
  </div>
</div>

`
    render(dialogContent,dialogEl)

    // append to document.body
    document.body.append(dialogEl)

    // show sl-dialog
    dialogEl.show()

    // on hide delete dialogue
    dialogEl.addEventListener('sl-after-hide', () => {
        dialogEl.remove()
    })


    
  }

  async addCartHandler(){    
    try {
      await UserAPI.addToCart(this._id)
      Toast.show('Collection added to Cart')
    }catch(err){
      Toast.show(err, 'error')
    }
  }
  

 
  
  render(){    
    return html`

    <style>
      .author {
        font-size: 0.9em;
        font-style: italic;
        opacity: 0.8;

      }
    </style>
    <sl-card>
        <img slot="image" src="${App.apiBase}/images/${this.image}" />
        <h2>${this.name}</h2>
        <h3>Rs ${this.price}</h3>
        <p class="author">By ${this.user.firstName} ${this.user.lastName} </p>
        <sl-button @click=${this.moreInfoHandler.bind(this)}>More Info</sl-button>
        <sl-icon-button name="cart-plus" label="Add to cart" @click=${this.addCartHandler.bind(this)}></sl-icon-button>

    </sl-card>

    <sl-dialog label="test">
      <p>test!</p>
    </sl-dialog>

     
    `
  }
  
})