// email-capture-popup.js

class IntronTranscribeWidget {
  constructor(config = {}) {
    this.config = {
      title: config.title || 'Sign up for our newsletter',
      submitText: config.submitText || 'Subscribe',
      successMessage: config.successMessage || 'Thank you for subscribing!',
      errorMessage: config.errorMessage || 'Please enter a valid email address.',
      ...config
    };
    this.popupElement = null;
  }

  init() {
    this.createPopupElement();
    this.addStyles();
    document.body.appendChild(this.popupElement);
  }

  createPopupElement() {
    this.popupElement = document.createElement('div');
    this.popupElement.className = 'email-capture-popup';
    this.popupElement.innerHTML = `
        <div class="email-capture-popup-content">
          <h2>${this.config.title}</h2>
          <form id="email-capture-form">
            <input type="email" id="email-input" placeholder="Enter your email" required>
            <button class='styled-button' type="submit">${this.config.submitText}</button>
          </form>
          <div id="message"></div>
          <button class="close-btn">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                 <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
           </button>
        </div>
      `;

    const form = this.popupElement.querySelector('#email-capture-form');
    form.addEventListener('submit', this.handleSubmit.bind(this));

    const closeBtn = this.popupElement.querySelector('.close-btn');
    closeBtn.addEventListener('click', this.hide.bind(this));
  }

  addStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .email-capture-popup {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          z-index: 1000;
          border-radius: 5px;
        }
        .email-capture-popup-content {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background-color: white;
          padding: 20px;
          border-radius: 5px;
          text-align: center;
        }
        .close-btn {
          position: absolute;
          top: 10px;
          right: 10px;
          cursor: pointer;
          font-size: 20px;
          width: 20px;
          height: 20px;
          border: none;
          background: none;
          border-radius: 50%;
          padding: 2px;
          background-color:red;
          display:flex;
          justify-content:center;
          items-align:center;
        }
        .styled-button {
          padding:3px;
          width:100px;
          font-size:1rem;
          margin-top:10px;
          border-radius:5px;
          background-color:blue;
          color:white;
          border:none;
          cursor:pointer;
        }
      `;
    document.head.appendChild(style);
  }

  show() {
    this.popupElement.style.display = 'block';
  }

  hide() {
    this.popupElement.style.display = 'none';
  }

  handleSubmit(event) {
    event.preventDefault();
    const emailInput = this.popupElement.querySelector('#email-input');
    const messageElement = this.popupElement.querySelector('#message');

    if (this.validateEmail(emailInput.value)) {
      // Here you would typically send the email to your server
      console.log('Email submitted:', emailInput.value);
      messageElement.textContent = this.config.successMessage;
      messageElement.style.color = 'green';
      setTimeout(() => this.hide(), 2000);
    } else {
      messageElement.textContent = this.config.errorMessage;
      messageElement.style.color = 'red';
    }
  }

  validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
}

export default IntronTranscribeWidget;