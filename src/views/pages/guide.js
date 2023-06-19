import App from '../../App'
import {html, render } from 'lit'
import {gotoRoute, anchorRoute} from '../../Router'
import Auth from '../../Auth'
import Utils from '../../Utils'
import UserAPI from '../../UserAPI'

class GuideView {
  init(){
    document.title = 'Guide'    
    this.render()    
    Utils.pageIntroAnim()
    this.updateCurrentUser()
  }

  async updateCurrentUser(){
    try{
      const updatedUser = await UserAPI.updateUser(Auth.currentUser._id, { newUser: false}, 'json')
      console.log('user updated')
      console.log(updatedUser)
    }catch(err){
      Toast.show(err, 'error')
    }

  }

  render(){
    const template = html`
      <va-app-header title="Guide" user="${JSON.stringify(Auth.currentUser)}"></va-app-header>
      <div class="page-content calign">        
      <h3 class="brand-color">Welcome ${Auth.currentUser.firstName}!</h3>
      <p> Welcome to the panopoly of exquisite latest indian wear with perfection ...</p>  
      <div class="guide-step">
         <img class="guide3" src="/images/guide3.jpeg" >
        
    
      </div>
      
      
      
      <sl-button variant="primary" @click=${() => gotoRoute('/home')}>Okay got it!</sl-button>
        
      </div>      
    `
    render(template, App.rootEl)
  }
}


export default new GuideView()