type toastType = 'danger' | 'success' | 'fail' | 'info' | 'phone';

class ToastManager{
    _sliderElement: JQuery<HTMLElement>;
    _toastConfig: {showProgressbar: boolean};
    _toastItems: HTMLElement[] = [];

    constructor(sliderID: string, toastConfig?: {showProgressbar: boolean}){
        this.init(sliderID, toastConfig);
    }

    init(sliderID: string, toastConfig?: {showProgressbar}){
        this._sliderElement = $(`#${sliderID}`);
        this._toastConfig = toastConfig ?? {showProgressbar: true};

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
        const callToast = this.createToast('phone', subTitle);

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
        const callToast = this.createToast('danger', subTitle);

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

    private appendAndMoveItems(toast: HTMLElement){
        toast.setAttribute('data-index', `${this._toastItems.length}`);

        this._sliderElement.append(toast).ready(this.moveSliderItemsDown);

        this._toastItems.push(toast);

        if(this._toastConfig.showProgressbar){
            setTimeout(() => {
                console.log('tschau miau');
                $(toast).remove();
            }, 25000);    
        }
    }

    private createToast(toastType: toastType, subtitle: string): HTMLElement{
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
        toast.append(toastContent);

        if(this._toastConfig.showProgressbar){
            let progressDiv = document.createElement('div');
            progressDiv.classList.add('progress', 'active');
            toast.append(progressDiv);
        }
    
        return toast;
    }

    private moveSliderItemsDown(){
        let items : NodeListOf<HTMLElement> = document.querySelectorAll('.item');

        items.forEach((element) => {
            let currentPosition = parseInt(element.style.top, 10);
            let newPosition = currentPosition + 100;
            element.style.top = `${newPosition}px`;
        });
    }

    private moveSlideritemsUp(index: number){
        console.log('enter move up');
        console.log(index);
        let items = this._toastItems.slice(0, index);
        console.log('items to move')
        console.log(items);

        items.forEach((element) => {
            // @ts-ignore
            let currentPosition = parseInt(element.style.top, 10);
            let newPosition = currentPosition - 100;

            // @ts-ignore
            element.style.top = `${newPosition}px`;
        })
    }
}

export { ToastManager };