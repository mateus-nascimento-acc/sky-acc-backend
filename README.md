# Teste Back-End SKY

## Proposta
Crie um aplicativo backend que irá expor uma API RESTful de criação de sing-up/sign-in.

Todos os endpoints devem somente aceitar e somente enviar JSONs. 

O servidor deverá retornar JSON para os casos de endpoint não encontrado também.
O aplicativo deverá persistir os dados (ver detalhes em requisitos).
Todas as respostas de erro devem retornar o objeto:

```
{
"mensagem": "mensagem de erro"
}
```

## Sign-up

Este endpoint deverá receber um usuário com os seguintes campos: nome,
email, senha e uma lista de objetos telefone. Seguem os modelos:
```
{
"nome": "string",
"email": "string",
"senha": "senha",
"telefones": [
 {
 "numero": "123456789",
 "ddd": "11"
 }
]
}
```

[x] Usar status codes de acordo
[x] Em caso de sucesso irá retornar um usuário mais os campos:
[x] id: id do usuário (pode ser o próprio gerado pelo banco, porém seria interessante
se fosse um GUID)
- [x] data_criacao: data da criação do usuário
- [x] data_atualizacao: data da última atualização do usuário
- [ ] ultimo_login: data do último login (no caso da criação, será a mesma que a
criação)
- [x] token: token de acesso da API (pode ser um GUID ou um JWT)
- [x] Caso o e-mail já exista, deverá retornar erro com a mensagem "E-mail já
existente".
- [x] O token deverá ser persistido junto com o usuário

