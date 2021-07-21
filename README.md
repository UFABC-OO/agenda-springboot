# Agenda Spring Boot
Versão da agenda de contato com Spring Boot e React.js

# Executando a agenda
Para executar o spring-boot

`
./mvnw spring-boot:run
`
Para levantar o front-end react

```
cd react/
npm start
```

# Testando a aplicação

## Com HTTPie

Com a aplicação já incializada execute, no terminal,  o seguinte comando:

`
http POST :8080/api/pessoa/ nome='Pedro' cidade=Sao_Paulo pais=Brasil
`
Agora acesse o [navegador](http://localhost:8080/api/pessoas)


Deve aparecer no console a seguinte saída

![Saida](/images/output.jpg)

## Com front-end react

Com front-end inicializado 
```
cd react/
npm start
```

Acesse o  [navegador](http://localhost:3000/pessoas)

Você deve ver uma tela semelhante a tela abaixo

![Saida](/images/output2.jpg)

Em seguida basta clicar em "Adicionar contato" e preencher o formulário.

