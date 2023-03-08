import * as $ from 'jquery';
import { ToastManager } from './ToastManager';

$(() => {
  let toastManager = new ToastManager('slider', {showProgressbar: true});

  $('#addToast').on('click', () => {
    toastManager.renderDangerToast('Hallo ich bin ein Test');
  })
})

