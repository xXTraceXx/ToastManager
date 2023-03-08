type toastType = 'danger' | 'success' | 'fail' | 'info';

type SliderConfig = {
    showProgressbar: boolean
}

class ToastManager{
    _sliderElement: JQuery<HTMLElement>;
    _config: SliderConfig;

    constructor(sliderID: string, config: SliderConfig){
        this._config = config;
        this.init(sliderID);
    }

    init(sliderID: string){
        this._sliderElement = $(`#${sliderID}`);

        let hasSliderClass = this._sliderElement.hasClass('toast-slider');
        console.log(hasSliderClass);
        console.log(this._sliderElement);

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

    private appendAndMoveItems(toast: HTMLElement){
        this._sliderElement.append(toast).ready(this.moveSliderItems);

        setTimeout(() => {
            console.log('tschau miau');
            $(toast).remove();
        }, 25000);
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
        closeIcon.addEventListener('click', function(){
            const clickedElement = $(this);
            const toast = clickedElement.closest('.toast');

            toast.remove();
        });
        closeIcon.classList.add('close');
    
        if(this._config.showProgressbar){
            let progressDiv = document.createElement('div');
            progressDiv.classList.add('progress', 'active');

            toast.append(progressDiv);
        }
    
        toast.append(toastContent);
        toast.append(closeIcon);
    
        return toast;
    }

    private moveSliderItems(){
        let items : NodeListOf<HTMLElement> = document.querySelectorAll('.item');

        items.forEach((element) => {
            let currentPosition = parseInt(element.style.top, 10);
            let newPosition = currentPosition + 100;
            element.style.top = `${newPosition}px`;
        });
    }
}

export { ToastManager };