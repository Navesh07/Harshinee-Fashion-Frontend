import App from '../../App'
import {html, render } from 'lit'
import {gotoRoute, anchorRoute} from '../../Router'
import Auth from '../../Auth'
import Utils from '../../Utils'

class   ContactView {
  init(){
    document.title = 'Contact'    
    this.render()    
    Utils.pageIntroAnim()
  }

  render(){
    const template = html`
      <va-app-header title="CONTACT US" user="${JSON.stringify(Auth.currentUser)}"></va-app-header>
      <div class="page-content">        
        <h1>CONTACT US</h1>

        <form class="page-form" @submit=${this.newCollectionSubmitHandler}>
  <input type="hidden" name="user" value="${Auth.currentUser._id}" />
  <div class="input-group">
    <sl-input name="name" type="text" placeholder="Name" required></sl-input>
  </div>
  <div class="input-group">              
    <sl-input name="email" type="text" placeholder="Email" required>
     
    </sl-input>
  </div>
  <div class="input-group">
    <sl-textarea name="Message" rows="3" placeholder="Message"></sl-textarea>
  </div>
  <div class="input-group" style="margin-bottom: 2em;">
    
  
  <sl-button variant="primary" type="submit" class="submit-btn">Send message</sl-button>
</form>
        
        
        
      </div>      
    `
    render(template, App.rootEl)
  }
}


export default new ContactView()