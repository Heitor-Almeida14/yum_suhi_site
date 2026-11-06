# Yum Sushi

Projeto exportado do Z.AI e organizado para versionamento no GitHub.

## Rodar localmente

Requisitos: Node.js 20.9+ e npm.

```bash
npm install
cp .env.example .env
npx prisma generate
npm run dev
```

Abra http://localhost:3000.

## Publicação

Este projeto usa **Next.js** e possui uma rota de API para registrar reservas (`/api/reservations`).
Por isso, **não é compatível com GitHub Pages como está**: GitHub Pages hospeda arquivos estáticos e não executa a API nem o banco SQLite.

A opção mais simples é:
1. Enviar este repositório ao GitHub pelo GitHub Desktop.
2. Importar o repositório na Vercel.
3. Configurar `DATABASE_URL` com um banco PostgreSQL gerenciado.
4. Ajustar `prisma/schema.prisma` para PostgreSQL e executar as migrações no ambiente de produção.

O arquivo `.env` original não foi incluído para evitar publicar configurações locais. Use `.env.example` como referência. Não envie segredos ou credenciais ao GitHub.
