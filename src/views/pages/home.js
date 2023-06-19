import App from './../../App'
import {html, render } from 'lit'
import {gotoRoute, anchorRoute } from './../../Router'
import Auth from './../../Auth'
import Utils from './../../Utils'

class HomeView {
  init(){    
    console.log('HomeView.init')
    document.title = 'Home'    
    this.render()    
    Utils.pageIntroAnim()    
  }

  render(){
    const template = html`
    <va-app-header title="Home" user="${JSON.stringify(Auth.currentUser)}"></va-app-header>
    <div class="page-content calign">        
    
    <p> Let's see whats new and on sales ...</p>
    
    <div class="guide-step">
      <h4>Hot sales</h4>
     
       <img class="guide1" src="/images/guide1.jpeg" >
      
  
    </div>
    
    <div class="guide-step">
      <h4>What's new</h4>
      <img class="guide2" src="/images/guide2.jpeg" >
    </div>
    
    <div class="guide-step">
      <h4>Hot sales</h4>
      <img class="guide3" src="/images/guide3.jpeg" >
    </div>
    
    <sl-button variant="primary" @click=${() => gotoRoute('/collection')}>View Collection!</sl-button>
      
    </div>      
     
    `
    render(template, App.rootEl)
  }
}

export default new HomeView()