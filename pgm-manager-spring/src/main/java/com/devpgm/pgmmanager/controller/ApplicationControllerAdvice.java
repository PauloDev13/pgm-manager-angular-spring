package com.devpgm.pgmmanager.controller;

import com.devpgm.pgmmanager.exception.RecordNotFoundException;
import jakarta.validation.ConstraintViolationException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

import java.sql.SQLIntegrityConstraintViolationException;

@RestControllerAdvice
public class ApplicationControllerAdvice {

  @ExceptionHandler(RecordNotFoundException.class)
  @ResponseStatus(HttpStatus.NOT_FOUND)
  public String handleNotFoundException(RecordNotFoundException ex) {
    return ex.getMessage();
  }

  @ExceptionHandler(MethodArgumentNotValidException.class)
  @ResponseStatus(HttpStatus.BAD_REQUEST)
  public String handleMethodArgumentNotValidException(MethodArgumentNotValidException ex) {
    return ex.getBindingResult()
        .getFieldErrors()
        .stream()
        .map(error -> error.getField() + " " + error.getDefaultMessage())
        .reduce("", (acc, error) -> acc + error + "\n");
  }

  @ExceptionHandler(ConstraintViolationException.class)
  @ResponseStatus(HttpStatus.BAD_REQUEST)
  public String handleConstraintViolationException(ConstraintViolationException ex) {
    return ex.getConstraintViolations()
        .stream()
        .map(error -> error.getPropertyPath() + " " + error.getMessage())
        .reduce("", (acc, error) -> acc + error + "\n");
  }

  @ExceptionHandler(MethodArgumentTypeMismatchException.class)
  @ResponseStatus(HttpStatus.BAD_REQUEST)
  public String handleMethodArgumentTypeMismatchException(MethodArgumentTypeMismatchException ex) {
    if (ex != null && ex.getRequiredType() != null) {
      String type = ex.getRequiredType().getName();
      String[] typeParts = type.split("\\.");
      String typeName = typeParts[typeParts.length - 1];
      return ex.getName() + " Deve ser do tipo " + typeName;
    }
    return "O tipo de argumento não é válido";
  }

  @ExceptionHandler(SQLIntegrityConstraintViolationException.class)
  @ResponseStatus(HttpStatus.BAD_REQUEST)
  public String handleSQLIntegrityConstraintViolationException(SQLIntegrityConstraintViolationException ex) {
    return ex.getMessage();
  }

  @ExceptionHandler(IllegalArgumentException.class)
  @ResponseStatus(HttpStatus.BAD_REQUEST)
  public String handleIllegalArgumentException(IllegalArgumentException ex) {
    return ex.getMessage();
  }

  @ExceptionHandler(DataIntegrityViolationException.class)
  @ResponseStatus(HttpStatus.BAD_REQUEST)
  public String handleDataIntegrityViolationException(DataIntegrityViolationException ex) {
    return "Duplicate constraint";
  }
}
