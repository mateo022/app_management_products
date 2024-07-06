import { Injectable } from '@angular/core';
import * as $ from 'jquery';

/**
 * Service for show or hide the loading gif.
 */
@Injectable({
  providedIn: 'root'
})
export class PageLoadingService {

  private readonly loadingDivId = "loadingView";

  constructor() { }

  /**
   * Show loading gif.
   */
  showLoadingGif() {
    $(`#${this.loadingDivId}`).css("display", "block");
  }

  /**
   * Hide loading gif.
   */
  hideLoadingGif() {
    $(`#${this.loadingDivId}`).css("display", "none");
  }
}