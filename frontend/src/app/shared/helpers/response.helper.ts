import { HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { FormGroup } from "@angular/forms";
import { FieldError } from "../models/errors/error.model";
import { CommonResponse } from "../models/http/response.model";

/**
 * Helper with utilities for reponses administration.
 */
export class ResponseHelper {

  /**
   * Validate if response doesn't have errors and return the result.
   * @param {CommonResponse} response : response for validate
   * @return {boolean} return if reponse don't have errors
   */
  static responseDontHaveErrors(response: CommonResponse<any>) {
    return response.data &&
    !('error' in response.data) &&
    (response.errors === null || response.errors === undefined);
  }

  /**
   * Parse HttpResponse angular object to a new CommonResponse object.
   * @param {HttpResponse} response : angular HttpResponse for parse
   * @return {CommonResponse} return CommonResponse with reponse data
   */
  static generateCommonResponseFromHttpResponse(response: HttpResponse<any>) {
    let commonResponse = new CommonResponse();

    commonResponse.data = response.body?.data || undefined;
    commonResponse.message = response.body.message;
    commonResponse.statusCode = response.status;

    return commonResponse;
  }

  /**
   * Parse HttpResponse angular object to a new CommonResponse object setting the errors property.
   * @param {HttpResponse} response : angular HttpResponse for parse
   * @return {CommonResponse} return CommonResponse with reponse errors data
   */
  static generateCommonResponseFromHttpErrorResponse(response: HttpErrorResponse) {
    let commonResponse = new CommonResponse();

    commonResponse.message = response.error.message;
    commonResponse.errors = response.error.errors || undefined;
    commonResponse.statusCode = response.status;

    return commonResponse;
  }

  /**
   * Map errors from CommonResponse to FieldError array for better operatibility.
   * @param {CommonResponse} errorResponse : response with errors
   * @param {FormGroup} form : form group for set control as incorrect
   * @return {FieldError[]} return field errors array
   */
  static generateFieldErrorArrayFromResponse(errorResponse: CommonResponse<any>, form: FormGroup) {
    let fieldErrors: FieldError[] = [];

    Object.keys(errorResponse.errors).forEach((key) => {
      form.get(key)?.setErrors({'incorrect': true});

      fieldErrors.push({
        key: key,
        errors: errorResponse.errors[key]
      });
    });

    return fieldErrors;
  }
}
