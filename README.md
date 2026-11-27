# TechStore — refatoração SOLID

Projeto refatorado em Node.js (20+) usando responsabilidades separadas, composição e dependências injetadas.

## Executar
- `npm start` executa o cenário demonstrativo.
- `npm test` executa os testes automatizados (`node:test`).

## Estrutura
- `domain`: entidades.
- `repositories`: persistência em memória.
- `services`: validação, desconto, frete, pagamento, estoque, processamento e notificação.
- `utils`: logger.
- `test`: testes automatizados.

## Publicar no GitHub
Crie um repositório GitHub vazio e execute:
```bash
git init
git add .
git commit -m "Refatora TechStore aplicando SOLID"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/techstore-solid-refatorado.git
git push -u origin main
```
Substitua o URL pelo endereço do seu repositório real.
