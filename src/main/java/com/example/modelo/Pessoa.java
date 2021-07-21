package com.example.modelo;

import lombok.Data;
import javax.persistence.*;


@Data // implementa getters/setters...
@Entity // abstrair diferencas entre objeto-relacional e paradigma OO
public class Pessoa{
    @Id // indica a chave primária da entidade pessoa
    @GeneratedValue //como o provedor de persistência gera o identificador
    private Long id;

    private String nome;
    private String endereco;
    private String cidade;
    private String estado;
    private String pais;
    private String telefone;


}
