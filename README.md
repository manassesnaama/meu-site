# Tidi Thai Team Platform

Plataforma da academia com paginas publicas, painel do aluno e administracao.

## Rotas

- `/`, `/planos`, `/sobre`, `/lions-fight`, `/contato`: area publica.
- `/login`: acesso unico por usuario e senha; o perfil define o painel.
- `/aluno`: plano, vencimento, status, pagamentos, perfil e evolucao.
- `/admin`: indicadores, alunos, cadastro e controle financeiro.

## O que ja esta conectado

- Auth.js Credentials com login por usuario e senha criptografada com bcrypt.
- Troca obrigatoria da senha temporaria no primeiro acesso.
- Protecao de rotas para aluno e professor/admin.
- Prisma com PostgreSQL, migracao inicial e seed de planos/admin.
- Cadastro real de aluno com plano, vencimento e credenciais.
- Registro de mensalidade paga com proximo vencimento em mais 30 dias.
- Painel do aluno e painel administrativo lendo o banco.

## Configuracao local

1. Instale Node.js LTS e rode `npm install`.
2. Copie `.env.example` para `.env` e informe `DATABASE_URL`, `DIRECT_URL` e `AUTH_SECRET`.
3. Execute `npm run prisma:generate`.
4. Execute `npm run prisma:migrate`.
5. Execute `npm run prisma:seed`.
6. Inicie com `npm run dev`.

## Publicacao gratuita

O inicio gratuito recomendado e:

- Netlify Free para publicar o aplicativo Next.js.
- Neon Free para hospedar o banco PostgreSQL.

No Neon, utilize a URL com pool de conexoes em `DATABASE_URL` e a URL direta em `DIRECT_URL`. No Netlify, configure ainda `AUTH_SECRET` como variavel secreta do site.

Para aplicar o schema no banco de producao, execute `npm run prisma:deploy`. Defina temporariamente `INITIAL_ADMIN_PASSWORD` e execute `npm run prisma:seed` uma unica vez para criar planos e os administradores iniciais; depois remova essa variavel.

## Primeiro acesso administrativo

- Usuario: `luis.fernando`
- Usuario: `manasses.mello`
- A senha temporaria inicial e informada diretamente aos administradores.

Os dois usuarios sao obrigados a cadastrar uma nova senha pessoal antes de acessar qualquer painel. Nao publique nem divulgue o dominio antes que ambos realizem essa troca.

## Proximas entregas

- Upload seguro das fotos de evolucao com Cloudinary ou UploadThing.
- Filtros funcionais da lista de alunos e edicao/desativacao de cadastro.
- Cadastro de avisos, frequencia e forma de pagamento.
