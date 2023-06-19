import App from '../../App'
import {html, render } from 'lit'
import {gotoRoute, anchorRoute} from '../../Router'
import Auth from '../../Auth'
import Utils from '../../Utils'

class   AccountView {
  init(){
    document.title = 'Account'    
    this.render()    
    Utils.pageIntroAnim()
  }

  render(){
    const template = html`
      <va-app-header title="My Account" user="${JSON.stringify(Auth.currentUser)}"></va-app-header>
      <div class="page-content">        
        <h1>My Account</h1>
        <p>Page content ...</p>
        
      </div>      
    `
    render(template, App.rootEl)
  }
}


export default new AccountView()