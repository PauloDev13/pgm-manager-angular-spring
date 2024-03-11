package com.devpgm.pgmmanager.exception;

public class RecordNotFoundException extends RuntimeException{

  public RecordNotFoundException(Long id) {
    super("Registro não encontrado com o ID: " + id);
  }

  public RecordNotFoundException() {
    super("Sem registro para os dados informados");
  }
}
