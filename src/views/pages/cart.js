import App from '../../App'
import {html, render } from 'lit'
import {gotoRoute, anchorRoute} from '../../Router'
import Auth from '../../Auth'
import Utils from '../../Utils'
import Toast from '../../Toast'
import UserAPI from '../../UserAPI'

class   CartView {
  init(){
    document.title = 'Cart' 
    this.cartCollection = null   
    this.render()    
    Utils.pageIntroAnim()
    this.getCartCollection()
  }

  async getCartCollection(){
    try {
      const currentUser = await UserAPI.getUser(Auth.currentUser._id)
      this.cartCollection = currentUser.cart
      console.log(this.cartCollection)
      this.render()
    }catch(err){
      Toast.show(err, 'error')
    }
  } 
  
  



  render(){
    const template = html`
      <va-app-header title="My Cart" user="${JSON.stringify(Auth.currentUser)}"></va-app-header>
      <div class="page-content">        
        <h1>My Cart</h1>

        <div class="collection-grid">
${this.cartCollection == null ? html`
  <sl-spinner></sl-spinner>
` : html`
  ${this.cart.map(collection => html`
    <va-collection class="collection-card"
      id="${collection._id}"
      name="${collection.name}"
      description="${collection.description}"
      price="${collection.price}"
      user="${JSON.stringify(collection.user)}"
      image="${collection.image}"
      size="${collection.size}"
      
    >        
    </va-collection>

  `)}
`}
</div>
        
        
      </div>      
    `
    render(template, App.rootEl)
  }
}


export default new CartView()