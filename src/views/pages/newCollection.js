import App from '../../App'
import {html, render } from 'lit'
import {gotoRoute, anchorRoute} from '../../Router'
import Auth from '../../Auth'
import Utils from '../../Utils'
import CollectionAPI from '../../CollectionAPI'
import Toast from '../../Toast'


class newCollectionView {
  init(){
    document.title = 'New Collection'    
    this.render()    
    Utils.pageIntroAnim()
  }

  async newCollectionSubmitHandler(e){
    e.preventDefault()
    const submitBtn = document.querySelector('.submit-btn')
    submitBtn.setAttribute('loading', '')    
    const formData = new FormData(e.target)

    try{
      await CollectionAPI.newCollection(formData)
      Toast.show('Collection added!')
      submitBtn.removeAttribute('loading')
      //reset text+textarea inputs
      const textInputs = document.querySelectorAll('sl-input, sl-textarea')
      if(textInputs) textInputs.forEach(textInput => textInput.value = null)
      //reset radio inputs
      const radioInputs = document.querySelectorAll('sl-radio')
      if(radioInputs) radioInputs.forEach(radioInput => radioInput.removeAttribute('checked'))
      //reset file inputs
      const fileInput = document.querySelectorAll('input[type=file]')
      if(fileInput) fileInput.value = null

    }catch(err){
      Toast.show(err,'error')
      submitBtn.removeAttribute('loading')
    }
    
  }

  render(){
    const template = html`
      <va-app-header title="New Collection" user="${JSON.stringify(Auth.currentUser)}"></va-app-header>
      <div class="page-content">        
        <h1>New Collection</h1>

        <form class="page-form" @submit=${this.newCollectionSubmitHandler}>
  <input type="hidden" name="user" value="${Auth.currentUser._id}" />
  <div class="input-group">
    <sl-input name="name" type="text" placeholder="Collection Name" required></sl-input>
  </div>
  <div class="input-group">              
    <sl-input name="price" type="text" placeholder="Price" required>
      <span slot="prefix">Rs</span>
    </sl-input>
  </div>
  <div class="input-group">
    <sl-textarea name="description" rows="3" placeholder="Description"></sl-textarea>
  </div>
  <div class="input-group" style="margin-bottom: 2em;">
    <label>Image</label><br>
    <input type="file" name="image" />              
  </div>
  <div class="input-group" style="margin-bottom: 2em;">
    <sl-radio-group name="Size" label="Size">
      <sl-radio value="S">S</sl-radio>
      <sl-radio value="M">M</sl-radio>
      <sl-radio value="L">L</sl-radio>
      <sl-radio value="XL">XL</sl-radio>
    </sl-radio-group>
  </div>
  
  <sl-button variant="primary" type="submit" class="submit-btn">Add Collection</sl-button>
</form>
        
        
      </div>      
    `
    render(template, App.rootEl)
  }
}


export default new newCollectionView()