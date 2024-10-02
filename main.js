class IntronTranscribeWidget {
    constructor(config = {}) {
        this.config = {
            title: config.title || 'Intron Transcribe Widget',
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
        this.addEventListeners();
    }

    createPopupElement() {
        this.popupElement = document.createElement('div');
        this.popupElement.className = 'transcribe-capture-popup';
        this.popupElement.innerHTML = `
        <div>
            <div class="cl-intronies-app">
                <div class="cl-intronies-speak_toggle__wrap">
                    <input type="checkbox" class="custom-control-input" id="id-intronies-speak_switch">
                    <label class="custom-control-label" for="id-intronies-speak_switch">Speak</label>
                </div>
                <!-- Other elements from your provided code -->
                 
                <textarea id="id-intronies-transcript-textbox" name="id-intronies-transcript-textbox" col="100" row="12"></textarea>

                <div id="id-intronies-app" class="cl-intronies-app  bottom">
                    <div id="id-intronies-draggable-containment">
                        <section id="id-intronies-draggable" class="cl-intronies-speaking_widget">
                            <div id="id-intronies-wave-box" class="cl-intronies-player__box__weaver d-md-none">
                                <div class="cl-intronies-waves" id="id-intronies-waves-mobile">
                                </div>
                            </div>

                            <div id="id-intronies-start-prompt-container" class="cl-intronies-widget_head">
                                <div id="id-intronies-start-prompt" class="cl-intronies-general_wrapp">
                                    Hit record to start
                                </div>
                            </div>

                            <div class="cl-intronies-widget_middle">
                                <div class="cl-intronies-general_wrapp cl-intronies-recording_wrapp">
                                    <div class="cl-intronies-btn_record__speak" id="id-intronies-record-btn">
                                        <svg id="id-intronies-mic-fill" xmlns="http://www.w3.org/2000/svg" width="24.046"
                                            height="24.046" viewBox="0 0 24.046 24.046">
                                            <path id="Path_1" data-name="Path 1" d="M0,0H24.046V24.046H0Z" fill="none" />
                                            <path id="Path_2" data-name="Path 2"
                                                d="M10.919,1a4.592,4.592,0,0,1,4.4,4.766V9.579a4.592,4.592,0,0,1-4.4,4.766,4.592,4.592,0,0,1-4.4-4.766V5.766A4.592,4.592,0,0,1,10.919,1ZM3.055,10.532H4.827a6.339,6.339,0,0,0,6.092,5.713,6.339,6.339,0,0,0,6.092-5.713h1.772A8.273,8.273,0,0,1,11.8,18.1V21.97H10.04V18.1a8.273,8.273,0,0,1-6.985-7.573Z"
                                                transform="translate(1.164 0.029)" fill="#fff" />
                                        </svg>
                                    </div>
                                    <div class="cl-intronies-pause_button__speak" id="id-intronies-stop-btn">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="15.839" height="14.959"
                                            viewBox="0 0 15.839 14.959">
                                            <rect id="stop" width="15.839" height="14.959" rx="5" fill="#47337b" />
                                        </svg>
                                    </div>
                                    <div class="cl-intronies-record_time">
                                        <h6>
                                            <span id="id-intronies-hours">00</span>
                                            <span>:</span>
                                            <span id="id-intronies-minutes">00</span>
                                            <span>:</span>
                                            <span id="id-intronies-seconds">00</span>
                                        </h6>
                                    </div>

                                    <div id="wave-box" class="cl-intronies-player__box__weave d-md-flex">
                                        <div class="cl-intronies-waves" id="id-intronies-waves-desktop">
                                        </div>
                                    </div>

                                    <a class="btn cl-intronies-cta_btn cl-intronies-btn_copy" id="id-intronies-copy-btn">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                                            <g id="Group_11032" data-name="Group 11032" transform="translate(0.244 0.144)">
                                                <g id="copy" transform="translate(2.228 2.229)">
                                                    <rect id="Rectangle_129" data-name="Rectangle 129" width="10" height="10" rx="2"
                                                        transform="translate(3.528 3.627)" fill="none" stroke="#40dbbc"
                                                        stroke-linecap="round" stroke-linejoin="round" stroke-width="1.3" />
                                                    <path id="Path_200860" data-name="Path 200860"
                                                        d="M4.227,11.652H3.485A1.485,1.485,0,0,1,2,10.167V3.485A1.485,1.485,0,0,1,3.485,2h6.682a1.485,1.485,0,0,1,1.485,1.485v.742"
                                                        transform="translate(-2 -2)" fill="none" stroke="#40dbbc"
                                                        stroke-linecap="round" stroke-linejoin="round" stroke-width="1.3" />
                                                </g>
                                                <rect id="Rectangle_131" data-name="Rectangle 131" width="18" height="18"
                                                    transform="translate(-0.244 -0.144)" fill="none" />
                                            </g>
                                        </svg>
                                        Copy
                                    </a>
                                    <a class="btn cl-intronies-cta_btn cl-intronies-btn_clear" id="id-intronies-clear-btn">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                                            <g id="Group_11035" data-name="Group 11035" transform="translate(0.053 0.145)">
                                                <path id="bx-eraser"
                                                    d="M2.433,12.293l3.173,3.268a.724.724,0,0,0,.522.223h8.857V14.264H9.849l5.33-5.491a1.554,1.554,0,0,0,0-2.15L11.525,2.86a1.448,1.448,0,0,0-2.087,0L5.933,6.47,2.424,10.152A1.559,1.559,0,0,0,2.433,12.293Zm8.049-8.358L14.135,7.7,12.227,9.664,8.573,5.9ZM6.982,7.54l.548-.564,3.653,3.763L7.82,14.2a.774.774,0,0,0-.051.06H6.433L3.478,11.218Z"
                                                    transform="translate(0.106 -0.188)" fill="#ff5757" />
                                                <rect id="Rectangle_132" data-name="Rectangle 132" width="18" height="18"
                                                    transform="translate(-0.053 -0.145)" fill="none" />
                                            </g>
                                        </svg>
                                        Clear
                                    </a>
                                </div>
                            </div>

                            <div class="cl-intronies-widget_bottom">
                                <div id="id-intronies-user-auth-status" class="cl-intronies-email_input">
                                    <div id="id-intronies-wallet" class="cl-intronies-form-controll cl-intronies-wallet_wrapp">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="18" viewBox="0 0 20 18">
                                            <path id="bxs-wallet"
                                                d="M20,7V5a2,2,0,0,0-2-2H5A3,3,0,0,0,2,6V18a2.916,2.916,0,0,0,3,3H20a2,2,0,0,0,2-2V9A2,2,0,0,0,20,7Zm-2,9H16V12h2ZM5,7A1,1,0,0,1,5,5H18V7Z"
                                                transform="translate(-2 -3)" fill="#41ccc9" />
                                        </svg>
                                        NGN<span id="id-intronies-credits"></span>
                                    </div>
                                </div>
                                <div class="dropdown cl-intronies-instruction_dropdown">
                                    <button type="button" class="btn dropdown-toggle" id="click_advance" data-toggle="dropdown">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="110.412" height="34.73"
                                            viewBox="0 0 110.412 34.73">
                                            <g id="Group_26" data-name="Group 26" transform="translate(-56.928 -70.028)">
                                                <path id="Path_27" data-name="Path 27"
                                                    d="M6.291-15.981V-1.375H1.924V-15.981Zm.507-4A2.308,2.308,0,0,1,6.586-19a2.577,2.577,0,0,1-.577.8,2.827,2.827,0,0,1-.852.549,2.644,2.644,0,0,1-1.035.2,2.458,2.458,0,0,1-1-.2A2.811,2.811,0,0,1,2.3-18.2a2.535,2.535,0,0,1-.563-.8,2.375,2.375,0,0,1-.2-.979,2.458,2.458,0,0,1,.2-1A2.6,2.6,0,0,1,2.3-21.8a2.638,2.638,0,0,1,.824-.549,2.534,2.534,0,0,1,1-.2,2.727,2.727,0,0,1,1.035.2,2.659,2.659,0,0,1,.852.549,2.636,2.636,0,0,1,.577.817A2.388,2.388,0,0,1,6.8-19.982Z"
                                                    transform="translate(90.466 92.573)" fill="#41ccc9" />
                                                <path id="Path_28" data-name="Path 28"
                                                    d="M1.8-.964V-15.57H4.5a1.205,1.205,0,0,1,.683.183.978.978,0,0,1,.387.549l.254.845a10.608,10.608,0,0,1,.873-.732,5.114,5.114,0,0,1,.965-.57,5.727,5.727,0,0,1,1.113-.366,5.971,5.971,0,0,1,1.3-.134,5.114,5.114,0,0,1,2.12.416,4.4,4.4,0,0,1,1.556,1.155,4.985,4.985,0,0,1,.958,1.761,7.3,7.3,0,0,1,.324,2.218V-.964H10.673v-9.282a2.554,2.554,0,0,0-.493-1.669,1.771,1.771,0,0,0-1.451-.6,3.038,3.038,0,0,0-1.352.31,5.258,5.258,0,0,0-1.211.831V-.964Z"
                                                    transform="translate(98.045 92.162)" fill="#41ccc9" />
                                                <path id="Path_29" data-name="Path 29"
                                                    d="M6.848-1A5.149,5.149,0,0,1,5.01-1.3a3.651,3.651,0,0,1-1.338-.859,3.663,3.663,0,0,1-.824-1.345,5.207,5.207,0,0,1-.282-1.761v-7.55H1.327a.827.827,0,0,1-.577-.218.824.824,0,0,1-.239-.641v-1.7l2.324-.451.859-3.563a.868.868,0,0,1,.958-.676H6.933V-15.8h3.549v2.986H6.933v7.254a1.365,1.365,0,0,0,.246.838.833.833,0,0,0,.711.331,1.4,1.4,0,0,0,.4-.049,1.6,1.6,0,0,0,.282-.113q.12-.063.225-.113a.577.577,0,0,1,.246-.049.508.508,0,0,1,.317.092,1.134,1.134,0,0,1,.246.289l1.324,2.07a6.026,6.026,0,0,1-1.9.951A7.556,7.556,0,0,1,6.848-1Z"
                                                    transform="translate(114.174 92.422)" fill="#41ccc9" />
                                                <path id="Path_30" data-name="Path 30"
                                                    d="M1.8-.967V-15.573H4.392a2.21,2.21,0,0,1,.542.056.951.951,0,0,1,.366.176.751.751,0,0,1,.225.317,2.858,2.858,0,0,1,.134.479L5.9-13.179a7.158,7.158,0,0,1,1.8-1.958,3.663,3.663,0,0,1,2.183-.718,2.515,2.515,0,0,1,1.606.479l-.563,3.211a.627.627,0,0,1-.225.416.765.765,0,0,1-.451.12,2.989,2.989,0,0,1-.563-.063,4.367,4.367,0,0,0-.817-.063,3,3,0,0,0-2.7,1.831V-.967Z"
                                                    transform="translate(124.986 92.165)" fill="#41ccc9" />
                                                <path id="Path_31" data-name="Path 31"
                                                    d="M8.243-15.8a8.436,8.436,0,0,1,3.028.521,6.642,6.642,0,0,1,2.345,1.493,6.725,6.725,0,0,1,1.521,2.359A8.511,8.511,0,0,1,15.68-8.3a8.665,8.665,0,0,1-.542,3.148,6.772,6.772,0,0,1-1.521,2.38,6.674,6.674,0,0,1-2.345,1.507,8.335,8.335,0,0,1-3.028.528,8.433,8.433,0,0,1-3.049-.528A6.8,6.8,0,0,1,2.828-2.774a6.674,6.674,0,0,1-1.535-2.38A8.665,8.665,0,0,1,.75-8.3a8.511,8.511,0,0,1,.542-3.12,6.628,6.628,0,0,1,1.535-2.359,6.773,6.773,0,0,1,2.366-1.493A8.535,8.535,0,0,1,8.243-15.8Zm0,11.817a2.48,2.48,0,0,0,2.218-1.063,5.881,5.881,0,0,0,.711-3.232,5.844,5.844,0,0,0-.711-3.225,2.485,2.485,0,0,0-2.218-1.056A2.547,2.547,0,0,0,5.976-11.5a5.8,5.8,0,0,0-.718,3.225,5.835,5.835,0,0,0,.718,3.232A2.541,2.541,0,0,0,8.243-3.978Z"
                                                    transform="translate(136.314 92.162)" fill="#41ccc9" />
                                                <path id="Path_32" data-name="Path 32"
                                                    d="M1.8-.964V-15.57H4.5a1.205,1.205,0,0,1,.683.183.978.978,0,0,1,.387.549l.254.845a10.608,10.608,0,0,1,.873-.732,5.114,5.114,0,0,1,.965-.57,5.727,5.727,0,0,1,1.113-.366,5.971,5.971,0,0,1,1.3-.134,5.114,5.114,0,0,1,2.12.416,4.4,4.4,0,0,1,1.556,1.155,4.985,4.985,0,0,1,.958,1.761,7.3,7.3,0,0,1,.324,2.218V-.964H10.673v-9.282a2.554,2.554,0,0,0-.493-1.669,1.771,1.771,0,0,0-1.451-.6,3.038,3.038,0,0,0-1.352.31,5.258,5.258,0,0,0-1.211.831V-.964Z"
                                                    transform="translate(152.3 92.162)" fill="#41ccc9" />
                                                <path id="Path_38" data-name="Path 38"
                                                    d="M9.265-.647H8.54V-5.422H2.3V-.647H1.575v-9.965H2.3v4.648H8.54v-4.648h.725Z"
                                                    transform="translate(90.524 105.175)" fill="#50a2d2" />
                                                <path id="Path_37" data-name="Path 37"
                                                    d="M7.547-10.612v.6H2.3v4.028H6.667V-5.4H2.3v4.155H7.547v.6H1.575v-9.965Z"
                                                    transform="translate(100.986 105.175)" fill="#50a2d2" />
                                                <path id="Path_36" data-name="Path 36"
                                                    d="M8.387-.6H7.868a.228.228,0,0,1-.151-.049.327.327,0,0,1-.092-.128l-1.1-2.7H1.959L.867-.782a.282.282,0,0,1-.092.125A.245.245,0,0,1,.618-.6H.1L3.911-9.9h.67ZM2.162-3.983H6.33l-1.9-4.7q-.046-.112-.092-.253t-.092-.3q-.046.158-.092.3t-.092.26Z"
                                                    transform="translate(109.193 104.193)" fill="#50a2d2" />
                                                <path id="Path_35" data-name="Path 35" d="M2.14-1.176h4.41V-.6H1.47V-9.9h.67Z"
                                                    transform="translate(117.993 104.193)" fill="#50a2d2" />
                                                <path id="Path_34" data-name="Path 34"
                                                    d="M8-10.612V-10H4.5V-.647H3.784V-10H.262v-.613Z"
                                                    transform="translate(123.881 105.175)" fill="#50a2d2" />
                                                <path id="Path_33" data-name="Path 33"
                                                    d="M9.265-.647H8.54V-5.422H2.3V-.647H1.575v-9.965H2.3v4.648H8.54v-4.648h.725Z"
                                                    transform="translate(131.832 105.175)" fill="#50a2d2" />
                                                <line id="Line_37" data-name="Line 37" x1="6.774" y2="4.34"
                                                    transform="translate(72.867 73.393)" fill="none" stroke="#41ccc9"
                                                    stroke-linecap="round" stroke-linejoin="round" stroke-width="0.852" />
                                                <line id="Line_38" data-name="Line 38" x1="6.774" y2="4.34"
                                                    transform="translate(72.867 76.65)" fill="none" stroke="#41ccc9"
                                                    stroke-linecap="round" stroke-linejoin="round" stroke-width="0.852" />
                                                <line id="Line_39" data-name="Line 39" x1="6.774" y2="4.34"
                                                    transform="translate(72.867 79.906)" fill="none" stroke="#41ccc9"
                                                    stroke-linecap="round" stroke-linejoin="round" stroke-width="0.852" />
                                                <line id="Line_40" data-name="Line 40" x1="3.001" y2="1.923"
                                                    transform="translate(72.868 95.349)" fill="none" stroke="#41ccc9"
                                                    stroke-linecap="round" stroke-linejoin="round" stroke-width="0.852" />
                                                <line id="Line_41" data-name="Line 41" x1="5.804" y2="3.719"
                                                    transform="translate(72.868 96.81)" fill="none" stroke="#41ccc9"
                                                    stroke-linecap="round" stroke-linejoin="round" stroke-width="0.852" />
                                                <line id="Line_42" data-name="Line 42" x1="6.774" y2="4.34"
                                                    transform="translate(72.867 99.446)" fill="none" stroke="#41ccc9"
                                                    stroke-linecap="round" stroke-linejoin="round" stroke-width="0.852" />
                                                <line id="Line_43" data-name="Line 43" x1="6.889" y2="4.41"
                                                    transform="translate(81.739 87.904)" fill="none" stroke="#41ccc9"
                                                    stroke-linecap="round" stroke-linejoin="round" stroke-width="0.852" />
                                                <line id="Line_44" data-name="Line 44" x1="6.889" y2="4.41"
                                                    transform="translate(81.739 91.161)" fill="none" stroke="#41ccc9"
                                                    stroke-linecap="round" stroke-linejoin="round" stroke-width="0.852" />
                                                <line id="Line_45" data-name="Line 45" x1="6.889" y2="4.41"
                                                    transform="translate(81.739 94.417)" fill="none" stroke="#41ccc9"
                                                    stroke-linecap="round" stroke-linejoin="round" stroke-width="0.852" />
                                                <line id="Line_46" data-name="Line 46" x2="6.725" y2="3.652"
                                                    transform="translate(65.773 73.878)" fill="none" stroke="#41ccc9"
                                                    stroke-linecap="round" stroke-linejoin="round" stroke-width="2.273" />
                                                <line id="Line_47" data-name="Line 47" x2="6.725" y2="3.652"
                                                    transform="translate(65.773 77.089)" fill="none" stroke="#41ccc9"
                                                    stroke-linecap="round" stroke-linejoin="round" stroke-width="2.273" />
                                                <line id="Line_48" data-name="Line 48" x2="6.725" y2="3.652"
                                                    transform="translate(65.773 80.3)" fill="none" stroke="#41ccc9"
                                                    stroke-linecap="round" stroke-linejoin="round" stroke-width="2.273" />
                                                <line id="Line_49" data-name="Line 49" x2="23.425" y2="12.208"
                                                    transform="translate(58.461 79.855)" fill="none" stroke="#41ccc9"
                                                    stroke-linecap="round" stroke-linejoin="round" stroke-width="2.273" />
                                                <line id="Line_50" data-name="Line 50" x2="23.425" y2="12.208"
                                                    transform="translate(58.461 83.066)" fill="none" stroke="#41ccc9"
                                                    stroke-linecap="round" stroke-linejoin="round" stroke-width="2.273" />
                                                <line id="Line_51" data-name="Line 51" x2="23.425" y2="12.208"
                                                    transform="translate(58.461 86.277)" fill="none" stroke="#41ccc9"
                                                    stroke-linecap="round" stroke-linejoin="round" stroke-width="2.273" />
                                                <line id="Line_52" data-name="Line 52" x2="6.725" y2="3.652"
                                                    transform="translate(65.773 93.144)" fill="none" stroke="#41ccc9"
                                                    stroke-linecap="round" stroke-linejoin="round" stroke-width="2.273" />
                                                <line id="Line_53" data-name="Line 53" x2="6.725" y2="3.652"
                                                    transform="translate(65.773 96.355)" fill="none" stroke="#41ccc9"
                                                    stroke-linecap="round" stroke-linejoin="round" stroke-width="2.273" />
                                                <line id="Line_54" data-name="Line 54" x2="6.725" y2="3.652"
                                                    transform="translate(65.773 99.565)" fill="none" stroke="#41ccc9"
                                                    stroke-linecap="round" stroke-linejoin="round" stroke-width="2.273" />
                                            </g>
                                        </svg>
                                        Instructions
                                    </button>
                                    <div class="dropdown-menu" id="id-intronies-collapseInstructions">
                                        <a class="dropdown-item" href="#">
                                            Personalization better adapts the machine learning model to the voice and writing style
                                            of clinicians at your hospital.
                                        </a>
                                        <a class="dropdown-item" href="#">
                                            Hit the record button and read the sentence aloud in your normal accent. When you are
                                            done, hit stop to end recording.
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    `;
    }

    addStyles() {
        const link = document.createElement('link');
        link.href = '@intron-transcribe-popup/main.css';  // Ensure the path to main.css is correct relative to the distribution of your package
        link.type = 'text/css';
        link.rel = 'stylesheet';
        document.head.appendChild(link);
    }

    addEventListeners() {
        const speakSwitch = this.popupElement.querySelector('#id-intronies-speak_switch');
        const appElement = this.popupElement.querySelector('.cl-intronies-speaking_widget');
        speakSwitch.addEventListener('change', () => {
            appElement.style.display = speakSwitch.checked ? 'block' : 'none';
        });

        // Additional event listeners for other interactive elements like buttons
        const recordButton = this.popupElement.querySelector('#id-intronies-record-btn');
        recordButton.addEventListener('click', this.handleRecord.bind(this));

        const stopButton = this.popupElement.querySelector('#id-intronies-stop-btn');
        stopButton.addEventListener('click', this.handleStop.bind(this));

        // More event listeners can be added here following the same pattern
    }

    handleRecord() {
        console.log('Recording started');
        // Implement recording logic here
    }

    handleStop() {
        console.log('Recording stopped');
        // Implement stop recording logic here
    }

    show() {
        this.popupElement.style.display = 'block';
    }

    hide() {
        this.popupElement.style.display = 'none';
    }

    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    handleSubmit(event) {
        event.preventDefault();
        const emailInput = this.popupElement.querySelector('#email-input');
        const messageElement = this.popupElement.querySelector('#message');
        if (this.validateEmail(emailInput.value)) {
            console.log('Email submitted:', emailInput.value);
            messageElement.textContent = this.config.successMessage;
            messageElement.style.color = 'green';
            setTimeout(() => this.hide(), 2000);
        } else {
            messageElement.textContent = this.config.errorMessage;
            messageElement.style.color = 'red';
        }
    }
}

export default IntronTranscribeWidget;
