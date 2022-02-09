function needsInvertForeColorByBack(color) {
    let r, g, b;
    const md = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    if (md) {
        r = parseInt(md[1], 10);
        g = parseInt(md[2], 10);
        b = parseInt(md[3], 10);
    } else {
        r = parseInt(color.substr(0, 2), 16);
        g = parseInt(color.substr(2, 2), 16);
        b = parseInt(color.substr(4, 2), 16);
    }
    return (0.299 * r + 0.587 * g + 0.114 * b) / 255 < 0.5;
}

function adjustDisplayNameColor() {
    let menuBtn = document.querySelector('span[data-testid="account-menu-button__background"]');
    if (!menuBtn) {
        menuBtn = document.querySelector('#nav-usernameMenu .awsc-switched-role-username-wrapper');
    }
    if (menuBtn) {
        const bgColor = menuBtn.style.backgroundColor;
        if (bgColor && needsInvertForeColorByBack(bgColor)) {
            menuBtn.parentElement.style = 'color: #f9f9f9';
        }
    }
}

function appendAESR() {
    const form = document.createElement('form');
    form.id = 'AESR_form';
    form.method = 'POST';
    form.target = '_top';
    form.innerHTML = '<input type="hidden" name="mfaNeeded" value="0"><input type="hidden" name="action" value="switchFromBasis"><input type="hidden" name="src" value="nav"><input type="hidden" name="csrf"><input type="hidden" name="roleName"><input type="hidden" name="account"><input type="hidden" name="color"><input type="hidden" name="redirect_uri"><input type="hidden" name="displayName">';
    document.body.appendChild(form)

    const divInfo = document.createElement('div');
    divInfo.id = 'AESR_info';
    divInfo.style.display = 'none';
    divInfo.style.visibility = 'hidden';
    document.body.appendChild(divInfo);
}

if (document.body) {
    adjustDisplayNameColor();
    appendAESR();
}

(chrome || browser).runtime.onMessage.addListener((request, sender, sendResponse) => {
    const metaASE = document.getElementById('awsc-signin-endpoint');
    if (!metaASE) return false;

    const {data, action} = request;
    if (action === 'loadInfo') {
        if (!window.AESR_script) {
            window.AESR_script = document.createElement('script');
            AESR_script.src = (chrome || browser).runtime.getURL('/content/attach-target.js');
            AESR_script.onload = () => {
                const infoJson = document.getElementById('AESR_info').dataset.content;
                sendResponse(JSON.parse(infoJson));
            };
            document.body.appendChild(AESR_script);
            return true;
        } else {
            const infoJson = document.getElementById('AESR_info').dataset.content;
            sendResponse(JSON.parse(infoJson));
            return false;
        }
    } else if (action === 'switch') {
        let actionHost = metaASE.getAttribute('content');
        const { actionSubdomain } = data;
        if (actionSubdomain && actionHost === 'signin.aws.amazon.com') {
            actionHost = actionSubdomain + '.' + actionHost;
        }
        const form = document.getElementById('AESR_form');
        form.setAttribute('action', `https://signin.aws.amazon.com/switchrole`);
        form.account.value = data.account;
        form.color.value = data.color;
        form.roleName.value = data.roleName;
        form.displayName.value = data.displayName;
        form.redirect_uri.value = data.redirectUri;
        form.submit();
        return false;
    }
});
