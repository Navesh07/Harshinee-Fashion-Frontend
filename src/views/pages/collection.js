import App from '../../App'
import {html, render } from 'lit'
import {gotoRoute, anchorRoute} from '../../Router'
import Auth from '../../Auth'
import Utils from '../../Utils'
import CollectionAPI from '../../CollectionAPI'
import Toast from '../../Toast'

class   CollectionView {
  init(){
    document.title = 'collection'  
    this.collection = null
    this.render()    
    Utils.pageIntroAnim()
    this.getCollection()
  }

  async getCollection(){
    try{
      this.collection = await CollectionAPI.getCollection()
      console.log(this.collection)
      this.render()
    }catch(err){
      Toast.show(err, 'error')
    }
  }

  render(){
    const template = html`
      <va-app-header title="Our Collection" user="${JSON.stringify(Auth.currentUser)}"></va-app-header>
      <div class="page-content"> 

        <div class="collection-grid">
        ${this.collection == null ? html`
          <sl-spinner></sl-spinner>
        ` : html`
          ${this.collection.map(collection => html`
          
          <p></p>

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


export default new CollectionView()