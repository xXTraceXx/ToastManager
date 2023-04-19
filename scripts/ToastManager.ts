type ToastType = 'danger' | 'success' | 'fail' | 'info' | 'phone';

type SliderConfig = {
    showProgressbar: boolean
}

class ToastManager{
    _sliderElement: JQuery<HTMLElement>;

    _toastItems: HTMLElement[] = [];
    _config: SliderConfig;

    constructor(sliderID: string, config: SliderConfig){
        this._config = config;
        this.init(sliderID);
    }

    init(sliderID: string){
        this._sliderElement = $(`#${sliderID}`);

        let hasSliderClass = this._sliderElement.hasClass('toast-slider');

        if(!hasSliderClass){
            throw new Error('Invalid slider dom. Did not found "toast-slider" class');
        }
    }

    renderInfoToast(subTitle: string)
    {
        let infoToast = this.createToast('info', subTitle);
        this.appendAndMoveItems(infoToast);
    }

    renderDangerToast(subTitle: string)
    {
        let dangerToast = this.createToast('danger', subTitle);
        this.appendAndMoveItems(dangerToast);
    }

    renderSuccessToast(subTitle: string)
    {
        let successToast = this.createToast('success', subTitle);
        this.appendAndMoveItems(successToast);
    }

    renderFailToast(subTitle: string)
    {
        let failToast = this.createToast('fail', subTitle);
        this.appendAndMoveItems(failToast);
    }

    renderIncomingCallToast(subTitle: string){
        const callToast = this.createToast('phone', subTitle, false);

        let toastContent = $(callToast).find('.toast-content');
        console.log('toastContent');
        console.log(toastContent);

        let acceptBtn = document.createElement('button');
        acceptBtn.classList.add('acceptBtn');

        let acceptIcon = document.createElement('i');
        acceptIcon.classList.add('success');

        acceptBtn.append(acceptIcon);

        let denyBtn = document.createElement('button');
        denyBtn.classList.add('denyBtn');

        let denyIcon = document.createElement('i');
        denyIcon.classList.add('fail');

        denyBtn.append(denyIcon);

        toastContent.append(acceptBtn);
        toastContent.append(denyBtn);

        this.appendAndMoveItems(callToast);
    }

    renderRetryToast(subTitle: string){
        const callToast = this.createToast('danger', subTitle, false);

        let toastContent = $(callToast).find('.toast-content');
        console.log('toastContent');
        console.log(toastContent);

        let retryBtn = document.createElement('button');
        retryBtn.classList.add('retryBtn');

        let retryIcon = document.createElement('i');
        retryIcon.classList.add('retry');

        retryBtn.append(retryIcon);

        toastContent.append(retryBtn);

        this.appendAndMoveItems(callToast);
    }

    renderDontShowAgainToast(subTitle: string){
        const dangerToast = this.createToast('danger', subTitle, false);

        let toastContent = $(dangerToast).find('.toast-content');
        
        let acceptBtn = document.createElement('button');
        acceptBtn.classList.add('acceptBtn');

        let acceptIcon = document.createElement('i');
        acceptIcon.classList.add('success');

        acceptBtn.append(acceptIcon);

        let denyBtn = document.createElement('button');
        denyBtn.classList.add('denyBtn');

        let denyIcon = document.createElement('i');
        denyIcon.classList.add('fail');

        denyBtn.append(denyIcon);

        toastContent.append(acceptBtn);
        toastContent.append(denyBtn);

        let againDiv = document.createElement('div');
        let againLabel : HTMLLabelElement = document.createElement('label');
        againLabel.textContent = `Don't show again`;
        let againInput : HTMLInputElement = document.createElement('input');
        againInput.type = 'checkbox';

        againLabel.append(againInput);
        againDiv.append(againLabel);

        dangerToast.append(againDiv);

        this.appendAndMoveItems(dangerToast);
    }

    private appendAndMoveItems(toast: HTMLElement){
        let toastIndex = this._toastItems.length;
        toast.setAttribute('data-index', `${toastIndex}`);

        this._sliderElement.append(toast).ready(() => this.moveSliderItemsDown());

        this._toastItems.push(toast);

        if(this._config.showProgressbar){
            setTimeout(() => {
                this._toastItems.splice(toastIndex, 1);
                $(toast).remove();
            }, 5000);    
        }
    }

    private createToast(toastType: ToastType, subtitle: string, showClose: boolean = true): HTMLElement{
        let toast = document.createElement('toast');
        toast.classList.add('toast', 'item');
        toast.style.top = `${-50}px`;
    
        let toastContent = document.createElement('div');
        toastContent.classList.add('toast-content');
    
        let icon = document.createElement('i');
        icon.classList.add(toastType);
        toastContent.append(icon);
    
        let message = document.createElement('div');
        message.classList.add('message');
        toastContent.append(message);
    
        let text = document.createElement('div');
        text.classList.add('text', 'subtitle');
        text.textContent = subtitle;
        message.append(text);
    
        if(showClose){
            let closeIcon = document.createElement('i');
            closeIcon.addEventListener('click', () => {
                const clickedElement = $(closeIcon);
    
                const toast = clickedElement.closest('.toast');
                const index = parseInt(toast.attr('data-index'));
    
                toast.remove();
    
                this.moveSlideritemsUp(index);
            });
    
            closeIcon.classList.add('close');

            toast.append(closeIcon);
        }
    
        if(this._config.showProgressbar){
            let progressDiv = document.createElement('div');
            progressDiv.classList.add('progress', 'active');

            toast.append(progressDiv);
        }
    
        toast.append(toastContent);
    
        return toast;
    }

    private moveSliderItemsDown(){
        let items : NodeListOf<HTMLElement> = document.querySelectorAll('.item');

        items.forEach((element) => {
            let currentPosition = parseInt(element.style.top, 10);
            let newPosition = currentPosition + 110;
            element.style.top = `${newPosition}px`;
        });
    }

    private moveSlideritemsUp(index: number){
        let items = this._toastItems.slice(0, index);

        items.forEach((element) => {            
            let currentPosition = parseInt(element.style.top, 10);
            let newPosition = currentPosition - 100;

            element.style.top = `${newPosition}px`;
        })
    }
}

export { ToastManager };