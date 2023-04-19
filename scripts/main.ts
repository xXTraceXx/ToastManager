import * as $ from 'jquery';
import { ToastManager } from './ToastManager';

$(() => {
  let toastManager = new ToastManager('slider', {showProgressbar: false});

  $('#infoBtn').on('click', () => {
    toastManager.renderInfoToast('I am a info');
  })

  $('#dangerBtn').on('click', () => {
    toastManager.renderDangerToast('I am a danger');
  })
  
  $('#successBtn').on('click', () => {
    toastManager.renderSuccessToast('I am a success');
  })

  $('#failBtn').on('click', () => {
    toastManager.renderFailToast('I am a fail');
  })

  $('#incomBtn').on('click', () => {
    toastManager.renderIncomingCallToast('I am a call');
  })

  $('#retryBtn').on('click', () => {
    toastManager.renderRetryToast('I am a retry');
  })

  $('#showAgain').on('click', () => {
    toastManager.renderDontShowAgainToast('I am show again');
  })

  $('#clear').on('click', () => {
    $('#slider').empty();
  });
})

